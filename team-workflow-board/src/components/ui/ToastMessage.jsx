// src/components/ToastMessage.jsx

import React, { useEffect } from "react";

export default function ToastMessage({ type = "success", message, onClose }) {
  
  // Auto close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // call the function to remove toast
    }, 3000);

    return () => clearTimeout(timer); // cleanup timer
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded shadow-lg text-white flex items-center gap-3 z-50
      ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      {/* Message Text */}
      <span>{message}</span>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="text-white text-xl leading-none hover:opacity-80"
      >
        &times;
      </button>
    </div>
  );
}
