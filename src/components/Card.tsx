interface CardProps {
    title: string;
    description: string;
    icon?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function Card({
    title,
    description,
    icon,
    children,
    onClick,
    className = ''
}: CardProps) {
    return (
        <div
            className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer ${className}`}
            onClick={onClick}
        >
            <div className="flex items-center mb-3">
                {icon && <span className="text-2xl mr-3">{icon}</span>}
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{description}</p>
            {children}
        </div>
    );
}
