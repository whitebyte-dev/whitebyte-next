# Whitebyte Landing Page — Design Spec

**Date:** 2026-04-07
**Project:** whitebyte.dev
**Scope:** Landing page completa — from zero to deploy

---

## 1. Propósito y Contexto

Whitebyte es una consultora de soluciones digitales. Ofrece presencia digital, sitios web completos y automatización para un público amplio: peluquerías, médicos, mecánicos, PYMEs, freelancers y emprendedores.

La propuesta de valor central es **transformación**: no se vende tecnología, se venden resultados. El slogan — "Simplicidad hecha software" — refleja la filosofía de que el software debe sentirse simple para quien lo usa, aunque sea complejo de construir.

La landing tiene un único objetivo: **convertir visitantes en leads** via formulario de contacto o WhatsApp.

---

## 2. Stack Técnico

| Tecnología | Rol |
|---|---|
| Next.js 15 (App Router) | Framework principal |
| TypeScript | Tipado estático |
| Tailwind CSS v4 | Estilos — config 100% en `global.css` |
| GSAP + ScrollTrigger | Todas las animaciones |
| @gsap/react (`useGSAP`) | Integración GSAP con React (cleanup automático) |
| Lenis | Smooth scroll — integrado con ScrollTrigger via `scrollerProxy` |
| Aceternity UI | Componentes visuales premium |
| Magic UI | Text reveal y efectos adicionales |
| Shadcn/ui | Componentes funcionales (form, inputs, button) |
| react-compare-slider | Before/after slider del portfolio |
| Resend | Envío de emails desde el formulario |
| Vercel | Deploy |

**Decisiones clave:**
- Solo GSAP para animaciones — sin Framer Motion para evitar redundancia
- Tailwind v4 sin `tailwind.config.js` — todo via `@theme` en `global.css`
- Strings en `lib/content/es.json` desde el día uno (i18n-ready)
- No se implementa i18n ahora — arquitectura preparada para el futuro

---

## 3. Sistema de Design Tokens

Todos los tokens definidos en `app/global.css` via `@theme`. Formato HSL.

```css
@import "tailwindcss";

@theme {
  /* Backgrounds */
  --color-background:     hsl(0 0% 3%);
  --color-surface:        hsl(0 0% 7%);
  --color-surface-raised: hsl(0 0% 10%);

  /* Borders */
  --color-border:         hsl(0 0% 12%);
  --color-border-subtle:  hsl(0 0% 8%);

  /* Text */
  --color-text-primary:   hsl(0 0% 98%);
  --color-text-secondary: hsl(240 5% 65%);
  --color-text-muted:     hsl(240 4% 32%);

  /* Accent (verde) */
  --color-accent:         hsl(142 69% 58%);
  --color-accent-dim:     hsl(142 72% 29%);
  --color-accent-glow:    hsl(142 69% 58% / 0.15);

  /* Typography */
  --font-display: "Sora", sans-serif;
  --font-body:    "Inter", sans-serif;
}
```

**Reglas de uso:**
- Nunca hex hardcodeado en componentes — siempre tokens
- `font-display` solo para logo y headlines principales
- `font-body` (Inter) para todo lo demás
- `accent-glow` para halos, glows y hover effects sutiles

---

## 4. Tipografía

| Uso | Font | Peso | Tamaño referencial |
|---|---|---|---|
| Logo | Sora | 700 | 20px |
| Hero headline | Sora | 700 | 72–80px desktop / 40px mobile |
| Sección títulos | Sora | 600 | 36–48px |
| Body / párrafos | Inter | 400 | 16px base, line-height 1.6 |
| Labels / badges | Inter | 500 | 12–14px |
| Botones | Inter | 500 | 14–16px |

Fuentes cargadas via Google Fonts con `display=swap` para evitar FOIT.

---

## 5. Estructura de Archivos

```
app/
  page.tsx                    ← landing única (importa todas las secciones)
  layout.tsx                  ← metadata, fonts, LenisProvider
  global.css                  ← @theme tokens + base styles

components/
  layout/
    Navbar.tsx
    Footer.tsx
  sections/
    Hero.tsx
    Solutions.tsx
    Process.tsx
    Portfolio.tsx
    Contact.tsx
  ui/
    Button.tsx
    Badge.tsx
    Card.tsx
    CompareSlider.tsx          ← wrapper de react-compare-slider

lib/
  content/
    es.json                   ← todos los strings de la UI
  gsap/
    register.ts               ← gsap.registerPlugin(...) centralizado
  email/
    send.ts                   ← lógica de Resend

app/
  api/
    contact/
      route.ts                ← POST handler → Resend
```

---

## 6. Secciones

### 6.1 Navbar

