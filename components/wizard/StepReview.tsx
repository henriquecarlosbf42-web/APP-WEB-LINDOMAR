import { QuoteInput, buildMailtoUrl, buildWhatsAppUrl, serviceLabels } from "@/lib/quote";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/contact";

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 text-sm">
      <span className="text-muted">{label}</span>
      <span className="text-right font-medium">{value || "—"}</span>
    </div>
  );
}

export default function StepReview({
  data,
  photosCount,
  protocol,
  onBack,
  onEdit,
  onSent,
}: {
  data: QuoteInput;
  photosCount: number;
  protocol: string;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSent: () => void;
}) {
  const whatsappUrl = buildWhatsAppUrl(data, WHATSAPP_NUMBER, protocol, photosCount);
  const mailtoUrl = buildMailtoUrl(data, CONTACT_EMAIL, protocol, photosCount);

  return (
    <div>
      <h2 className="text-xl font-bold">Confira antes de enviar</h2>
      <p className="mt-1 text-sm text-muted">Toque em &ldquo;Alterar&rdquo; se algo estiver errado.</p>

      <div className="mt-6 card-surface p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Veículo</h3>
          <button type="button" onClick={() => onEdit(1)} className="text-xs font-semibold text-brand">
            Alterar
          </button>
        </div>
        <div className="mt-1 divide-y divide-[var(--border-soft)]">
          <ReviewRow label="Carro" value={`${data.vehicleBrand} ${data.vehicleModel} ${data.vehicleYear}`.trim()} />
          <ReviewRow label="Placa" value={data.vehiclePlate ?? ""} />
          <ReviewRow
            label="Cor"
            value={[data.vehicleColor, data.vehicleFinish?.toLowerCase()].filter(Boolean).join(" · ")}
          />
          <ReviewRow label="Código da tinta" value={data.paintCode ?? ""} />
        </div>
      </div>

      <div className="mt-4 card-surface p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Serviço</h3>
          <button type="button" onClick={() => onEdit(2)} className="text-xs font-semibold text-brand">
            Alterar
          </button>
        </div>
        <div className="mt-1 divide-y divide-[var(--border-soft)]">
          <ReviewRow label="Pedido" value={serviceLabels(data.services).join(", ")} />
        </div>
      </div>

      <div className="mt-4 card-surface p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Estado</h3>
          <button type="button" onClick={() => onEdit(3)} className="text-xs font-semibold text-brand">
            Alterar
          </button>
        </div>
        <div className="mt-1 divide-y divide-[var(--border-soft)]">
          <ReviewRow label="Peças" value={data.damageParts.join(", ")} />
          <ReviewRow label="Gravidade" value={data.damageSeverity ?? ""} />
          <ReviewRow label="Fotos" value={photosCount ? `${photosCount} anexada${photosCount > 1 ? "s" : ""}` : ""} />
          <ReviewRow label="Observação" value={data.description ?? ""} />
        </div>
      </div>

      <div className="mt-4 card-surface p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Contato</h3>
          <button type="button" onClick={() => onEdit(4)} className="text-xs font-semibold text-brand">
            Alterar
          </button>
        </div>
        <div className="mt-1 divide-y divide-[var(--border-soft)]">
          <ReviewRow label="Nome" value={data.customerName} />
          <ReviewRow label="WhatsApp" value={data.customerPhone} />
          <ReviewRow label="E-mail" value={data.customerEmail ?? ""} />
          <ReviewRow label="Local" value={data.customerCity ?? ""} />
          <ReviewRow label="Prazo" value={data.timeline} />
        </div>
      </div>

      <p className="mt-5 text-xs text-muted">
        {photosCount > 0
          ? "Suas fotos ficam salvas só neste aparelho — anexe elas na conversa ao enviar pelo WhatsApp."
          : "Tem fotos do veículo? Volte em “Estado” para anexar — isso ajuda muito no orçamento."}
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSent}
          className="w-full rounded-[11px] bg-[#1FA85C] px-6 py-4 text-center text-[15.5px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(31,168,92,0.5)] transition hover:bg-[#178A4A]"
        >
          Enviar pelo WhatsApp
        </a>
        <a
          href={mailtoUrl}
          onClick={onSent}
          className="w-full rounded-[11px] border border-[var(--border-color)] bg-[var(--surface)] px-6 py-3.5 text-center text-sm font-semibold transition hover:bg-white/5"
        >
          Enviar por e-mail
        </a>
        <button
          type="button"
          onClick={onBack}
          className="rounded-[11px] px-5 py-2.5 text-sm font-semibold text-muted transition hover:text-[var(--foreground)]"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
