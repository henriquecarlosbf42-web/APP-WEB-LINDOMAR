import { QuoteInput } from "@/lib/quote";
import { CAR_BRAND_NAMES, CAR_COLORS, CAR_YEARS, modelsForBrand } from "@/lib/vehicles";
import { TextField, SelectField } from "./FormField";
import SelectOrOther from "./SelectOrOther";
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
  const modelOptions = modelsForBrand(data.vehicleBrand);

  function handleBrandChange(brand: string) {
    onChange({
      vehicleBrand: brand,
      vehicleModel: modelsForBrand(brand).includes(data.vehicleModel) ? data.vehicleModel : "",
    });
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Dados do veículo</h2>
      <p className="mt-1 text-sm text-muted">
        Conte pra gente sobre o carro que vai passar pelo serviço.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <SelectOrOther
          id="vehicleBrand"
          label="Marca"
          placeholder="Selecione a marca"
          otherLabel="Outra marca"
          options={CAR_BRAND_NAMES}
          value={data.vehicleBrand}
          error={errors.vehicleBrand}
          onChange={handleBrandChange}
        />
        <SelectOrOther
          key={data.vehicleBrand}
          id="vehicleModel"
          label="Modelo"
          placeholder="Selecione o modelo"
          otherLabel="Outro modelo"
          options={modelOptions}
          value={data.vehicleModel}
          error={errors.vehicleModel}
          onChange={(vehicleModel) => onChange({ vehicleModel })}
        />
        <SelectField
          id="vehicleYear"
          label="Ano"
          value={data.vehicleYear}
          error={errors.vehicleYear}
          onChange={(e) => onChange({ vehicleYear: e.target.value })}
        >
          <option value="" disabled>
            Selecione o ano
          </option>
          {CAR_YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </SelectField>
        <SelectOrOther
          id="vehicleColor"
          label="Cor"
          placeholder="Selecione a cor"
          otherLabel="Outra cor"
          options={CAR_COLORS}
          value={data.vehicleColor}
          error={errors.vehicleColor}
          onChange={(vehicleColor) => onChange({ vehicleColor })}
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
