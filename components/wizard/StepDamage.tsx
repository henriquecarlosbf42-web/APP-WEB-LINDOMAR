"use client";

import { useEffect, useMemo, useRef } from "react";
import { QuoteInput, DAMAGE_SEVERITY_OPTIONS } from "@/lib/quote";
import CarDiagram from "./CarDiagram";
import OptionCard from "./OptionCard";
import { TextAreaField } from "./FormField";
import WizardNav from "./WizardNav";

export default function StepDamage({
  data,
  onChange,
  photos,
  onPhotosChange,
  onNext,
  onBack,
}: {
  data: QuoteInput;
  onChange: (patch: Partial<QuoteInput>) => void;
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function togglePart(label: string) {
    const active = data.damageParts.includes(label);
    onChange({
      damageParts: active
        ? data.damageParts.filter((p) => p !== label)
        : [...data.damageParts, label],
    });
  }

  function addPhotos(files: FileList | null) {
    if (!files || files.length === 0) return;
    onPhotosChange([...photos, ...Array.from(files)]);
  }

  function removePhoto(index: number) {
    onPhotosChange(photos.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Onde está o problema?</h2>
      <p className="mt-1 text-sm text-muted">
        Essa etapa é opcional — preencha se o pedido envolve um dano específico no carro.
      </p>

      <fieldset className="mt-6">
        <span className="input-label">Peças afetadas</span>
        <div className="card-surface p-4">
          <CarDiagram selected={data.damageParts} onToggle={togglePart} />
          <div className="mt-3.5 flex min-h-[26px] flex-wrap gap-1.5">
            {data.damageParts.length === 0 ? (
              <span className="text-sm text-muted">Nenhuma peça marcada ainda.</span>
            ) : (
              data.damageParts.map((p) => (
                <span key={p} className="rounded-full bg-brand px-2.5 py-1 text-xs font-medium text-brand-foreground">
                  {p}
                </span>
              ))
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <span className="input-label">Como está o estrago?</span>
        <div className="flex flex-col gap-2">
          {DAMAGE_SEVERITY_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              label={opt.value}
              description={opt.description}
              shape="round"
              active={data.damageSeverity === opt.value}
              onClick={() => onChange({ damageSeverity: opt.value })}
            />
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <TextAreaField
          id="description"
          label="Conte o que aconteceu"
          optional
          placeholder="Ex.: encostei num poste na garagem, amassou a porta e riscou a pintura até o metal."
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </div>

      <fieldset className="mt-6">
        <span className="input-label">Fotos do dano</span>
        <p className="mb-2 text-xs text-muted">
          Uma foto de longe e uma de perto já ajudam bastante. Elas ficam só no seu aparelho — você as anexa na conversa ao enviar o orçamento.
        </p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed border-[var(--border-color)] bg-[var(--surface)] py-5 text-sm font-semibold transition hover:border-brand"
        >
          <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Adicionar fotos
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            addPhotos(e.target.files);
            e.target.value = "";
          }}
        />
        {photos.length > 0 && (
          <div className="mt-2.5 grid grid-cols-4 gap-2">
            {photos.map((file, i) => (
              <PhotoThumb key={`${file.name}-${i}`} file={file} onRemove={() => removePhoto(i)} />
            ))}
          </div>
        )}
      </fieldset>

      <WizardNav onBack={onBack} onNext={onNext} />
    </div>
  );
}

function PhotoThumb({ file, onRemove }: { file: File; onRemove: () => void }) {
  const url = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => {
    return () => URL.revokeObjectURL(url);
  }, [url]);

  return (
    <div className="relative aspect-square overflow-hidden rounded-[9px] border border-[var(--border-color)] bg-[var(--surface)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="" className="h-full w-full object-cover" />
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remover foto"
        className="absolute right-1 top-1 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-black/80 text-sm leading-none text-white"
      >
        ×
      </button>
    </div>
  );
}
