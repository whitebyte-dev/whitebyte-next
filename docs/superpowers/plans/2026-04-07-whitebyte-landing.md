# Whitebyte Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la landing page completa de whitebyte.dev — minimal, dark, tech-premium — con animaciones GSAP, smooth scroll Lenis, before/after portfolio slider y formulario de contacto via Resend.

**Architecture:** Single-route Next.js 15 App Router landing (`/`). Secciones como Client Components independientes. GSAP inicializado una vez en `lib/gsap/register.ts` e importado en layout. Lenis via provider cliente que hookea en el ticker de GSAP. Strings en `lib/content/es.json` para futura i18n.

**Tech Stack:** Next.js 15 · TypeScript · Tailwind CSS v4 · GSAP 3 + @gsap/react + ScrollTrigger · Lenis · Aceternity UI · Magic UI · Shadcn/ui · react-compare-slider · Resend · Vitest · Vercel

---

## File Map

```
app/
  page.tsx                          ← assembles all sections
  layout.tsx                        ← metadata, fonts, LenisProvider
  global.css                        ← @theme tokens, base reset
  api/
    contact/
      route.ts                      ← POST → Resend

components/
  layout/
    Navbar.tsx                      ← fixed, blur, links, CTA, mobile drawer
    Footer.tsx                      ← logo, links, instagram, copyright
  sections/
    Hero.tsx                        ← headline animation, CTAs, gradient bg
    Solutions.tsx                   ← 3 cards, ScrollTrigger.batch
    Process.tsx                     ← 4 steps, SVG line animation
    Portfolio.tsx                   ← compare slider + placeholder card
    Contact.tsx                     ← form UI, WhatsApp, Instagram
  ui/
    Button.tsx                      ← primary / outline / ghost variants
    Badge.tsx                       ← pill badge
    SectionHeading.tsx              ← reusable section title + subtitle
  providers/
    LenisProvider.tsx               ← Lenis init, GSAP ticker integration

lib/
  content/
    es.json                         ← all UI strings
  gsap/
    register.ts                     ← gsap.registerPlugin(ScrollTrigger)
  email/
    send.ts                         ← Resend send helper

tests/
  api/
    contact.test.ts                 ← Vitest: API route unit tests
```

---

## Task 1: Project Scaffold + Dependencies

**Files:**
- Create: `package.json` (via create-next-app)
- Modify: `package.json` (add all deps)

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd C:/dev/whitebyte
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

Accept all defaults. When asked about Tailwind, say yes.

- [ ] **Step 2: Install animation + UI dependencies**

```bash
npm install gsap @gsap/react lenis react-compare-slider
npm install resend
npm install -D vitest @vitejs/plugin-react vite-tsconfig-paths
```

- [ ] **Step 3: Install Shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted:
- Style: Default
- Base color: Neutral
- CSS variables: Yes

- [ ] **Step 4: Add Shadcn components needed**

```bash
npx shadcn@latest add button input textarea label
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts on `http://localhost:3000` with default Next.js page.

- [ ] **Step 6: Remove boilerplate from `app/page.tsx`**

```tsx
export default function Home() {
  return <main />
}
```

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 15 project with dependencies"
```

---

## Task 2: Design Tokens + Global CSS

**Files:**
- Modify: `app/global.css`

- [ ] **Step 1: Replace `app/global.css` completely**

```css
@import "tailwindcss";

@theme {
  /* Backgrounds */
  --color-background:      hsl(0 0% 3%);
  --color-surface:         hsl(0 0% 7%);
  --color-surface-raised:  hsl(0 0% 10%);

  /* Borders */
  --color-border:          hsl(0 0% 12%);
  --color-border-subtle:   hsl(0 0% 8%);

  /* Text */
  --color-text-primary:    hsl(0 0% 98%);
  --color-text-secondary:  hsl(240 5% 65%);
  --color-text-muted:      hsl(240 4% 32%);

  /* Accent */
  --color-accent:          hsl(142 69% 58%);
  --color-accent-dim:      hsl(142 72% 29%);
  --color-accent-glow:     hsl(142 69% 58% / 0.15);

  /* Typography */
  --font-display: "Sora", sans-serif;
  --font-body:    "Inter", sans-serif;

  /* Spacing rhythm */
  --spacing-section: 6rem;
}

/* Base reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: auto; /* Lenis handles smooth scroll */
}

