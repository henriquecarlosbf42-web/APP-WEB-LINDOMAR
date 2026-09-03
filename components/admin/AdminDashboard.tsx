"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { serviceLabels } from "@/lib/quote";

type Photo = { id: string; url: string };

type Quote = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: "NOVO" | "EM_ANALISE" | "RESPONDIDO" | "APROVADO" | "RECUSADO";
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  vehiclePlate: string | null;
  services: string;
  description: string | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  customerCity: string | null;
  internalNotes: string | null;
  photos: Photo[];
};

const STATUS_LABELS: Record<Quote["status"], string> = {
  NOVO: "Novo",
  EM_ANALISE: "Em análise",
  RESPONDIDO: "Respondido",
  APROVADO: "Aprovado",
  RECUSADO: "Recusado",
};

const STATUS_COLORS: Record<Quote["status"], string> = {
  NOVO: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  EM_ANALISE: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  RESPONDIDO: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
  APROVADO: "bg-green-500/15 text-green-600 dark:text-green-400",
  RECUSADO: "bg-red-500/15 text-red-600 dark:text-red-400",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminDashboard({
  initialQuotes,
}: {
  initialQuotes: Quote[];
}) {
  const router = useRouter();
  const [quotes, setQuotes] = useState(initialQuotes);
  const [filter, setFilter] = useState<Quote["status"] | "TODOS">("TODOS");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === "TODOS" ? quotes : quotes.filter((q) => q.status === filter)),
    [quotes, filter]
  );

  async function updateStatus(id: string, status: Quote["status"]) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/orcamentos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
      }
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border-color)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <h1 className="text-lg font-bold">Orçamentos recebidos</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm font-semibold text-muted hover:text-[var(--foreground)]"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8">
        <div className="flex flex-wrap gap-2">
          {(["TODOS", "NOVO", "EM_ANALISE", "RESPONDIDO", "APROVADO", "RECUSADO"] as const).map(
            (status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilter(status)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  filter === status
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-[var(--border-color)] text-muted hover:border-brand/60"
                }`}
              >
                {status === "TODOS" ? "Todos" : STATUS_LABELS[status]}
              </button>
            )
          )}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted">
            Nenhum orçamento encontrado.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {filtered.map((quote) => (
              <div
                key={quote.id}
                className="rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">
                      {quote.vehicleBrand} {quote.vehicleModel} {quote.vehicleYear} —{" "}
                      {quote.vehicleColor}
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      {serviceLabels(quote.services.split(",")).join(", ")}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      Recebido em {formatDate(quote.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[quote.status]}`}
                  >
                    {STATUS_LABELS[quote.status]}
                  </span>
                </div>

                {quote.description && (
                  <p className="mt-3 text-sm">{quote.description}</p>
                )}

                {quote.photos.length > 0 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto">
                    {quote.photos.map((photo) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={photo.id}
                        src={photo.url}
                        alt="Foto do veículo"
                        className="h-20 w-20 shrink-0 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}

                <div className="mt-4 grid gap-1 text-sm sm:grid-cols-2">
                  <p>
                    <span className="text-muted">Cliente:</span> {quote.customerName}
                  </p>
                  <p>
                    <span className="text-muted">WhatsApp:</span> {quote.customerPhone}
                  </p>
                  {quote.customerEmail && (
                    <p>
                      <span className="text-muted">E-mail:</span> {quote.customerEmail}
                    </p>
                  )}
                  {quote.customerCity && (
                    <p>
                      <span className="text-muted">Cidade:</span> {quote.customerCity}
                    </p>
                  )}
                  {quote.vehiclePlate && (
                    <p>
                      <span className="text-muted">Placa:</span> {quote.vehiclePlate}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <label className="text-xs font-semibold text-muted" htmlFor={`status-${quote.id}`}>
                    Status:
                  </label>
                  <select
                    id={`status-${quote.id}`}
                    className="input-field w-auto py-1.5 text-sm"
                    value={quote.status}
                    disabled={updatingId === quote.id}
                    onChange={(e) => updateStatus(quote.id, e.target.value as Quote["status"])}
                  >
                    {Object.entries(STATUS_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <a
                    href={`https://wa.me/${quote.customerPhone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-sm font-semibold text-brand"
                  >
                    Responder no WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
