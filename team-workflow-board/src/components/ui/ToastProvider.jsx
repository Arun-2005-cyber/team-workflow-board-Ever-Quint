/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [list, setList] = useState([]);

  const show = useCallback((message, { timeoutMs = 3000, action } = {}) => {
    const id = Math.random().toString(36).slice(2, 9);
    setList((s) => [{ id, message, action }, ...s]);
    if (timeoutMs) setTimeout(() => setList((s) => s.filter((t) => t.id !== id)), timeoutMs);
    return id;
  }, []);

  const value = { show };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-wrap" aria-live="polite">
        {list.map((t) => (
          <div key={t.id} className="toast">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
              <div>{t.message}</div>
              {t.action && (
                <button className="icon-btn" onClick={t.action} style={{ marginLeft: 8 }}>Undo</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