body {
  background-color: var(--color-background);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* Focus ring */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 4px;
}
```

- [ ] **Step 2: Verify tokens are usable in Tailwind**

In `app/page.tsx` temporarily add `className="bg-background"` to the `<main>` and confirm the page is dark in the browser.

- [ ] **Step 3: Commit**

```bash
git add app/global.css
git commit -m "feat: add design tokens and global CSS via Tailwind v4 @theme"
```

---

## Task 3: Fonts + Content File

**Files:**
- Modify: `app/layout.tsx`
- Create: `lib/content/es.json`

- [ ] **Step 1: Update `app/layout.tsx` with fonts and metadata**

```tsx
import type { Metadata } from "next"
import { Sora, Inter } from "next/font/google"
import "./global.css"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Whitebyte — Simplicidad hecha software",
  description:
    "Soluciones digitales a medida para tu negocio. Presencia digital, sitios web y automatización.",
  openGraph: {
    title: "Whitebyte — Simplicidad hecha software",
    description:
      "Soluciones digitales a medida para tu negocio. Presencia digital, sitios web y automatización.",
    url: "https://whitebyte.dev",
    siteName: "Whitebyte",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whitebyte — Simplicidad hecha software",
  },
  metadataBase: new URL("https://whitebyte.dev"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Create `lib/content/es.json`**

```json
{
  "nav": {
    "links": ["Solutions", "Process", "Work", "Contact"],
    "cta": "Hablemos →"
  },
  "hero": {
    "badge": "✦ Soluciones digitales a medida",
    "headline": "Simplicidad hecha software",
    "subheadline": "Convertimos los problemas de tu negocio en soluciones digitales que funcionan.",
    "ctaPrimary": "Empecemos →",
    "ctaSecondary": "Ver nuestro trabajo"
  },
  "solutions": {
    "title": "Solutions",
    "subtitle": "Identificamos el problema. Construimos la solución.",
    "items": [
      {
        "icon": "Globe",
        "title": "Presencia Digital",
        "hook": "Tus clientes te buscan online. ¿Estás ahí?"
      },
      {
        "icon": "Layers",
        "title": "Sitios & Aplicaciones",
        "hook": "Tu negocio, convertido en una experiencia digital que vende."
      },
      {
        "icon": "Zap",
        "title": "Automatización",
        "hook": "Trabajá menos, producí más. El software que trabaja por vos."
      }
    ]
  },
  "process": {
    "title": "Process",
    "subtitle": "Simple por fuera. Serio por dentro.",
    "steps": [
      { "number": "01", "title": "Escuchamos", "description": "Entendemos tu negocio, tus clientes y qué problema querés resolver." },
      { "number": "02", "title": "Diseñamos", "description": "Creamos una solución a medida. Sin templates genéricos." },
      { "number": "03", "title": "Construimos", "description": "Desarrollamos rápido, con calidad y con vos en el loop." },
      { "number": "04", "title": "Lanzamos", "description": "Salimos al aire y te acompañamos en el camino." }
    ]
  },
  "work": {
    "title": "Work",
    "subtitle": "Lo que construimos habla por nosotros.",
    "urquiza": {
      "name": "La Urquiza",
      "description": "Plataforma web institucional completa con gestión de inscripciones, noticias y administración.",
      "stack": "Next.js · TypeScript · Tailwind",
      "badge": "En desarrollo",
      "beforeLabel": "Antes",
      "afterLabel": "Después"
    },
    "comingSoon": "Próximos proyectos en camino."
  },
  "contact": {
    "title": "Hablemos",
    "subtitle": "Contanos qué necesitás. Sin compromiso, sin tecnicismos.",
    "email": "contacto@whitebyte.dev",
    "whatsapp": "Escribinos por WhatsApp →",
    "form": {
      "name": "Nombre",
      "email": "Email",
      "company": "Empresa / Rubro",
      "companyOptional": "(opcional)",
      "message": "¿Qué necesitás?",
      "submit": "Enviar →",
      "submitting": "Enviando...",
      "success": "¡Mensaje enviado! Te contactamos pronto.",
      "error": "Algo salió mal. Por favor intentá de nuevo."
    }
  },
  "footer": {
    "links": ["Solutions", "Process", "Work", "Contact"],
    "copyright": "© 2026 Whitebyte. Todos los derechos reservados."
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx lib/content/es.json
git commit -m "feat: add fonts, metadata and content file"
```

---

## Task 4: GSAP + Lenis Setup

**Files:**
- Create: `lib/gsap/register.ts`
- Create: `components/providers/LenisProvider.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `lib/gsap/register.ts`**

```ts
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

// Register all plugins once — import this file in layout.tsx
gsap.registerPlugin(ScrollTrigger, useGSAP)

// Project-wide defaults
gsap.defaults({
  ease: "power2.out",
  duration: 0.6,
})

export { gsap, ScrollTrigger }
```

- [ ] **Step 2: Create `components/providers/LenisProvider.tsx`**

```tsx
"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { ScrollTrigger } from "@/lib/gsap/register"

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis()

    // Sync Lenis scroll events with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    // Drive Lenis via GSAP ticker for frame-perfect sync
    const tickerFn = (time: number) => lenis.raf(time * 1000)
    const gsap = (await import("gsap")).default
    // Use GSAP ticker directly
    const { gsap: gsapInstance } = await import("@/lib/gsap/register")
    gsapInstance.ticker.add(tickerFn)
    gsapInstance.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsapInstance.ticker.remove(tickerFn)
    }
  }, [])

  return <>{children}</>
}
```

Wait — dynamic imports inside useEffect cause issues. Use synchronous import instead:

```tsx
"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/gsap/register"

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis()

    lenis.on("scroll", ScrollTrigger.update)

    const tickerFn = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerFn)
    }
  }, [])

  return <>{children}</>
}
```

- [ ] **Step 3: Wrap layout body with LenisProvider in `app/layout.tsx`**

Add import at top:
```tsx
import { LenisProvider } from "@/components/providers/LenisProvider"
```

Change body to:
```tsx
<body>
  <LenisProvider>{children}</LenisProvider>
