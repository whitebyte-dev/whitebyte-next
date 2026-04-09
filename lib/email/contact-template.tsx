import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Column,
  Section,
  Text,
} from "@react-email/components"

interface ContactEmailProps {
  nombre: string
  email: string
  telefono?: string
  empresa?: string
  tipo?: string
  presupuesto?: string
  canal?: string
  mensaje: string
}

export function ContactEmail(props: ContactEmailProps) {
  const {
    nombre,
    email,
    telefono,
    empresa,
    tipo,
    presupuesto,
    canal,
    mensaje,
  } = props

  const year = new Date().getFullYear()

  return (
    <Html>
      <Head />
      <Preview>{nombre} quiere hablar sobre {tipo || "un proyecto"}</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header with warm accent line */}
          <Section style={headerAccent} />
          <Section style={header}>
            <Row>
              <Column>
                <Text style={logo}>
                  <span style={logoItalic}>White</span>
                  <span style={logoBold}>byte</span>
                </Text>
              </Column>
              <Column align="right">
                <Text style={headerBadge}>Nueva consulta</Text>
              </Column>
            </Row>
          </Section>

          {/* Main content */}
          <Section style={card}>
            {/* Greeting */}
            <Heading style={heading}>
              {nombre} se puso en contacto
            </Heading>

            {/* Contact details */}
            <Section style={fieldGroup}>
              <Row>
                <Column style={fieldColumn}>
                  <Text style={fieldLabel}>Nombre</Text>
                  <Text style={fieldValue}>{nombre}</Text>
                </Column>
                <Column style={fieldColumn}>
                  <Text style={fieldLabel}>Email</Text>
                  <Link href={`mailto:${email}`} style={fieldLink}>{email}</Link>
                </Column>
              </Row>
            </Section>

            {(telefono || empresa) && (
              <Section style={fieldGroup}>
                <Row>
                  {telefono && (
                    <Column style={fieldColumn}>
                      <Text style={fieldLabel}>Telefono</Text>
                      <Text style={fieldValue}>{telefono}</Text>
                    </Column>
                  )}
                  {empresa && (
                    <Column style={fieldColumn}>
                      <Text style={fieldLabel}>Empresa / Rubro</Text>
                      <Text style={fieldValue}>{empresa}</Text>
                    </Column>
                  )}
                </Row>
              </Section>
            )}

            <Hr style={divider} />

            {/* Project scope */}
            {(tipo || presupuesto || canal) && (
              <>
                <Text style={sectionTitle}>Detalles del proyecto</Text>
                <Section style={pillContainer}>
                  <Row>
                    {tipo && (
                      <Column style={fieldColumn}>
                        <Text style={fieldLabel}>Necesidad</Text>
                        <Text style={pill}>{tipo}</Text>
                      </Column>
                    )}
                    {presupuesto && (
                      <Column style={fieldColumn}>
                        <Text style={fieldLabel}>Presupuesto</Text>
                        <Text style={pill}>{presupuesto}</Text>
                      </Column>
                    )}
                  </Row>
                </Section>

                {canal && (
                  <Section style={pillContainer}>
                    <Text style={fieldLabel}>Contactar por</Text>
                    <Text style={pill}>{canal}</Text>
                  </Section>
                )}

                <Hr style={divider} />
              </>
            )}

            {/* Message */}
            <Text style={sectionTitle}>Mensaje</Text>
            <Section style={messageBox}>
              <Text style={messageText}>{mensaje}</Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={footerDivider} />
            <Text style={footerBrand}>
              <span style={logoItalic}>White</span>
              <span style={logoBold}>byte</span>
              <span style={footerDot}> · </span>
              <span style={footerTagline}>Digital Product Studio</span>
            </Text>
            <Text style={footerCopyright}>
              &copy; {year} Whitebyte. Todos los derechos reservados.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// — Colors —

const colors = {
  bg: "#050505",
  cardBg: "#0a0a0a",
  cardBorder: "#1a1a1a",
  text: "#e8e7eb",
  textMuted: "#6b6879",
  textDim: "#3d3a47",
  accent: "#c4a882",
  accentDim: "#8a7a65",
  white: "#fafafa",
  divider: "#151515",
}

// — Styles —

const body: React.CSSProperties = {
  backgroundColor: colors.bg,
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  margin: 0,
  padding: "40px 0",
}

const container: React.CSSProperties = {
  maxWidth: "580px",
  margin: "0 auto",
}

const headerAccent: React.CSSProperties = {
  height: "3px",
  borderRadius: "4px 4px 0 0",
  background: `linear-gradient(90deg, ${colors.accentDim}, ${colors.accent}, ${colors.accentDim})`,
}

const header: React.CSSProperties = {
  padding: "28px 36px 20px",
}

const logo: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  margin: 0,
  lineHeight: "1",
}

