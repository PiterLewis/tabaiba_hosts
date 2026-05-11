---
name: landing-lanzarote
description: Use when building, modifying, or refining the landing page for the Lanzarote vacation-rental management business in this repo. Activates whenever you touch hero, sections, copy, styling, images, components, or color usage on the landing. Contains complete brand, visual, copy, and structural rules — do not improvise outside what is documented here.
---

# Landing Lanzarote — Skill

## Overview

Esta skill contiene todas las decisiones de diseño, copy, estructura y reglas para construir y mantener la landing page de una empresa de gestión integral de viviendas vacacionales en Lanzarote. Está pensada para que, al activarla, tengas el contexto completo sin tener que preguntar al usuario.

**Principio rector:** estética inspirada en apple.com (minimalismo refinado, fotos grandes, tipografía única, mucho espacio en blanco) con un guiño visual puntual a los colores de Canarias (azul, amarillo, blanco) aplicado de forma muy restrictiva.

---

## 1. Contexto del negocio

- **Marca:** **Tabaiba Hosts**. Wordmark en Inter 500. En el `<nav>` se compone como `Tabaiba · Hosts` con el separador ` · ` en `var(--canary-blue)` y el resto en `var(--ink)`. Nunca usar mayúsculas todo seguido (`TABAIBA HOSTS`), ni siglas, ni acrónimos. El nombre del repositorio (`landing_lanzbnb`) es histórico — la marca pública es Tabaiba Hosts.
- **Email de contacto:** `tabaibahosts@gmail.com`.
- **Servicio:** gestión integral de viviendas vacacionales en Lanzarote (mensajes a huéspedes, check-ins, limpieza, mantenimiento, incidencias, optimización del anuncio).
- **Cliente objetivo:** propietarios part-time con 1–3 pisos, españoles/canarios, que no quieren ocuparse del día a día.
- **Modelo de cobro:** 20% sobre facturación. Sin permanencia. Sin coste de alta. El dinero le entra al propietario directamente en su cuenta de Airbnb como siempre; la comisión se factura aparte.
- **Diferenciación:**
  - Implicación personal real (llevan pocos pisos a propósito).
  - Proximidad local: están en la isla, conocen al equipo, conocen los pisos.
  - Operación moderna **sin venderlo como tecnología**. Nada de "plataforma", "dashboard", "IA", "automatización".
- **Tono de marca:** cercano, directo, sin tecnicismos, sin lenguaje de startup. Habla como un vecino profesional, no como un consultor.

---

## 2. Dirección estética (crítico)

### Inspiración

apple.com. Punto. Minimalismo refinado, bloques verticales a pantalla completa, scroll calmado, fotos enormes como protagonistas, tipografía limpia con jerarquía clara, mucho espacio en blanco.

### Tipografía

- **Familia única:** Inter (Google Fonts).
- **Pesos disponibles:** 300, 400, 500, 600, 700.
- **Jerarquía solo por tamaño y peso.** Nunca por familia.
- **Prohibido:**
  - Mezclar familias.
  - Usar serifs decorativas (Fraunces, Playfair, Cormorant, etc.).
  - Usar fuentes display "bonitas".
- Inter actúa como sustituto libre de SF Pro Display.

```html
<!-- En el <head> o equivalente en Next.js (next/font/google) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Preferir `next/font/google` si se usa Next.js App Router:

```ts
// app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

### Paleta principal (variables CSS)

```css
:root {
  --bg: #ffffff;
  --bg-soft: #fafafa;
  --bg-section: #f5f5f7;   /* gris muy claro, el de apple.com */
  --ink: #1d1d1f;          /* negro Apple, no negro puro */
  --ink-soft: #6e6e73;     /* gris secundario Apple */
  --line: #d2d2d7;

  /* Acento canario — uso muy restrictivo, ver sección siguiente */
  --canary-blue: #0080c4;
  --canary-yellow: #f5c518;
  --canary-white: #ffffff;

  --font-sans: var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
```

### Acento canario — regla estricta

El azul/amarillo canario es un **guiño**, no una paleta de fondo.

**PERMITIDO:**
- Teñir **una sola palabra** (o como mucho una expresión corta) dentro de un titular, en azul canario.
- Aplicar un **degradado horizontal con los colores de la bandera canaria** (blanco → azul → amarillo, de izquierda a derecha) a **una sola palabra** del titular usando `background-clip: text`. Es la forma recomendada para la palabra "Lanzarote" en el hero. Solo una palabra por landing.
- Repartir las letras de **una sola palabra** alternando azul y amarillo como guiño sutil a la bandera (alternativa al degradado, no acumular ambas en la misma landing).
- Subrayado fino amarillo bajo una palabra clave.
- Punto final en azul como detalle de remate.
- Microaccents en links (underline o color en hover).

**PROHIBIDO:**
- Fondos de sección en azul o amarillo.
- Botones grandes en estos colores (los CTAs primarios son negros).
- Bordes gruesos tricolores.
- Banderas literales como elemento gráfico.
- Más de una palabra teñida por titular.
- Titulares enteros en colores.

