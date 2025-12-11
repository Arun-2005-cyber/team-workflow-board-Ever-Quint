import React from "react";
import ReactDOM from "react-dom";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" role="dialog" aria-modal="true" onMouseDown={(e) => {
      // close when clicking backdrop (but not modal content)
      if (e.target.classList && e.target.classList.contains("modal-backdrop")) {
        onClose();
      }
    }}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <h3 style={{ margin: 0 }}>{title}</h3>
          </div>
        )}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
