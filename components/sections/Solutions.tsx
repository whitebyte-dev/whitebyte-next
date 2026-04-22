"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import Link from "next/link"
import { Globe, Layers, Zap, Search, Compass, Sparkles } from "lucide-react"
import { gsap, ScrollTrigger } from "@/lib/gsap/register"
import { SectionHeading } from "@/components/ui/SectionHeading"
import content from "@/lib/content/es.json"

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Layers,
  Zap,
  Search,
  Compass,
  Sparkles,
}

export function Solutions() {
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
          const { reduceMotion } = context.conditions!

          if (reduceMotion) {
            gsap.set(".solution-card", { autoAlpha: 1, y: 0 })
            return
          }

          gsap.set(".solution-card", { autoAlpha: 0, y: 40 })

          ScrollTrigger.batch(".solution-card", {
            start: "top 88%",
            once: true,
            onEnter: (elements) => {
              gsap.to(elements, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: { each: 0.1, from: "start" },
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

  const s = content.solutions

  return (
    <section id="solutions" className="relative w-full overflow-hidden">
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(0 0% 100% / 0.02) 1px, transparent 1px), linear-gradient(to bottom, hsl(0 0% 100% / 0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          backgroundPosition: "center center",
        }}
      />

      {/* Subtle top glow — warm */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[450px] w-[650px] -translate-x-1/2 rounded-full bg-[hsl(25_50%_50%_/_0.06)] blur-[130px]"
        aria-hidden="true"
      />

      <div ref={containerRef} className="relative mx-auto max-w-6xl px-8 py-28">
        <SectionHeading
          badge="Soluciones"
          title={s.title}
          titleAccent={(s as Record<string, unknown>).titleAccent as string}
          subtitle={s.subtitle}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {s.items.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <div
                key={item.title}
                className="solution-card card-glow-wrap group"
              >
                <div className="card-glow-inner p-6 backdrop-blur-sm md:p-8">
                  {/* Accent line on top */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="mb-6 inline-flex rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 transition-all duration-500 group-hover:border-white/[0.15] group-hover:bg-white/[0.06]">
                    <Icon
                      size={22}
                      className="text-text-secondary transition-all duration-500 group-hover:text-text-primary group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-display mb-2 text-xl font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mb-4 text-[0.95rem] font-medium leading-snug text-text-primary/80">
                    {item.hook}
                  </p>
                  <div className="mb-4 h-px bg-white/[0.04]" />
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {(item as Record<string, string>).description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-text-muted text-sm">
            {(s as Record<string, unknown>).cta as string}
          </p>
          <Link
            href="/contacto"
            className="mt-2 inline-block text-sm text-text-secondary underline underline-offset-4 decoration-white/20 transition-colors duration-300 hover:text-text-primary hover:decoration-white/40"
          >
            {(s as Record<string, unknown>).ctaLink as string}
          </Link>
        </div>
      </div>
    </section>
  )
}
