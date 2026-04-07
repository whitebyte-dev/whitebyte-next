"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap/register"
import { Badge } from "@/components/ui/Badge"
import content from "@/lib/content/es.json"

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
            gsap.set(
              [badgeRef.current, headlineRef.current, subRef.current, ctasRef.current],
              { autoAlpha: 1, y: 0 }
            )
            return
          }

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

  const words = content.hero.headline.split(" ")

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
        <div ref={badgeRef} className="mb-8 flex justify-center">
          <Badge variant="accent">{content.hero.badge}</Badge>
        </div>

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

        <p
          ref={subRef}
          className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary md:text-xl"
        >
          {content.hero.subheadline}
        </p>

        <div ref={ctasRef} className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 text-base font-medium text-background transition-colors hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            {content.hero.ctaPrimary}
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center rounded-md border border-border px-8 py-3 text-base font-medium text-text-primary transition-colors hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            {content.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}
