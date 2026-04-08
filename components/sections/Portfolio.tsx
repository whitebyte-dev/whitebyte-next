"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap/register"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Badge } from "@/components/ui/Badge"
import content from "@/lib/content/es.json"

// SSR desactivado — react-compare-slider genera estilos inline en el cliente
// que difieren del servidor, causando hydration mismatch
const CompareSlider = dynamic(
  () => import("@/components/ui/CompareSlider").then((m) => m.CompareSlider),
  { ssr: false }
)

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
        <div className="portfolio-card overflow-hidden rounded-xl border border-border bg-surface">
          <CompareSlider
            beforeSrc="/portfolio/urquiza-before.svg"
            afterSrc="/portfolio/urquiza-after.svg"
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
        <div className="portfolio-card flex min-h-[300px] items-center justify-center rounded-xl border border-border bg-surface p-12 opacity-40">
          <p className="text-center text-text-secondary">{content.work.comingSoon}</p>
        </div>
      </div>
    </section>
  )
}
