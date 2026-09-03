export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--border-color)] bg-[var(--surface)]">
      <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-muted">
        <p className="font-semibold text-[var(--foreground)]">
          Lindomar Funilaria & Pintura
        </p>
        <p className="mt-1">
          Funilaria • Pintura • Polimento • Pintura de Rodas
        </p>
        <p className="mt-4">
          &copy; {new Date().getFullYear()} Lindomar Funilaria & Pintura.
          Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
