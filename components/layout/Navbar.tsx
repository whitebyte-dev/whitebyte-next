"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import content from "@/lib/content/es.json"

const navItems: { label: string; key: string; id?: string; href?: string }[] = [
  { label: "Inicio", key: "hero", id: "hero" },
  { label: "Soluciones", key: "solutions", id: "solutions" },
  { label: "Proceso", key: "process", id: "process" },
  { label: "Trabajo", key: "work", id: "work" },
  { label: "Nosotros", key: "nosotros", href: "/nosotros" },
  { label: "Contacto", key: "contacto", href: "/contacto" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeKey, setActiveKey] = useState("hero")
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const navRef = useRef<HTMLElement>(null)
  const linksRef = useRef<Map<string, HTMLElement>>(new Map())
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/"

  const navigateToSection = useCallback(
    (id: string) => {
      if (isHome) {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth" })
      } else {
        router.push(`/#${id}`)
      }
    },
    [isHome, router]
  )

  const updateIndicator = useCallback((key: string) => {
    const link = linksRef.current.get(key)
    const nav = navRef.current
    if (!link || !nav) return
    const navRect = nav.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    setIndicatorStyle({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    })
  }, [])

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      // Match pathname to a nav item
      const match = navItems.find((item) => item.href === pathname)
      setActiveKey(match ? match.key : "")
      return
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 32)

      const scrollY = window.scrollY + 120
      let current = "hero"
      for (const item of navItems) {
        if (!item.id) continue
        const el = document.getElementById(item.id)
        if (el && el.offsetTop <= scrollY) {
          current = item.key
        }
      }
      setActiveKey(current)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [isHome, pathname])

  useEffect(() => {
    updateIndicator(activeKey)
  }, [activeKey, updateIndicator])

  useEffect(() => {
    const onResize = () => updateIndicator(activeKey)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [activeKey, updateIndicator])

  // Handle hash scroll after navigation from another page
  useEffect(() => {
    if (isHome && window.location.hash) {
      const id = window.location.hash.slice(1)
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }, [isHome, pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-background border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-baseline gap-0 text-[1.35rem] transition-opacity duration-200 hover:opacity-70"
        >
          <span className="font-[family-name:var(--font-playfair)] italic font-bold text-text-secondary">White</span>
          <span className="font-display font-bold text-text-primary">byte</span>
        </Link>

        {/* Desktop: centered links with indicator */}
        <nav
          ref={navRef}
          className="hidden absolute left-1/2 -translate-x-1/2 items-center gap-1 md:flex"
        >
          {navItems.map((item) =>
            item.href ? (
              <Link
                key={item.key}
                ref={(el) => {
                  if (el) linksRef.current.set(item.key, el)
                }}
                href={item.href}
                className={`relative cursor-pointer px-4 py-2 text-sm transition-colors duration-200 ${
                  activeKey === item.key
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.key}
                ref={(el) => {
                  if (el) linksRef.current.set(item.key, el)
                }}
                onClick={() => navigateToSection(item.id!)}
                className={`relative cursor-pointer px-4 py-2 text-sm transition-colors duration-200 ${
                  activeKey === item.key
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {item.label}
              </button>
            )
          )}

          {/* Animated underline indicator */}
          {activeKey && (
            <span
              className="absolute bottom-0 h-px bg-white transition-all duration-300 ease-out"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
            />
          )}
        </nav>

        {/* CTA */}
        <Link
          href="/contacto"
          className="relative z-10 max-md:hidden rounded-full bg-white px-6 py-2 text-sm font-medium text-background transition-all duration-300 hover:bg-white/90 inline-flex"
        >
          {content.nav.cta}
        </Link>

        {/* Mobile toggle */}
        <button
          className="flex h-11 w-11 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-white/[0.05] hover:text-text-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/5 bg-background/95 px-8 pb-8 pt-6 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) =>
              item.href ? (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 text-left text-lg transition-colors hover:bg-white/[0.05] ${
                    activeKey === item.key
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.key}
                  className={`rounded-lg px-4 py-3 text-left text-lg transition-colors hover:bg-white/[0.05] ${
                    activeKey === item.key
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                  onClick={() => {
                    navigateToSection(item.id!)
                    setOpen(false)
                  }}
                >
                  {item.label}
                </button>
              )
            )}
            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-white px-8 py-3.5 text-center text-sm font-medium text-background transition-all hover:bg-white/90"
            >
              {content.nav.cta}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
