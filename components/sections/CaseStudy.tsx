"use client"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Globe, Shield, FileText, Lock, ArrowRight } from "lucide-react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap/register"
import { SectionHeading } from "@/components/ui/SectionHeading"
import content from "@/lib/content/es.json"

const CompareSlider = dynamic(
  () => import("@/components/ui/CompareSlider").then((m) => m.CompareSlider),
  { ssr: false }
)

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Shield,
  FileText,
  Lock,
}

const c = content.caseStudy.urquiza

export function CaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeComparison, setActiveComparison] = useState(0)

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
            gsap.set(".cs-fade", { autoAlpha: 1, y: 0 })
            return
          }

          gsap.set(".cs-fade", { autoAlpha: 0, y: 30 })

          document.querySelectorAll(".cs-section").forEach((section) => {
            const items = section.querySelectorAll(".cs-fade")
            if (!items.length) return
            gsap.to(items, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true,
              },
            })
          })
        }
      )
      return () => mm.revert()
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef}>
      {/* ── Hero ── */}
      <section className="cs-section relative w-full overflow-hidden min-h-[100vw] md:min-h-[60vh] lg:min-h-[80vh] flex items-center">
        {/* Depth background — full cover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10] blur-[3px]"
          aria-hidden="true"
          style={{
            backgroundImage: "url('/assets/background/dddepth-312.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Dark overlay + vignette to push content forward */}
        <div
          className="pointer-events-none absolute inset-0 bg-background/40"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse at center, transparent 20%, hsl(0 0% 3%) 80%)",
          }}
        />

        {/* Warm glow from top */}
        <div
          className="pointer-events-none absolute left-1/2 -top-24 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[hsl(30_40%_45%_/_0.09)] blur-[180px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-5xl px-8 py-36 w-full">
          <div className="cs-fade">
            <SectionHeading
              badge={c.badge}
              title={c.title}
              titleAccent={c.titleAccent}
              subtitle={c.subtitle}
              className="mb-16"
            />
          </div>

          {/* Project meta */}
          <div className="cs-fade mx-auto grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { label: "Cliente", value: c.overview.client },
              { label: "Industria", value: c.overview.industry },
              { label: "Duración", value: c.overview.duration },
              { label: "Estado", value: c.overview.status },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm font-medium text-text-primary">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Challenge ── */}
      <section className="cs-section relative w-full overflow-hidden">
        {/* Warm centered glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(30_35%_45%_/_0.05)] blur-[160px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl px-8 py-28">
          <div className="cs-fade">
            <SectionHeading
              title={c.overview.title}
              titleAccent={c.overview.titleAccent}
              className="mb-12"
            />
          </div>
          <p className="cs-fade mx-auto max-w-3xl text-center text-lg leading-relaxed text-text-secondary">
            {c.overview.description}
          </p>
        </div>
      </section>

      {/* ── Before / After ── */}
      <section className="cs-section relative w-full overflow-hidden">
        {/* Warm glow from left */}
        <div
          className="pointer-events-none absolute -left-12 top-1/2 h-[500px] w-[600px] -translate-y-1/2 rounded-full bg-[hsl(30_35%_45%_/_0.06)] blur-[160px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-5xl px-8 py-28">
          <div className="cs-fade">
            <SectionHeading
              title="Antes y"
              titleAccent="después"
              subtitle="El mismo instituto, otra experiencia. Compará sección por sección cómo cambió la plataforma."
              className="mb-16"
            />
          </div>

          {/* Tab selector */}
          <div className="cs-fade mb-12 flex flex-wrap justify-center gap-3">
            {c.comparisons.map((comp, i) => (
              <button
                key={comp.label}
                type="button"
                onClick={() => setActiveComparison(i)}
                className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeComparison === i
                    ? "border border-white/[0.2] bg-white/[0.08] text-text-primary shadow-[0_0_15px_hsl(0_0%_100%_/_0.04)]"
                    : "border border-white/[0.06] bg-white/[0.02] text-text-muted hover:border-white/[0.1] hover:text-text-secondary"
                }`}
              >
                {comp.label}
              </button>
            ))}
          </div>

          {/* Compare slider */}
          <div className="cs-fade card-glow-wrap">
            <div className="card-glow-inner overflow-hidden rounded-[calc(1rem-1px)]">
              <div className="aspect-[16/9]">
                <CompareSlider
                  beforeSrc={c.comparisons[activeComparison].before}
                  afterSrc={c.comparisons[activeComparison].after}
                  beforeLabel={c.beforeLabel}
                  afterLabel={c.afterLabel}
                  beforeAlt={`${c.comparisons[activeComparison].label} antes`}
                  afterAlt={`${c.comparisons[activeComparison].label} después`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Solution ── */}
      <section className="cs-section relative w-full overflow-hidden">
        {/* Warm glow from right */}
        <div
          className="pointer-events-none absolute -right-12 top-1/3 h-[500px] w-[600px] rounded-full bg-[hsl(30_35%_45%_/_0.05)] blur-[160px]"
          aria-hidden="true"
        />

        {/* Stipple texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.3]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(0 0% 100% / 0.07) 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-8 py-28">
          <div className="cs-fade">
            <SectionHeading
              title={c.solution.title}
              titleAccent={c.solution.titleAccent}
              subtitle={c.solution.description}
              className="mb-20"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {c.solution.highlights.map((item) => {
              const Icon = iconMap[item.icon]
              return (
                <div key={item.title} className="cs-fade card-glow-wrap">
                  <div className="card-glow-inner p-8">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                      {Icon && (
                        <Icon
                          size={20}
                          className="text-text-secondary"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <h3 className="font-display mb-3 text-lg font-semibold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="cs-section relative w-full overflow-hidden">
        {/* Dot grid pattern */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 10v4M10 12h4' stroke='rgba(255,255,255,0.05)' stroke-width='1' stroke-linecap='round'/%3E%3C/svg%3E")`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Warm diagonal glows */}
        <div
          className="pointer-events-none absolute -left-12 -top-12 h-[500px] w-[500px] rounded-full bg-[hsl(30_40%_45%_/_0.06)] blur-[160px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-12 -right-12 h-[400px] w-[400px] rounded-full bg-[hsl(25_35%_40%_/_0.05)] blur-[160px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl px-8 py-28">
          <div className="cs-fade">
            <SectionHeading
              title={c.tech.title}
              titleAccent={c.tech.titleAccent}
              className="mb-16"
            />
          </div>

          <div className="cs-fade space-y-4">
            {c.tech.stack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-surface px-6 py-4 transition-all duration-300 hover:border-white/[0.12] hover:bg-surface-raised"
              >
                <span className="text-sm font-semibold text-text-primary">
                  {tech.name}
                </span>
                <span className="text-sm text-text-muted">
                  {tech.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact ── */}
      <section className="cs-section relative w-full overflow-hidden">
        <div className="relative mx-auto max-w-5xl px-8 py-28">
          <div className="cs-fade">
            <SectionHeading
              title={c.impact.title}
              titleAccent={c.impact.titleAccent}
              className="mb-16"
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.impact.items.map((item) => (
              <div key={item.label} className="cs-fade text-center">
                <p className="font-display text-5xl font-bold text-text-primary">
                  {item.metric}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cs-section relative w-full overflow-hidden">
        {/* Warm radial glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(30_40%_45%_/_0.07)] blur-[180px]"
          aria-hidden="true"
        />

        {/* Stipple texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(0 0% 100% / 0.07) 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />

        {/* Top separator line with warm gradient */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-2xl"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(35 40% 55% / 0.25), transparent)",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-8 py-36">
          <div className="cs-fade text-center">
            <h2 className="font-display text-5xl font-semibold text-text-primary md:text-6xl lg:text-7xl">
              {c.cta.headline}{" "}
              <span className="font-[family-name:var(--font-serif-accent)] italic font-normal bg-gradient-to-r from-[hsl(35_40%_65%)] to-[hsl(25_35%_55%)] bg-clip-text text-transparent">
                {c.cta.headlineAccent}
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
              {c.cta.subtitle}
            </p>

            <div className="mt-10 inline-block">
              <span className="pill-glow-wrap group inline-flex">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2.5 rounded-full bg-white px-10 py-4 text-base font-medium text-background transition-all duration-300 group-hover:bg-white/95"
                >
                  {c.cta.button}
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
    </div>
  )
}
