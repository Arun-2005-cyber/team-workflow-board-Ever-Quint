// src/components/ui/Card.jsx

import React from "react";
import classNames from "classnames";

/**
 * Card Component
 * Props:
 * - children: content inside the card
 * - className: extra styling
 * - onClick: click handler (optional)
 */

export default function Card({ children, className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}