</body>
```

- [ ] **Step 4: Verify no SSR errors**

```bash
npm run build
```

Expected: build completes with no errors. `LenisProvider` is `"use client"` so GSAP won't run on the server.

- [ ] **Step 5: Commit**

```bash
git add lib/gsap/register.ts components/providers/LenisProvider.tsx app/layout.tsx
git commit -m "feat: setup GSAP with ScrollTrigger and Lenis smooth scroll"
```

---

## Task 5: UI Primitives

**Files:**
- Create: `components/ui/Badge.tsx`
- Create: `components/ui/SectionHeading.tsx`
- Modify: `components/ui/button.tsx` (Shadcn — add outline/ghost variants if missing)

- [ ] **Step 1: Create `components/ui/Badge.tsx`**

```tsx
import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "accent" | "muted"
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        variant === "default" && "border-border text-text-secondary bg-surface",
        variant === "accent" && "border-accent/30 text-accent bg-accent-glow",
        variant === "muted" && "border-border text-text-muted bg-surface",
        className
      )}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 2: Create `components/ui/SectionHeading.tsx`**

```tsx
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-16", align === "center" && "text-center", className)}>
      <h2 className="font-display text-4xl font-semibold text-text-primary md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-text-secondary">{subtitle}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Verify Shadcn Button has the variants needed**

Open `components/ui/button.tsx`. Confirm it has `variant: "default" | "outline" | "ghost"`. Shadcn generates these by default — no changes needed unless missing.

- [ ] **Step 4: Commit**

```bash
git add components/ui/Badge.tsx components/ui/SectionHeading.tsx
git commit -m "feat: add Badge and SectionHeading UI primitives"
```

---

## Task 6: Navbar

**Files:**
- Create: `components/layout/Navbar.tsx`

- [ ] **Step 1: Create `components/layout/Navbar.tsx`**

```tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
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
          <Button asChild size="sm" className="bg-accent text-background hover:bg-accent/90">
            <a href="#contact">{content.nav.cta}</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary"
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
                  className="text-base text-text-secondary hover:text-text-primary"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            asChild
            className="mt-6 w-full bg-accent text-background hover:bg-accent/90"
          >
            <a href="#contact" onClick={() => setOpen(false)}>
              {content.nav.cta}
            </a>
          </Button>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Add Navbar to `app/page.tsx` temporarily to test**

```tsx
import { Navbar } from "@/components/layout/Navbar"

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="h-screen" />
    </main>
  )
}
```

Open `http://localhost:3000`, verify: navbar is fixed, dark, blurred. Logo shows `whitebyte.dev` with green `.dev`. Resize to mobile and confirm hamburger menu opens.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx app/page.tsx
git commit -m "feat: add Navbar with blur, mobile drawer and CTA"
```

---

## Task 7: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create `components/sections/Hero.tsx`**

```tsx
"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/gsap/register"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge"
import content from "@/lib/content/es.json"

// useGSAP is already registered in lib/gsap/register.ts

