import React from 'react';

export type ToastProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

export type ToastActionElement = React.ReactElement;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

export const Toast: React.FC<ToastProps> = ({ title, description, action, ...props }) => (
  <div {...props} style={{ background: '#333', color: '#fff', padding: 16, borderRadius: 8, margin: 8, ...props.style }}>
    {title && <div style={{ fontWeight: 'bold' }}>{title}</div>}
    {description && <div>{description}</div>}
    {action}
  </div>
);

export const ToastTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontWeight: 'bold' }}>{children}</div>
);

export const ToastDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

export const ToastClose: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button onClick={onClick} style={{ marginLeft: 8, background: 'none', color: '#fff', border: 'none', cursor: 'pointer' }}>×</button>
);

export const ToastViewport: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>{children}</div>
);
