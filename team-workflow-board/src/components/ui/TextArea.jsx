// src/components/ui/TextArea.jsx

import React from "react";
import classNames from "classnames";

/**
 * TextArea Component
 * Props:
 * - label: Label text
 * - value: Controlled value
 * - onChange: Change handler
 * - placeholder: Placeholder text
 * - rows: Number of visible rows
 * - className: Additional classes
 * - error: Error message to display
 */

export default function TextArea({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  className,
  error = "",
  ...props
}) {
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label className="mb-1 font-medium text-gray-700">
          {label}
        </label>
      )}

      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={classNames(
          "border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
        {...props}
      />

      {error && (
        <span className="text-red-500 text-sm mt-1">{error}</span>
      )}
    </div>
  );
}
