import type { Metadata } from "next"
import { Sora, Inter } from "next/font/google"
import "./globals.css"

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

export const metadata: Metadata = {
  title: "Whitebyte — Simplicidad hecha software",
  description:
    "Soluciones digitales a medida para tu negocio. Presencia digital, sitios web y automatización.",
  openGraph: {
    title: "Whitebyte — Simplicidad hecha software",
    description:
      "Soluciones digitales a medida para tu negocio. Presencia digital, sitios web y automatización.",
    url: "https://whitebyte.dev",
    siteName: "Whitebyte",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whitebyte — Simplicidad hecha software",
  },
  metadataBase: new URL("https://whitebyte.dev"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