function splitWords(text: string): string[] {
  return text.split(" ")
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noReduceMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions!

          if (reduceMotion) {
            // Snap everything visible immediately — no animation
            gsap.set(
              [badgeRef.current, headlineRef.current, subRef.current, ctasRef.current],
              { autoAlpha: 1, y: 0 }
            )
            return
          }

          // Get word spans
          const wordSpans = headlineRef.current?.querySelectorAll(".word-span") ?? []

          const tl = gsap.timeline({
            defaults: { ease: "power2.out" },
          })

          tl.from(badgeRef.current, { autoAlpha: 0, y: 20, duration: 0.5 })
            .from(
              wordSpans,
              {
                autoAlpha: 0,
                y: 40,
                duration: 0.6,
                stagger: { each: 0.08, from: "start" },
              },
              "-=0.2"
            )
            .from(subRef.current, { autoAlpha: 0, y: 20, duration: 0.5 }, "-=0.3")
            .from(
              ctasRef.current?.children ?? [],
              {
                autoAlpha: 0,
                y: 20,
                duration: 0.4,
                stagger: 0.1,
              },
              "-=0.2"
            )
        }
      )

      return () => mm.revert()
    },
    { scope: containerRef }
  )

  const words = splitWords(content.hero.headline)

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-dvh items-center justify-center px-6 pt-16"
    >
      {/* Radial gradient background glow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[600px] w-[600px] rounded-full bg-accent-glow blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div ref={badgeRef} className="mb-8 flex justify-center">
          <Badge variant="accent">{content.hero.badge}</Badge>
        </div>

        {/* Headline — split by word for stagger animation */}
        <h1
          ref={headlineRef}
          className="font-display text-5xl font-bold leading-tight text-text-primary md:text-7xl lg:text-8xl"
        >
          {words.map((word, i) => (
            <span key={i} className="word-span inline-block">
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary md:text-xl"
        >
          {content.hero.subheadline}
        </p>

        {/* CTAs */}
        <div ref={ctasRef} className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-accent text-background font-medium hover:bg-accent/90"
          >
            <a href="#contact">{content.hero.ctaPrimary}</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-border text-text-primary hover:bg-surface">
            <a href="#work">{content.hero.ctaSecondary}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Hero to `app/page.tsx`**

```tsx
import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:3000`. Confirm:
- Background is dark, green glow in center
- Headline animates word-by-word on load
- Badge, subheadline, and CTAs fade in sequentially
- Buttons are visible and correct colors

- [ ] **Step 4: Test reduced motion**

In Chrome DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce". Reload. Confirm: all elements appear immediately with no animation.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section with GSAP word-stagger animation and reduced-motion support"
```

---

## Task 8: Solutions Section

**Files:**
- Create: `components/sections/Solutions.tsx`

- [ ] **Step 1: Create `components/sections/Solutions.tsx`**

```tsx
"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { Globe, Layers, Zap } from "lucide-react"
import { gsap, ScrollTrigger } from "@/lib/gsap/register"
import { SectionHeading } from "@/components/ui/SectionHeading"
import content from "@/lib/content/es.json"

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Layers,
  Zap,
}

export function Solutions() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noReduceMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions!

          if (reduceMotion) {
            gsap.set(".solution-card", { autoAlpha: 1, y: 0 })
            return
          }

          // Set initial state
          gsap.set(".solution-card", { autoAlpha: 0, y: 40 })

          ScrollTrigger.batch(".solution-card", {
            start: "top 85%",
            onEnter: (elements) => {
              gsap.to(elements, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: { each: 0.15, from: "start" },
                ease: "power2.out",
              })
            },
          })
        }
      )

      return () => mm.revert()
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="solutions"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <SectionHeading
        title={content.solutions.title}
        subtitle={content.solutions.subtitle}
      />

      <div className="grid gap-6 md:grid-cols-3">
        {content.solutions.items.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <div
              key={item.title}
              className="solution-card group rounded-xl border border-border bg-surface p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_hsl(142_69%_58%_/_0.1)]"
            >
              <div className="mb-5 inline-flex rounded-lg border border-border bg-surface-raised p-3">
                <Icon size={22} className="text-accent" aria-hidden="true" />
              </div>
              <h3 className="font-display mb-3 text-xl font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">{item.hook}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import { Solutions } from "@/components/sections/Solutions"
// after <Hero />
<Solutions />
```

- [ ] **Step 3: Verify in browser**

Scroll down past hero. Confirm: cards fade in with stagger as they enter viewport. Hover shows green glow border.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Solutions.tsx app/page.tsx
git commit -m "feat: add Solutions section with ScrollTrigger.batch stagger animation"
```

---

## Task 9: Process Section

**Files:**
- Create: `components/sections/Process.tsx`

- [ ] **Step 1: Create `components/sections/Process.tsx`**

```tsx
"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/gsap/register"
import { SectionHeading } from "@/components/ui/SectionHeading"
import content from "@/lib/content/es.json"

export function Process() {
  const containerRef = useRef<HTMLElement>(null)
  const lineRef = useRef<SVGLineElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noReduceMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions!

          if (reduceMotion) {
            gsap.set(".process-step", { autoAlpha: 1, y: 0 })
            if (lineRef.current) {
              gsap.set(lineRef.current, { strokeDashoffset: 0 })
            }
            return
          }

          // Animate SVG connector line drawing
          if (lineRef.current) {
            const length = lineRef.current.getTotalLength?.() ?? 300
            gsap.set(lineRef.current, {
              strokeDasharray: length,
              strokeDashoffset: length,
            })

            gsap.to(lineRef.current, {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom 60%",
                scrub: 1,
              },
            })
          }

          // Step items stagger
          gsap.set(".process-step", { autoAlpha: 0, y: 30 })
          ScrollTrigger.batch(".process-step", {
            start: "top 85%",
            onEnter: (elements) => {
              gsap.to(elements, {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                stagger: { each: 0.12, from: "start" },
                ease: "power2.out",
              })
            },
          })
        }
      )

      return () => mm.revert()
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="process"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <SectionHeading
        title={content.process.title}
        subtitle={content.process.subtitle}
      />

      <div className="relative">
        {/* Connector line — desktop only */}
        <div className="absolute left-0 right-0 top-8 hidden md:block" aria-hidden="true">
          <svg width="100%" height="2" className="overflow-visible">
            <line
              ref={lineRef}
              x1="12.5%"
              y1="1"
              x2="87.5%"
              y2="1"
              stroke="hsl(142 69% 58% / 0.4)"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="grid gap-10 md:grid-cols-4">
          {content.process.steps.map((step) => (
            <div key={step.number} className="process-step relative text-center md:text-left">
              {/* Number */}
              <div className="font-display mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent-glow text-2xl font-bold text-accent">
                {step.number}
              </div>
              <h3 className="font-display mb-2 text-lg font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import { Process } from "@/components/sections/Process"
// after <Solutions />
<Process />
```

- [ ] **Step 3: Verify in browser**

Scroll to Process section. Confirm: steps fade in with stagger, connector line draws from left to right as you scroll (desktop).

- [ ] **Step 4: Commit**

```bash
git add components/sections/Process.tsx app/page.tsx
git commit -m "feat: add Process section with SVG line draw animation"
```

---

## Task 10: Portfolio / Work Section

**Files:**
- Create: `components/sections/Portfolio.tsx`
- Create: `components/ui/CompareSlider.tsx`
- Add: screenshots to `public/portfolio/urquiza-before.webp` and `public/portfolio/urquiza-after.webp`

- [ ] **Step 1: Add portfolio screenshots**

Place two screenshots in `public/portfolio/`:
- `urquiza-before.webp` — screenshot de la web vieja de La Urquiza
- `urquiza-after.webp` — screenshot de la web nueva

If screenshots are not ready yet, use placeholder images temporarily:
```bash
mkdir -p public/portfolio
# Download placeholder or copy any webp temporarily
```

- [ ] **Step 2: Create `components/ui/CompareSlider.tsx`**

```tsx
"use client"

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider"
import { ChevronsLeftRight } from "lucide-react"

interface CompareSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeLabel: string
  afterLabel: string
  beforeAlt: string
  afterAlt: string
}

export function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  beforeAlt,
  afterAlt,
}: CompareSliderProps) {
  return (
    <ReactCompareSlider
      className="rounded-xl overflow-hidden border border-border"
      handle={
        <div className="flex h-full items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-background shadow-lg">
            <ChevronsLeftRight size={16} className="text-accent" aria-hidden="true" />
          </div>
        </div>
      }
      itemOne={
        <div className="relative w-full">
          <ReactCompareSliderImage src={beforeSrc} alt={beforeAlt} />
          <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2 py-1 text-xs font-medium text-text-secondary backdrop-blur-sm">
            {beforeLabel}
          </span>
        </div>
      }
      itemTwo={
        <div className="relative w-full">
          <ReactCompareSliderImage src={afterSrc} alt={afterAlt} />
          <span className="absolute right-3 top-3 rounded-full bg-background/80 px-2 py-1 text-xs font-medium text-accent backdrop-blur-sm">
            {afterLabel}
          </span>
        </div>
      }
    />
  )
}
```

- [ ] **Step 3: Create `components/sections/Portfolio.tsx`**

```tsx
"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap/register"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { CompareSlider } from "@/components/ui/CompareSlider"
import { Badge } from "@/components/ui/Badge"
import content from "@/lib/content/es.json"

export function Portfolio() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".portfolio-card", { autoAlpha: 0, y: 40 })
        gsap.to(".portfolio-card", {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".portfolio-card",
            start: "top 85%",
          },
        })
      })
      return () => mm.revert()
    },
    { scope: containerRef }
  )

  const u = content.work.urquiza

  return (
    <section
      ref={containerRef}
      id="work"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <SectionHeading
        title={content.work.title}
        subtitle={content.work.subtitle}
      />

      <div className="grid gap-8 md:grid-cols-2">
        {/* La Urquiza card */}
        <div className="portfolio-card rounded-xl border border-border bg-surface overflow-hidden">
          <CompareSlider
            beforeSrc="/portfolio/urquiza-before.webp"
            afterSrc="/portfolio/urquiza-after.webp"
            beforeLabel={u.beforeLabel}
            afterLabel={u.afterLabel}
            beforeAlt={`${u.name} — sitio anterior`}
            afterAlt={`${u.name} — sitio nuevo`}
          />
          <div className="p-6">
            <div className="mb-2 flex items-center gap-3">
              <h3 className="font-display text-xl font-semibold text-text-primary">
                {u.name}
              </h3>
              <Badge variant="muted">{u.badge}</Badge>
            </div>
            <p className="mb-4 text-sm text-text-secondary leading-relaxed">
              {u.description}
            </p>
            <p className="text-xs text-text-muted">{u.stack}</p>
          </div>
        </div>

        {/* Coming soon placeholder */}
        <div className="portfolio-card flex items-center justify-center rounded-xl border border-border bg-surface p-12 opacity-40">
          <p className="text-center text-text-secondary">{content.work.comingSoon}</p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Add to `app/page.tsx`**

```tsx
import { Portfolio } from "@/components/sections/Portfolio"
// after <Process />
<Portfolio />
```

- [ ] **Step 5: Verify in browser**

Scroll to Work section. Confirm: before/after slider works, drag handle is green, labels show correctly. Coming-soon card is visibly muted.

- [ ] **Step 6: Commit**

```bash
git add components/sections/Portfolio.tsx components/ui/CompareSlider.tsx public/portfolio/ app/page.tsx
git commit -m "feat: add Portfolio section with before/after comparison slider"
```

---

## Task 11: Contact API Route + Tests

**Files:**
- Create: `app/api/contact/route.ts`
- Create: `lib/email/send.ts`
- Create: `tests/api/contact.test.ts`
- Create: `vitest.config.ts`
- Create: `.env.local` (never committed)
- Create: `.env.example`

- [ ] **Step 1: Create `.env.example`**

```bash
# Resend API key - get from resend.com
RESEND_API_KEY=re_your_key_here
```

- [ ] **Step 2: Create `.env.local` with your actual key (not committed)**

```bash
RESEND_API_KEY=re_your_actual_key
```

Add to `.gitignore`:
```
.env.local
```

- [ ] **Step 3: Create `lib/email/send.ts`**

```ts
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactEmailData {
  nombre: string
  email: string
  empresa?: string
  mensaje: string
}

export async function sendContactEmail(data: ContactEmailData) {
  const { error } = await resend.emails.send({
    from: "Whitebyte Contact <contacto@whitebyte.dev>",
    to: "contacto@whitebyte.dev",
    replyTo: data.email,
    subject: `Nuevo contacto: ${data.nombre}`,
    html: `
      <h2>Nuevo mensaje desde whitebyte.dev</h2>
      <p><strong>Nombre:</strong> ${data.nombre}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.empresa ? `<p><strong>Empresa/Rubro:</strong> ${data.empresa}</p>` : ""}
      <p><strong>Mensaje:</strong></p>
      <p>${data.mensaje.replace(/\n/g, "<br>")}</p>
    `,
  })

  if (error) throw new Error(error.message)
}
```

- [ ] **Step 4: Create `app/api/contact/route.ts`**

```ts
import { NextRequest, NextResponse } from "next/server"
import { sendContactEmail } from "@/lib/email/send"

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const { nombre, email, empresa, mensaje } = body as Record<string, string>

  if (!nombre || typeof nombre !== "string" || nombre.trim().length === 0) {
    return NextResponse.json({ error: "Nombre es requerido" }, { status: 400 })
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 })
  }

  if (!mensaje || typeof mensaje !== "string" || mensaje.trim().length === 0) {
    return NextResponse.json({ error: "Mensaje es requerido" }, { status: 400 })
  }

  try {
    await sendContactEmail({
      nombre: nombre.trim(),
      email: email.trim(),
      empresa: empresa?.trim(),
      mensaje: mensaje.trim(),
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 500 })
  }
}
```

- [ ] **Step 5: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    globals: true,
  },
})
```

