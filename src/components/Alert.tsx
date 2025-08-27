import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps {
  type: AlertType;
  message: string;
  className?: string;
  onClose?: () => void;
}

const alertConfig = {
  success: {
    icon: CheckCircle2,
    className: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-600 dark:text-emerald-300'
  },
  error: {
    icon: XCircle,
    className: 'border-rose-400/40 bg-rose-400/10 text-rose-600 dark:text-rose-300'
  },
  warning: {
    icon: AlertCircle,
    className: 'border-amber-400/40 bg-amber-400/10 text-amber-600 dark:text-amber-300'
  },
  info: {
    icon: Info,
    className: 'border-blue-400/40 bg-blue-400/10 text-blue-600 dark:text-blue-300'
  }
} as const;

export const Alert: React.FC<AlertProps> = ({ 
  type, 
  message, 
  className,
  onClose 
}) => {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div 
      className={cn(
        "flex items-center gap-2 mb-5 rounded-lg px-3 py-2 text-sm border",
        config.className,
        className
      )}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 hover:opacity-70 transition-opacity"
          aria-label="Đóng thông báo"
        >
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
