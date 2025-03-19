import React from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, children, footer, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className="p-4 border-b">
          {title && <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>}
        </div>
      )}

      <div className="p-4">{children}</div>

      {footer && <div className="px-4 py-3">{footer}</div>}
    </div>
  );
};

export default Card;
