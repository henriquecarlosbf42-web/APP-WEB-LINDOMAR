"use client";

import { useState } from "react";
import { QuoteInput, emptyQuoteInput, quoteSchema } from "@/lib/quote";
import StepIndicator from "./StepIndicator";
import StepVehicle from "./StepVehicle";
import StepService from "./StepService";
import StepPhotos from "./StepPhotos";
import StepContact from "./StepContact";
import StepReview from "./StepReview";
import StepSuccess from "./StepSuccess";

type Errors = Partial<Record<keyof QuoteInput, string>>;

const STEP_FIELDS: Record<number, (keyof QuoteInput)[]> = {
  1: ["vehicleBrand", "vehicleModel", "vehicleYear", "vehicleColor", "vehiclePlate"],
  2: ["services", "description"],
  3: ["photos"],
  4: ["customerName", "customerPhone", "customerEmail", "customerCity"],
};

export default function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuoteInput>(emptyQuoteInput);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

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
      setStep((s) => Math.min(s + 1, 5));
    }
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit() {
    const result = quoteSchema.safeParse(data);
    if (!result.success) {
      const allErrors: Errors = {};
      let firstInvalidStep = 5;
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof QuoteInput;
        allErrors[field] = issue.message;
        for (const [stepNumber, fields] of Object.entries(STEP_FIELDS)) {
          if (fields.includes(field)) {
            firstInvalidStep = Math.min(firstInvalidStep, Number(stepNumber));
          }
        }
      }
      setErrors(allErrors);
      setStep(firstInvalidStep);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/orcamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        setSubmitError(json?.error ?? "Não foi possível enviar seu orçamento. Tente novamente.");
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Não foi possível enviar seu orçamento. Verifique sua conexão e tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 sm:p-8">
        <StepSuccess data={data} />
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
          <StepPhotos data={data} onChange={updateData} onNext={goNext} onBack={goBack} />
        )}
        {step === 4 && (
          <StepContact data={data} errors={errors} onChange={updateData} onNext={goNext} onBack={goBack} />
        )}
        {step === 5 && (
          <StepReview
            data={data}
            onBack={goBack}
            onEdit={setStep}
            onSubmit={handleSubmit}
            loading={submitting}
            submitError={submitError}
          />
        )}
      </div>
    </div>
  );
}
