"use client";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, Mail, Lock, User, Facebook, Github, CheckCircle2, XCircle } from 'lucide-react';

interface FieldState { value: string; error: string | null; }
interface RegisterState { name: FieldState; email: FieldState; password: FieldState; confirm: FieldState; }
interface LoginState { email: FieldState; password: FieldState; remember: boolean; }

interface StrapiAuthSuccess { jwt: string; user: any; }

const makeField = (): FieldState => ({ value: '', error: null });
const initialRegister: RegisterState = { name: makeField(), email: makeField(), password: makeField(), confirm: makeField() };
const initialLogin: LoginState = { email: makeField(), password: makeField(), remember: false };

const API_BASE = (process.env.NEXT_PUBLIC_USER_MANAGEMENT_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');
function apiUrl(path: string) { return `${API_BASE}${path}`; }

export default function AuthPage() {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [registerFields, setRegisterFields] = useState<RegisterState>(initialRegister);
    const [loginFields, setLoginFields] = useState<LoginState>(initialLogin);
    const [showPwd, setShowPwd] = useState(false);
    const [showPwd2, setShowPwd2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const switchMode = () => { setMessage(null); setMode(m => m === 'login' ? 'register' : 'login'); };
    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const validatePassword = (pwd: string) => pwd.length >= 6;
    const validateName = (name: string) => name.trim().length >= 2;

    const handleRegisterChange = (field: keyof RegisterState, value: string) => {
        setRegisterFields(prev => ({ ...prev, [field]: { ...prev[field], value } }));
    };
    const handleLoginChange = (field: keyof LoginState, value: string | boolean) => {
        setLoginFields(prev => ({ ...prev, [field]: typeof value === 'boolean' ? value : { ...(prev as any)[field], value } }));
    };

    const runValidation = () => {
        if (mode === 'register') {
            const next: RegisterState = JSON.parse(JSON.stringify(registerFields));
            next.name.error = validateName(next.name.value) ? null : 'Tên quá ngắn';
            next.email.error = validateEmail(next.email.value) ? null : 'Email không hợp lệ';
            next.password.error = validatePassword(next.password.value) ? null : 'Mật khẩu tối thiểu 6 ký tự';
            next.confirm.error = next.confirm.value === next.password.value ? null : 'Mật khẩu không khớp';
            setRegisterFields(next);
            return Object.values(next).every(f => f.error === null);
        } else {
            const next: LoginState = JSON.parse(JSON.stringify(loginFields));
            next.email.error = validateEmail(next.email.value) ? null : 'Email không hợp lệ';
            next.password.error = validatePassword(next.password.value) ? null : 'Mật khẩu tối thiểu 6 ký tự';
            setLoginFields(next);
            return [next.email, next.password].every(f => f.error === null);
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (!runValidation()) return;
        if (!API_BASE) {
            setMessage({ type: 'error', text: 'Thiếu NEXT_PUBLIC_USER_MANAGEMENT_API_BASE_URL' });
            return;
        }
        setLoading(true);
        try {
            if (mode === 'register') {
                const payload = {
                    username: registerFields.name.value.trim(),
                    email: registerFields.email.value.trim(),
                    password: registerFields.password.value,
                };
                const res = await fetch(apiUrl('/api/auth/local/register'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    cache: 'no-store',
                    mode: 'cors'
                });
                const data: any = await res.json().catch(() => ({}));
                if (!res.ok) {
                    const errMsg = data?.error?.message || data?.message || `Đăng ký thất bại (${res.status})`;
                    throw new Error(Array.isArray(errMsg) ? errMsg[0] : errMsg);
                }
                const auth: StrapiAuthSuccess = data;
                try { localStorage.setItem('authToken', auth.jwt); } catch { }
                setMessage({ type: 'success', text: 'Đăng ký thành công! Hãy đăng nhập.' });
                setMode('login');
                setRegisterFields(initialRegister);
            } else {
                const payload = {
                    identifier: loginFields.email.value.trim(),
                    password: loginFields.password.value,
                };
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    cache: 'no-store'
                });
                const data: any = await res.json().catch(() => ({}));
                if (!res.ok) {
                    const errMsg = data?.error || `Đăng nhập thất bại (${res.status})`;
                    throw new Error(Array.isArray(errMsg) ? errMsg[0] : errMsg);
                }
                try { sessionStorage.setItem('user', JSON.stringify(data.user)); } catch {}
                setMessage({ type: 'success', text: 'Đăng nhập thành công!' });
            }
        } catch (err: any) {
            if (err instanceof TypeError) {
                setMessage({ type: 'error', text: 'Không kết nối được máy chủ. Kiểm tra API_BASE & server.' });
            } else {
                setMessage({ type: 'error', text: err.message || 'Có lỗi xảy ra' });
            }
        } finally {
            setLoading(false);
        }
    };

    const socialClick = (provider: string) => { setLoading(true); setMessage(null); setTimeout(() => { setLoading(false); setMessage({ type: 'success', text: `Giả lập ${provider} thành công` }); }, 1000); };

    return (
        <main className="min-h-screen hero-static-grid flex items-center justify-center px-4 py-16 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background/60 to-primary/5 backdrop-blur-xl" />
            <div className="relative w-full max-w-md">
                <div className="glass-effect border border-white/20 dark:border-white/10 rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.25)] p-8 overflow-hidden transition-all duration-500">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-mono font-bold gradient-text tracking-tight">{mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}</h1>
                        <button onClick={switchMode} className="text-sm text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded px-2 py-1">
                            {mode === 'login' ? 'Tạo tài khoản' : 'Đã có tài khoản?'}
                        </button>
                    </div>

                    {message && (
                        <div className={`flex items-center gap-2 mb-5 rounded-lg px-3 py-2 text-sm border ${message.type === 'success' ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-600 dark:text-emerald-300' : 'border-rose-400/40 bg-rose-400/10 text-rose-600 dark:text-rose-300'}`}>
                            {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            <span>{message.text}</span>
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-5">
                        {mode === 'register' && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="group">
                                    <label className="text-xs uppercase tracking-wide font-medium opacity-70 group-focus-within:text-primary">Họ tên</label>
                                    <div className="mt-1 relative">
                                        <Input value={registerFields.name.value} onChange={e => handleRegisterChange('name', e.target.value)} placeholder="Nguyễn Văn A" className="pr-9" />
                                        <User className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                                    </div>
                                    {registerFields.name.error && <p className="text-xs text-rose-500 mt-1">{registerFields.name.error}</p>}
                                </div>
                                <div className="group">
                                    <label className="text-xs uppercase tracking-wide font-medium opacity-70">Email</label>
                                    <div className="mt-1 relative">
                                        <Input value={registerFields.email.value} onChange={e => handleRegisterChange('email', e.target.value)} placeholder="you@email.com" className="pr-9" />
                                        <Mail className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                                    </div>
                                    {registerFields.email.error && <p className="text-xs text-rose-500 mt-1">{registerFields.email.error}</p>}
                                </div>
                                <div className="group">
                                    <label className="text-xs uppercase tracking-wide font-medium opacity-70">Mật khẩu</label>
                                    <div className="mt-1 relative">
                                        <Input type={showPwd ? 'text' : 'password'} value={registerFields.password.value} onChange={e => handleRegisterChange('password', e.target.value)} placeholder="••••••" className="pr-10" />
                                        <button type="button" onClick={() => setShowPwd(p => !p)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-primary/10 text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
                                            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {registerFields.password.error && <p className="text-xs text-rose-500 mt-1">{registerFields.password.error}</p>}
                                </div>
                                <div className="group">
                                    <label className="text-xs uppercase tracking-wide font-medium opacity-70">Xác nhận mật khẩu</label>
                                    <div className="mt-1 relative">
                                        <Input type={showPwd2 ? 'text' : 'password'} value={registerFields.confirm.value} onChange={e => handleRegisterChange('confirm', e.target.value)} placeholder="••••••" className="pr-10" />
                                        <button type="button" onClick={() => setShowPwd2(p => !p)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-primary/10 text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
                                            {showPwd2 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {registerFields.confirm.error && <p className="text-xs text-rose-500 mt-1">{registerFields.confirm.error}</p>}
                                </div>
                                <div className="pt-2">
                                    <Button disabled={loading} className="w-full relative overflow-hidden bg-gradient-to-r from-primary via-primary/80 to-primary/60 hover:from-primary/90 hover:via-primary hover:to-primary/70 shadow-md">
                                        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                        Tạo tài khoản
                                    </Button>
                                </div>
                            </div>
                        )}

                        {mode === 'login' && (
                            <div className="space-y-5 animate-fade-in">
                                <div className="group">
                                    <label className="text-xs uppercase tracking-wide font-medium opacity-70">Email</label>
                                    <div className="mt-1 relative">
                                        <Input value={loginFields.email.value} onChange={e => handleLoginChange('email', e.target.value)} placeholder="you@email.com" className="pr-9" />
                                        <Mail className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                                    </div>
                                    {loginFields.email.error && <p className="text-xs text-rose-500 mt-1">{loginFields.email.error}</p>}
                                </div>
                                <div className="group">
                                    <label className="text-xs uppercase tracking-wide font-medium opacity-70">Mật khẩu</label>
                                    <div className="mt-1 relative">
                                        <Input type={showPwd ? 'text' : 'password'} value={loginFields.password.value} onChange={e => handleLoginChange('password', e.target.value)} placeholder="••••••" className="pr-10" />
                                        <button type="button" onClick={() => setShowPwd(p => !p)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-primary/10 text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
                                            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {loginFields.password.error && <p className="text-xs text-rose-500 mt-1">{loginFields.password.error}</p>}
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                        <input type="checkbox" checked={loginFields.remember as boolean} onChange={e => handleLoginChange('remember', e.target.checked)} className="accent-primary h-4 w-4" />
                                        <span className="opacity-80">Ghi nhớ</span>
                                    </label>
                                    <Link href="#" className="text-primary hover:underline">Quên mật khẩu?</Link>
                                </div>
                                <Button disabled={loading} className="w-full relative overflow-hidden bg-gradient-to-r from-primary via-primary/80 to-primary/60 hover:from-primary/90 hover:via-primary hover:to-primary/70 shadow-md">
                                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                    Đăng nhập
                                </Button>
                            </div>
                        )}

                        <div className="pt-6 space-y-4">
                            <div className="relative text-center text-xs uppercase tracking-wide text-muted-foreground">
                                <span className="px-2 bg-background/60 backdrop-blur-xl rounded-md">Hoặc</span>
                                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
                            </div>
                            <div className="flex gap-3">
                                <button type="button" disabled={loading} onClick={() => socialClick('Google')} className="group flex-1 relative overflow-hidden rounded-md border border-white/20 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/80 dark:hover:bg-white/10 transition-all">
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                                    <span className="group-hover:translate-x-[1px] transition-transform">Google</span>
                                </button>
                                <button type="button" disabled={loading} onClick={() => socialClick('Facebook')} className="group flex-1 relative overflow-hidden rounded-md border border-white/20 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/80 dark:hover:bg-white/10 transition-all">
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Facebook className="w-4 h-4" />}
                                    <span className="group-hover:translate-x-[1px] transition-transform">Facebook</span>
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-[11px] text-muted-foreground/70 leading-relaxed">
                        Bằng việc tiếp tục, bạn đồng ý với <span className="text-primary hover:underline cursor-pointer">Điều khoản</span> &amp; <span className="text-primary hover:underline cursor-pointer">Chính sách</span> của chúng tôi.
                    </div>
                </div>
            </div>

            {/* Decorative subtle blur orbs */}
            <div className="pointer-events-none absolute -top-24 -left-20 w-72 h-72 rounded-full bg-primary/30 blur-[120px] opacity-30" />
            <div className="pointer-events-none absolute bottom-[-80px] right-[-60px] w-80 h-80 rounded-full bg-primary/20 blur-[120px] opacity-25" />
        </main>
    );
}
