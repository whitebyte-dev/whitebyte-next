import Link from "next/link"
import content from "@/lib/content/es.json"

const sectionIds = ["solutions", "process", "work", "contact"]

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border shadow-[0_-1px_0_hsl(142_69%_58%_/_0.1)]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo */}
          <Link href="/" className="font-display text-base font-bold text-text-primary">
            whitebyte<span className="text-accent">.dev</span>
          </Link>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6">
              {content.footer.links.map((label, i) => (
                <li key={label}>
                  <a
                    href={`#${sectionIds[i]}`}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Instagram */}
          <a
            href="https://instagram.com/whitebyte.dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Whitebyte"
            className="text-text-secondary transition-colors hover:text-accent"
          >
            <InstagramIcon size={20} />
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-8 text-center text-xs text-text-muted">
          {content.footer.copyright}
        </p>
      </div>
    </footer>
  )
}
