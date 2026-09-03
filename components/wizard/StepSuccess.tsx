import Link from "next/link";
import { QuoteInput } from "@/lib/quote";

export default function StepSuccess({
  data,
  protocol,
  onRestart,
}: {
  data: QuoteInput;
  protocol: string;
  onRestart: () => void;
}) {
  const firstName = data.customerName.split(" ")[0] || "";

  return (
    <div className="text-center">
      <span className="inline-block rounded-[4px] bg-brand px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-foreground">
        Pedido registrado
      </span>
      <h2 className="mt-5 text-xl font-bold">Recebemos seu pedido</h2>
      <p className="mt-2 text-sm text-muted">
        Guarde o número abaixo. Ele identifica seu orçamento.
      </p>
      <div className="mt-1 text-2xl font-bold tracking-wide text-brand">{protocol}</div>

      <p className="mt-6 text-sm text-muted">
        {firstName ? `${firstName}, a` : "A"} janela de envio foi aberta. Confirme o
        envio por lá para o seu pedido chegar até nós — se tiver fotos do veículo,
        aproveite para anexar na conversa.
      </p>

      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="w-full max-w-xs rounded-[11px] bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground transition hover:bg-brand-dark"
        >
          Fazer outro orçamento
        </button>
        <Link
          href="/"
          className="w-full max-w-xs rounded-[11px] border border-[var(--border-color)] px-6 py-3.5 text-sm font-semibold transition hover:bg-white/5"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
