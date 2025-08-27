import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/FormInput';
import { validateForm, commonValidationRules, hasErrors } from '@/utils/validation';
import { Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import type { LoginCredentials } from '@/hooks/useAuth';

export interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<boolean>;
  loading?: boolean;
  className?: string;
}

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const loginValidationRules = {
  email: commonValidationRules.email,
  password: commonValidationRules.password,
};

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit, 
  loading = false,
  className 
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    remember: false,
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleFieldChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleFieldBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate single field on blur
    if (field in loginValidationRules) {
      const fieldValue = formData[field as keyof LoginFormData];
      const fieldErrors = validateForm(
        { [field]: String(fieldValue) },
        { [field]: loginValidationRules[field as keyof typeof loginValidationRules] }
      );
      setErrors(prev => ({ ...prev, ...fieldErrors }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const formErrors = validateForm(
      { email: formData.email, password: formData.password },
      loginValidationRules
    );
    setErrors(formErrors);
    setTouched({ email: true, password: true });

    if (hasErrors(formErrors)) {
      return;
    }

    const success = await onSubmit({
      identifier: formData.email.trim(),
      password: formData.password,
    });

    // Reset form on successful login
    if (success) {
      setFormData({
        email: '',
        password: '',
        remember: false,
      });
      setErrors({});
      setTouched({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-5 animate-fade-in">
        <FormInput
          label="Email"
          type="email"
          placeholder="you@email.com"
          value={formData.email}
          error={touched.email ? errors.email : null}
          icon={<Mail className="w-4 h-4" />}
          onChange={(value) => handleFieldChange('email', value)}
          onBlur={() => handleFieldBlur('email')}
        />

        <FormInput
          label="Mật khẩu"
          type="password"
          placeholder="••••••"
          value={formData.password}
          error={touched.password ? errors.password : null}
          showPasswordToggle
          onChange={(value) => handleFieldChange('password', value)}
          onBlur={() => handleFieldBlur('password')}
        />

        <div className="flex items-center justify-between text-xs">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.remember}
              onChange={(e) => handleFieldChange('remember', e.target.checked)}
              className="accent-primary h-4 w-4"
            />
            <span className="opacity-80">Ghi nhớ</span>
          </label>
          <Link href="#" className="text-primary hover:underline">
            Quên mật khẩu?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full relative overflow-hidden bg-gradient-to-r from-primary via-primary/80 to-primary/60 hover:from-primary/90 hover:via-primary hover:to-primary/70 shadow-md"
        >
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Đăng nhập
        </Button>
      </div>
    </form>
  );
};