**Regla de oro:** si dudas si un uso del color es excesivo, lo es. Por defecto, restricción.

#### Ejemplo de aplicación en JSX

```tsx
// Variante recomendada para el hero: gradiente bandera canaria sobre la palabra
<h1 className="hero-title">
  Tu piso en <span className="canary-flag">Lanzarote</span>, funcionando solo
</h1>

// Variante simple: una sola palabra teñida en azul canario (para titulares secundarios)
<h2>
  Es como tener un <span className="canary-blue">segundo trabajo</span>.
</h2>

// Variante alternativa: letras alternadas (usar SOLO si no se usa el gradiente)
<h1>
  Tu piso en{" "}
  <span aria-label="Lanzarote">
    <span style={{ color: "var(--canary-blue)" }}>L</span>
    <span style={{ color: "var(--canary-yellow)" }}>a</span>
    {/* ... */}
  </span>
</h1>
```

```css
.canary-blue { color: var(--canary-blue); }

/* Gradiente bandera canaria (blanco → azul → amarillo). Solo una palabra por landing. */
.canary-flag {
  background-image: linear-gradient(
    90deg,
    #ffffff 0%,
    #ffffff 18%,
    var(--canary-blue) 50%,
    var(--canary-yellow) 82%,
    var(--canary-yellow) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  padding-inline: 0.02em;
}

.canary-underline {
  background-image: linear-gradient(transparent 75%, var(--canary-yellow) 75%);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-bottom: 0.05em;
}
```

> **Nota sobre contraste del gradiente bandera:** el primer tramo es blanco puro. Solo aplicar sobre fondos oscuros (foto con overlay oscuro como el hero). Sobre fondo blanco, **NO** usar este gradiente: usar `canary-blue` o el subrayado amarillo.

---

## 3. Fotos: protagonismo visual total

Estética photo-driven al estilo apple.com. Las fotos son las verdaderas heroínas.

### Estado actual del repositorio (IMPORTANTE)

Las fotos NO están en `/public/` todavía. Están repartidas en la raíz del repo. Cuando vayas a construir la landing, **el primer paso es reubicarlas** a `/public/`. Mapeo sugerido:

| Archivo actual (raíz)                              | Destino sugerido en `/public/`         | Uso                                  |
|----------------------------------------------------|----------------------------------------|--------------------------------------|
| `lanzarote.webp`                                   | `/public/lanzarote.webp`               | Reserva                              |
| `lanzarote2.webp`                                  | `/public/lanzarote-2.webp`             | Reserva                              |
| `lanzarote3.webp`                                  | `/public/lanzarote-3.webp`             | Reserva                              |
| `lanzarote4.webp`                                  | `/public/lanzarote-4.webp`             | Reserva                              |
| `famara4k.jpg`                                     | `/public/lanzarote-famara.jpg`         | Sección §5.7 — foto bajo "Por qué nosotros"|
| `4k3.jpg` (1024×1820)                              | `/public/lanzarote-timanfaya.jpg`      | Hero collage §5.2 — columna 1 (izq.) |
| `cactus.jpg`                                       | `/public/lanzarote-cactus.jpg`         | Hero collage §5.2 — columna 2 (centro)|
| `4k4jpg.jpg`                                       | `/public/lanzarote-jameos.jpg`         | Hero collage §5.2 — columna 3 (der.) |
| `4k2jpg.jpg` (600×800)                             | `/public/lanzarote-charco.jpg`         | Reserva (barcas Charco de San Ginés) |
| `4k.jpg` (1200×674)                                | `/public/lanzarote-paseo.jpg`          | Reserva (paseo Costa Teguise)        |
| `image.jpeg`, `image2.jpeg`, `image5.jpeg`, `image6.jpeg`, `image8.jpeg` | `/public/piso-1.jpg` … `/public/piso-5.jpg` | Carrusel de pisos                    |
| `WhatsApp Image 2026-05-11 at 17.59.20.jpeg`       | `/public/piso-6.jpg`                   | Carrusel de pisos                    |
| `WhatsApp Image 2026-05-11 at 17.59.29.jpeg`       | `/public/piso-7.jpg`                   | Carrusel de pisos                    |
| `sample3.jpeg`                                     | Evaluar contenido antes de incluir     | Reserva                              |

Antes de renombrar, abre cada imagen y confirma qué muestra: las que sean paisaje van como `lanzarote-*`; las que sean interiores/pisos van como `piso-*`. **Confirma con el usuario antes de descartar ninguna foto.**

### Reglas de uso

- **Paisajes (`lanzarote*.webp`):** hero y separadores de sección a pantalla completa.
- **Pisos (`piso-*.jpg`):** carruseles horizontales en la sección "Cómo funciona".
- **Si una foto no existe aún:** placeholder con fondo `var(--bg-section)` y texto pequeño "Foto pendiente" en `var(--ink-soft)`. **Nunca** usar imágenes de stock genéricas.
- **Optimización:** usar `next/image` con `priority` solo en el hero. Definir `sizes` correctamente.
- **Alt descriptivo siempre** (ver sección Accesibilidad).

