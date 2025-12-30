import React from 'react';

export function Select({ label, value, onChange, options, className = '', fullWidth = false, ...props }) {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && <label className="block text-xs font-semibold text-text-secondary tracking-wide mb-1">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={`block w-full rounded-md border border-border bg-background text-text text-sm px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary ${className}`}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
