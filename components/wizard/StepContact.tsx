import { QuoteInput } from "@/lib/quote";
import { TextField } from "./FormField";
import WizardNav from "./WizardNav";

type Errors = Partial<Record<keyof QuoteInput, string>>;

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
      <h2 className="text-xl font-bold">Seus dados</h2>
      <p className="mt-1 text-sm text-muted">
        Para te enviarmos o retorno do orçamento.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField
          id="customerName"
          label="Nome completo"
          placeholder="Seu nome"
          value={data.customerName}
          error={errors.customerName}
          onChange={(e) => onChange({ customerName: e.target.value })}
        />
        <TextField
          id="customerPhone"
          label="WhatsApp / Telefone"
          placeholder="(00) 00000-0000"
          inputMode="tel"
          value={data.customerPhone}
          error={errors.customerPhone}
          onChange={(e) => onChange({ customerPhone: e.target.value })}
        />
        <TextField
          id="customerEmail"
          label="E-mail"
          optional
          type="email"
          placeholder="seuemail@exemplo.com"
          value={data.customerEmail}
          error={errors.customerEmail}
          onChange={(e) => onChange({ customerEmail: e.target.value })}
        />
        <TextField
          id="customerCity"
          label="Cidade"
          optional
          placeholder="Sua cidade"
          value={data.customerCity}
          error={errors.customerCity}
          onChange={(e) => onChange({ customerCity: e.target.value })}
        />
      </div>

      <WizardNav onBack={onBack} onNext={onNext} nextLabel="Revisar pedido" />
    </div>
  );
}