- [ ] **Step 6: Create `tests/api/contact.test.ts`**

```ts
import { describe, it, expect, vi, beforeEach } from "vitest"
import { POST } from "@/app/api/contact/route"
import { NextRequest } from "next/server"

// Mock Resend
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ error: null }),
    },
  })),
}))

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
}

describe("POST /api/contact", () => {
  it("returns 200 with valid payload", async () => {
    const req = makeRequest({
      nombre: "Juan",
      email: "juan@test.com",
      mensaje: "Hola, me interesa una web",
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it("returns 400 when nombre is missing", async () => {
    const req = makeRequest({ email: "juan@test.com", mensaje: "Hola" })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe("Nombre es requerido")
  })

  it("returns 400 when email is invalid", async () => {
    const req = makeRequest({ nombre: "Juan", email: "not-an-email", mensaje: "Hola" })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe("Email inválido")
  })

  it("returns 400 when mensaje is missing", async () => {
    const req = makeRequest({ nombre: "Juan", email: "juan@test.com" })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe("Mensaje es requerido")
  })

  it("returns 400 for invalid JSON", async () => {
    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: "not json",
      headers: { "Content-Type": "application/json" },
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
```

- [ ] **Step 7: Run tests**

```bash
npx vitest run tests/api/contact.test.ts
```

