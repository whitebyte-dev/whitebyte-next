import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SectionHeading } from "@/components/ui/SectionHeading"
import content from "@/lib/content/es.json"

export const metadata: Metadata = {
  title: "Política de Privacidad | Whitebyte",
  description:
    "Política de privacidad de Whitebyte. Cómo recopilamos, usamos y protegemos tu información.",
}

export default function PrivacyPage() {
  const c = content.privacy

  return (
    <>
      <Navbar />
      <main className="relative pt-20">
        {/* Warm glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-48 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[hsl(30_35%_45%_/_0.04)] blur-[180px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl px-8 py-36">
          <SectionHeading
            badge={c.badge}
            title={c.title}
            titleAccent={c.titleAccent}
            className="mb-6"
          />

          <p className="mb-16 text-center text-sm text-text-muted">
            {c.lastUpdated}
          </p>

          <div className="space-y-10">
            {c.sections.map((section) => (
              <div key={section.title}>
                <h3 className="font-display mb-3 text-lg font-semibold text-text-primary">
                  {section.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
