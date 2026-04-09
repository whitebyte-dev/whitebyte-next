"use client"

const techs = [
  "react",
  "nextjs",
  "typescript",
  "tailwind",
  "vite",
  "framer",
  "zustand",
  "nodejs",
  "python",
  "express",
  "prisma",
  "jwt",
  "postgresql",
  "mysql",
  "mongodb",
  "docker",
  "git",
  "github",
  "vercel",
  "render",
  "figma",
  "notion",
]

// 4x for seamless infinite loop
const items = [...techs, ...techs, ...techs, ...techs]

export function TechCarousel() {
  return (
    <section
      className="relative w-full overflow-hidden border-y border-white/[0.06] bg-background py-8"
      aria-label="Tecnologías"
    >
      <div className="flex animate-[scroll_80s_linear_infinite] w-max gap-16">
        {items.map((tech, i) => (
          <div
            key={`${tech}-${i}`}
            className="group relative flex items-center justify-center transition-all duration-300"
          >
            <div className="absolute inset-[-6px] rounded-full opacity-0 blur-[10px] transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: "conic-gradient(from 180deg, hsl(280 20% 45% / 0.25), hsl(220 20% 50% / 0.2), hsl(30 18% 48% / 0.2), hsl(280 20% 45% / 0.25))",
              }}
            />
            <img
              src={`/assets/stack/${tech}.svg`}
              alt={tech}
              className="relative h-8 w-8 opacity-40 transition-opacity duration-300 group-hover:opacity-70"
              style={{
                filter: "brightness(0) invert(0.65)",
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
