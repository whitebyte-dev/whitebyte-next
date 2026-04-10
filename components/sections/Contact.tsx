"use client"

import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import { Mail, MessageCircle, Phone } from "lucide-react"
import { gsap } from "@/lib/gsap/register"
import { SectionHeading } from "@/components/ui/SectionHeading"
import content from "@/lib/content/es.json"

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

const inputClass =
  "w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted transition-all duration-300 focus:border-accent/40 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-accent/30 focus:shadow-[0_0_20px_hsl(0_0%_100%_/_0.04)]"

function PillSelector({
  options,
  value,
  onChange,
  icon,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
  icon?: Record<string, React.ElementType>
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isSelected = value === opt
        const Icon = icon?.[opt]
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-300 ${
              isSelected
                ? "border border-white/[0.2] bg-white/[0.08] text-text-primary shadow-[0_0_15px_hsl(0_0%_100%_/_0.04)]"
                : "border border-white/[0.06] bg-white/[0.02] text-text-muted hover:border-white/[0.1] hover:text-text-secondary"
            }`}
          >
            {Icon && <Icon size={14} aria-hidden="true" />}
            {opt}
          </button>
        )
      })}
    </div>
  )
}

const channelIcons: Record<string, React.ElementType> = {
  Email: Mail,
  WhatsApp: MessageCircle,
}

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mountTime = useRef(Date.now())
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errors, setErrors] = useState<FormErrors>({})
  const [values, setValues] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    tipo: "",
    presupuesto: "",
    canal: "",
    mensaje: "",
    _hp: "", // honeypot
  })

  useEffect(() => {
    mountTime.current = Date.now()
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noReduceMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions!.reduceMotion) {
            gsap.set([".contact-col-left", ".contact-col-right"], { autoAlpha: 1, x: 0 })
            return
          }
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
        }
      )
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

    // Honeypot check
    if (values._hp) return

    // Timing check — less than 3 seconds is likely a bot
    if (Date.now() - mountTime.current < 3000) return

    const fieldErrors = validate(values)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setStatus("loading")
    try {
      const { _hp, ...payload } = values
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Error en el servidor")

      setStatus("success")
      setValues({
        nombre: "",
        email: "",
        telefono: "",
        empresa: "",
        tipo: "",
        presupuesto: "",
        canal: "",
        mensaje: "",
        _hp: "",
      })
      setErrors({})
    } catch {
      setStatus("error")
    }
  }

  const c = content.contact
  const f = c.form

  return (
    <section id="contact" className="relative w-full overflow-hidden">
      {/* Stipple texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(0 0% 100% / 0.07) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(270_25%_40%_/_0.05)] blur-[150px]"
        aria-hidden="true"
      />

      <div ref={containerRef} className="relative mx-auto max-w-6xl px-8 py-36">
        <SectionHeading
          badge="Contacto"
          title={c.title}
          titleAccent={(c as Record<string, unknown>).titleAccent as string}
          subtitle={c.subtitle}
          className="mb-20"
        />

        <div className="grid gap-16 md:grid-cols-2">
          {/* Left column — contact info */}
          <div className="contact-col-left space-y-6">
            <p className="text-text-secondary leading-relaxed">
              Ya sea que tengas una idea clara o apenas una necesidad, estamos para ayudarte a encontrar la solución correcta.
            </p>

            {/* Availability */}
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {c.availability}
              <span className="text-text-muted">· {c.timezone}</span>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${c.email}`}
                className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                  <Mail size={18} className="text-text-secondary" aria-hidden="true" />
                </div>
                <span className="text-sm text-text-secondary transition-colors group-hover:text-text-primary">
                  {c.email}
                </span>
              </a>

              <a
                href="https://wa.me/543415159089"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                  <MessageCircle size={18} className="text-text-secondary" aria-hidden="true" />
                </div>
                <span className="text-sm text-text-secondary transition-colors group-hover:text-text-primary">
                  {c.whatsapp}
                </span>
              </a>

              <a
                href="https://instagram.com/whitebyte.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                aria-label="Instagram de Whitebyte"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                  <InstagramIcon size={18} />
                </div>
                <span className="text-sm text-text-secondary transition-colors group-hover:text-text-primary">
                  @whitebyte.dev
                </span>
              </a>
            </div>
          </div>

          {/* Right column — form */}
          <div className="contact-col-right">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Honeypot — invisible to users */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="_hp">No llenar</label>
                <input
                  id="_hp"
                  name="_hp"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values._hp}
                  onChange={(e) => setValues((v) => ({ ...v, _hp: e.target.value }))}
                />
              </div>

              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
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
                    className={inputClass}
                  />
                  {errors.nombre && (
                    <p id="nombre-error" role="alert" className="text-xs text-red-400">
                      {errors.nombre}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
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
                    className={inputClass}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone + Company */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="telefono" className="text-sm font-medium text-text-primary">
                    {f.phone}{" "}
                    <span className="text-xs text-text-muted">{f.phoneOptional}</span>
                  </label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden="true" />
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={values.telefono}
                      onChange={(e) => setValues((v) => ({ ...v, telefono: e.target.value }))}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="empresa" className="text-sm font-medium text-text-primary">
                    {f.company}{" "}
                    <span className="text-xs text-text-muted">{f.companyOptional}</span>
                  </label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    value={values.empresa}
                    onChange={(e) => setValues((v) => ({ ...v, empresa: e.target.value }))}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Project type */}
              <div className="space-y-2.5">
                <p className="text-sm font-medium text-text-primary">{f.projectType}</p>
                <PillSelector
                  options={f.projectTypes}
                  value={values.tipo}
                  onChange={(v) => setValues((prev) => ({ ...prev, tipo: v }))}
                />
              </div>

              {/* Budget */}
              <div className="space-y-2.5">
                <p className="text-sm font-medium text-text-primary">{f.budget}</p>
                <PillSelector
                  options={f.budgets}
                  value={values.presupuesto}
                  onChange={(v) => setValues((prev) => ({ ...prev, presupuesto: v }))}
                />
              </div>

              {/* Preferred channel */}
              <div className="space-y-2.5">
                <p className="text-sm font-medium text-text-primary">{f.channel}</p>
                <PillSelector
                  options={f.channels}
                  value={values.canal}
                  onChange={(v) => setValues((prev) => ({ ...prev, canal: v }))}
                  icon={channelIcons}
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
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
                  className={`${inputClass} resize-none`}
                />
                {errors.mensaje && (
                  <p id="mensaje-error" role="alert" className="text-xs text-red-400">
                    {errors.mensaje}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full cursor-pointer rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-background shadow-[0_0_20px_hsl(0_0%_100%_/_0.1)] transition-all duration-300 hover:bg-accent/90 hover:shadow-[0_0_32px_hsl(0_0%_100%_/_0.15)] disabled:cursor-not-allowed disabled:opacity-60"
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
      </div>
    </section>
  )
}
