
import React from 'react';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
  const baseClasses = 'flex h-10 w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
  
  const combinedClasses = [baseClasses, className].join(' ');

  return <input className={combinedClasses} {...props} />;
};
