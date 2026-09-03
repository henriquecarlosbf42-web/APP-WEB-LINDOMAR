"use client";

type Shape =
  | { tag: "rect"; label: string; kind: "peca" | "roda"; x: number; y: number; width: number; height: number; rx?: number }
  | { tag: "path"; label: string; kind: "peca"; d: string };

type Glass = { tag: "rect"; x: number; y: number; width: number; height: number; rx?: number };

const SHAPES: Shape[] = [
  { tag: "rect", kind: "roda", label: "Rodas", x: 8, y: 92, width: 16, height: 42, rx: 4 },
  { tag: "rect", kind: "roda", label: "Rodas", x: 186, y: 92, width: 16, height: 42, rx: 4 },
  { tag: "rect", kind: "roda", label: "Rodas", x: 8, y: 268, width: 16, height: 42, rx: 4 },
  { tag: "rect", kind: "roda", label: "Rodas", x: 186, y: 268, width: 16, height: 42, rx: 4 },

  { tag: "path", kind: "peca", label: "Para-choque dianteiro", d: "M60 14h90a12 12 0 0 1 12 12v26H48V26a12 12 0 0 1 12-12z" },
  { tag: "rect", kind: "peca", label: "Capô", x: 48, y: 55, width: 114, height: 62, rx: 3 },
  { tag: "rect", kind: "peca", label: "Teto", x: 48, y: 153, width: 114, height: 80, rx: 3 },
  { tag: "rect", kind: "peca", label: "Tampa traseira", x: 48, y: 265, width: 114, height: 52, rx: 3 },
  { tag: "path", kind: "peca", label: "Para-choque traseiro", d: "M48 320h114v28a12 12 0 0 1-12 12H60a12 12 0 0 1-12-12z" },

  { tag: "path", kind: "peca", label: "Paralama diant. esq.", d: "M45 55H38a12 12 0 0 0-12 12v50h19z" },
  { tag: "rect", kind: "peca", label: "Porta diant. esq.", x: 26, y: 120, width: 19, height: 76, rx: 3 },
  { tag: "rect", kind: "peca", label: "Porta tras. esq.", x: 26, y: 199, width: 19, height: 76, rx: 3 },
  { tag: "path", kind: "peca", label: "Lateral tras. esq.", d: "M26 278h19v70a12 12 0 0 1-5 10H26z" },

  { tag: "path", kind: "peca", label: "Paralama diant. dir.", d: "M165 55h7a12 12 0 0 1 12 12v50h-19z" },
  { tag: "rect", kind: "peca", label: "Porta diant. dir.", x: 165, y: 120, width: 19, height: 76, rx: 3 },
  { tag: "rect", kind: "peca", label: "Porta tras. dir.", x: 165, y: 199, width: 19, height: 76, rx: 3 },
  { tag: "path", kind: "peca", label: "Lateral tras. dir.", d: "M184 278h-19v70a12 12 0 0 0 5 10h14z" },

  { tag: "rect", kind: "peca", label: "Retrovisores", x: 18, y: 128, width: 7, height: 16, rx: 3 },
  { tag: "rect", kind: "peca", label: "Retrovisores", x: 185, y: 128, width: 7, height: 16, rx: 3 },
];

const GLASS: Glass[] = [
  { tag: "rect", x: 52, y: 120, width: 106, height: 30, rx: 4 },
  { tag: "rect", x: 52, y: 236, width: 106, height: 26, rx: 4 },
];

export default function CarDiagram({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (label: string) => void;
}) {
  return (
    <svg viewBox="0 0 210 400" role="group" aria-label="Diagrama do carro visto de cima" className="mx-auto block h-auto w-full max-w-[230px]">
      {GLASS.map((g, i) => (
        <rect key={`glass-${i}`} x={g.x} y={g.y} width={g.width} height={g.height} rx={g.rx} fill="#39424F" opacity={0.9} pointerEvents="none" />
      ))}
      {SHAPES.map((s, i) => {
        const isSelected = selected.includes(s.label);
        const isWheel = s.kind === "roda";
        const fill = isWheel
          ? isSelected
            ? "var(--brand)"
            : "#7A838F"
          : isSelected
            ? "var(--brand)"
            : "var(--background-deep)";
        const opacity = isWheel && !isSelected ? 0.55 : 1;
        const commonProps = {
          key: `${s.label}-${i}`,
          fill,
          opacity,
          style: { cursor: "pointer", transition: "fill .15s ease" },
          onClick: () => onToggle(s.label),
          "aria-pressed": isSelected,
          role: "button" as const,
          tabIndex: 0,
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle(s.label);
            }
          },
        };
        return s.tag === "rect" ? (
          <rect {...commonProps} x={s.x} y={s.y} width={s.width} height={s.height} rx={s.rx} />
        ) : (
          <path {...commonProps} d={s.d} />
        );
      })}
    </svg>
  );
}
