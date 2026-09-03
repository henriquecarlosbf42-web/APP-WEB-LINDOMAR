import { QuoteInput, SERVICE_OPTIONS } from "@/lib/quote";
import { TextAreaField } from "./FormField";
import WizardNav from "./WizardNav";

type Errors = Partial<Record<keyof QuoteInput, string>>;

export default function StepService({
  data,
  errors,
  onChange,
  onNext,
  onBack,
}: {
  data: QuoteInput;
  errors: Errors;
  onChange: (patch: Partial<QuoteInput>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  function toggleService(id: string) {
    const current = data.services;
    const next = current.includes(id)
      ? current.filter((s) => s !== id)
      : [...current, id];
    onChange({ services: next });
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Tipo de serviço</h2>
      <p className="mt-1 text-sm text-muted">
        Selecione um ou mais serviços que você precisa.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {SERVICE_OPTIONS.map((option) => {
          const checked = data.services.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggleService(option.id)}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                checked
                  ? "border-brand bg-[color-mix(in_srgb,var(--brand)_12%,transparent)]"
                  : "border-[var(--border-color)] bg-[var(--surface)] hover:border-brand/60"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                  checked
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-[var(--border-color)]"
                }`}
              >
                {checked && "✓"}
              </span>
              <span className="font-medium">{option.label}</span>
            </button>
          );
        })}
      </div>
      {errors.services && <p className="field-error">{errors.services}</p>}

      <div className="mt-6">
        <TextAreaField
          id="description"
          label="Descreva o que precisa"
          optional
          placeholder="Ex: Amassado na porta traseira direita, quero pintar o carro inteiro..."
          value={data.description}
          error={errors.description}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </div>

      <WizardNav onBack={onBack} onNext={onNext} />
    </div>
  );
}
