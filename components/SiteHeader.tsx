import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-[var(--border-color)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-brand-foreground font-bold">
            L
          </span>
          <span className="text-lg font-bold tracking-tight">
            Lindomar <span className="text-brand">Funilaria & Pintura</span>
          </span>
        </Link>
        <Link
          href="/orcamento"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:opacity-90"
        >
          Pedir Orçamento
        </Link>
      </div>
    </header>
  );
}
