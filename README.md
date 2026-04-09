# Whitebyte

Landing page and marketing site for [whitebyte.dev](https://whitebyte.dev).

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript, React 19 |
| Styling | Tailwind CSS v4 |
| Animations | GSAP 3.14 + ScrollTrigger + Lenis |
| Components | Shadcn (Base UI) |
| Email | Resend + React Email |
| Tests | Vitest |

## Getting Started

```bash
npm install
cp .env.example .env.local   # add your Resend API key
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev        # Dev server
npm run build      # Production build
npm run lint       # ESLint
npm test           # Run tests
npm run test:watch # Tests in watch mode
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | API key from [resend.com](https://resend.com). The contact form won't send emails without it. |

## Project Structure

```
app/
  page.tsx              # Landing page (assembles all sections)
  contacto/page.tsx     # Contact page
  nosotros/page.tsx     # About page
  api/contact/route.ts  # Contact form endpoint
components/
  sections/             # Page sections (Hero, Solutions, Process, etc.)
  layout/               # Navbar, Footer
  ui/                   # Reusable primitives (SectionHeading, Badge, etc.)
lib/
  content/es.json       # All UI copy — never hardcode strings in components
  email/                # React Email template + send function
  gsap/register.ts      # GSAP config — always import from here, not from 'gsap'
```

## Key Conventions

**Content** — All copy lives in `lib/content/es.json`. Components read from there.

**Styling** — Tailwind v4 config is entirely in `app/globals.css` via `@theme`. There is no `tailwind.config.js`. Use our design tokens (`text-text-primary`, `bg-surface`) not Shadcn tokens directly.

**Animations** — Import GSAP from `@/lib/gsap/register`. Use `autoAlpha` for fades. Wrap animations in `gsap.matchMedia()` to respect `prefers-reduced-motion`.

**Email** — Contact form sends branded HTML emails via Resend + React Email. Template at `lib/email/contact-template.tsx`.

## Deployment

Push to `main` deploys to [Vercel](https://vercel.com). Set `RESEND_API_KEY` in Vercel environment variables before deploying.
