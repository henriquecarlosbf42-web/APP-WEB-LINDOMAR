// Preenchidos em build time a partir de variáveis de ambiente NEXT_PUBLIC_*
// (necessário porque o site é 100% estático, sem servidor). Configure-as
// como "Repository variables" no GitHub Actions — veja o README.
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contato@lindomarfunilariaepintura.com.br";
