// src/components/SectionHeader.tsx
import type { ReactNode } from "react";

interface SectionHeaderProps {
    icon?: ReactNode;
    title: string;
    subtitle?: string;
    className?: string;
}

const SectionHeader = ({ icon, title, subtitle, className = '' }: SectionHeaderProps) => {
    return (
        <div className={`mb-4 ${className}`}>
        <div className="flex items-center gap-2">
            {icon && <span className="text-blue-500">{icon}</span>}
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>
        {subtitle && (
            <p className="text-gray-500 text-sm mt-1">
            {subtitle}
            </p>
        )}
        </div>
    );
};

export default SectionHeader;