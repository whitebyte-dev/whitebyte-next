import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import content from "@/lib/content/es.json"

export default function NotFound() {
  const c = content.notFound

  return (
    <>
      <Navbar />
      <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-8 pt-20">
        {/* Warm glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(30_35%_45%_/_0.06)] blur-[180px]"
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

        <div className="relative text-center">
          {/* Big 404 watermark */}
          <div className="pointer-events-none select-none" aria-hidden="true">
            <span className="font-display text-[12rem] font-bold leading-none text-white/[0.03] md:text-[16rem]">
              404
            </span>
          </div>

          {/* Content overlaid on watermark */}
          <div className="-mt-20 md:-mt-28">
            <h1 className="font-display text-4xl font-semibold text-text-primary md:text-5xl">
              {c.title}{" "}
              <span className="font-[family-name:var(--font-serif-accent)] italic font-normal text-text-secondary">
                {c.titleAccent}
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-text-secondary">
              {c.subtitle}
            </p>

            <div className="mt-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:bg-white/90"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                {c.cta}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
