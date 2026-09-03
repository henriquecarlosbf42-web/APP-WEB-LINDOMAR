import { QuoteInput, serviceLabels } from "@/lib/quote";
import WizardNav from "./WizardNav";

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
  onSubmit,
  loading,
  submitError,
}: {
  data: QuoteInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSubmit: () => void;
  loading: boolean;
  submitError: string | null;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold">Revise seu pedido</h2>
      <p className="mt-1 text-sm text-muted">
        Confira as informações antes de enviar.
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

      {data.photos.length > 0 && (
        <div className="mt-4 rounded-xl border border-[var(--border-color)] p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Fotos</h3>
            <button type="button" onClick={() => onEdit(3)} className="text-xs font-semibold text-brand">
              Editar
            </button>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {data.photos.map((url) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={url} src={url} alt="Foto do veículo" className="aspect-square rounded-lg object-cover" />
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 rounded-xl border border-[var(--border-color)] p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Contato</h3>
          <button type="button" onClick={() => onEdit(4)} className="text-xs font-semibold text-brand">
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

      {submitError && <p className="field-error mt-4">{submitError}</p>}

      <WizardNav
        onBack={onBack}
        onNext={onSubmit}
        nextLabel="Enviar orçamento"
        loading={loading}
      />
    </div>
  );
}
