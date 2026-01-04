
import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext<{
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}>({ isCollapsed: false, setCollapsed: () => {} });

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setCollapsed] = useState(false);
  return (
    <SidebarContext.Provider value={{ isCollapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
  const { isCollapsed } = useContext(SidebarContext);
  return <aside className={`flex flex-col w-64 ${isCollapsed ? 'w-16' : ''} transition-all duration-300 ${className}`}>{children}</aside>;
};

export const SidebarHeader: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const SidebarContent: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={`flex-1 overflow-y-auto ${className}`}>{children}</div>
);

export const SidebarFooter: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const SidebarGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>;
export const SidebarGroupContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>;
export const SidebarMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => <nav>{children}</nav>;
export const SidebarMenuItem: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>;
export const SidebarMenuButton: React.FC<{ children: React.ReactNode, className?: string, asChild?: boolean }> = ({ children, className, asChild }) => {
  if (asChild) {
    return React.cloneElement(children as React.ReactElement, { className });
  }
  return <button className={className}>{children}</button>;
};