Expected output:
```
✓ tests/api/contact.test.ts (5)
  ✓ POST /api/contact
    ✓ returns 200 with valid payload
    ✓ returns 400 when nombre is missing
    ✓ returns 400 when email is invalid
    ✓ returns 400 when mensaje is missing
    ✓ returns 400 for invalid JSON

Test Files  1 passed (1)
Tests       5 passed (5)
```

- [ ] **Step 8: Add test script to `package.json`**

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 9: Commit**

```bash
git add app/api/contact/route.ts lib/email/send.ts tests/api/contact.test.ts vitest.config.ts .env.example package.json
git commit -m "feat: add contact API route with Resend and Vitest tests"
```

---

## Task 12: Contact Section UI

**Files:**
- Create: `components/sections/Contact.tsx`

- [ ] **Step 1: Create `components/sections/Contact.tsx`**

```tsx
"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { Mail, MessageCircle, Instagram } from "lucide-react"
import { gsap } from "@/lib/gsap/register"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SectionHeading } from "@/components/ui/SectionHeading"
import content from "@/lib/content/es.json"

type FormStatus = "idle" | "loading" | "success" | "error"

interface FormErrors {
  nombre?: string
  email?: string
  mensaje?: string
}

function validate(values: {
  nombre: string
  email: string
  mensaje: string
}): FormErrors {
  const errors: FormErrors = {}
  if (!values.nombre.trim()) errors.nombre = "El nombre es requerido"
  if (!values.email.trim()) {
    errors.email = "El email es requerido"
  } else if (!values.email.includes("@")) {
    errors.email = "El email no es válido"
  }
  if (!values.mensaje.trim()) errors.mensaje = "El mensaje es requerido"
  return errors
}

export function Contact() {
  const containerRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errors, setErrors] = useState<FormErrors>({})
  const [values, setValues] = useState({
    nombre: "",
    email: "",
    empresa: "",
    mensaje: "",
  })

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".contact-col-left", { autoAlpha: 0, x: -40 })
        gsap.set(".contact-col-right", { autoAlpha: 0, x: 40 })
        gsap.to([".contact-col-left", ".contact-col-right"], {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        })
      })
      return () => mm.revert()
    },
    { scope: containerRef }
  )

  function handleBlur(field: "nombre" | "email" | "mensaje") {
    const fieldErrors = validate(values)
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fieldErrors = validate(values)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!res.ok) throw new Error("Error en el servidor")

      setStatus("success")
      setValues({ nombre: "", email: "", empresa: "", mensaje: "" })
      setErrors({})
    } catch {
      setStatus("error")
    }
  }

  const f = content.contact.form

  return (
    <section
      ref={containerRef}
      id="contact"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <SectionHeading
        title={content.contact.title}
        subtitle={content.contact.subtitle}
      />

      <div className="grid gap-16 md:grid-cols-2">
        {/* Left column */}
        <div className="contact-col-left space-y-8">
          <p className="text-text-secondary leading-relaxed">
            Ya sea que tengas una idea clara o apenas una necesidad, estamos para
            ayudarte a encontrar la solución correcta.
          </p>

          <div className="space-y-4">
            <a
              href={`mailto:${content.contact.email}`}
              className="flex items-center gap-3 text-text-secondary transition-colors hover:text-accent"
            >
              <Mail size={18} aria-hidden="true" />
              <span>{content.contact.email}</span>
            </a>

            <a
              href="https://wa.me/5491100000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-text-secondary transition-colors hover:text-accent"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span>{content.contact.whatsapp}</span>
            </a>

            <a
              href="https://instagram.com/whitebyte.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-text-secondary transition-colors hover:text-accent"
              aria-label="Instagram de Whitebyte"
            >
              <Instagram size={18} aria-hidden="true" />
              <span>@whitebyte.dev</span>
            </a>
          </div>
        </div>

        {/* Right column — form */}
        <div className="contact-col-right">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="nombre">{f.name}</Label>
              <Input
                id="nombre"
                name="nombre"
                value={values.nombre}
                onChange={(e) => setValues((v) => ({ ...v, nombre: e.target.value }))}
                onBlur={() => handleBlur("nombre")}
                aria-describedby={errors.nombre ? "nombre-error" : undefined}
                aria-invalid={!!errors.nombre}
                className="bg-surface border-border focus:border-accent"
              />
              {errors.nombre && (
                <p id="nombre-error" role="alert" className="text-xs text-red-400">
                  {errors.nombre}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{f.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                onBlur={() => handleBlur("email")}
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={!!errors.email}
                className="bg-surface border-border focus:border-accent"
              />
              {errors.email && (
                <p id="email-error" role="alert" className="text-xs text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="empresa">
                {f.company}{" "}
                <span className="text-text-muted text-xs">{f.companyOptional}</span>
              </Label>
              <Input
                id="empresa"
                name="empresa"
                value={values.empresa}
                onChange={(e) => setValues((v) => ({ ...v, empresa: e.target.value }))}
                className="bg-surface border-border focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mensaje">{f.message}</Label>
              <Textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                value={values.mensaje}
                onChange={(e) => setValues((v) => ({ ...v, mensaje: e.target.value }))}
                onBlur={() => handleBlur("mensaje")}
                aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
                aria-invalid={!!errors.mensaje}
                className="bg-surface border-border focus:border-accent resize-none"
              />
              {errors.mensaje && (
                <p id="mensaje-error" role="alert" className="text-xs text-red-400">
                  {errors.mensaje}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-accent text-background hover:bg-accent/90 disabled:opacity-60"
            >
              {status === "loading" ? f.submitting : f.submit}
            </Button>

            {status === "success" && (
              <p role="status" className="text-center text-sm text-accent">
                {f.success}
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="text-center text-sm text-red-400">
                {f.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import { Contact } from "@/components/sections/Contact"
// after <Portfolio />
<Contact />
```

