"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { Mail, MessageCircle } from "lucide-react"

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}
import { gsap } from "@/lib/gsap/register"
import { SectionHeading } from "@/components/ui/SectionHeading"
import content from "@/lib/content/es.json"

type FormStatus = "idle" | "loading" | "success" | "error"

interface FormErrors {
  nombre?: string
  email?: string
  mensaje?: string
}

function validate(values: { nombre: string; email: string; mensaje: string }): FormErrors {
  const errors: FormErrors = {}
  if (!values.nombre.trim()) errors.nombre = "El nombre es requerido"
  if (!values.email.trim()) {
    errors.email = "El email es requerido"
  } else if (!values.email.includes("@")) {
    errors.email = "El email no es válido"
  }
  if (!values.mensaje.trim()) errors.mensaje = "El mensaje es requerido"
  return errors
}

export function Contact() {
  const containerRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errors, setErrors] = useState<FormErrors>({})
  const [values, setValues] = useState({ nombre: "", email: "", empresa: "", mensaje: "" })

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".contact-col-left", { autoAlpha: 0, x: -40 })
        gsap.set(".contact-col-right", { autoAlpha: 0, x: 40 })
        gsap.to([".contact-col-left", ".contact-col-right"], {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        })
      })
      return () => mm.revert()
    },
    { scope: containerRef }
  )

  function handleBlur(field: "nombre" | "email" | "mensaje") {
    const fieldErrors = validate(values)
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fieldErrors = validate(values)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!res.ok) throw new Error("Error en el servidor")

      setStatus("success")
      setValues({ nombre: "", email: "", empresa: "", mensaje: "" })
      setErrors({})
    } catch {
      setStatus("error")
    }
  }

  const f = content.contact.form

  return (
    <section ref={containerRef} id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading title={content.contact.title} subtitle={content.contact.subtitle} />

      <div className="grid gap-16 md:grid-cols-2">
        {/* Left column */}
        <div className="contact-col-left space-y-8">
          <p className="text-text-secondary leading-relaxed">
            Ya sea que tengas una idea clara o apenas una necesidad, estamos para ayudarte a encontrar la solución correcta.
          </p>

          <div className="space-y-4">
            <a
              href={`mailto:${content.contact.email}`}
              className="flex items-center gap-3 text-text-secondary transition-colors hover:text-accent"
            >
              <Mail size={18} aria-hidden="true" />
              <span>{content.contact.email}</span>
            </a>

            <a
              href="https://wa.me/5491100000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-text-secondary transition-colors hover:text-accent"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span>{content.contact.whatsapp}</span>
            </a>

            <a
              href="https://instagram.com/whitebyte.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-text-secondary transition-colors hover:text-accent"
              aria-label="Instagram de Whitebyte"
            >
              <InstagramIcon size={18} />
              <span>@whitebyte.dev</span>
            </a>
          </div>
        </div>

        {/* Right column — form */}
        <div className="contact-col-right">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="nombre" className="text-sm font-medium text-text-primary">
                {f.name}
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={values.nombre}
                onChange={(e) => setValues((v) => ({ ...v, nombre: e.target.value }))}
                onBlur={() => handleBlur("nombre")}
                aria-describedby={errors.nombre ? "nombre-error" : undefined}
                aria-invalid={!!errors.nombre}
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              {errors.nombre && (
                <p id="nombre-error" role="alert" className="text-xs text-red-400">
                  {errors.nombre}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-text-primary">
                {f.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                onBlur={() => handleBlur("email")}
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={!!errors.email}
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              {errors.email && (
                <p id="email-error" role="alert" className="text-xs text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="empresa" className="text-sm font-medium text-text-primary">
                {f.company} <span className="text-text-muted text-xs">{f.companyOptional}</span>
              </label>
              <input
                id="empresa"
                name="empresa"
                type="text"
                value={values.empresa}
                onChange={(e) => setValues((v) => ({ ...v, empresa: e.target.value }))}
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="mensaje" className="text-sm font-medium text-text-primary">
                {f.message}
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                value={values.mensaje}
                onChange={(e) => setValues((v) => ({ ...v, mensaje: e.target.value }))}
                onBlur={() => handleBlur("mensaje")}
                aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
                aria-invalid={!!errors.mensaje}
                className="w-full resize-none rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              {errors.mensaje && (
                <p id="mensaje-error" role="alert" className="text-xs text-red-400">
                  {errors.mensaje}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-md bg-accent px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              {status === "loading" ? f.submitting : f.submit}
            </button>

            {status === "success" && (
              <p role="status" className="text-center text-sm text-accent">
                {f.success}
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="text-center text-sm text-red-400">
                {f.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
