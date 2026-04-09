import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Contacto | Whitebyte",
  description:
    "Contactanos para hablar sobre tu próximo proyecto digital. Sin compromiso, sin letra chica.",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Contact />
      </main>
      <Footer />
    </>
  )
}
