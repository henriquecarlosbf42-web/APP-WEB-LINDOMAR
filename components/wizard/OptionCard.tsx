export default function OptionCard({
  label,
  description,
  active,
  onClick,
  shape = "square",
}: {
  label: string;
  description?: string;
  active: boolean;
  onClick: () => void;
  shape?: "square" | "round";
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left shadow-sm transition ${
        active
          ? "border-brand bg-brand-tint"
          : "border-[var(--border-color)] bg-[var(--surface)] hover:border-[#4A525E]"
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-[1.5px] transition-colors ${
          shape === "round" ? "rounded-full" : "rounded-[5px]"
        } ${active ? "border-brand bg-brand" : "border-muted bg-transparent"}`}
      >
        {active && (
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="#fff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12l5 5L20 6" />
          </svg>
        )}
      </span>
      <span>
        <span className="block font-semibold">{label}</span>
        {description && <span className="mt-0.5 block text-sm text-muted">{description}</span>}
      </span>
    </button>
  );
}
