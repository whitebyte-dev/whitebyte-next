import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { Solutions } from "@/components/sections/Solutions"
import { Process } from "@/components/sections/Process"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <Process />
      </main>
    </>
  )
}
