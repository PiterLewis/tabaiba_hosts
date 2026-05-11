# Proyecto: Tabaiba Hosts

Landing page de **Tabaiba Hosts**, empresa de gestión integral de viviendas vacacionales en Lanzarote.

> El nombre del directorio sigue siendo `landing_lanzbnb` por motivos históricos; la marca es **Tabaiba Hosts**.

## Fuente de verdad

**Antes de tocar cualquier código de la landing, activa la skill `landing-lanzarote`** (`.claude/skills/landing-lanzarote/SKILL.md`). Contiene todo el contexto: negocio, dirección estética, estructura, copy, animaciones, accesibilidad y reglas inviolables.

No improvises decisiones de diseño que no estén documentadas en esa skill. Si dudas, pregunta.

## Estado actual del repo

- Stack inicializado: **Next.js 15 App Router + TypeScript + React 19**. Inter via `next/font/google`.
- Fotos ya están en `/public/` con nombres descriptivos (`lanzarote-*.jpg/webp`, `piso-*.jpg`). Si llega una nueva, renombrar siguiendo el patrón y actualizar la tabla de §3 de la skill.
- Componentes en `/components/`. Composición en `app/page.tsx`. Variables CSS y reset en `app/globals.css`.

## Reglas de oro (resumen — la skill tiene el detalle)

- Tipografía única: **Inter**. Nunca mezclar familias, nunca serifs decorativas.
- Paleta Apple (`#1d1d1f`, `#f5f5f7`, `#6e6e73`, `#d2d2d7`). El azul/amarillo canario es solo **guiño puntual** (palabra teñida, subrayado, gradiente bandera en una sola palabra del hero), nunca fondos ni botones grandes.
- Estética photo-driven y type-driven. Nada de iconos cliché, nada de stock genérico, nada de testimonios inventados.
- Copy: tuteo, frases cortas, concreto. **Prohibidas** palabras de startup ("revolucionario", "soluciones", "optimizar", "potenciar"… — lista completa en §8 de la skill).
- Sin parallax, sin scroll hijacking, sin partículas. Solo dos auto-play autorizados: caída del hero collage al cargar (una vez) y deriva continua del carrusel de pisos (con pausa en hover/touch/focus).

## Cómo trabajar aquí

- Mobile-first. Breakpoints 768px / 1024px. `max-width: 1120px` en desktop.
- Dev server: `npm run dev` (escucha en `http://localhost:3000`).
- Cambios de marca o copy: tuteo, sin tecnicismos, en línea con el tono de Tabaiba Hosts.