### Resolución mínima (IMPORTANTE)

- **Hero a pantalla completa:** la foto debe ser **al menos 2400×1600** (idealmente 3200×2000) para que no se vea estirada en pantallas grandes (1440p / 4K). Cualquier cosa por debajo de 1600px de ancho se va a notar en cuanto el viewport pase de 1280px.
- **Separadores de sección a ancho completo (max 1120):** mínimo 2000×1100.
- **Pisos para carrusel:** mínimo 1600×1200 (relación 4:3 o 3:2).
- **Si la única foto disponible es de baja resolución** y no se puede reemplazar:
  - Reducir el tamaño expuesto: en lugar de `min-height: 100vh`, contener la foto en un bloque con `border-radius: 18px` y `max-height: 80vh` para que el ojo no vea el upscaling.
  - Aplicar **filter sutil** sobre la foto: `filter: saturate(1.08) contrast(1.03)` y/o `transform: scale(1.02)` para repintar bordes.
  - Reforzar el **overlay**: añadir un degradado radial (`radial-gradient(120% 80% at 30% 80%, rgba(29,29,31,0.65), transparent 90%)`) que oscurezca la zona del texto sin perder el cielo.
  - Añadir una capa de **grain SVG** muy sutil (`mix-blend-mode: overlay; opacity: 0.5;`) para romper la sensación de pixelado.
  - Estas tres correcciones son un parche; lo correcto es siempre subir una foto mejor.

---

## 4. Estructura del proyecto

Asume **Next.js con App Router** salvo que el usuario indique otro stack al activar la skill.

```
landing_lanzbnb/
├── app/
│   ├── layout.tsx              # Inter + metadata
│   ├── page.tsx                # Composición de la landing
│   └── globals.css             # Variables CSS, reset, utilidades
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── ProblemSection.tsx
│   ├── HowItWorks.tsx
│   ├── PhotoCarousel.tsx       # Reutilizable
│   ├── Services.tsx
│   ├── Pricing.tsx
│   ├── WhyUs.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── public/
    ├── lanzarote.webp
    ├── lanzarote-2.webp
    ├── lanzarote-3.webp
    ├── piso-1.jpg
    ├── piso-2.jpg
    └── ...
```

Componentes reutilizables van en `/components/`. El carrusel de fotos **es un componente reutilizable** con scroll horizontal nativo (scroll-snap-type: x mandatory) en móvil y controles laterales sutiles en escritorio.

---

## 5. Estructura de la landing (secciones, en orden)

### 5.1 Nav fixed translúcido

- Estilo Apple: `position: fixed`, fondo `rgba(255,255,255,0.72)` con `backdrop-filter: blur(20px) saturate(180%)`.
- Altura compacta (~48px).
- Logo a la izquierda (texto simple en Inter 500 si no hay logotipo).
- A la derecha: enlace "Hablar con nosotros" (lleva a la sección de contacto), estilo botón píldora pequeño negro o link de texto, según densidad.
- Sin borde inferior; usar `border-bottom: 1px solid var(--line)` solo en estado scrolled si hace falta separación.

### 5.2 Hero — pantalla completa con collage de fondo

El hero **no** usa una sola foto a pantalla completa. Usa un **collage de 3 columnas verticales con delimitadores** (gaps blancos finos entre fotos) que ocupa el fondo entero, y sobre él va el texto + CTAs.

#### Estructura del fondo

- Contenedor absoluto `inset: 0`, `display: flex`, `gap: 8px`, `background: var(--bg)` (el gap muestra el blanco de la página → delimitador limpio).
- 3 columnas `flex: 1` (iguales). Cada una contiene una foto con `next/image` `fill` + `object-fit: cover`.
- **CSS crítica de layout en `app/globals.css`, NO en styled-jsx.** Las reglas de posicionamiento del hero (`.hero`, `.hero-collage`, `.hero-col`, `.hero-overlay`, `.hero-content`, las `@keyframes hero-drop` y el bloque `prefers-reduced-motion`) viven en `globals.css` porque es CSS render-blocking servida por `<link>` → aplicada en el primer paint. Si esas reglas están en styled-jsx, hay una ventana de milisegundos en la que `<Image fill>` no encuentra contenedor `position: relative` y se ancla al `<body>`, ocupando media pantalla durante medio segundo. Solo tipografía y colores del texto se quedan en styled-jsx del componente.
- **Gate por carga completa:** el componente Hero lleva un `useState` que cuenta los `onLoad` de las 3 `<Image>`. Cuando `loaded === 3`, añade la clase `is-ready` al `.hero-collage`, y solo entonces se aplica la animación (`.hero-collage.is-ready .hero-col { animation: hero-drop ... }`). Así no se ve una columna caer mientras otra sigue cargando, ni hay flash de foto sin layout. Es **carga bloqueante**: hasta que las 3 fotos estén decodificadas, el hero está en estado inicial (columnas a `translateY(-100%)`, invisibles).
- **Las 3 imágenes deben llevar `priority` y `fetchPriority="high"`.** Son above-the-fold. Si dejas a 2 de ellas con lazy loading (`priority` solo en la primera), la animación de caída arranca con las columnas 2 y 3 mostrando el fondo gris y la foto aparece después → da sensación de "imagen bloqueada un segundo" justo al cargar.
- Composición recomendada (de izquierda a derecha):
  - **Columna 1:** foto vertical más impactante (volcanes, paisaje volcánico). Va con `priority` en `next/image`.
  - **Columna 2:** paisaje horizontal (paseo, pueblo, costa).
  - **Columna 3:** foto vertical complementaria (barcas, charco, pueblo blanco).
