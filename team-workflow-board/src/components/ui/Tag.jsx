// src/components/ui/Tag.jsx

import React from "react";
import classNames from "classnames";

/**
 * Tag Component
 * Props:
 * - children: Text inside the tag
 * - variant: color style (default, success, warning, danger)
 * - className: Additional classes
 */

export default function Tag({
  children,
  variant = "default",
  className,
}) {
  const variantStyles = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-200 text-green-800",
    warning: "bg-yellow-200 text-yellow-800",
    danger: "bg-red-200 text-red-800",
    info: "bg-blue-200 text-blue-800",
  };

  return (
    <span
      className={classNames(
        "px-2 py-1 text-xs rounded font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
