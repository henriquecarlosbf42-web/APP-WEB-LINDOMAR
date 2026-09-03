import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import QuoteWizard from "@/components/wizard/QuoteWizard";
import { BUSINESS_NAME } from "@/lib/contact";

export const metadata = {
  title: `Solicitar Orçamento | ${BUSINESS_NAME}`,
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
