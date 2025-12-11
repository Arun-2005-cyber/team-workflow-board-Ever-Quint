// hooks/useDirtyForm.js (final)
import { useState, useEffect, useRef, useCallback } from 'react';
import isEqual from 'lodash/isEqual';

export default function useDirtyForm(initialValues) {
  const clone = (v) => (v && typeof v === 'object' ? JSON.parse(JSON.stringify(v)) : v);

  const [values, setValues] = useState(() => clone(initialValues));
  const initialRef = useRef(clone(initialValues));
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setDirty(!isEqual(values, initialRef.current));
  }, [values]);

  const reset = useCallback((nextInitial) => {
    const n = clone(nextInitial);
    initialRef.current = n;
    setValues(n);
    setDirty(false);
  }, []);

  return { values, setValues, reset, dirty };
}
