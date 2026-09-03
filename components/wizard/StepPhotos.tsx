"use client";

import { useRef, useState } from "react";
import { QuoteInput } from "@/lib/quote";
import WizardNav from "./WizardNav";

const MAX_PHOTOS = 6;

export default function StepPhotos({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: QuoteInput;
  onChange: (patch: Partial<QuoteInput>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);

    const remaining = MAX_PHOTOS - data.photos.length;
    if (remaining <= 0) {
      setError(`Você já enviou o máximo de ${MAX_PHOTOS} fotos.`);
      return;
    }

    const selected = Array.from(files).slice(0, remaining);
    const formData = new FormData();
    selected.forEach((file) => formData.append("files", file));

    setUploading(true);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Falha ao enviar as fotos.");
        return;
      }
      onChange({ photos: [...data.photos, ...json.urls] });
    } catch {
      setError("Falha ao enviar as fotos. Verifique sua conexão.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removePhoto(url: string) {
    onChange({ photos: data.photos.filter((p) => p !== url) });
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Fotos do veículo</h2>
      <p className="mt-1 text-sm text-muted">
        Fotos ajudam a gente a te dar um orçamento mais preciso. Essa etapa é
        opcional.
      </p>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading || data.photos.length >= MAX_PHOTOS}
          className="w-full rounded-xl border-2 border-dashed border-[var(--border-color)] p-8 text-center text-sm font-medium text-muted transition hover:border-brand disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading
            ? "Enviando fotos..."
            : "Toque para escolher ou tirar fotos"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {error && <p className="field-error">{error}</p>}
      </div>

      {data.photos.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {data.photos.map((url) => (
            <div key={url} className="group relative aspect-square overflow-hidden rounded-lg border border-[var(--border-color)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="Foto do veículo" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(url)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-xs font-bold text-white"
                aria-label="Remover foto"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <WizardNav onBack={onBack} onNext={onNext} loading={uploading} />
    </div>
  );
}
