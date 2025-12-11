import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ open, onClose, title, children }) {
  const ref = useRef();

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    ref.current?.focus();
    return () => prev?.focus();
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div tabIndex={-1} ref={ref} className="bg-white rounded-lg z-10 p-4 max-w-lg w-full">
        <div className="flex justify-between items-center">
          <h2 id="modal-title" className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>,
    document.body
  );
}
