import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

/**
 * Basic accessible modal using portal
 * - open: boolean
 * - onClose: function
 * - title: string
 */
export default function Modal({ open, onClose, title, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (open) {
      const prev = document.activeElement;
      setTimeout(() => ref.current?.focus(), 0);
      const onKey = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', onKey);
      return () => {
        window.removeEventListener('keydown', onKey);
        prev?.focus();
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title" style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
      <div ref={ref} tabIndex={-1} style={{ background: 'white', padding: 16, borderRadius: 8, minWidth: 320, maxWidth: '90%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 id="modal-title" style={{ margin: 0 }}>{title}</h2>
          <button aria-label="Close modal" onClick={onClose}>✕</button>
        </div>
        <div style={{ marginTop: 12 }}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
