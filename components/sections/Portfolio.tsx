"use client"

import { useRef } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/gsap/register"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { ArrowRight } from "lucide-react"
import content from "@/lib/content/es.json"

const CompareSlider = dynamic(
  () => import("@/components/ui/CompareSlider").then((m) => m.CompareSlider),
  { ssr: false }
)

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noReduceMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions!.reduceMotion) {
            gsap.set(".portfolio-card", { autoAlpha: 1, y: 0 })
            return
          }
          gsap.set(".portfolio-card", { autoAlpha: 0, y: 40 })
          ScrollTrigger.batch(".portfolio-card", {
            start: "top 88%",
            once: true,
            onEnter: (elements) => {
              gsap.to(elements, {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
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

  const w = content.work
  const u = w.urquiza

  return (
    <section id="work" className="relative w-full overflow-hidden">
      {/* SVG background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/assets/background/uuunion.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />

      {/* Warm glow — top left */}
      <div
        className="pointer-events-none absolute -top-48 -left-48 h-[500px] w-[500px] rounded-full bg-[hsl(35_50%_45%_/_0.09)] blur-[160px]"
        aria-hidden="true"
      />
      {/* Warm glow — bottom right */}
      <div
        className="pointer-events-none absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full bg-[hsl(30_45%_42%_/_0.07)] blur-[160px]"
        aria-hidden="true"
      />

      <div ref={containerRef} className="relative mx-auto max-w-6xl px-8 py-36">
        <SectionHeading
          badge="Portfolio"
          title={w.title}
          titleAccent={(w as Record<string, unknown>).titleAccent as string}
          subtitle={w.subtitle}
          className="mb-20"
        />

        {/* La Urquiza — full-width showcase */}
        <div className="portfolio-card card-glow-wrap group mx-auto max-w-4xl">
          <div className="card-glow-inner overflow-hidden">
            {/* Compare slider with inner border and shadow */}
            <div className="relative overflow-hidden rounded-t-[calc(1rem-1px)] border-b border-white/[0.06]">
              <div className="shadow-[inset_0_0_30px_hsl(0_0%_0%_/_0.3)]">
                <CompareSlider
                  beforeSrc="/portfolio/urquiza-before.webp"
                  afterSrc="/portfolio/urquiza-after.webp"
                  beforeLabel={u.beforeLabel}
                  afterLabel={u.afterLabel}
                  beforeAlt={`${u.name} — plataforma anterior`}
                  afterAlt={`${u.name} — plataforma nueva`}
                />
              </div>
            </div>

            {/* Info section */}
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h3 className="font-display text-2xl font-semibold text-text-primary">
                  {u.name}
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/[0.06] px-3 py-1 text-xs font-medium text-amber-300/90">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                  </span>
                  {u.badge}
                </span>
              </div>

              <p className="max-w-xl text-sm leading-relaxed text-text-secondary mb-5">
                {u.description}
              </p>

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                {/* Stack pills */}
                <div className="flex flex-wrap gap-2">
                  {u.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/caso/terciario-urquiza"
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-text-primary transition-all duration-300 hover:border-white/[0.2] hover:bg-white/[0.08]"
                >
                  {(u as Record<string, unknown>).cta as string}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-text-muted">
            {w.comingSoon}
          </p>
          <Link
            href="/contacto"
            className="mt-2 inline-block text-sm text-text-secondary underline underline-offset-4 decoration-white/20 transition-colors duration-300 hover:text-text-primary hover:decoration-white/40"
          >
            {(w as Record<string, unknown>).comingSoonCta as string}
          </Link>
        </div>
      </div>
    </section>
  )
}
