"use client";

import { useState } from "react";
import { QuoteInput, emptyQuoteInput, quoteSchema } from "@/lib/quote";
import StepIndicator from "./StepIndicator";
import StepVehicle from "./StepVehicle";
import StepService from "./StepService";
import StepContact from "./StepContact";
import StepReview from "./StepReview";
import StepSuccess from "./StepSuccess";

type Errors = Partial<Record<keyof QuoteInput, string>>;

const STEP_FIELDS: Record<number, (keyof QuoteInput)[]> = {
  1: ["vehicleBrand", "vehicleModel", "vehicleYear", "vehicleColor", "vehiclePlate"],
  2: ["services", "description"],
  3: ["customerName", "customerPhone", "customerEmail", "customerCity"],
};

const LAST_STEP = 4;

export default function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuoteInput>(emptyQuoteInput);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

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
    }
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function handleSent() {
    setSent(true);
  }

  function handleRestart() {
    setData(emptyQuoteInput);
    setErrors({});
    setSent(false);
    setStep(1);
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 sm:p-8">
        <StepSuccess data={data} onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <StepIndicator current={step} />

      <div className="mt-8 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 sm:p-8">
        {step === 1 && (
          <StepVehicle data={data} errors={errors} onChange={updateData} onNext={goNext} />
        )}
        {step === 2 && (
          <StepService data={data} errors={errors} onChange={updateData} onNext={goNext} onBack={goBack} />
        )}
        {step === 3 && (
          <StepContact data={data} errors={errors} onChange={updateData} onNext={goNext} onBack={goBack} />
        )}
        {step === 4 && (
          <StepReview data={data} onBack={goBack} onEdit={setStep} onSent={handleSent} />
        )}
      </div>
    </div>
  );
}
