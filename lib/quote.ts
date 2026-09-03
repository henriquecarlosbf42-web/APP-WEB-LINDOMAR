import { z } from "zod";

export const SERVICE_OPTIONS = [
  { id: "funilaria", label: "Funilaria", description: "Amassados, batidas e alinhamento de peças." },
  { id: "pintura", label: "Pintura", description: "Repintura de peça, painel ou carro inteiro." },
  { id: "polimento", label: "Polimento", description: "Tira riscos finos e devolve o brilho." },
  { id: "pintura-rodas", label: "Pintura de Rodas", description: "Pintura, envelopamento ou restauração das rodas." },
  { id: "martelinho", label: "Martelinho de Ouro", description: "Amassado sem tirar a pintura original." },
  { id: "vitrificacao", label: "Vitrificação", description: "Camada de proteção sobre a pintura." },
  { id: "higienizacao", label: "Higienização Interna", description: "Limpeza de bancos, teto e carpete." },
  { id: "outro", label: "Outro", description: "Conte pra gente o que seu carro precisa." },
] as const;

export const DAMAGE_SEVERITY_OPTIONS: { value: string; description: string }[] = [
  { value: "Leve", description: "Risco na pintura ou marca superficial." },
  { value: "Médio", description: "Amassado sem peça quebrada." },
  { value: "Pesado", description: "Batida com peça quebrada ou solta." },
  { value: "Só estética", description: "Nada quebrado, quero deixar novo." },
];

export const TIMELINE_OPTIONS: { value: string; description: string }[] = [
  { value: "O quanto antes", description: "Preciso do carro pronto essa semana." },
  { value: "Nas próximas semanas", description: "Tenho flexibilidade de data." },
  { value: "Só quero saber o preço", description: "Ainda estou decidindo." },
];

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
  vehicleFinish: z.string().trim().optional().or(z.literal("")),
  paintCode: z.string().trim().optional().or(z.literal("")),

  services: z.array(z.string()).min(1, "Selecione ao menos um serviço"),

  damageParts: z.array(z.string()).optional().default([]),
  damageSeverity: z.string().trim().optional().or(z.literal("")),
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
  timeline: z.string().trim().min(1, "Escolha uma opção"),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const emptyQuoteInput: QuoteInput = {
  vehicleBrand: "",
  vehicleModel: "",
  vehicleYear: "",
  vehicleColor: "",
  vehiclePlate: "",
  vehicleFinish: "Não sei",
  paintCode: "",
  services: [],
  damageParts: [],
  damageSeverity: "",
  description: "",
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  customerCity: "",
  timeline: "",
};

export function serviceLabels(ids: string[]): string[] {
  return ids.map(
    (id) => SERVICE_OPTIONS.find((s) => s.id === id)?.label ?? id
  );
}

export function buildQuoteMessage(data: QuoteInput, protocol: string, photosCount: number): string {
  const lines = [
    `*Pedido de orçamento ${protocol}*`,
    "",
    "*Veículo*",
    `${data.vehicleBrand} ${data.vehicleModel} ${data.vehicleYear} - ${data.vehicleColor}${
      data.vehicleFinish ? ` (${data.vehicleFinish.toLowerCase()})` : ""
    }`,
    data.vehiclePlate ? `Placa: ${data.vehiclePlate}` : null,
    data.paintCode ? `Código da tinta: ${data.paintCode}` : null,
    "",
    "*Serviço(s)*",
    serviceLabels(data.services).join(", "),
    data.damageParts.length ? `Peças afetadas: ${data.damageParts.join(", ")}` : null,
    data.damageSeverity ? `Gravidade: ${data.damageSeverity}` : null,
    data.description ? `Detalhes: ${data.description}` : null,
    photosCount > 0 ? `Vou enviar ${photosCount} foto(s) aqui no chat.` : null,
    "",
    "*Contato*",
    `Nome: ${data.customerName}`,
    `WhatsApp: ${data.customerPhone}`,
    data.customerEmail ? `E-mail: ${data.customerEmail}` : null,
    data.customerCity ? `Cidade: ${data.customerCity}` : null,
    data.timeline ? `Prazo: ${data.timeline}` : null,
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}

export function buildWhatsAppUrl(
  data: QuoteInput,
  whatsappNumber: string,
  protocol: string,
  photosCount: number
): string {
  const digits = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(buildQuoteMessage(data, protocol, photosCount))}`;
}

export function buildMailtoUrl(
  data: QuoteInput,
  contactEmail: string,
  protocol: string,
  photosCount: number
): string {
  const subject = `Orçamento ${protocol} - ${data.vehicleBrand} ${data.vehicleModel} ${data.vehicleYear}`;
  const body = buildQuoteMessage(data, protocol, photosCount).replace(/\*/g, "");
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