- [ ] **Step 3: Verify in browser**

- Scroll to Contact. Confirm both columns animate in from sides.
- Try submitting empty form — errors should appear below each field.
- Fill form with valid data and submit — confirm loading state on button, then success message.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Contact.tsx app/page.tsx
git commit -m "feat: add Contact section with form validation, onBlur errors and Resend integration"
```

---

## Task 13: Footer

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create `components/layout/Footer.tsx`**

```tsx
import Link from "next/link"
import { Instagram } from "lucide-react"
import content from "@/lib/content/es.json"

const sectionIds = ["solutions", "process", "work", "contact"]

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
            <Instagram size={20} aria-hidden="true" />
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
```

- [ ] **Step 2: Add Footer to `app/page.tsx`**

```tsx
import { Footer } from "@/components/layout/Footer"
// after <Contact />, outside <main> or as last child
<Footer />
```

- [ ] **Step 3: Verify**

Footer shows at bottom. Logo visible, links work, Instagram icon has accessible label. Green glow shadow on top border visible.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Footer.tsx app/page.tsx
git commit -m "feat: add Footer with logo, links and Instagram"
```

---

## Task 14: Page Assembly + SEO

**Files:**
- Modify: `app/page.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: Final `app/page.tsx`**

```tsx
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { Solutions } from "@/components/sections/Solutions"
import { Process } from "@/components/sections/Process"
import { Portfolio } from "@/components/sections/Portfolio"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <Process />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Create `app/sitemap.ts`**