- Posición: `fixed top-0`, full width, z-index alto
- Fondo: `bg-background/80` + `backdrop-blur-md` — glassmorphism sutil
- Borde inferior: `border-b border-border/50`
- Contenido: logo izquierda | links centro (`Solutions`, `Process`, `Work`, `Contact`) | CTA derecha (`Hablemos →`)
- En mobile: links ocultos, solo logo + botón hamburger (menú drawer)
- El link activo se detecta con scroll position — highlight con `text-accent`

### 6.2 Hero

**Layout:** centrado vertical y horizontal, `min-h-dvh`, una columna.

**Elementos (top → bottom):**
1. Badge animado: pill con borde `border-accent/30`, texto `✦ Soluciones digitales a medida`
2. Headline: `Simplicidad hecha software` — Sora 700, grande
3. Subheadline: `Convertimos los problemas de tu negocio en soluciones digitales que funcionan.` — Inter, `text-secondary`
4. CTAs: botón primario `Empecemos →` (fondo `accent`) + botón secundario `Ver nuestro trabajo` (outline)
5. Fondo: gradiente radial centrado, color `accent-glow`, radio amplio — da sensación de "luz" sin ruido

**Animación de entrada (GSAP Timeline):**
- `gsap.registerPlugin(ScrollTrigger)` en `lib/gsap/register.ts`
- `useGSAP()` con `scope` ref al container del Hero
- Timeline secuencial:
  1. Badge: `opacity: 0, y: 20` → `opacity: 1, y: 0` (0.4s, ease: "power2.out")
  2. Headline palabras: split manual por `<span>` por palabra (SplitText es Club GSAP/pago — usar alternativa open source), `y: 40, opacity: 0` → default (stagger: 0.08s)
  3. Subheadline: fade-in (0.5s, delay tras headline)
  4. Botones: `y: 20, opacity: 0` → default, stagger 0.1s
- Duración total: ~1.4s
- **`prefers-reduced-motion`:** si activo, toda la timeline se salta con `gsap.set()` al estado final — sin animación

### 6.3 Solutions

**Título de sección:** `Solutions` (Sora) — subtítulo: `Identificamos el problema. Construimos la solución.`

**Layout:** grid 3 columnas desktop / 1 mobile.

**Cards (3):**

| Ícono (Lucide) | Título | Gancho |
|---|---|---|
| `Globe` | Presencia Digital | *"Tus clientes te buscan online. ¿Estás ahí?"* |
| `Layers` | Sitios & Aplicaciones | *"Tu negocio, convertido en una experiencia digital que vende."* |
| `Zap` | Automatización | *"Trabajá menos, producí más. El software que trabaja por vos."* |

**Card styling:** `bg-surface`, `border border-border`, `rounded-xl`, hover → `border-accent/40` + glow sutil (`box-shadow: 0 0 20px accent-glow`)

**Animación:** `ScrollTrigger.batch()` sobre las 3 cards — `onEnter` dispara `gsap.to(elements, { opacity: 1, y: 0, stagger: 0.15 })`. Estado inicial: `opacity: 0, y: 40`. Respeta `prefers-reduced-motion`.

### 6.4 Process

**Título:** `Process` — subtítulo: `Simple por fuera. Serio por dentro.`

**Layout:** 4 pasos en fila horizontal desktop / vertical mobile. Línea conectora entre pasos.

**Pasos:**

| # | Título | Descripción |
|---|---|---|
| 01 | Escuchamos | Entendemos tu negocio, tus clientes y qué problema querés resolver. |
| 02 | Diseñamos | Creamos una solución a medida. Sin templates genéricos. |
| 03 | Construimos | Desarrollamos rápido, con calidad y con vos en el loop. |
| 04 | Lanzamos | Salimos al aire y te acompañamos en el camino. |

Los números `01`–`04` en `text-accent`, Sora 700.

**Animación:** la línea conectora SVG se "dibuja" via `stroke-dashoffset` con ScrollTrigger scrub. Cada step aparece en secuencia con stagger mientras la línea avanza. Respeta `prefers-reduced-motion`.

### 6.5 Work (Portfolio)

**Título:** `Work` — subtítulo: `Lo que construimos habla por nosotros.`

**Contenido único:** card grande de La Urquiza con before/after comparison slider.

**Card:**
- `react-compare-slider` — izquierda: screenshot web vieja, derecha: screenshot web nueva
- Handle (barra): color `accent`, ícono `⇔`
- Badge `Antes` lado izquierdo, `Después` lado derecho
- Debajo del slider: nombre del proyecto, descripción de una línea, stack (`Next.js · TypeScript · Tailwind`), badge `En desarrollo`
- Botón deshabilitado o que apunte al repo

**Placeholder:** segunda card con `opacity-40`, texto `Próximos proyectos en camino.` — honesto, no fake.

### 6.6 Contact

**Título:** `Hablemos` — subtítulo: `Contanos qué necesitás. Sin compromiso, sin tecnicismos.`

**Layout:** 2 columnas desktop / 1 mobile.