- En **móvil** las 3 columnas se mantienen (cada una ~33vw). No hay layout alternativo: el collage es la identidad del hero.

#### Delimitadores

- Color del delimitador = `var(--bg)` (blanco), heredado del background del contenedor flex que se ve a través del `gap`.
- Grosor del gap: **8px**. No subir a más de 12px (se rompe el efecto "una foto en tres").
- No usar bordes ni `box-shadow` en las columnas: el delimitador es el gap, nada más.

#### Animación de entrada — "caída desde arriba"

- Cada columna arranca en `transform: translateY(-100%)` (fuera del viewport, justo encima de su columna) y `opacity: 0`.
- Cae a su posición final con `animation: hero-drop 1000ms var(--ease) var(--d) forwards`.
- **Stagger entre columnas: 160ms** (orden izquierda → centro → derecha). Total ≈ 1.32s.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (variable `--ease`). **Sin bounce, sin spring**.
- Se ejecuta **una sola vez** al montar (la animación es `forwards`, no se repite).
- `prefers-reduced-motion`: animación deshabilitada, columnas en su posición final desde el inicio.

```css
@keyframes hero-drop {
  0%   { transform: translateY(-100%); opacity: 0; }
  25%  { opacity: 1; }
  100% { transform: translateY(0);    opacity: 1; }
}
```

#### Overlay de legibilidad

- Capa absoluta encima de las columnas (z-index: 1) con doble degradado:
  - **Radial** focalizado abajo-izquierda (donde va el texto): `radial-gradient(85% 60% at 25% 85%, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.15) 55%, transparent 80%)`.
  - **Linear** hacia arriba para reforzar el bottom: `linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.1) 55%, transparent)`.
- Pasa por encima de los 3 collage de un tirón: las uniones se ven igual de oscurecidas, sin marcar el gap en oscuro.

#### Tipografía y contenido

- Headline: Inter peso **600**, tamaño `clamp(40px, 6vw, 72px)`, `letter-spacing: -0.02em`, `line-height: 1.05`.
- Una sola palabra con **gradiente bandera canaria** (ver §2, `.canary-flag`). Recomendado: la palabra "Lanzarote".
- `text-shadow: 0 1px 30px rgba(0,0,0,0.18)` muy sutil en el headline y `0 1px 16px rgba(0,0,0,0.25)` en el subtítulo, para sumar a la legibilidad sobre fotos variables (las 3 columnas pueden tener brillo desigual).
- Subtítulo: Inter 400, `clamp(18px, 1.6vw, 22px)`, color blanco con `opacity: 0.9`.
- Dos CTAs:
  - **Primario:** píldora negra (`background: var(--ink); color: white; border-radius: 980px; padding: 14px 28px;`).
  - **Secundario:** texto blanco + flecha "→", sin fondo.
- Alineación: contenido pegado a `flex-end` (abajo), con `padding-block: 120px clamp(80px, 12vh, 140px)`. Container `max-width: 1120px`.

#### Accesibilidad

- Las 3 imágenes del fondo van con `alt=""` (decorativas) y el contenedor con `aria-hidden="true"`.
- Se añade un `<span class="sr-only">` describiendo el collage en una frase para lectores de pantalla.

> **Excepción documentada al "cero auto-play" (§7):** el hero collage es la única animación de la landing autorizada a ejecutarse automáticamente al cargar la página, una sola vez. La regla general sigue aplicando al resto.

### 5.3 Sección "El problema"

- Fondo: `var(--bg)`.
- Eyebrow en mayúsculas con letter-spacing amplio (`0.15em`), tamaño 12px, color `var(--ink-soft)`, peso 500.
- Título grande Inter 600.
- Tres columnas con tres situaciones reconocibles del propietario. Texto grande (`clamp(20px, 1.8vw, 24px)`), Inter 400. Sin iconos cliché.
- Padding vertical: `clamp(80px, 12vw, 160px)`.

Ejemplos de situaciones (ajustar copy con el usuario):
1. "Te escriben a las once de la noche un sábado y tú estás cenando con tu familia."
2. "El aire acondicionado se rompe el día del check-in y no sabes a quién llamar."
3. "Tu limpiadora se pone mala y la siguiente reserva entra en tres horas."

### 5.4 Sección "Cómo funciona"

