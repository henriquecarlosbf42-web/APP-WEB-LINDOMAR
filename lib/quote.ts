import { z } from "zod";

export const SERVICE_OPTIONS = [
  { id: "funilaria", label: "Funilaria" },
  { id: "pintura", label: "Pintura" },
  { id: "polimento", label: "Polimento" },
  { id: "pintura-rodas", label: "Pintura de Rodas" },
  { id: "higienizacao", label: "Higienização Interna" },
  { id: "outro", label: "Outro" },
] as const;

export const CURRENT_YEAR = new Date().getFullYear();

export const quoteSchema = z.object({
  vehicleBrand: z.string().trim().min(2, "Informe a marca do veículo"),
  vehicleModel: z.string().trim().min(1, "Informe o modelo do veículo"),
  vehicleYear: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "Ano inválido")
    .refine((y) => {
      const n = Number(y);
      return n >= 1950 && n <= CURRENT_YEAR + 1;
    }, "Ano inválido"),
  vehicleColor: z.string().trim().min(2, "Informe a cor do veículo"),
  vehiclePlate: z.string().trim().optional().or(z.literal("")),

  services: z.array(z.string()).min(1, "Selecione ao menos um serviço"),
  description: z.string().trim().max(2000).optional().or(z.literal("")),

  customerName: z.string().trim().min(2, "Informe seu nome"),
  customerPhone: z
    .string()
    .trim()
    .min(8, "Informe um telefone/WhatsApp válido"),
  customerEmail: z
    .string()
    .trim()
    .email("E-mail inválido")
    .optional()
    .or(z.literal("")),
  customerCity: z.string().trim().optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const emptyQuoteInput: QuoteInput = {
  vehicleBrand: "",
  vehicleModel: "",
  vehicleYear: "",
  vehicleColor: "",
  vehiclePlate: "",
  services: [],
  description: "",
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  customerCity: "",
};

export function serviceLabels(ids: string[]): string[] {
  return ids.map(
    (id) => SERVICE_OPTIONS.find((s) => s.id === id)?.label ?? id
  );
}

export function buildQuoteMessage(data: QuoteInput): string {
  const lines = [
    "Olá! Gostaria de um orçamento.",
    "",
    "*Veículo*",
    `${data.vehicleBrand} ${data.vehicleModel} ${data.vehicleYear} - ${data.vehicleColor}`,
    data.vehiclePlate ? `Placa: ${data.vehiclePlate}` : null,
    "",
    "*Serviço(s)*",
    serviceLabels(data.services).join(", "),
    data.description ? `Detalhes: ${data.description}` : null,
    "",
    "*Contato*",
    `Nome: ${data.customerName}`,
    `WhatsApp: ${data.customerPhone}`,
    data.customerEmail ? `E-mail: ${data.customerEmail}` : null,
    data.customerCity ? `Cidade: ${data.customerCity}` : null,
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}

export function buildWhatsAppUrl(data: QuoteInput, whatsappNumber: string): string {
  const digits = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(buildQuoteMessage(data))}`;
}

export function buildMailtoUrl(data: QuoteInput, contactEmail: string): string {
  const subject = `Orçamento - ${data.vehicleBrand} ${data.vehicleModel} ${data.vehicleYear}`;
  const body = buildQuoteMessage(data).replace(/\*/g, "");
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
