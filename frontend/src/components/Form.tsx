import React, { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

interface FormGroupProps {
  children: ReactNode;
  className?: string;
}

interface FormLabelProps {
  htmlFor: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  error?: string;
}

interface FormErrorProps {
  children: ReactNode;
}

interface FormHelperProps {
  children: ReactNode;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, className = "" }) => (
  <form className={`space-y-4 ${className}`} onSubmit={onSubmit}>
    {children}
  </form>
);

export const FormGroup: React.FC<FormGroupProps> = ({ children, className = "" }) => (
  <div className={`space-y-2 ${className}`}>{children}</div>
);

export const FormLabel: React.FC<FormLabelProps> = ({ htmlFor, children, className = "", required = false }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

export const FormInput: React.FC<FormInputProps> = ({ error, className = "", ...props }) => (
  <div>
    <input
      className={`appearance-none block w-full px-3 py-2 border ${
        error
          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
          : "border-gray-300 focus:ring-gray-500 focus:border-gray-500"
      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${className}`}
      {...props}
    />
    {error && <FormError>{error}</FormError>}
  </div>
);

export const FormTextarea: React.FC<FormTextareaProps> = ({ error, className = "", ...props }) => (
  <div>
    <textarea
      className={`appearance-none block w-full px-3 py-2 border ${
        error
          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
          : "border-gray-300 focus:ring-gray-500 focus:border-gray-500"
      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${className}`}
      {...props}
    />
    {error && <FormError>{error}</FormError>}
  </div>
);

export const FormSelect: React.FC<FormSelectProps> = ({ children, error, className = "", ...props }) => (
  <div>
    <select
      className={`appearance-none block w-full px-3 py-2 border ${
        error
          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
          : "border-gray-300 focus:ring-gray-500 focus:border-gray-500"
      } rounded-md shadow-sm focus:outline-none focus:ring-2 bg-white ${className}`}
      {...props}>
      {children}
    </select>
    {error && <FormError>{error}</FormError>}
  </div>
);

export const FormError: React.FC<FormErrorProps> = ({ children }) => (
  <p className="mt-1 text-sm text-red-600">{children}</p>
);

export const FormHelper: React.FC<FormHelperProps> = ({ children }) => (
  <p className="mt-1 text-xs text-gray-500">{children}</p>
);

export default {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormError,
  FormHelper,
};