- Fondo: `var(--bg-section)`.
- Carrusel horizontal de fotos de pisos con scroll-snap (componente reutilizable, ver §6).
- Encima del carrusel: eyebrow + título corto explicando qué se ve.
- En móvil: scroll nativo, sin controles visibles.
- En desktop: flechas sutiles a izquierda/derecha aparecen en hover sobre el carrusel.
- **Auto-avance activado** (excepción autorizada al "cero auto-play", ver §7): **deriva continua** con `requestAnimationFrame`, **NO** saltos por intervalos. Velocidad objetivo ~40 px/s con ease-in cuadrático durante los primeros 1200ms para que el arranque sea muy suave. Wrap invisible: el array de fotos se duplica en el DOM (`[...photos, ...photos]`) y cuando `scrollLeft >= scrollWidth / 2`, se resta `scrollWidth / 2` (el usuario no ve discontinuidad porque la segunda mitad es idéntica a la primera). Pausa en `mouseenter`, `touchstart`, `focusin` y cuando la pestaña está oculta (`visibilitychange`). Reanuda automáticamente al salir el cursor / soltar el touch / quitar el foco / volver a la pestaña. Respeta `prefers-reduced-motion: reduce` (no arranca el rAF). **Las fotos duplicadas llevan `aria-hidden="true"` y `alt=""`** para no confundir a lectores de pantalla.

### 5.5 Sección "Servicios"

- Fondo: `var(--bg-section)` (continúa de la sección anterior o cambia a `var(--bg)`, decidir por ritmo visual; por defecto continúa para crear contraste con la sección 5.6).
- Grid 2×3 (6 servicios). En móvil: 1 columna.
- Cards: fondo `var(--bg)`, padding `clamp(32px, 4vw, 64px)`, `border-radius: 18px`, sin sombras pronunciadas (máximo `box-shadow: 0 1px 2px rgba(0,0,0,0.04);` o ninguna).
- Estructura de la card:
  - Número del servicio arriba: `01`, `02`… en `var(--ink-soft)`, Inter 500, tamaño 14px.
  - Título grande: Inter 600, `clamp(22px, 2vw, 28px)`.
  - Descripción: Inter 400, `var(--ink-soft)`, `line-height: 1.5`.

Servicios propuestos (ajustar con el usuario):
1. Gestión de mensajes a huéspedes.
2. Check-in y check-out.
3. Limpieza y reposición.
4. Mantenimiento e incidencias.
5. Optimización del anuncio.
6. Reporte mensual claro.

### 5.6 Sección "Precio"

- Fondo: `var(--bg)`.
- Layout: dos columnas en desktop, una en móvil.
- Columna izquierda: número "20%" en tipografía **muy grande**: `clamp(96px, 14vw, 160px)`, peso 600, `letter-spacing: -0.04em`, `line-height: 1`.
- Columna derecha: explicación en Inter 400, `clamp(18px, 1.6vw, 22px)`, con tres puntos clave en bullets sutiles o párrafos cortos:
  - "Sobre lo que cobras. Si no cobras, no cobramos."
  - "Sin permanencia. Te vas cuando quieras."
  - "Sin coste de alta. Empezamos cuando tú nos digas."
- Sin gradientes ni decoraciones. La tipografía hace todo el trabajo.

### 5.7 Sección "Por qué nosotros"

- Fondo: `var(--bg-section)`.
- 3 razones en grid (3 columnas en desktop, 1 en móvil).
- Cada razón:
  - Número grande `01`, `02`, `03`: Inter 600, `clamp(48px, 6vw, 80px)`, color `var(--ink)`.
  - **Subrayado fino amarillo canario** bajo el número (ver §2):
    ```css
    .why-number {
      display: inline-block;
      border-bottom: 3px solid var(--canary-yellow);
      padding-bottom: 4px;
    }
    ```
  - Título: Inter 600, ~24px.
  - Texto: Inter 400, `var(--ink-soft)`.

Razones propuestas:
1. "Llevamos pocos pisos a propósito."
2. "Estamos en la isla. Vamos al piso si hace falta."
3. "Hablamos claro. Te decimos lo que pasa, cuándo y cuánto."

### 5.8 Sección de contacto

