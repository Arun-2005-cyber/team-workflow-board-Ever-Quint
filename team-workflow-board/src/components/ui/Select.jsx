import React from "react";

export default function Select({ id, label, value, onChange, options = [], ...rest }) {
  return (
    <label className="form-group" htmlFor={id}>
      {label && <span style={{ fontSize: 13, marginBottom: 6 }}>{label}</span>}
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} {...rest}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </label>
  );
}
