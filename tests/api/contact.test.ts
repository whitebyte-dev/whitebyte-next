import { describe, it, expect, vi, beforeEach } from "vitest"
import { POST } from "@/app/api/contact/route"
import { NextRequest } from "next/server"

// Mock Resend
vi.mock("resend", () => {
  const mockSend = vi.fn().mockResolvedValue({ error: null })
  function MockResend() {
    return { emails: { send: mockSend } }
  }
  return { Resend: MockResend }
})

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
}

describe("POST /api/contact", () => {
  it("returns 200 with valid payload", async () => {
    const req = makeRequest({
      nombre: "Juan",
      email: "juan@test.com",
      mensaje: "Hola, me interesa una web",
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it("returns 200 with all optional fields", async () => {
    const req = makeRequest({
      nombre: "María",
      email: "maria@test.com",
      telefono: "+5491155554444",
      empresa: "Acme",
      tipo: "Sitio web",
      presupuesto: "$500 - 2k",
      canal: "WhatsApp",
      mensaje: "Necesito una landing page",
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it("returns 400 when nombre is missing", async () => {
    const req = makeRequest({ email: "juan@test.com", mensaje: "Hola" })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe("Nombre es requerido")
  })

  it("returns 400 when email is invalid", async () => {
    const req = makeRequest({ nombre: "Juan", email: "not-an-email", mensaje: "Hola" })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe("Email inválido")
  })

  it("returns 400 when mensaje is missing", async () => {
    const req = makeRequest({ nombre: "Juan", email: "juan@test.com" })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe("Mensaje es requerido")
  })

  it("returns 400 for invalid JSON", async () => {
    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: "not json",
      headers: { "Content-Type": "application/json" },
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
