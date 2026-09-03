import { INSTAGRAM_URL, YOUTUBE_URL } from "@/lib/contact";
import { InstagramIcon, YouTubeIcon } from "./SocialIcons";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--border-color)] bg-[var(--surface)]">
      <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-muted">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-[var(--foreground)]">
              Lindomar Funilaria & Pintura
            </p>
            <p className="mt-1">
              Funilaria • Pintura • Polimento • Pintura de Rodas
            </p>
            <p className="mt-1 font-semibold text-brand">
              +10 anos cuidando do seu carro
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-muted transition hover:text-brand"
            >
              <YouTubeIcon className="h-6 w-6" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted transition hover:text-brand"
            >
              <InstagramIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
        <p className="mt-6">
          &copy; {new Date().getFullYear()} Lindomar Funilaria & Pintura.
          Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
