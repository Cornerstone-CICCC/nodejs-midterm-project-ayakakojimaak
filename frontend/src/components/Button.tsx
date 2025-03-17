import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
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
  isLoading = false,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  // バリアントに基づくスタイル
  const variantStyles = {
    primary: "bg-gray-900 text-white border-transparent hover:bg-gray-800",
    secondary: "bg-gray-200 text-gray-900 border-transparent hover:bg-gray-300",
    outline: "bg-transparent text-gray-900 border-gray-300 hover:bg-gray-100",
    ghost: "bg-transparent text-gray-900 border-transparent hover:bg-gray-100",
  };

  // サイズに基づくスタイル
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const baseStyle =
    "rounded-md font-medium border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50";
  const widthStyle = fullWidth ? "w-full" : "";
  const loadingStyle = isLoading ? "opacity-70 cursor-not-allowed" : "";
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${loadingStyle} ${disabledStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          読み込み中...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
