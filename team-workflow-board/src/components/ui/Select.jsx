import React from 'react';

export default function Select({ id, label, value, onChange, options = [], ...rest }) {
  return (
    <label className="form-group">
      <span style={{ fontSize: 13, marginBottom: 6 }}>{label}</span>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} {...rest}>
        <option value="">—</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
