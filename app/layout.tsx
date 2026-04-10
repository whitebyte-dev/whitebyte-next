import type { Metadata } from "next"
import { Sora, Inter, Playfair_Display, DM_Serif_Display } from "next/font/google"
import "./globals.css"
import { LenisProvider } from "@/components/providers/LenisProvider"
import { NoiseOverlay } from "@/components/ui/NoiseOverlay"
import { WhatsAppButton } from "@/components/ui/WhatsAppButton"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["italic"],
  weight: ["400", "700"],
})

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif-accent",
  display: "swap",
  style: ["italic"],
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "Whitebyte | Digital Product Studio",
  description:
    "Diseñamos y desarrollamos productos digitales a medida. Sitios web, aplicaciones, automatización y consultoría para tu negocio.",
  openGraph: {
    title: "Whitebyte | Digital Product Studio",
    description:
      "Diseñamos y desarrollamos productos digitales a medida. Sitios web, aplicaciones, automatización y consultoría para tu negocio.",
    url: "https://whitebyte.dev",
    siteName: "Whitebyte",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whitebyte | Digital Product Studio",
  },
  metadataBase: new URL("https://whitebyte.dev"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`dark ${sora.variable} ${inter.variable} ${playfair.variable} ${dmSerif.variable}`}>
      <body>
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          Saltar al contenido
        </a>
        <NoiseOverlay />
        <LenisProvider>
          {children}
          <WhatsAppButton />
        </LenisProvider>
      </body>
    </html>
  )
}
