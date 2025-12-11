import { useState, useEffect } from 'react';

/**
 * useLocalStorage(key, initial)
 * - returns [value, setValue]
 * - reads JSON from localStorage and keeps in state
 * - writes back to localStorage when value changes
 */
export default function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      console.error('useLocalStorage read error', e);
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error('useLocalStorage write error', e);
    }
  }, [key, state]);

  return [state, setState];
}
