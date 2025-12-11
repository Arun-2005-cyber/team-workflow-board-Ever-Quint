import React from "react";

export default function Button({ children, onClick, type = "button", variant = "primary", className = "", ...rest }) {
  const base = "btn";
  const cls = `${base} ${variant === "secondary" ? "btn-secondary" : "btn-primary"} ${className}`;
  return (
    <button type={type} className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
