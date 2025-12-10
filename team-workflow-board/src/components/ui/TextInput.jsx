// src/components/ui/TextInput.jsx

import React from "react";
import classNames from "classnames";

/**
 * TextInput Component
 * Props:
 * - label: Label text
 * - value: Controlled input value
 * - onChange: Change handler
 * - placeholder: Placeholder text
 * - type: input type (text, email, password, etc.)
 * - className: additional classes
 * - error: error message to display
 */

export default function TextInput({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
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

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classNames(
          "border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400",
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
