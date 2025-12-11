import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

/**
 * ToastProvider wraps the app and provides show(msg, opts) method.
 * Toasts auto-dismiss after timeoutMs (default 3000).
 */
export function ToastProvider({ children }) {
  const [list, setList] = useState([]);

  const show = useCallback((message, { timeoutMs = 3000 } = {}) => {
    const id = Math.random().toString(36).slice(2, 9);
    setList((s) => [{ id, message }, ...s]);
    setTimeout(() => setList((s) => s.filter((t) => t.id !== id)), timeoutMs);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="toast-wrap" aria-live="polite">
        {list.map((t) => (
          <div key={t.id} role="status" style={{ background: 'white', padding: 10, borderRadius: 6, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
