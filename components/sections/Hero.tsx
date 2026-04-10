"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap/register"
import Link from "next/link"
import { ChevronDown, ArrowRight } from "lucide-react"
import content from "@/lib/content/es.json"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noReduceMotion: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (ctx.conditions!.reduceMotion) {
            gsap.set(".hero-fade", { autoAlpha: 1, y: 0 })
            return
          }
          gsap.from(".hero-fade", {
            autoAlpha: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.14,
            ease: "power2.out",
          })
        }
      )
      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  const headlineParts = content.hero.headline.split("hecha")

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-8 pb-16"
    >
      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 3%) 100%)",
        }}
      />

      {/* Geometric background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/assets/background/qqquad.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Double breathing glow — gray */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="absolute h-[700px] w-[700px] rounded-full bg-[hsl(30_40%_45%_/_0.12)] blur-[140px]"
          style={{ animation: "breathe 6s ease-in-out infinite" }}
        />
        <div
          className="absolute h-[450px] w-[450px] rounded-full bg-[hsl(25_35%_40%_/_0.09)] blur-[120px]"
          style={{ animation: "breathe-alt 8s ease-in-out infinite" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="hero-fade mb-8">
          <span className="badge-shimmer-outer inline-flex">
            <span className="inline-flex items-center rounded-full bg-background px-5 py-2 text-xs font-medium tracking-wide text-text-secondary">
              Digital Product Studio
            </span>
          </span>
        </div>

        {/* Headline — "hecha" in DM Serif Display italic */}
        <h1 className="hero-fade font-display text-5xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-6xl md:text-7xl lg:text-8xl">
          {headlineParts[0]}
          <span className="font-[family-name:var(--font-serif-accent)] italic font-normal text-text-secondary">
            hecha
          </span>
          {headlineParts[1]}
        </h1>

        {/* Subheadline */}
        <p className="hero-fade mx-auto mt-8 max-w-lg text-lg leading-relaxed text-text-secondary">
          {content.hero.subheadline}
        </p>

        {/* CTAs */}
        <div className="hero-fade mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
          <Link
            href="/contacto"
            className="group inline-flex items-center gap-2.5 rounded-full bg-white px-10 py-4 text-base font-medium text-background transition-all duration-300 hover:bg-white/90"
          >
            {content.hero.ctaPrimary}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            onClick={() => window.__lenis?.scrollTo("#solutions", { offset: -80 })}
            className="cursor-pointer rounded-full border border-white/[0.10] bg-white/[0.05] px-10 py-4 text-base font-medium text-text-secondary transition-all duration-300 hover:border-white/[0.20] hover:bg-white/[0.08] hover:text-text-primary"
          >
            {content.hero.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-fade absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <button
          type="button"
          onClick={() => window.__lenis?.scrollTo("#solutions", { offset: -80 })}
          className="flex cursor-pointer flex-col items-center gap-1.5 text-text-muted transition-colors duration-300 hover:text-text-secondary"
        >
          <span className="text-[10px] font-light tracking-[0.25em] uppercase">
            Scroll
          </span>
          <ChevronDown
            size={16}
            style={{ animation: "float-down 2.5s ease-in-out infinite" }}
          />
        </button>
      </div>
    </section>
  )
}
