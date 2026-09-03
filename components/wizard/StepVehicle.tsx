import { QuoteInput } from "@/lib/quote";
import { CAR_BRAND_NAMES, CAR_YEARS, PAINT_FINISHES, modelsForBrand } from "@/lib/vehicles";
import { TextField, SelectField } from "./FormField";
import SelectOrOther from "./SelectOrOther";
import ColorSwatchPicker from "./ColorSwatchPicker";
import OptionCard from "./OptionCard";
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
      <h2 className="text-xl font-bold">Qual é o carro?</h2>
      <p className="mt-1 text-sm text-muted">
        Marca, modelo e cor definem o preço da tinta e o tempo de serviço.
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

      <div className="mt-5">
        <ColorSwatchPicker
          value={data.vehicleColor}
          error={errors.vehicleColor}
          onChange={(vehicleColor) => onChange({ vehicleColor })}
        />
      </div>

      <fieldset className="mt-6">
        <span className="input-label">Tipo de pintura</span>
        <div className="flex flex-col gap-2">
          {PAINT_FINISHES.map((f) => (
            <OptionCard
              key={f.value}
              label={f.value}
              description={f.description}
              shape="round"
              active={data.vehicleFinish === f.value}
              onClick={() => onChange({ vehicleFinish: f.value })}
            />
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <TextField
          id="paintCode"
          label="Código da tinta"
          optional
          placeholder="Ex: GAZ, 1G3, NH-731P"
          value={data.paintCode}
          onChange={(e) => onChange({ paintCode: e.target.value })}
        />
        <p className="mt-1.5 text-xs text-muted">
          Fica numa etiqueta na coluna da porta do motorista ou no cofre do motor.
        </p>
      </div>

      <WizardNav onNext={onNext} />
    </div>
  );
}
