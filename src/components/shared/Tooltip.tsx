// src/components/ui/Tooltip.tsx
// import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Tooltip = ({ content, children, disabled = false }: TooltipProps) => {
  if (disabled) return <>{children}</>;
  
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
        {content}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-0 border-t-4 border-gray-800 border-solid" />
      </div>
    </div>
  );
};