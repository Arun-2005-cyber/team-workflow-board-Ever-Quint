// src/components/ui/Select.jsx

import React from "react";
import classNames from "classnames";

/**
 * Select Component
 * Props:
 * - label: Label text above select
 * - value: Controlled value
 * - onChange: Change handler
 * - options: Array of { value, label } objects
 * - className: Additional classes
 * - error: Error message to display
 */

export default function Select({
  label,
  value,
  onChange,
  options = [],
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

      <select
        value={value}
        onChange={onChange}
        className={classNames(
          "border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <span className="text-red-500 text-sm mt-1">{error}</span>
      )}
    </div>
  );
}
