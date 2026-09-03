import Link from "next/link";
import { QuoteInput } from "@/lib/quote";

export default function StepSuccess({
  data,
  onRestart,
}: {
  data: QuoteInput;
  onRestart: () => void;
}) {
  const firstName = data.customerName.split(" ")[0] || "";

  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl text-brand-foreground">
        ✓
      </div>
      <h2 className="mt-4 text-xl font-bold">Quase lá!</h2>
      <p className="mt-2 text-sm text-muted">
        {firstName ? `${firstName}, a` : "A"} janela de envio foi aberta.
        Confirme o envio por lá para o seu orçamento chegar até nós — se
        tiver fotos do veículo, aproveite para anexar na conversa.
      </p>

      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="w-full max-w-xs rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition hover:opacity-90"
        >
          Fazer outro orçamento
        </button>
        <Link
          href="/"
          className="w-full max-w-xs rounded-lg border border-[var(--border-color)] px-6 py-3 text-sm font-semibold transition hover:bg-[var(--surface)]"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