const logoItalic: React.CSSProperties = {
  color: colors.textMuted,
  fontStyle: "italic",
  fontFamily: "Georgia, 'Times New Roman', serif",
}

const logoBold: React.CSSProperties = {
  color: colors.white,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
}

const headerBadge: React.CSSProperties = {
  display: "inline-block",
  color: colors.accent,
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  backgroundColor: "#1a1610",
  border: `1px solid ${colors.accentDim}33`,
  borderRadius: "9999px",
  padding: "5px 14px",
  margin: 0,
}

const card: React.CSSProperties = {
  backgroundColor: colors.cardBg,
  border: `1px solid ${colors.cardBorder}`,
  borderRadius: "16px",
  padding: "36px",
  margin: "0 12px",
}

const heading: React.CSSProperties = {
  color: colors.white,
  fontSize: "22px",
  fontWeight: 600,
  margin: "0 0 28px",
  lineHeight: "1.3",
}

const fieldGroup: React.CSSProperties = {
  marginBottom: "4px",
}

const fieldColumn: React.CSSProperties = {
  verticalAlign: "top",
  paddingRight: "16px",
  width: "50%",
}

const fieldLabel: React.CSSProperties = {
  color: colors.textDim,
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  margin: "0 0 6px",
}

const fieldValue: React.CSSProperties = {
  color: colors.text,
  fontSize: "14px",
  margin: "0 0 16px",
  lineHeight: "1.4",
}

const fieldLink: React.CSSProperties = {
  color: colors.accent,
  fontSize: "14px",
  textDecoration: "none",
  display: "block",
  marginBottom: "16px",
}

const divider: React.CSSProperties = {
  borderColor: colors.divider,
  borderWidth: "1px",
  margin: "24px 0",
}

const sectionTitle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "13px",
  fontWeight: 600,
  margin: "0 0 14px",
}

const pillContainer: React.CSSProperties = {
  marginBottom: "4px",
}

const pill: React.CSSProperties = {
  display: "inline-block",
  color: colors.text,
  fontSize: "13px",
  backgroundColor: "#111111",
  border: `1px solid ${colors.cardBorder}`,
  borderRadius: "9999px",
  padding: "7px 18px",
  margin: "0 0 14px",
}

const messageBox: React.CSSProperties = {
  backgroundColor: "#080808",
  border: `1px solid ${colors.divider}`,
  borderRadius: "12px",
  padding: "20px",
}

const messageText: React.CSSProperties = {
  color: colors.text,
  fontSize: "14px",
  lineHeight: "1.75",
  margin: 0,
  whiteSpace: "pre-wrap" as const,
}

const footer: React.CSSProperties = {
  padding: "24px 36px 8px",
}

const footerDivider: React.CSSProperties = {
  borderColor: colors.divider,
  borderWidth: "1px",
  margin: "0 0 24px",
}

const footerBrand: React.CSSProperties = {
  fontSize: "14px",
  margin: "0 0 6px",
  textAlign: "center" as const,
}

const footerDot: React.CSSProperties = {
  color: colors.textDim,
}

const footerTagline: React.CSSProperties = {
  color: colors.textDim,
  fontSize: "12px",
  fontWeight: 400,
}

const footerCopyright: React.CSSProperties = {
  color: colors.textDim,
  fontSize: "11px",
  margin: 0,
  textAlign: "center" as const,
}
