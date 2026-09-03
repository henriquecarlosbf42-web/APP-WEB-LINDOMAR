import { QuoteInput, serviceLabels } from "@/lib/quote";
import { hexForColorName } from "@/lib/vehicles";

export default function StickyHeader({
  data,
  current,
  total,
  complete,
}: {
  data: QuoteInput;
  current: number;
  total: number;
  complete?: boolean;
}) {
  const carText =
    [data.vehicleBrand, data.vehicleModel, data.vehicleYear].filter(Boolean).join(" ") ||
    "Novo pedido de orçamento";
  const line2 =
    [data.vehicleColor, ...serviceLabels(data.services)].filter(Boolean).join(" · ") ||
    "Leva cerca de 2 minutos";
  const chipColor = hexForColorName(data.vehicleColor) ?? "#ffffff";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-soft)] bg-[rgba(13,15,19,0.9)] backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center gap-3 px-5 pt-2.5">
        <span
          className="h-[34px] w-[34px] shrink-0 rounded-lg border border-[var(--border-color)]"
          style={{
            background: chipColor,
            boxShadow:
              "inset 0 -8px 10px -8px rgba(0,0,0,.6), inset 0 6px 8px -6px rgba(255,255,255,.75)",
          }}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-bold tracking-tight">{carText}</div>
          <div className="truncate text-xs text-muted">{line2}</div>
        </div>
        <span className="shrink-0 text-xs font-semibold text-muted">
          {complete ? "Concluído" : `${current} de ${total}`}
        </span>
      </div>
      <div className="mx-auto flex max-w-lg gap-[3px] px-5 pb-2.5 pt-2.5">
        {Array.from({ length: total }).map((_, i) => {
          const step = i + 1;
          const state = complete || step < current ? "done" : step === current ? "on" : "pending";
          return (
            <i
              key={i}
              className={`h-[3px] flex-1 rounded-sm ${
                state === "on" ? "bg-brand" : state === "done" ? "bg-muted" : "bg-background-deep"
              }`}
            />
          );
        })}
      </div>
    </header>
  );
}
