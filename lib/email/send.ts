import { Resend } from "resend"

interface ContactEmailData {
  nombre: string
  email: string
  empresa?: string
  mensaje: string
}

export async function sendContactEmail(data: ContactEmailData) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: "Whitebyte Contact <contacto@whitebyte.dev>",
    to: "contacto@whitebyte.dev",
    replyTo: data.email,
    subject: `Nuevo contacto: ${data.nombre}`,
    html: `
      <h2>Nuevo mensaje desde whitebyte.dev</h2>
      <p><strong>Nombre:</strong> ${data.nombre}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.empresa ? `<p><strong>Empresa/Rubro:</strong> ${data.empresa}</p>` : ""}
      <p><strong>Mensaje:</strong></p>
      <p>${data.mensaje.replace(/\n/g, "<br>")}</p>
    `,
  })

  if (error) throw new Error(error.message)
}
