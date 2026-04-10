import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { CaseStudy } from "@/components/sections/CaseStudy"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "El Terciario Urquiza | Caso de estudio | Whitebyte",
  description:
    "Rediseño integral de la plataforma digital de un instituto terciario. Sitio público, panel admin, RBAC, generación de PDFs y más.",
}

export default function CaseStudyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <CaseStudy />
      </main>
      <Footer />
    </>
  )
}
