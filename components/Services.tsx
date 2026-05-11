"use client";

import { Reveal } from "./Reveal";

const services = [
  {
    title: "Mensajes a huéspedes",
    body: "Respondemos en minutos, en español o inglés. A cualquier hora. Tú no abres la app.",
  },
  {
    title: "Check-in y check-out",
    body: "Recibimos al huésped, le explicamos el piso, las normas y por dónde se va a la playa.",
  },
  {
    title: "Limpieza y reposición",
    body: "Limpieza profesional entre reservas. Toallas, sábanas, jabón, papel. Sin cuentas pendientes.",
  },
  {
    title: "Mantenimiento e incidencias",
    body: "Se rompe algo, lo arreglamos. Te avisamos antes y te decimos cuánto cuesta. Cero sorpresas.",
  },
  {
    title: "Optimización del anuncio",
    body: "Repasamos fotos, descripción, precios por temporada y reglas. Sin tocar lo que ya funciona.",
  },
  {
    title: "Reporte mensual claro",
    body: "Cada mes ves qué ha entrado, qué hemos hecho y cuánto te facturamos. En una página.",
  },
];

export function Services() {
  return (
    <section className="section section--soft" id="servicios">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Qué hacemos</span>
          <h2 className="h-display h-2" style={{ maxWidth: "18ch" }}>
            Todo lo del piso, menos cobrar.
          </h2>
        </Reveal>

        <div className="grid">
          {services.map((s, i) => (
            <Reveal key={i} delay={(i % 3) * 100}>
              <article className="card">
                <p className="num">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="h-3">{s.title}</h3>
                <p className="body">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <style jsx>{`
        .grid {
          margin-top: clamp(48px, 6vw, 88px);
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .card {
          background: var(--bg);
          border-radius: var(--radius-card);
          padding: clamp(32px, 4vw, 56px);
          transition: transform 300ms var(--ease);
        }
        .card:hover {
          transform: translateY(-2px);
        }
        .num {
          font-size: 14px;
          font-weight: 500;
          color: var(--ink-soft);
          margin: 0 0 24px;
        }
        .body {
          margin: 12px 0 0;
          color: var(--ink-soft);
          font-size: 16px;
          line-height: 1.55;
        }
      `}</style>
    </section>
  );
}
