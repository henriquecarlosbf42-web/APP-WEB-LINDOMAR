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
  onBack,
  onEdit,
  onSent,
}: {
  data: QuoteInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSent: () => void;
}) {
  const whatsappUrl = buildWhatsAppUrl(data, WHATSAPP_NUMBER);
  const mailtoUrl = buildMailtoUrl(data, CONTACT_EMAIL);

  return (
    <div>
      <h2 className="text-xl font-bold">Revise seu pedido</h2>
      <p className="mt-1 text-sm text-muted">
        Confira as informações e escolha como enviar.
      </p>

      <div className="mt-6 rounded-xl border border-[var(--border-color)] p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Veículo</h3>
          <button type="button" onClick={() => onEdit(1)} className="text-xs font-semibold text-brand">
            Editar
          </button>
        </div>
        <div className="mt-1 divide-y divide-[var(--border-color)]">
          <ReviewRow label="Marca" value={data.vehicleBrand} />
          <ReviewRow label="Modelo" value={data.vehicleModel} />
          <ReviewRow label="Ano" value={data.vehicleYear} />
          <ReviewRow label="Cor" value={data.vehicleColor} />
          <ReviewRow label="Placa" value={data.vehiclePlate ?? ""} />
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--border-color)] p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Serviço</h3>
          <button type="button" onClick={() => onEdit(2)} className="text-xs font-semibold text-brand">
            Editar
          </button>
        </div>
        <div className="mt-1 divide-y divide-[var(--border-color)]">
          <ReviewRow label="Serviços" value={serviceLabels(data.services).join(", ")} />
          <ReviewRow label="Descrição" value={data.description ?? ""} />
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--border-color)] p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Contato</h3>
          <button type="button" onClick={() => onEdit(3)} className="text-xs font-semibold text-brand">
            Editar
          </button>
        </div>
        <div className="mt-1 divide-y divide-[var(--border-color)]">
          <ReviewRow label="Nome" value={data.customerName} />
          <ReviewRow label="WhatsApp" value={data.customerPhone} />
          <ReviewRow label="E-mail" value={data.customerEmail ?? ""} />
          <ReviewRow label="Cidade" value={data.customerCity ?? ""} />
        </div>
      </div>

      <p className="mt-5 text-xs text-muted">
        Tem fotos do veículo? Pode anexar direto na conversa depois de enviar
        pelo WhatsApp — isso ajuda muito no orçamento.
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSent}
          className="w-full rounded-lg bg-[#25D366] px-6 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
        >
          Enviar pelo WhatsApp
        </a>
        <a
          href={mailtoUrl}
          onClick={onSent}
          className="w-full rounded-lg border border-[var(--border-color)] px-6 py-3 text-center text-sm font-semibold transition hover:bg-[var(--background)]"
        >
          Enviar por e-mail
        </a>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-[var(--border-color)] px-5 py-2.5 text-sm font-semibold transition hover:bg-[var(--background)]"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
