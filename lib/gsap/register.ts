import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

// Register all plugins once — imported in layout.tsx
gsap.registerPlugin(ScrollTrigger, useGSAP)

// Project-wide animation defaults
gsap.defaults({
  ease: "power2.out",
  duration: 0.6,
})

export { gsap, ScrollTrigger }