```ts
import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://whitebyte.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
```

- [ ] **Step 3: Create `app/robots.ts`**

```ts
import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://whitebyte.dev/sitemap.xml",
  }
}
```

- [ ] **Step 4: Run final build check**

```bash
npm run build
```

Expected: build completes with no errors or type errors.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/sitemap.ts app/robots.ts
git commit -m "feat: finalize page assembly, sitemap and robots.txt"
```

---

## Task 15: Deploy to Vercel

**Files:**
- No code changes — deploy and env vars

- [ ] **Step 1: Push to GitHub**

```bash
git remote add origin https://github.com/YOUR_USER/whitebyte.git
git push -u origin main
```

- [ ] **Step 2: Import project in Vercel**

Go to [vercel.com](https://vercel.com), click "Add New Project", import the GitHub repo.

- [ ] **Step 3: Add environment variable in Vercel**

In Project Settings → Environment Variables:
- Key: `RESEND_API_KEY`
- Value: your actual Resend API key
- Environment: Production + Preview

- [ ] **Step 4: Deploy**

Trigger deploy. Expected: build succeeds, `https://whitebyte.dev` (or the `.vercel.app` URL) is live.

- [ ] **Step 5: Smoke test on production URL**

- Page loads with dark background
- Hero animation plays
- Scroll animations trigger correctly
- Form submits and email arrives at `contacto@whitebyte.dev`
- Before/after slider works on mobile

- [ ] **Step 6: Commit `.env.example` reminder**

```bash
git add .env.example
git commit -m "chore: add .env.example for Resend configuration"
```

---

## Pre-Deploy Checklist

- [ ] Tokens HSL en `global.css`, sin hex hardcodeado en componentes
- [ ] `prefers-reduced-motion` testeado con DevTools (Chrome → Rendering → Emulate CSS media)
- [ ] Formulario testeado end-to-end (email llega a `contacto@whitebyte.dev`)
- [ ] `RESEND_API_KEY` configurado en Vercel
- [ ] Sin `markers: true` en ningún ScrollTrigger
- [ ] Responsive verificado en 375px, 768px, 1024px, 1440px
- [ ] Sin scroll horizontal en mobile
- [ ] Screenshots de La Urquiza listos (WebP, optimizados)
- [ ] WhatsApp link actualizado con número real (`wa.me/...`)
- [ ] Instagram link actualizado con handle real
- [ ] `npm run build` sin errores
- [ ] `npm run test` — todos los tests pasan
