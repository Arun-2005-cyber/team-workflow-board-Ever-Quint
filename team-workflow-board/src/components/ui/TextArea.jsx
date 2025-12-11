import React from 'react';

export default function TextArea({ id, label, value, onChange, placeholder, rows = 4, ...rest }) {
  return (
    <label className="form-group">
      <span style={{ fontSize: 13, marginBottom: 6 }}>{label}</span>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        {...rest}
      />
    </label>
  );
}
