"use client";

import { useState } from "react";
import { QuoteInput, emptyQuoteInput, quoteSchema } from "@/lib/quote";
import { generateProtocol } from "@/lib/protocol";
import StickyHeader from "./StickyHeader";
import StepVehicle from "./StepVehicle";
import StepService from "./StepService";
import StepDamage from "./StepDamage";
import StepContact from "./StepContact";
import StepReview from "./StepReview";
import StepSuccess from "./StepSuccess";

type Errors = Partial<Record<keyof QuoteInput, string>>;

const STEP_FIELDS: Record<number, (keyof QuoteInput)[]> = {
  1: ["vehicleBrand", "vehicleModel", "vehicleYear", "vehicleColor", "vehiclePlate", "vehicleFinish", "paintCode"],
  2: ["services"],
  3: ["damageParts", "damageSeverity", "description"],
  4: ["customerName", "customerPhone", "customerEmail", "customerCity", "timeline"],
};

const LAST_STEP = 5;

export default function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuoteInput>(emptyQuoteInput);
  const [photos, setPhotos] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [protocol, setProtocol] = useState(() => generateProtocol());

  function updateData(patch: Partial<QuoteInput>) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  function validateStep(currentStep: number): boolean {
    const result = quoteSchema.safeParse(data);
    if (result.success) {
      setErrors({});
      return true;
    }

    const fields = STEP_FIELDS[currentStep] ?? [];
    const stepErrors: Errors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof QuoteInput;
      if (fields.includes(field)) {
        stepErrors[field] = issue.message;
      }
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }

  function goNext() {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, LAST_STEP));
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function handleSent() {
    setSent(true);
  }

  function handleRestart() {
    setData(emptyQuoteInput);
    setPhotos([]);
    setErrors({});
    setSent(false);
    setProtocol(generateProtocol());
    setStep(1);
  }

  if (sent) {
    return (
      <>
        <StickyHeader data={data} current={LAST_STEP} total={LAST_STEP} complete />
        <div className="mx-auto max-w-lg px-5 py-8">
          <div className="card-surface p-6 sm:p-8">
            <StepSuccess data={data} protocol={protocol} onRestart={handleRestart} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <StickyHeader data={data} current={step} total={LAST_STEP} />
      <div className="mx-auto max-w-lg px-5 pb-28 pt-6">
        {step === 1 && (
          <StepVehicle data={data} errors={errors} onChange={updateData} onNext={goNext} />
        )}
        {step === 2 && (
          <StepService data={data} errors={errors} onChange={updateData} onNext={goNext} onBack={goBack} />
        )}
        {step === 3 && (
          <StepDamage
            data={data}
            onChange={updateData}
            photos={photos}
            onPhotosChange={setPhotos}
            onNext={goNext}
            onBack={goBack}
          />
        )}
        {step === 4 && (
          <StepContact data={data} errors={errors} onChange={updateData} onNext={goNext} onBack={goBack} />
        )}
        {step === 5 && (
          <StepReview
            data={data}
            photosCount={photos.length}
            protocol={protocol}
            onBack={goBack}
            onEdit={setStep}
            onSent={handleSent}
          />
        )}
      </div>
    </>
  );
}
