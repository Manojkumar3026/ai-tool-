
import React, { createContext, useContext, useState, useEffect } from 'react';

const DialogContext = createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({ open: false, onOpenChange: () => {} });

export const Dialog: React.FC<{
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ children, open, onOpenChange }) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

export const DialogTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ children, asChild }) => {
  const { onOpenChange } = useContext(DialogContext);
  const child = React.Children.only(children) as React.ReactElement;
  return React.cloneElement(child, { onClick: () => onOpenChange(true) });
};

export const DialogContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const { open, onOpenChange } = useContext(DialogContext);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onOpenChange]);

  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className={`glass-effect rounded-2xl p-6 border border-white/10 text-white w-full max-w-lg ${className}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export const DialogHeader: React.FC<{ children: React.ReactNode; }> = ({ children }) => (
  <div className="flex flex-col space-y-1.5 text-center sm:text-left">{children}</div>
);

export const DialogTitle: React.FC<{ children: React.ReactNode; }> = ({ children }) => (
  <h2 className="text-lg font-semibold leading-none tracking-tight text-white">{children}</h2>
);
