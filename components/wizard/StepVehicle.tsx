import { QuoteInput } from "@/lib/quote";
import { TextField } from "./FormField";
import WizardNav from "./WizardNav";

type Errors = Partial<Record<keyof QuoteInput, string>>;

export default function StepVehicle({
  data,
  errors,
  onChange,
  onNext,
}: {
  data: QuoteInput;
  errors: Errors;
  onChange: (patch: Partial<QuoteInput>) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold">Dados do veículo</h2>
      <p className="mt-1 text-sm text-muted">
        Conte pra gente sobre o carro que vai passar pelo serviço.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField
          id="vehicleBrand"
          label="Marca"
          placeholder="Ex: Volkswagen"
          value={data.vehicleBrand}
          error={errors.vehicleBrand}
          onChange={(e) => onChange({ vehicleBrand: e.target.value })}
        />
        <TextField
          id="vehicleModel"
          label="Modelo"
          placeholder="Ex: Gol"
          value={data.vehicleModel}
          error={errors.vehicleModel}
          onChange={(e) => onChange({ vehicleModel: e.target.value })}
        />
        <TextField
          id="vehicleYear"
          label="Ano"
          placeholder="Ex: 2018"
          inputMode="numeric"
          maxLength={4}
          value={data.vehicleYear}
          error={errors.vehicleYear}
          onChange={(e) =>
            onChange({ vehicleYear: e.target.value.replace(/\D/g, "") })
          }
        />
        <TextField
          id="vehicleColor"
          label="Cor"
          placeholder="Ex: Prata"
          value={data.vehicleColor}
          error={errors.vehicleColor}
          onChange={(e) => onChange({ vehicleColor: e.target.value })}
        />
        <TextField
          id="vehiclePlate"
          label="Placa"
          optional
          placeholder="Ex: ABC1D23"
          value={data.vehiclePlate}
          error={errors.vehiclePlate}
          onChange={(e) =>
            onChange({ vehiclePlate: e.target.value.toUpperCase() })
          }
        />
      </div>

      <WizardNav onNext={onNext} />
    </div>
  );
}
