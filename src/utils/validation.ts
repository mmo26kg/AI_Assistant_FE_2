export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  message: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule[];
}

export const commonValidationRules = {
  email: [
    {
      required: true,
      message: 'Email là bắt buộc'
    },
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Email không hợp lệ'
    }
  ] as ValidationRule[],
  password: [
    {
      required: true,
      message: 'Mật khẩu là bắt buộc'
    },
    {
      minLength: 6,
      message: 'Mật khẩu tối thiểu 6 ký tự'
    }
  ] as ValidationRule[],
  name: [
    {
      required: true,
      message: 'Tên là bắt buộc'
    },
    {
      minLength: 2,
      message: 'Tên quá ngắn'
    }
  ] as ValidationRule[]
};

export const validateField = (value: string, rules: ValidationRule[]): string | null => {
  for (const rule of rules) {
    // Required check
    if (rule.required && (!value || value.trim().length === 0)) {
      return rule.message;
    }

    // Skip other validations if value is empty (assuming it's optional)
    if (!value || value.trim().length === 0) {
      continue;
    }

    // Min length check
    if (rule.minLength && value.trim().length < rule.minLength) {
      return rule.message;
    }

    // Max length check
    if (rule.maxLength && value.trim().length > rule.maxLength) {
      return rule.message;
    }

    // Pattern check
    if (rule.pattern && !rule.pattern.test(value.trim())) {
      return rule.message;
    }

    // Custom validation
    if (rule.custom && !rule.custom(value.trim())) {
      return rule.message;
    }
  }

  return null;
};

export const validateForm = (values: Record<string, string>, rules: ValidationRules): Record<string, string | null> => {
  const errors: Record<string, string | null> = {};

  Object.keys(rules).forEach(fieldName => {
    const fieldValue = values[fieldName] || '';
    const fieldRules = rules[fieldName];
    errors[fieldName] = validateField(fieldValue, fieldRules);
  });

  return errors;
};

export const hasErrors = (errors: Record<string, string | null>): boolean => {
  return Object.values(errors).some(error => error !== null);
};
