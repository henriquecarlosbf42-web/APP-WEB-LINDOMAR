import Link from "next/link";
import { QuoteInput, serviceLabels } from "@/lib/quote";

function buildWhatsAppMessage(data: QuoteInput): string {
  const lines = [
    "Olá! Acabei de enviar um pedido de orçamento pelo site.",
    "",
    `Veículo: ${data.vehicleBrand} ${data.vehicleModel} ${data.vehicleYear} - ${data.vehicleColor}`,
    `Serviço(s): ${serviceLabels(data.services).join(", ")}`,
    data.description ? `Detalhes: ${data.description}` : null,
    `Nome: ${data.customerName}`,
  ].filter(Boolean);
  return lines.join("\n");
}

export default function StepSuccess({ data }: { data: QuoteInput }) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`
    : null;

  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl text-brand-foreground">
        ✓
      </div>
      <h2 className="mt-4 text-xl font-bold">Orçamento enviado!</h2>
      <p className="mt-2 text-sm text-muted">
        Recebemos seu pedido, {data.customerName.split(" ")[0]}. Em breve
        entraremos em contato pelo WhatsApp {data.customerPhone}.
      </p>

      <div className="mt-6 flex flex-col items-center gap-3">
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Confirmar também pelo WhatsApp
          </a>
        )}
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
