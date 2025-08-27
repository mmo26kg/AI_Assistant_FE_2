'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LoginForm } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';
import { Alert, AlertType } from '@/components/Alert';
import { useAuth } from '@/hooks/useAuth';
import { 
  Github, 
  Chrome, 
  ArrowLeft
} from 'lucide-react';

// Animation and UI Components
const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl animate-pulse"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-pink-400/20 to-orange-600/20 blur-3xl animate-pulse animation-delay-2000"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-600/10 blur-3xl animate-pulse animation-delay-4000"></div>
  </div>
);

// Social Login Buttons
const SocialLoginButtons = () => (
  <div className="space-y-3">
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-border/60"
      onClick={() => console.log('Google login')}
    >
      <Chrome className="w-4 h-4" />
      Đăng nhập với Google
    </Button>
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-border/60"
      onClick={() => console.log('GitHub login')}
    >
      <Github className="w-4 h-4" />
      Đăng nhập với GitHub
    </Button>
  </div>
);

// Main component
export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<AlertType>('info');
  
  const { login, register, error } = useAuth();

  const handleLoginSuccess = async (credentials: { identifier: string; password: string }) => {
    try {
      const success = await login(credentials);
      
      if (success) {
        setAlertType('success');
        setAlertMessage('Đăng nhập thành công!');
        
        // Redirect after successful login
        setTimeout(() => router.push('/'), 1500);
        return true;
      } else {
        setAlertType('error');
        setAlertMessage(error || 'Đăng nhập thất bại');
        return false;
      }
    } catch (err) {
      setAlertType('error');
      setAlertMessage('Có lỗi xảy ra. Vui lòng thử lại.');
      return false;
    }
  };

  const handleRegisterSuccess = async (data: { 
    username: string; 
    email: string; 
    password: string; 
  }) => {
    try {
      const success = await register(data);
      
      if (success) {
        setAlertType('success');
        setAlertMessage('Đăng ký thành công! Chuyển sang đăng nhập...');
        
        // Switch to login form after successful registration
        setTimeout(() => {
          setIsLogin(true);
          setAlertMessage('');
        }, 2000);
        return true;
      } else {
        setAlertType('error');
        setAlertMessage(error || 'Đăng ký thất bại');
        return false;
      }
    } catch (err) {
      setAlertType('error');
      setAlertMessage('Có lỗi xảy ra. Vui lòng thử lại.');
      return false;
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setAlertMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 flex items-center justify-center p-4 relative">
      <AnimatedBackground />
      
      {/* Back to Home */}
      <Link 
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Về trang chủ
      </Link>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md mx-auto shadow-2xl border-border/50 backdrop-blur-sm bg-card/95">
        <CardHeader className="space-y-1 text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isLogin ? 'Chào mừng bạn quay trở lại!' : 'Tạo tài khoản mới để bắt đầu'}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Alert */}
          {alertMessage && (
            <Alert 
              type={alertType} 
              message={alertMessage}
              onClose={() => setAlertMessage('')}
            />
          )}

          {/* Form */}
          {isLogin ? (
            <LoginForm onSubmit={handleLoginSuccess} />
          ) : (
            <RegisterForm onSubmit={handleRegisterSuccess} />
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Hoặc</span>
            </div>
          </div>

          {/* Social Login */}
          <SocialLoginButtons />

          {/* Toggle Login/Register */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            </span>{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
