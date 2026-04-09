import { NextRequest, NextResponse } from "next/server"
import { sendContactEmail } from "@/lib/email/send"

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const { nombre, email, telefono, empresa, tipo, presupuesto, canal, mensaje } = body as Record<string, string>

  if (!nombre || typeof nombre !== "string" || nombre.trim().length === 0) {
    return NextResponse.json({ error: "Nombre es requerido" }, { status: 400 })
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 })
  }

  if (!mensaje || typeof mensaje !== "string" || mensaje.trim().length === 0) {
    return NextResponse.json({ error: "Mensaje es requerido" }, { status: 400 })
  }

  try {
    await sendContactEmail({
      nombre: nombre.trim(),
      email: email.trim(),
      telefono: telefono?.trim(),
      empresa: empresa?.trim(),
      tipo: tipo?.trim(),
      presupuesto: presupuesto?.trim(),
      canal: canal?.trim(),
      mensaje: mensaje.trim(),
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 500 })
  }
}