**Columna izquierda:**
- Copy motivador corto
- `contacto@whitebyte.dev` — ícono + link `mailto:`
- Botón `Escribinos por WhatsApp →` — link `wa.me/...`
- Ícono Instagram — link al perfil

**Columna derecha (formulario):**
- Campos (Shadcn/ui): Nombre · Email · Empresa / Rubro (opcional) · ¿Qué necesitás? (textarea)
- Todos los labels visibles — sin placeholder-only
- Validación en blur — error debajo del campo correspondiente
- Submit: POST a `/api/contact` → Resend → `contacto@whitebyte.dev`
- Estado del botón: loading durante envío, success/error feedback visible
- Campos vaciados tras envío exitoso

**Animación:** columna izquierda entra desde `x: -40`, formulario desde `x: 40`, con ScrollTrigger. Respeta `prefers-reduced-motion`.

### 6.7 Footer

- Logo `whitebyte.dev` izquierda
- Links centro: `Solutions · Process · Work · Contact`
- Ícono Instagram derecha
- Segunda fila centrada: `© 2026 Whitebyte. Todos los derechos reservados.`
- Separador superior: `border-t border-border` con `box-shadow: 0 -1px 0 accent-glow`

---

## 7. Animaciones — Reglas Globales

Basado en GSAP best practices (@gsap/react):

1. **`gsap.registerPlugin(ScrollTrigger)`** una sola vez en `lib/gsap/register.ts`, importado en `layout.tsx`
2. **`useGSAP()`** de `@gsap/react` en cada componente que use animaciones — nunca `useEffect` para GSAP
3. Siempre pasar **`scope`** ref al `useGSAP()` para acotar selectores al componente
4. ScrollTriggers solo en animaciones top-level — nunca dentro de child tweens de un timeline
5. `ScrollTrigger.batch()` para animar grupos de elementos con stagger en scroll
6. Lenis integrado via `ScrollTrigger.scrollerProxy()` + `ScrollTrigger.update` como listener
7. **`prefers-reduced-motion`:** wrapper global que detecta la media query — si activo, todas las animaciones usan `gsap.set()` al estado final en lugar de animar
8. Sin `markers: true` en producción
9. Duraciones: micro 150–300ms, scroll reveals 400–600ms, hero timeline ~1.4s total

---

## 8. Formulario y Email

- API route: `app/api/contact/route.ts` — acepta POST con `{ nombre, email, empresa, mensaje }`
- Validación server-side básica antes de enviar
- Resend SDK: envía a `contacto@whitebyte.dev` con template HTML simple
- Variables de entorno: `RESEND_API_KEY` en `.env.local` y en Vercel
- Rate limiting: no en v1, agregar en iteración futura

---

## 9. SEO y Metadata

- `layout.tsx`: `title`, `description`, `og:image`, `og:url`, `twitter:card`
- Title: `Whitebyte — Simplicidad hecha software`
- Description: `Soluciones digitales a medida para tu negocio. Presencia digital, sitios web y automatización.`
- Favicon: logo whitebyte.dev
- `sitemap.xml` y `robots.txt` generados con Next.js

---

## 10. Responsive

| Breakpoint | Comportamiento |
|---|---|
| `< 768px` (mobile) | 1 columna, navbar con hamburger, hero headline ~40px |
| `768–1024px` (tablet) | 2 columnas donde aplique, ajuste de spacing |
| `> 1024px` (desktop) | Layout completo, hero headline 72–80px |

Sin scroll horizontal en ningún breakpoint. `min-h-dvh` en lugar de `100vh` para mobile.

---

## 11. Accesibilidad

- Contraste mínimo 4.5:1 para texto normal (WCAG AA)
- Focus rings visibles en todos los elementos interactivos
- Labels visibles en todos los inputs del formulario
- Íconos de redes sociales con `aria-label`
- `prefers-reduced-motion` respetado en todas las animaciones
- Navegación por teclado funcional en navbar y formulario

---

## 12. Fuera de Scope (v1)

- Dark/light mode toggle
- i18n (inglés) — arquitectura preparada, no implementada
- Páginas internas (casos de estudio, servicios individuales)
- Blog
- CMS
- Analytics (agregar en iteración futura)
- Rate limiting en API

---

## 13. Checklist Pre-Deploy

- [ ] Tokens HSL en `global.css`, sin hex hardcodeado en componentes
- [ ] `prefers-reduced-motion` testeado con sistema operativo
- [ ] Formulario testeado end-to-end (email llega a `contacto@whitebyte.dev`)
- [ ] `RESEND_API_KEY` configurado en Vercel
- [ ] Sin `markers: true` en ScrollTrigger
- [ ] Responsive en 375px, 768px, 1024px, 1440px
- [ ] Sin scroll horizontal en mobile
- [ ] Contraste verificado (texto principal y secundario)
- [ ] Imágenes del compare slider optimizadas (WebP)
- [ ] Metadata SEO completa
- [ ] Screenshots de La Urquiza listos (antes y después)
