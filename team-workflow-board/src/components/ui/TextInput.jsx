import React from "react";

export default function TextInput({ id, label, value = "", onChange, placeholder = "", required = false, ...rest }) {
  return (
    <label className="form-group" htmlFor={id}>
      {label && <span style={{ fontSize: 13, marginBottom: 6 }}>{label}{required ? ' *' : ''}</span>}
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-required={required}
        {...rest}
      />
    </label>
  );
}
