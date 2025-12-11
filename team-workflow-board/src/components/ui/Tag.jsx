import React from 'react';

export default function Tag({ children, className = '' }) {
  return <span className={`tag ${className}`}>{children}</span>;
}
