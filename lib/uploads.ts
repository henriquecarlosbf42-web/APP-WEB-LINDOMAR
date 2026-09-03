import path from "path";

// Em produção (Render/Railway), aponte UPLOADS_DIR para o disco persistente
// (ex: /data/uploads). Em desenvolvimento local, cai em public/uploads.
export const UPLOADS_DIR = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : path.join(process.cwd(), "public", "uploads");

const SAFE_FILENAME = /^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/;

export function isSafeUploadFilename(filename: string): boolean {
  return SAFE_FILENAME.test(filename);
}
