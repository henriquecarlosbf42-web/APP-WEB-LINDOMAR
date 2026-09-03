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
      <main className="flex-1">
        <QuoteWizard />
      </main>
      <SiteFooter />
    </>
  );
}
