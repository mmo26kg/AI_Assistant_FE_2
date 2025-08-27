import React, { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  error?: string | null;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  className?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ 
    label, 
    placeholder, 
    type = 'text', 
    value, 
    error, 
    icon, 
    showPasswordToggle = false,
    className,
    onChange,
    onBlur,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    
    const inputType = type === 'password' 
      ? (showPassword ? 'text' : 'password')
      : type;

    const hasIcon = icon || showPasswordToggle;
    const iconPosition = showPasswordToggle ? 'right-2' : 'right-3';

    return (
      <div className={cn("group", className)}>
        <label className="text-xs uppercase tracking-wide font-medium opacity-70 group-focus-within:text-primary">
          {label}
        </label>
        <div className="mt-1 relative">
          <Input
            ref={ref}
            type={inputType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            className={cn(
              hasIcon && "pr-10",
              error && "border-rose-500 focus-visible:ring-rose-500"
            )}
            {...props}
          />
          
          {/* Regular icon */}
          {icon && !showPasswordToggle && (
            <div className={cn("absolute top-1/2 -translate-y-1/2 text-muted-foreground/60", iconPosition)}>
              {icon}
            </div>
          )}
          
          {/* Password toggle */}
          {showPasswordToggle && type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-primary/10 text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>
        
        {error && (
          <p className="text-xs text-rose-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
