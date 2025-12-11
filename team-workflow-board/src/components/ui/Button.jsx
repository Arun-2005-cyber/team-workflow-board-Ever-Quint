import React from 'react';

/**
 * Simple accessible button
 * Props:
 * - variant: primary | secondary | destructive
 * - size: sm | md | lg
 * - children, ...rest
 */
export default function Button({ variant = 'primary', size = 'md', children, ...rest }) {
  const base = 'button';
  const variants = {
    primary: { background: 'var(--primary)', color: '#fff' },
    secondary: { background: '#eef2ff', color: '#1f2937' },
    destructive: { background: 'var(--danger)', color: '#fff' }
  };
  const sizes = {
    sm: { padding: '6px 10px', fontSize: '13px' },
    md: { padding: '8px 12px', fontSize: '14px' },
    lg: { padding: '10px 14px', fontSize: '15px' }
  };
  const style = { border: 'none', borderRadius: 6, cursor: 'pointer', ...variants[variant], ...sizes[size] };

  return (
    <button className={base} style={style} {...rest}>
      {children}
    </button>
  );
}
