# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev        # start dev server (localhost:3000)
npm run build      # production build — must pass before committing
npm run lint       # ESLint
npm test           # Vitest (run once)
npm run test:watch # Vitest in watch mode
npx vitest run tests/api/contact.test.ts  # run a single test file
```

## Architecture

Single-route Next.js 16 App Router landing page (`/`). All page content lives in `app/page.tsx` which assembles sections in order.

**Content:** All UI strings are in `lib/content/es.json`. Never hardcode copy in components — always read from there. This file is structured for future i18n.

**Styling:** Tailwind CSS v4 — config lives entirely in `app/globals.css` via `@theme`. There is no `tailwind.config.js`. Two token namespaces coexist:
- `--color-text-primary`, `--color-surface`, `--color-accent`, etc. — our design tokens → use as `text-text-primary`, `bg-surface`, `text-accent`
- `--color-primary`, `--color-foreground`, `--color-muted`, etc. — Shadcn compat tokens → consumed internally by Shadcn components, don't use directly in custom components

Always add `dark` class to `<html>` (already set in `layout.tsx`) — Shadcn components need it for their `dark:` variants.

**Shadcn:** Uses `@base-ui/react` (not Radix). The `Button` component does **not** support `asChild`. Style links with `buttonVariants()` from `@/components/ui/button` or plain Tailwind classes.

**Animations:** Import GSAP exclusively from `@/lib/gsap/register` — never directly from `gsap`. This file registers `ScrollTrigger` and `useGSAP` once and sets project-wide defaults. Pattern every animated component follows:
```ts
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/gsap/register"

useGSAP(() => {
  const mm = gsap.matchMedia()
  mm.add({ reduceMotion: "(prefers-reduced-motion: reduce)" }, (ctx) => {
    if (ctx.conditions!.reduceMotion) { gsap.set(...); return }
    // animate
  })
  return () => mm.revert()
}, { scope: containerRef })
```
Use `autoAlpha` (not `opacity`) for all fade animations. Never put `ScrollTrigger` on a child tween inside a timeline — only on top-level tweens.

**Smooth scroll:** Lenis is wired in `LenisProvider` via `gsap.ticker` — do not use `scroll-behavior: smooth` in CSS or configure a separate scrollProxy.

**SSR gotcha:** Any component that generates dynamic inline styles at runtime (e.g. `react-compare-slider`) must be loaded with `dynamic(..., { ssr: false })` to avoid hydration mismatches.

**Email:** `app/api/contact/route.ts` handles contact form submissions via Resend. Requires `RESEND_API_KEY` env var. The `Resend` instance is created inside the handler function (not at module scope) to avoid build-time errors.

**Tests:** Only the API route has tests (`tests/api/contact.test.ts`). Resend is mocked — tests run without a real API key.
