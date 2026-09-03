import Link from "next/link";
import { BUSINESS_NAME, INSTAGRAM_URL, YOUTUBE_URL } from "@/lib/contact";
import { InstagramIcon, YouTubeIcon } from "./SocialIcons";

export default function SiteHeader() {
  const [firstWord, ...rest] = BUSINESS_NAME.split(" ");

  return (
    <header className="border-b border-[var(--border-color)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-brand-foreground font-bold">
            {firstWord.charAt(0)}
          </span>
          <span className="text-lg font-bold tracking-tight">
            {firstWord} <span className="text-brand">{rest.join(" ")}</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 sm:flex">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-muted transition hover:text-brand"
            >
              <YouTubeIcon className="h-5 w-5" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted transition hover:text-brand"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
          <Link
            href="/orcamento"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:opacity-90"
          >
            Pedir Orçamento
          </Link>
        </div>
      </div>
    </header>
  );
}
