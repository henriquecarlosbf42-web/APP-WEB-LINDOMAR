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

  photos: z.array(z.string().min(1)).optional().default([]),

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
  photos: [],
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
