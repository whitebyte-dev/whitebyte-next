"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap/register"
import content from "@/lib/content/es.json"

export function CtaBanner() {
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
            gsap.set(".cta-content", { autoAlpha: 1, y: 0 })
            return
          }
          gsap.set(".cta-content", { autoAlpha: 0, y: 30 })
          gsap.to(".cta-content", {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true,
            },
          })
        }
      )
      return () => mm.revert()
    },
    { scope: containerRef }
  )

  const c = content.cta

  return (
    <section id="contact" className="relative w-full overflow-hidden">
      {/* Stipple texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(0 0% 100% / 0.07) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(270_25%_40%_/_0.05)] blur-[150px]"
        aria-hidden="true"
      />

      <div ref={containerRef} className="relative mx-auto max-w-4xl px-8 py-36">
        <div className="cta-content text-center">
          <h2 className="font-display text-5xl font-semibold text-text-primary md:text-6xl lg:text-7xl">
            {c.headline}{" "}
            <span
              className="font-[family-name:var(--font-serif-accent)] italic font-normal bg-gradient-to-r from-[hsl(35_40%_65%)] to-[hsl(25_35%_55%)] bg-clip-text text-transparent"
            >
              {(c as Record<string, unknown>).headlineAccent as string}
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
            {c.subtitle}
          </p>

          <div className="mt-10 inline-block">
            <span className="pill-glow-wrap group inline-flex">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-10 py-4 text-base font-medium text-background transition-all duration-300 group-hover:bg-white/95"
              >
                {c.button}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
