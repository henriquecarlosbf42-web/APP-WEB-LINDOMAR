import { QuoteInput, TIMELINE_OPTIONS } from "@/lib/quote";
import { TextField } from "./FormField";
import OptionCard from "./OptionCard";
import WizardNav from "./WizardNav";

type Errors = Partial<Record<keyof QuoteInput, string>>;

function formatPhone(raw: string): string {
  let v = raw.replace(/\D/g, "").slice(0, 11);
  if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, v.length - 4)}-${v.slice(-4)}`;
  else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
  else if (v.length) v = `(${v}`;
  return v;
}

export default function StepContact({
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
  return (
    <div>
      <h2 className="text-xl font-bold">Como falamos com você?</h2>
      <p className="mt-1 text-sm text-muted">
        Respondemos o orçamento assim que possível pelo WhatsApp.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField
          id="customerName"
          label="Seu nome"
          placeholder="Nome e sobrenome"
          autoComplete="name"
          value={data.customerName}
          error={errors.customerName}
          onChange={(e) => onChange({ customerName: e.target.value })}
        />
        <TextField
          id="customerPhone"
          label="WhatsApp"
          placeholder="(11) 99999-9999"
          inputMode="tel"
          autoComplete="tel"
          value={data.customerPhone}
          error={errors.customerPhone}
          onChange={(e) => onChange({ customerPhone: formatPhone(e.target.value) })}
        />
        <TextField
          id="customerEmail"
          label="E-mail"
          optional
          type="email"
          placeholder="voce@email.com"
          autoComplete="email"
          value={data.customerEmail}
          error={errors.customerEmail}
          onChange={(e) => onChange({ customerEmail: e.target.value })}
        />
        <TextField
          id="customerCity"
          label="Cidade e bairro"
          optional
          placeholder="Ex: Santo André, Vila Assunção"
          value={data.customerCity}
          error={errors.customerCity}
          onChange={(e) => onChange({ customerCity: e.target.value })}
        />
      </div>

      <fieldset className="mt-6">
        <span className="input-label">Para quando é o serviço?</span>
        <div className="flex flex-col gap-2">
          {TIMELINE_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              label={opt.value}
              description={opt.description}
              shape="round"
              active={data.timeline === opt.value}
              onClick={() => onChange({ timeline: opt.value })}
            />
          ))}
        </div>
        {errors.timeline && <p className="field-error">{errors.timeline}</p>}
      </fieldset>

      <WizardNav onBack={onBack} onNext={onNext} nextLabel="Revisar pedido" />
    </div>
  );
}
