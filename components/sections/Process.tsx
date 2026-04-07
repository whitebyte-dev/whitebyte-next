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
            const length = 800 // approximate line length
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

          // Steps stagger
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
