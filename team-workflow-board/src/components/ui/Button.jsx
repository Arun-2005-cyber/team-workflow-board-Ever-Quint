// src/components/ui/Button.jsx

import React from "react";
import classNames from "classnames";

/**
 * Button Component
 * 
 * Props:
 * - children: Button text or content
 * - variant: 'primary' | 'secondary' | 'destructive'
 * - size: 'sm' | 'md' | 'lg'
 * - onClick: click handler
 * - className: additional custom classes
 */

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className,
  ...props
}) {
  // Define variant classes
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };

  // Define size classes
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-5 py-3 text-lg",
  };

  // Combine all classes
  const buttonClass = classNames(
    "rounded focus:outline-none focus:ring-2 focus:ring-offset-2",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return (
    <button className={buttonClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
