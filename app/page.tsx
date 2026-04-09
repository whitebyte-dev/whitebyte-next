import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { TechCarousel } from "@/components/sections/TechCarousel"
import { Solutions } from "@/components/sections/Solutions"
import { Process } from "@/components/sections/Process"
import { Portfolio } from "@/components/sections/Portfolio"
import { CtaBanner } from "@/components/sections/CtaBanner"
import { Footer } from "@/components/layout/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechCarousel />
        <Solutions />
        <Process />
        <Portfolio />
        <CtaBanner />
      </main>
      <Footer />
    </>
  )
}
