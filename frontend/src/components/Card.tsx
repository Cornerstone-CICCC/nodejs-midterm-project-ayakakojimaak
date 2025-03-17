import React from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  bordered?: boolean;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  className = "",
  bordered = true,
  hoverable = false,
}) => {
  const borderStyle = bordered ? "border border-gray-200" : "";
  const hoverStyle = hoverable ? "transition-all duration-200 hover:shadow-lg hover:-translate-y-1" : "";

  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${borderStyle} ${hoverStyle} ${className}`}>
      {(title || subtitle) && (
        <div className="p-4 border-b border-gray-100">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}

      <div className="p-4">{children}</div>

      {footer && <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">{footer}</div>}
    </div>
  );
};

export default Card;
