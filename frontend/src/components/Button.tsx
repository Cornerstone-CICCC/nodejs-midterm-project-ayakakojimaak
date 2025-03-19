import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary: "bg-stone-800 text-white border-transparent hover:bg-stone-700",
    secondary: "bg-stone-200 text-stone-800 border-transparent hover:bg-stone-300",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const baseStyle =
    "rounded-md font-medium border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-opacity-50";
  const widthStyle = fullWidth ? "w-full" : "";
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle} ${className}`}
      disabled={disabled}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
