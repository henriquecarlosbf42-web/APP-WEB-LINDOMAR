"use client";

import { useState } from "react";
import { CAR_COLORS } from "@/lib/vehicles";

export default function ColorSwatchPicker({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const [customMode, setCustomMode] = useState(
    () => value !== "" && !CAR_COLORS.some((c) => c.name === value)
  );

  return (
    <fieldset>
      <span className="input-label">Cor do veículo</span>
      <p className="mb-2 text-xs text-muted">
        Toque na cartela mais parecida. O tom exato sai do código da tinta.
      </p>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
        {CAR_COLORS.map((c) => {
          const active = !customMode && value === c.name;
          return (
            <button
              key={c.name}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setCustomMode(false);
                onChange(c.name);
              }}
              className={`flex flex-col gap-1.5 rounded-[10px] border p-1.5 text-left transition ${
                active ? "border-brand ring-2 ring-brand" : "border-[var(--border-color)] bg-[var(--surface)]"
              }`}
            >
              <span
                className="block h-7 rounded-md border border-white/15"
                style={{ background: c.hex }}
              />
              <span className={`text-[11px] leading-tight ${active ? "font-semibold text-[var(--foreground)]" : "text-muted"}`}>
                {c.name}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          aria-pressed={customMode}
          onClick={() => {
            setCustomMode(true);
            onChange("");
          }}
          className={`flex flex-col gap-1.5 rounded-[10px] border p-1.5 text-left transition ${
            customMode ? "border-brand ring-2 ring-brand" : "border-[var(--border-color)] bg-[var(--surface)]"
          }`}
        >
          <span className="block h-7 rounded-md border border-dashed border-muted" />
          <span className={`text-[11px] leading-tight ${customMode ? "font-semibold text-[var(--foreground)]" : "text-muted"}`}>
            Outra
          </span>
        </button>
      </div>

      {customMode && (
        <input
          id="vehicleColor"
          className="input-field mt-3"
          placeholder="Digite a cor do veículo"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {error && <p className="field-error">{error}</p>}
    </fieldset>
  );
}
