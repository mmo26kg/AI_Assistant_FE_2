import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/FormInput';
import { validateForm, commonValidationRules, hasErrors, ValidationRule } from '@/utils/validation';
import { Loader2, Mail, User } from 'lucide-react';
import type { RegisterCredentials } from '@/hooks/useAuth';

export interface RegisterFormProps {
  onSubmit: (credentials: RegisterCredentials) => Promise<boolean>;
  loading?: boolean;
  className?: string;
}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const confirmPasswordRule: ValidationRule[] = [
  {
    required: true,
    message: 'Xác nhận mật khẩu là bắt buộc'
  }
];

const registerValidationRules = {
  name: commonValidationRules.name,
  email: commonValidationRules.email,
  password: commonValidationRules.password,
  confirmPassword: confirmPasswordRule,
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ 
  onSubmit, 
  loading = false,
  className 
}) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleFieldChange = (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }

    // Clear confirm password error when password changes
    if (field === 'password' && errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: null }));
    }
  };

  const handleFieldBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate single field on blur
    if (field in registerValidationRules) {
      const fieldValue = formData[field as keyof RegisterFormData];
      let fieldErrors = validateForm(
        { [field]: String(fieldValue) },
        { [field]: registerValidationRules[field as keyof typeof registerValidationRules] }
      );

      // Special validation for confirm password
      if (field === 'confirmPassword') {
        if (fieldValue !== formData.password) {
          fieldErrors.confirmPassword = 'Mật khẩu không khớp';
        }
      }

      setErrors(prev => ({ ...prev, ...fieldErrors }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const formErrors = validateForm({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    }, registerValidationRules);
    
    // Add confirm password validation
    if (formData.confirmPassword !== formData.password) {
      formErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    setErrors(formErrors);
    setTouched({ 
      name: true, 
      email: true, 
      password: true, 
      confirmPassword: true 
    });

    if (hasErrors(formErrors)) {
      return;
    }

    const success = await onSubmit({
      username: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    });

    // Reset form on successful registration
    if (success) {
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setErrors({});
      setTouched({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-4 animate-fade-in">
        <FormInput
          label="Họ tên"
          placeholder="Nguyễn Văn A"
          value={formData.name}
          error={touched.name ? errors.name : null}
          icon={<User className="w-4 h-4" />}
          onChange={(value) => handleFieldChange('name', value)}
          onBlur={() => handleFieldBlur('name')}
        />

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

        <FormInput
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="••••••"
          value={formData.confirmPassword}
          error={touched.confirmPassword ? errors.confirmPassword : null}
          showPasswordToggle
          onChange={(value) => handleFieldChange('confirmPassword', value)}
          onBlur={() => handleFieldBlur('confirmPassword')}
        />

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full relative overflow-hidden bg-gradient-to-r from-primary via-primary/80 to-primary/60 hover:from-primary/90 hover:via-primary hover:to-primary/70 shadow-md"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Tạo tài khoản
          </Button>
        </div>
      </div>
    </form>
  );
};
