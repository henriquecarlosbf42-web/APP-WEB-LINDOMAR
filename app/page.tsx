import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SERVICE_OPTIONS } from "@/lib/quote";

const SERVICE_DETAILS: Record<string, string> = {
  funilaria: "Reparo de amassados, batidas e recuperação da lataria.",
  pintura: "Pintura completa ou de peças, com acabamento de fábrica.",
  polimento: "Remoção de riscos e recuperação do brilho da pintura.",
  "pintura-rodas": "Pintura e restauração de rodas de liga leve.",
  higienizacao: "Limpeza profunda de bancos, forros e carpetes.",
  outro: "Conte pra gente o que seu carro precisa.",
};

const STEPS = [
  {
    title: "Dados do veículo",
    text: "Marca, modelo, ano e cor do seu carro.",
  },
  {
    title: "Tipo de serviço",
    text: "Escolha o que precisa: funilaria, pintura, polimento e mais.",
  },
  {
    title: "Seus dados",
    text: "Nome e WhatsApp para te enviarmos a resposta.",
  },
  {
    title: "Revisão e envio",
    text: "Confira tudo e envie direto pelo WhatsApp ou e-mail.",
  },
];

const TRUST_POINTS = [
  "+10 anos de experiência em funilaria e pintura",
  "Orçamento rápido, sem compromisso",
  "Atendimento direto pelo WhatsApp",
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12 1.5 15 8l7 1-5.2 4.9L18 21l-6-3.4L6 21l1.2-7.1L2 9l7-1Z" />
              </svg>
              +10 anos de mercado
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Seu carro novo de novo. Peça o orçamento em minutos.
            </h1>
            <p className="mt-5 text-lg text-muted">
              Funilaria, pintura, polimento e pintura de rodas. Preencha um
              formulário simples, em etapas, e receba nosso retorno direto no
              seu WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/orcamento"
                className="rounded-lg bg-brand px-6 py-3 text-base font-semibold text-brand-foreground transition hover:opacity-90"
              >
                Solicitar Orçamento
              </Link>
              <a
                href="#servicos"
                className="rounded-lg border border-[var(--border-color)] px-6 py-3 text-base font-semibold transition hover:bg-[var(--surface)]"
              >
                Ver serviços
              </a>
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--border-color)] bg-[var(--surface)]">
          <div className="mx-auto max-w-5xl px-5 py-6">
            <ul className="flex flex-col gap-3 text-sm font-medium sm:flex-row sm:flex-wrap sm:justify-between">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-brand" fill="currentColor" aria-hidden="true">
                    <path d="M9.5 17.2 4.8 12.5l1.4-1.4 3.3 3.3 8.3-8.3 1.4 1.4Z" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="servicos" className="border-b border-[var(--border-color)]">
          <div className="mx-auto max-w-5xl px-5 py-16">
            <h2 className="text-2xl font-bold">Nossos serviços</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_OPTIONS.filter((s) => s.id !== "outro").map((s) => (
                <div
                  key={s.id}
                  className="rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-5"
                >
                  <h3 className="font-semibold">{s.label}</h3>
                  <p className="mt-2 text-sm text-muted">
                    {SERVICE_DETAILS[s.id]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-16">
          <h2 className="text-2xl font-bold">Como funciona</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold">
                  {i + 1}
                </div>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/orcamento"
              className="inline-block rounded-lg bg-brand px-6 py-3 text-base font-semibold text-brand-foreground transition hover:opacity-90"
            >
              Começar agora
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
