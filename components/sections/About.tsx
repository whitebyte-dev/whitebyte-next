"use client"

import { useRef } from "react"
import { Target, Focus, MessageSquare, TrendingUp } from "lucide-react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap/register"
import { SectionHeading } from "@/components/ui/SectionHeading"
import content from "@/lib/content/es.json"

const iconMap: Record<string, React.ElementType> = {
  Target,
  Focus,
  MessageSquare,
  TrendingUp,
}

export function About() {
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
            gsap.set([".about-hero", ".about-card", ".about-origin"], {
              autoAlpha: 1,
              y: 0,
            })
            return
          }

          gsap.set(".about-hero", { autoAlpha: 0, y: 30 })
          gsap.to(".about-hero", {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".about-hero",
              start: "top 80%",
              once: true,
            },
          })

          gsap.set(".about-card", { autoAlpha: 0, y: 30 })
          gsap.to(".about-card", {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".about-cards-grid",
              start: "top 80%",
              once: true,
            },
          })

          gsap.set(".about-origin", { autoAlpha: 0, y: 30 })
          gsap.to(".about-origin", {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".about-origin",
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

  const a = content.about

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden">
      {/* Background glow — warm amber */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(30_35%_45%_/_0.06)] blur-[180px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-8 py-36">
        {/* Hero heading */}
        <div className="about-hero">
          <SectionHeading
            badge={a.badge}
            title={a.title}
            titleAccent={a.titleAccent}
            subtitle={a.subtitle}
            className="mb-28"
          />
        </div>

        {/* Philosophy */}
        <div className="mb-28">
          <SectionHeading
            title={a.philosophy.title}
            titleAccent={a.philosophy.titleAccent}
            className="mb-16"
          />

          <div className="about-cards-grid grid gap-6 sm:grid-cols-2">
            {a.philosophy.items.map((item) => {
              const Icon = iconMap[item.icon]
              return (
                <div key={item.title} className="about-card card-glow-wrap">
                  <div className="card-glow-inner p-6 md:p-8">
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

        {/* Origin */}
        <div className="about-origin mx-auto max-w-3xl text-center">
          <h2 className="font-display mb-6 text-3xl font-semibold text-text-primary sm:text-4xl md:text-5xl">
            {a.origin.title}{" "}
            <span className="font-[family-name:var(--font-serif-accent)] italic font-normal text-text-secondary">
              {a.origin.titleAccent}
            </span>
          </h2>
          <p className="text-lg leading-relaxed text-text-secondary">
            {a.origin.description}
          </p>
        </div>
      </div>
    </section>
  )
}
