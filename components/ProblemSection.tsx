"use client";

import { Reveal } from "./Reveal";

const items = [
  {
    title: "Te escriben a las once de la noche un sábado.",
    body: "Tú estás cenando con tu familia. Ellos quieren saber dónde guardas las toallas de playa.",
  },
  {
    title: "El aire roto el día del check-in.",
    body: "Y no sabes a quién llamar un domingo a las tres de la tarde en agosto.",
  },
  {
    title: "Tu limpiadora se pone mala.",
    body: "Y la siguiente reserva entra en tres horas. Tú estás en Madrid.",
  },
];

export function ProblemSection() {
  return (
    <section className="section section--white" id="problema">
      <div className="container">
        <Reveal>
          <span className="eyebrow">El día a día</span>
          <h2 className="h-display h-2" style={{ maxWidth: "18ch" }}>
            Tener un piso en Airbnb se parece bastante a tener un{" "}
            <span className="canary-underline">segundo trabajo</span>.
          </h2>
        </Reveal>

        <div className="grid">
          {items.map((it, i) => (
            <Reveal key={i} delay={120 * i}>
              <div className="card">
                <p className="num">0{i + 1}</p>
                <h3 className="h-3">{it.title}</h3>
                <p className="body">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style jsx>{`
        .grid {
          margin-top: clamp(48px, 6vw, 88px);
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px 40px;
        }
        @media (min-width: 768px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .card {
          padding: 0;
        }
        .num {
          font-size: 14px;
          font-weight: 500;
          color: var(--ink-soft);
          margin: 0 0 16px;
          letter-spacing: 0.02em;
        }
        .body {
          margin-top: 12px;
          color: var(--ink-soft);
          font-size: clamp(16px, 1.2vw, 18px);
          line-height: 1.55;
        }
      `}</style>
    </section>
  );
}
