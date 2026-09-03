// Preenchidos em build time a partir de variáveis de ambiente NEXT_PUBLIC_*
// (necessário porque o site é 100% estático, sem servidor). Configure-as
// como "Repository variables" no GitHub Actions — veja o README.
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5512996120261";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contato@lindomarfunilariaepintura.com.br";

export const YOUTUBE_URL =
  process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/@lindomarfunilariaepintura";

export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/lindomarfunilariaepintura";
