
import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', ...props }) => {
  const baseClasses = 'inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

  const variantClasses = {
    default: 'bg-white/10 border-transparent text-white',
    outline: 'text-foreground border-white/20',
  };

  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    className
  ].join(' ');

  return <div className={combinedClasses} {...props} />;
};
