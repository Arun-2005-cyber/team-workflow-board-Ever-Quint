// src/components/ui/Modal.jsx

import React, { useEffect } from "react";
import classNames from "classnames";

/**
 * Modal Component
 * Props:
 * - open: boolean → controls visibility
 * - onClose: function → called when modal should close
 * - title: text displayed at top of modal
 * - children: modal content
 * - className: custom styles for modal box
 */

export default function Modal({
  open,
  onClose,
  title,
  children,
  className,
}) {

  // Close modal when pressing Escape key
  useEffect(() => {
    if (!open) return;

    function handleEsc(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose} // clicking background closes modal
      aria-modal="true"
      role="dialog"
    >
      <div
        className={classNames(
          "bg-white rounded-lg shadow-lg p-6 w-full max-w-lg",
          className
        )}
        onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside modal
      >
        {title && (
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
        )}

        {children}
      </div>
    </div>
  );
}
