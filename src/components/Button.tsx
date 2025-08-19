interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

export default function Button({
    children,
    onClick,
    variant = 'primary',
    className = '',
    type = 'button'
}: ButtonProps) {
    const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors';
    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        >
            {children}
        </button>
    );
}
