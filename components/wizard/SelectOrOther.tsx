"use client";

import { useState } from "react";

const OTHER_VALUE = "__outro__";

export default function SelectOrOther({
  id,
  label,
  value,
  options,
  onChange,
  otherLabel = "Outro",
  placeholder = "Selecione...",
  error,
  optional,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  otherLabel?: string;
  placeholder?: string;
  error?: string;
  optional?: boolean;
  disabled?: boolean;
}) {
  const [customMode, setCustomMode] = useState(
    () => value !== "" && !options.includes(value)
  );

  const label_ = (
    <label className="input-label" htmlFor={id}>
      {label}
      {optional && <span className="ml-1 font-normal text-muted">(opcional)</span>}
    </label>
  );

  const forcedCustom = options.length === 0;

  if (customMode || forcedCustom) {
    return (
      <div>
        {label_}
        <div className="flex gap-2">
          <input
            id={id}
            className="input-field"
            value={value}
            placeholder={`Digite ${label.toLowerCase()}`}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
          {options.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setCustomMode(false);
                onChange("");
              }}
              className="shrink-0 rounded-lg border border-[var(--border-color)] px-3 text-xs font-semibold text-muted transition hover:text-[var(--foreground)]"
            >
              Ver lista
            </button>
          )}
        </div>
        {error && <p className="field-error">{error}</p>}
      </div>
    );
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value;
    if (v === OTHER_VALUE) {
      setCustomMode(true);
      onChange("");
    } else {
      onChange(v);
    }
  }

  return (
    <div>
      {label_}
      <select
        id={id}
        className="input-field"
        value={options.includes(value) ? value : ""}
        onChange={handleSelectChange}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
        <option value={OTHER_VALUE}>{otherLabel}</option>
      </select>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
