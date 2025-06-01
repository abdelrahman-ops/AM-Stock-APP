// TextButton.tsx
type TextButtonProps = {
    className?: string;
    onClick?: () => void;
    variant?: 'primary' | 'success' | string;
    children: React.ReactNode;
};

export const TextButton = ({ 
    className = '', 
    onClick,
    variant = '',
    children,
}: TextButtonProps) => {
    const buttonClasses = () => {
        if (variant === 'primary') return 'bg-blue-500 hover:bg-blue-600';
        if (variant === 'success') return 'bg-green-500 hover:bg-green-600';
        return 'bg-gray-500 hover:bg-gray-600';
    };

    return (
        <button 
            onClick={onClick}
            className={`px-4 py-2 rounded-xl transition-colors text-white ${buttonClasses()} ${className}`}
        >
            {children}
        </button>
    );
};