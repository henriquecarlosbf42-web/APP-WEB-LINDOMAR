const LABELS = ["Veículo", "Serviço", "Contato", "Revisão"];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3">
      {LABELS.map((label, i) => {
        const stepNumber = i + 1;
        const isActive = stepNumber === current;
        const isDone = stepNumber < current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <div className="flex flex-col items-center gap-1.5 sm:flex-row">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  isDone
                    ? "bg-brand text-brand-foreground"
                    : isActive
                      ? "bg-brand text-brand-foreground ring-4 ring-[var(--brand)]/20"
                      : "bg-[var(--border-color)] text-muted"
                }`}
              >
                {isDone ? "✓" : stepNumber}
              </span>
              <span
                className={`hidden text-xs font-medium sm:block ${
                  isActive ? "text-[var(--foreground)]" : "text-muted"
                }`}
              >
                {label}
              </span>
            </div>
            {stepNumber < LABELS.length && (
              <div
                className={`h-0.5 flex-1 rounded ${
                  isDone ? "bg-brand" : "bg-[var(--border-color)]"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
