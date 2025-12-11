import { useState, useEffect, useCallback } from 'react';

/**
 * useDirtyForm(initialValues)
 * - returns { values, setValues, reset, dirty }
 * - tracks whether current values differ from initial
 */
export default function useDirtyForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [initial, setInitial] = useState(initialValues);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setDirty(JSON.stringify(values) !== JSON.stringify(initial));
  }, [values, initial]);

  const reset = useCallback((nextInitial) => {
    setInitial(nextInitial);
    setValues(nextInitial);
    setDirty(false);
  }, []);

  return { values, setValues, reset, dirty, setInitial };
}