- Fondo: `var(--bg)`.
- Formulario centrado, `max-width: 560px`.
- **Envío:** vía **Web3Forms** (servicio gratis hasta 1.000 envíos/mes). El form hace `fetch` directo a `https://api.web3forms.com/submit` con `access_key` desde `process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. Llega un email con los campos formateados al destinatario configurado en Web3Forms (`tabaibahosts@gmail.com`). El `access_key` es público por diseño (es como un ID de endpoint), no es secreto.
- **Honeypot anti-spam:** campo oculto `botcheck` (input checkbox fuera de pantalla via `position: absolute; left: -9999px`). Si llega marcado, se aborta el envío en silencio mostrando "Recibido" de todas formas.
- **Estados:** `idle | sending | sent | error`. Botón muestra "Enviando…" y `disabled` durante `sending`. Si falla la red o la API devuelve `success: false`, se muestra mensaje de error con fallback al mailto.
- **Composición del email:** las claves del payload se envían en Capitalize/Espacios (`Nombre`, `Teléfono`, `Pisos`, `Cómo lo gestiona ahora`, `Mensaje`) para que el correo se lea claro. El asunto es `Nuevo lead — {nombre}`.
- Campos:
  - Nombre
  - Email
  - Teléfono
  - Número de pisos (select: 1, 2, 3, más)
  - **Localidad** (select con `<optgroup>` por los 7 municipios de Lanzarote: Arrecife, Haría, San Bartolomé, Teguise, Tías, Tinajo, Yaiza — y dentro las localidades principales de cada uno; última opción "Otro / no listado"). Se incluye en el asunto del email (`Nuevo lead — Nombre (Localidad)`) para que se vea desde la lista del inbox.
  - "¿Cómo lo gestionas ahora?" (select con opciones: "Lo gestiono yo solo", "Tengo a alguien que me ayuda con la limpieza", "Tengo una empresa", "Aún no tengo el piso publicado", "Otro")
  - Mensaje (textarea opcional)
- Estilos de campo:
  - `border: 1px solid var(--line)`, `border-radius: 12px`, `padding: 14px 16px`.
  - Focus: `border-color: var(--ink)`, sin `box-shadow` agresivo. `outline: none` solo si se sustituye con border claro.
  - Labels visibles encima del campo, no solo placeholders (accesibilidad).
- Botón: píldora negra, ancho completo en móvil, `padding: 16px 32px`, Inter 500.
- Bajo el formulario, una línea pequeña: "También puedes escribirnos a hola@dominio.com o por WhatsApp." (ajustar con datos reales).

### 5.9 Footer minimal

- Una sola línea (centrada o a la izquierda).
- Contenido: `© 2026 [Nombre empresa]. · Aviso legal · Privacidad`.
- Inter 400, 14px, color `var(--ink-soft)`.
- Padding vertical 48px.
- Sin redes sociales si no las hay reales.

---

## 6. Carrusel de fotos (componente reutilizable)

### Especificación

- Móvil: scroll horizontal nativo. Sin controles.
- Desktop: mismo scroll, pero con flechas laterales sutiles visibles en hover.
- Cada slide ocupa ~85% del ancho del viewport en móvil, ~40-45% en desktop, para que se vea el siguiente slide "espiando" por el borde.
- Border-radius generoso en cada foto: 18px.
- Sin sombras pronunciadas.
- **NO usar `scroll-snap-type` ni `scroll-snap-align`** mientras el carrusel tenga auto-avance por rAF. El snap (incluso `proximity`) pelea con la deriva continua: cada vez que el rAF incrementa `scrollLeft` unos pocos píxeles, el navegador devuelve al snap point más cercano y el carrusel parece estático. Sin snap, la deriva es visible y los manejos manuales (swipe / flecha) siguen funcionando con scroll nativo, sin necesidad de "encajar" en cada slide.
- **Auto-avance — deriva continua, no por saltos:**
  - **NO** usar `setInterval + scrollBy({behavior:"smooth"})`. Eso produce tirones (avanza, espera, avanza, espera).
  - **SÍ** usar `requestAnimationFrame` que incrementa `scrollLeft` cada frame por `velocidad * dt`. Velocidad ~40 px/s. Ease-in cuadrático durante los primeros ~1200ms (`v = SPEED * t * t`) para que el arranque no sea brusco.
  - **Wrap invisible:** duplicar el array de fotos en el render (`[...photos, ...photos]`). Cuando `scrollLeft >= scrollWidth / 2`, restar `scrollWidth / 2`. El usuario no percibe el salto porque la segunda mitad es idéntica a la primera.
  - Pausa con un `ref` booleano alternado por listeners de `mouseenter/mouseleave`, `touchstart/touchend`, `focusin/focusout` y `document.visibilitychange`. Cuando el rAF está pausado, sigue corriendo pero no modifica `scrollLeft`.
  - Skip total bajo `prefers-reduced-motion: reduce` (se hace `return` antes de programar el rAF).
  - Las fotos duplicadas tienen `aria-hidden="true"` y `alt=""` para que los lectores de pantalla no las anuncien dos veces.

```tsx
// Esquema del rAF
const SPEED = 40;       // px / s
const RAMP_MS = 1200;   // ease-in al arrancar
const start = performance.now();
let last = start;

const tick = (now: number) => {
  const dt = (now - last) / 1000;
  last = now;
  if (!pausedRef.current) {
    const half = el.scrollWidth / 2;
    const t = Math.min(1, (now - start) / RAMP_MS);
    const v = SPEED * t * t;
    let next = el.scrollLeft + v * dt;
    if (next >= half) next -= half;
    el.scrollLeft = next;
  }
  rafId = requestAnimationFrame(tick);
};
rafId = requestAnimationFrame(tick);
```

### Ejemplo de implementación

```tsx
// components/PhotoCarousel.tsx
"use client";

import Image from "next/image";
import { useRef } from "react";

type Photo = { src: string; alt: string };

