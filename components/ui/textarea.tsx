
import React from 'react';

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className, ...props }) => {
  const baseClasses = 'flex min-h-[80px] w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50';

  const combinedClasses = [baseClasses, className].join(' ');

  return <textarea className={combinedClasses} {...props} />;
};
