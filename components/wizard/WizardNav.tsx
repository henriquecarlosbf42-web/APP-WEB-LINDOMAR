export default function WizardNav({
  onBack,
  onNext,
  backLabel = "Voltar",
  nextLabel = "Continuar",
  nextDisabled,
  loading,
}: {
  onBack?: () => void;
  onNext: () => void;
  backLabel?: string;
  nextLabel?: string;
  nextDisabled?: boolean;
  loading?: boolean;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t from-[var(--background)] from-[62%] to-transparent pb-[calc(16px+env(safe-area-inset-bottom))] pt-3.5">
      <div className="mx-auto flex max-w-lg gap-2.5 px-5">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="card-surface shrink-0 rounded-[11px] px-5 py-4 text-[15.5px] font-semibold transition hover:bg-white/5"
          >
            {backLabel}
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled || loading}
          className="flex-1 rounded-[11px] bg-brand px-6 py-4 text-[15.5px] font-semibold text-brand-foreground shadow-[0_2px_12px_-3px_rgba(224,43,34,0.6)] transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Enviando..." : nextLabel}
        </button>
      </div>
    </div>
  );
}
