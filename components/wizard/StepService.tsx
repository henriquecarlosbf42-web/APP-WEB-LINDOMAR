import { QuoteInput, SERVICE_OPTIONS } from "@/lib/quote";
import OptionCard from "./OptionCard";
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
      <h2 className="text-xl font-bold">O que você precisa?</h2>
      <p className="mt-1 text-sm text-muted">
        Pode marcar mais de um. Se não souber ao certo, marque o mais próximo.
      </p>

      <div className="mt-6 flex flex-col gap-2">
        {SERVICE_OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            label={option.label}
            description={option.description}
            active={data.services.includes(option.id)}
            onClick={() => toggleService(option.id)}
          />
        ))}
      </div>
      {errors.services && <p className="field-error">{errors.services}</p>}

      <WizardNav onBack={onBack} onNext={onNext} />
    </div>
  );
}
