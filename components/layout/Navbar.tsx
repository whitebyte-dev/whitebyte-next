"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import content from "@/lib/content/es.json"

const sectionIds = ["solutions", "process", "work", "contact"]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <Link href="/" className="font-display text-lg font-bold text-text-primary">
          whitebyte<span className="text-accent">.dev</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {content.nav.links.map((label, i) => (
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

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-accent text-background hover:bg-accent/90"
            )}
          >
            {content.nav.cta}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-border bg-background px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-5">
            {content.nav.links.map((label, i) => (
              <li key={label}>
                <a
                  href={`#${sectionIds[i]}`}
                  className="text-base text-text-secondary hover:text-text-primary transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants(),
              "mt-6 w-full bg-accent text-background hover:bg-accent/90"
            )}
          >
            {content.nav.cta}
          </a>
        </div>
      )}
    </header>
  )
}