export function PhotoCarousel({ photos }: { photos: Photo[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.5, behavior: "smooth" });
  };

  return (
    <div className="carousel">
      <div className="carousel-track" ref={ref}>
        {photos.map((p, i) => (
          <div className="carousel-slide" key={i}>
            <Image
              src={p.src}
              alt={p.alt}
              width={1200}
              height={800}
              sizes="(max-width: 768px) 85vw, 45vw"
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-btn carousel-btn-prev"
        aria-label="Foto anterior"
        onClick={() => scrollBy(-1)}
      >
        ←
      </button>
      <button
        className="carousel-btn carousel-btn-next"
        aria-label="Foto siguiente"
        onClick={() => scrollBy(1)}
      >
        →
      </button>
    </div>
  );
}
```

```css
.carousel {
  position: relative;
  width: 100%;
}

.carousel-track {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 24px;
  -webkit-overflow-scrolling: touch;
  padding: 0 24px 24px;
  scrollbar-width: none;
}
.carousel-track::-webkit-scrollbar { display: none; }

.carousel-slide {
  flex: 0 0 85%;
  scroll-snap-align: start;
  border-radius: 18px;
  overflow: hidden;
}

@media (min-width: 768px) {
  .carousel-slide { flex-basis: 45%; }
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  border: 1px solid var(--line);
  color: var(--ink);
  opacity: 0;
  transition: opacity 200ms ease-out;
  cursor: pointer;
}
.carousel:hover .carousel-btn { opacity: 1; }
.carousel-btn-prev { left: 12px; }
.carousel-btn-next { right: 12px; }

@media (max-width: 767px) {
  .carousel-btn { display: none; }
}
```

---

## 7. Animaciones y motion

- **Entradas al scroll:** fade + slide-up con stagger.
  - Duración: 600–800ms.
  - Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out con leve overshoot suave) o `ease-out`.
  - Implementación: IntersectionObserver puro o `framer-motion` si Next.js. Preferir IntersectionObserver para no añadir dependencias salvo necesidad real.
- **Hover states sutiles:**
  - Opacidad: `1 → 0.85`.
  - Escala: `1 → 1.02` máximo.
  - Transición: 200–300ms.
- **Prohibido (cero):**
  - Parallax.
  - Scroll hijacking.
  - Partículas.
  - Auto-play de carruseles.
  - Animaciones que se llaman la atención sobre sí mismas, **con dos excepciones autorizadas**:
    1. La **caída de las 3 columnas del Hero collage** (ver §5.2), una sola vez al cargar la página.
    2. El **auto-avance del carrusel de pisos** (ver §5.4 y §6), con intervalo 3500ms, pausa en hover/touch/focus/pestaña oculta, y deshabilitado bajo `prefers-reduced-motion`.
- Respetar `prefers-reduced-motion: reduce` desactivando animaciones complejas.

### Ejemplo de IntersectionObserver para entradas

```tsx
"use client";

import { useEffect, useRef } from "react";

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}
```

```css
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

---

## 8. Reglas de copy (inviolables)

- **Tuteo siempre.** Frases cortas. Lenguaje concreto.
- **Headlines en sentence case** (solo la primera letra en mayúscula). NUNCA TÍTULOS EN MAYÚSCULAS.
- **Cada sección lleva un eyebrow** corto (10–16 caracteres) en mayúsculas:
  - `text-transform: uppercase;`
  - `letter-spacing: 0.15em;`
  - `font-size: 12px;`
  - `color: var(--ink-soft);`
  - `font-weight: 500;`
- **CTAs = verbos en acción**, no sustantivos. ✅ "Empezar conversación". ❌ "Información".

### Palabras y expresiones PROHIBIDAS

- "revolucionario"
- "líder"
- "innovador"
- "experiencia única"
- "soluciones"
- "sinergias"
- "máxima rentabilidad"
- "optimizar"
- "potenciar"
- "transformar tu negocio"
- "partner estratégico"
- Cualquier variante de jerga corporativa o de startup.

### Palabras y expresiones a USAR

- "te respondemos"
- "vamos al piso"
- "te ingresamos"
- "el sábado a las once"
- "tu limpiadora"
- "el aire roto"
- Cualquier expresión concreta, cotidiana, de vecino.

---

## 9. Responsive

- **Mobile-first.** La landing se ve principalmente en móvil.
- **Breakpoints:** 480px (nav CTA corto), 640px (forma 1col → 2col), 768px (grids 1 → 2/3 col, carrusel slide 85% → 45%), 1024px (Services 2 → 3 col).
- **Móvil:**
  - Hero: `min-height: 100svh` (fallback `100vh`) — `100svh` evita que el address bar de iOS Safari recorte el hero o le añada espacio al ocultarse.
  - Secciones: padding vertical `clamp(80px, 12vw, 160px)`.
  - Carrusel de pisos: scroll horizontal nativo, sin controles, slides al 85% para que el siguiente "asome" por el borde.
  - Nav CTA: texto largo "Hablar con nosotros" se sustituye por "Contacto" cuando `max-width: 480px` (evita colisión con el wordmark en pantallas tipo iPhone SE).
- **Desktop:**
  - `max-width` del contenido: `1120px`, centrado.
  - Padding lateral generoso: `clamp(24px, 5vw, 64px)`.
  - Carrusel: controles laterales sutiles en hover, slides al 45%.
- **`body { overflow-x: hidden; }`** como red de seguridad para evitar scroll horizontal accidental por cualquier elemento que se escape (sombras, overlays, columnas del hero collage).
- Headlines grandes (`h-1`) llevan `text-wrap: balance` para que las líneas queden equilibradas al envolver en móvil sin manual `<br>` (el `<br>` del hero se aplica solo cuando hay espacio; balance ajusta el resto).

```css
.container {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding-inline: clamp(24px, 5vw, 64px);
}

section {
  padding-block: clamp(80px, 12vw, 160px);
}
```

---

## 10. Accesibilidad

- **Contraste AA mínimo** en todo el texto.
- Las palabras teñidas en azul/amarillo canario deben mantener contraste suficiente sobre su fondo. **Si no lo mantienen, no se tiñen** (especialmente el amarillo `#f5c518` sobre blanco: NO usar como color de texto, solo como subrayado o fondo de detalle).
- **Alt descriptivo** en todas las imágenes. Ejemplos:
  - ✅ "Paisaje volcánico de Timanfaya al atardecer"
  - ✅ "Salón luminoso de apartamento con vistas al mar"
  - ❌ "imagen 1"
  - ❌ "foto"
- **Focus states visibles** en todos los elementos interactivos:
  ```css
  :focus-visible {
    outline: 2px solid var(--ink);
    outline-offset: 2px;
    border-radius: 4px;
  }
  ```
- **Formulario con labels asociados** (`<label for="...">`), no solo placeholders.
- **Idioma:** `<html lang="es">`.
- **Estructura semántica:** `<header>`, `<main>`, `<section>`, `<footer>`. Una única `<h1>` (en el hero).

---

## 11. Reglas al modificar la landing (obligatorias)

### NO

- **NO inventar nuevas paletas de color** sin consultar al usuario.
- **NO añadir nuevas familias tipográficas.** Inter para todo.
- **NO añadir testimonios falsos.** Si no hay testimonios reales, no se inventan ni se usan placeholders tipo "Lorem ipsum cliente satisfecho".
- **NO añadir iconos sin justificación clara.** Este diseño es type-driven y photo-driven, no icon-driven. Si hace falta un icono funcional (ej. flecha en un CTA), usar un SVG inline minimal, no librerías de iconos completas.
- **NO expandir el uso de azul/amarillo canario** más allá del guiño puntual documentado en §2.
- **NO usar lenguaje de startup** ni las palabras prohibidas en §8.
- **NO añadir parallax, scroll hijacking, partículas, ni auto-play.**

### SÍ

- **SÍ se puede:**
  - Ajustar copy dentro de las reglas de §8.
  - Añadir secciones nuevas **dentro del sistema** (mismas variables CSS, misma tipografía, mismos patrones).
  - Refinar animaciones respetando los límites de §7.
  - Ajustar espaciados.
  - Mejorar accesibilidad.

### Cuando dudes

- Si una decisión de diseño no está documentada en esta skill, **pregunta al usuario antes de improvisar**.
- Si dudas si un uso del color canario es excesivo, **lo es**. Restricción por defecto.

---

## 12. Quick reference

| Tema           | Regla                                                                 |
|----------------|-----------------------------------------------------------------------|
| Tipografía     | Inter, pesos 300/400/500/600/700. Familia única.                      |
| Fondo base     | `var(--bg)` blanco, alternar con `var(--bg-section)` gris muy claro.  |
| Texto primario | `var(--ink)` (#1d1d1f).                                               |
| Texto secund.  | `var(--ink-soft)` (#6e6e73).                                          |
| Bordes         | `var(--line)` (#d2d2d7) finos.                                        |
| Acento canario | Solo guiño puntual en una palabra por titular. Nunca fondos.          |
| Botones CTA    | Píldora negra (`var(--ink)`) + texto blanco. Radius 980px.            |
| Foto hero      | `/public/lanzarote.webp` + overlay gradiente sutil.                   |
| Carruseles     | scroll-snap nativo, sin auto-play, controles solo en desktop hover.   |
| Animaciones    | Fade + slide-up, 600–800ms, ease-out. Nada agresivo.                  |
| Headlines      | Sentence case. Inter 600. Letter-spacing -0.02em.                     |
| Eyebrows       | 12px, uppercase, letter-spacing 0.15em, `var(--ink-soft)`, weight 500.|
| Mobile-first   | Sí. Breakpoints 768px / 1024px. Max-width contenido 1120px.           |

---

## 13. Estado actual (a fecha de creación de la skill)

- El proyecto **aún no tiene** estructura Next.js inicializada. Las fotos están en la raíz (ver §3). Cuando el usuario pida construir la landing, los pasos serán:
  1. Inicializar Next.js App Router con TypeScript.
  2. Crear `/public/` y mover/renombrar las fotos según la tabla de §3 (confirmando qué muestra cada una antes).
  3. Configurar Inter con `next/font/google`.
  4. Crear `app/globals.css` con las variables CSS de §2.
  5. Construir los componentes de §5 en `/components/`.
  6. Ensamblar en `app/page.tsx`.
- **No construir nada hasta que el usuario lo pida explícitamente.**
