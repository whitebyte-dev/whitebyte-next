import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { About } from "@/components/sections/About"
import { CtaBanner } from "@/components/sections/CtaBanner"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Sobre nosotros | Whitebyte",
  description:
    "Somos un estudio digital especializado en diseño, desarrollo y automatización. Conocé cómo trabajamos.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <About />
        <CtaBanner />
      </main>
      <Footer />
    </>
  )
}
