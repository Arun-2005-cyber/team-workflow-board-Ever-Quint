import { useEffect, useState } from 'react';

export default function useDirtyForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setDirty(JSON.stringify(values) !== JSON.stringify(initialValues));
  }, [values, initialValues]);

  return { values, setValues, dirty, setDirty };
}
