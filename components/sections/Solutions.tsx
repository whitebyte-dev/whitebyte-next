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
