import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import QuoteWizard from "@/components/wizard/QuoteWizard";

export const metadata = {
  title: "Solicitar Orçamento | Lindomar Funilaria & Pintura",
};

export default function OrcamentoPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-5 py-10 sm:py-16">
        <div className="mx-auto mb-8 max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Solicite seu orçamento
          </h1>
          <p className="mt-2 text-sm text-muted">
            Leva menos de 2 minutos. Preencha as etapas abaixo.
          </p>
        </div>
        <QuoteWizard />
      </main>
      <SiteFooter />
    </>
  );
}
