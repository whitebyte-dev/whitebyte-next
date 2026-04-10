"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/gsap/register"
import { SectionHeading } from "@/components/ui/SectionHeading"
import content from "@/lib/content/es.json"

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

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
            if (lineRef.current) gsap.set(lineRef.current, { scaleX: 1 })
            if (glowRef.current) gsap.set(glowRef.current, { scaleX: 1 })
            return
          }

          // Animate connector line + glow via scaleX
          const lines = [lineRef.current, glowRef.current].filter(Boolean)
          lines.forEach((el) => {
            gsap.set(el, { scaleX: 0, transformOrigin: "left center" })
            gsap.to(el, {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom 60%",
                scrub: 1,
              },
            })
          })

          // Steps stagger
          gsap.set(".process-step", { autoAlpha: 0, y: 30 })
          ScrollTrigger.batch(".process-step", {
            start: "top 88%",
            once: true,
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

  const p = content.process

  return (
    <section id="process" className="relative w-full overflow-hidden">
      {/* Subtle radial glow — warm, centered */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(25_40%_45%_/_0.04)] blur-[150px]"
        aria-hidden="true"
      />

      <div ref={containerRef} className="relative mx-auto max-w-6xl px-8 py-36">
        <SectionHeading
          badge="Proceso"
          title={p.title}
          titleAccent={(p as Record<string, unknown>).titleAccent as string}
          subtitle={p.subtitle}
          className="mb-20"
        />

        <div className="relative">
          {/* Connector line — desktop only, rainbow gradient */}
          <div className="absolute left-[12.5%] right-[12.5%] top-[3.75rem] hidden md:block" aria-hidden="true">
            {/* Glow layer (blurred behind) */}
            <div
              ref={glowRef}
              className="absolute inset-0 h-[2px] w-full blur-[6px] opacity-60"
              style={{
                background:
                  "linear-gradient(to right, hsl(280 18% 40% / 0.5), hsl(220 18% 45% / 0.45), hsl(180 14% 42% / 0.4), hsl(30 16% 44% / 0.45), hsl(280 18% 40% / 0.5))",
              }}
            />
            {/* Sharp line */}
            <div
              ref={lineRef}
              className="h-[2px] w-full"
              style={{
                background:
                  "linear-gradient(to right, hsl(280 18% 40% / 0.55), hsl(220 18% 45% / 0.5), hsl(180 14% 42% / 0.4), hsl(30 16% 44% / 0.5), hsl(280 18% 40% / 0.55))",
              }}
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {p.steps.map((step) => (
              <div key={step.number} className="process-step card-glow-wrap group">
                <div className="card-glow-inner relative overflow-hidden px-8 pb-10 pt-14 text-center">
                  {/* Watermark number */}
                  <span
                    className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none font-display text-[8rem] font-bold leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-white/[0.06]"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>

                  {/* Step number circle */}
                  <div className="font-display relative z-10 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-lg font-semibold text-text-secondary transition-all duration-500 group-hover:border-white/[0.15] group-hover:bg-white/[0.06] group-hover:text-text-primary">
                    {step.number}
                  </div>

                  <h3 className="font-display relative z-10 mb-3 text-lg font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="relative z-10 text-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
