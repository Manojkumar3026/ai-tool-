
import React, { useState, useRef, useEffect, createContext, useContext } from 'react';

const SelectContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}>({ open: false, setOpen: () => {}, selectedValue: '', setSelectedValue: () => {} });

export const Select: React.FC<{ children: React.ReactNode; value: string; onValueChange: (value: string) => void; }> = ({ children, value, onValueChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  
  useEffect(() => {
    onValueChange(selectedValue);
  }, [selectedValue, onValueChange]);

  useEffect(() => {
      setSelectedValue(value);
  }, [value]);

  return (
    <SelectContext.Provider value={{ open, setOpen, selectedValue, setSelectedValue }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger: React.FC<{ children: React.ReactNode; className?: string; }> = ({ children, className }) => {
  const { open, setOpen, selectedValue } = useContext(SelectContext);
  const ref = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, setOpen]);

  return (
    <button ref={ref} onClick={() => setOpen(!open)} className={`flex h-10 w-full items-center justify-between rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm ${className}`}>
      {children}
    </button>
  );
};

export const SelectValue: React.FC<{ placeholder?: string; }> = ({ placeholder }) => {
    const { selectedValue } = useContext(SelectContext);
    return <span className="truncate">{selectedValue || placeholder}</span>;
}

export const SelectContent: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const { open } = useContext(SelectContext);
  if (!open) return null;
  return (
    <div className="absolute z-50 mt-1 w-full rounded-md border border-white/20 bg-[#111118] text-white shadow-md">
      <div className="p-1">{children}</div>
    </div>
  );
};

export const SelectItem: React.FC<{ children: React.ReactNode; value: string; }> = ({ children, value }) => {
  const { setOpen, setSelectedValue, selectedValue } = useContext(SelectContext);
  const isSelected = selectedValue === value;
  return (
    <div onClick={() => { setSelectedValue(value); setOpen(false); }} className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-white/10 ${isSelected ? 'font-bold' : ''}`}>
      {children}
    </div>
  );
};
