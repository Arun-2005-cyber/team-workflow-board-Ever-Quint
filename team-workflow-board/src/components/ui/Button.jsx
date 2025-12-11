import React from 'react';

export default function Button({ children, variant='primary', size='md', ...rest }) {
  const base = "inline-flex items-center justify-center rounded px-3 py-1.5 font-medium focus:outline-none focus:ring-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-600 text-white"
  };
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]}`} {...rest}>
      {children}
    </button>
  );
}
