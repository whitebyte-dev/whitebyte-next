import { Resend } from "resend"
import { render } from "@react-email/components"
import { ContactEmail } from "./contact-template"

interface ContactEmailData {
  nombre: string
  email: string
  telefono?: string
  empresa?: string
  tipo?: string
  presupuesto?: string
  canal?: string
  mensaje: string
}

export async function sendContactEmail(data: ContactEmailData) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const html = await render(ContactEmail(data))

  const { error } = await resend.emails.send({
    from: "Whitebyte Contact <contacto@whitebyte.dev>",
    to: "contacto@whitebyte.dev",
    replyTo: data.email,
    subject: `Nuevo contacto: ${data.nombre}`,
    html,
  })

  if (error) throw new Error(error.message)
}
