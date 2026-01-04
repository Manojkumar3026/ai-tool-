
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({ className, variant = 'default', size = 'default', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none';

  const variantClasses = {
    default: 'bg-white text-black hover:bg-gray-200',
    outline: 'border border-input bg-transparent hover:bg-white/5 hover:text-white',
    ghost: 'hover:bg-white/5 hover:text-white',
  };

  const sizeClasses = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    icon: 'h-10 w-10',
  };

  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(' ');

  return <button className={combinedClasses} {...props} />;
};
