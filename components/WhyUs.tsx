"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";

const reasons = [
  {
    title: "Llevamos pocos pisos a propósito.",
    body: "Para que el tuyo no sea un número. Conocemos cada cerradura, cada vecino y cada huésped que entra.",
  },
  {
    title: "Estamos en la isla.",
    body: "Si hay un problema, vamos al piso. No te pasamos un teléfono de un call center en otro continente.",
  },
  {
    title: "Hablamos claro.",
    body: "Te decimos lo que pasa, cuándo y cuánto cuesta. Sin tecnicismos y sin promesas raras.",
  },
];

export function WhyUs() {
  return (
    <section className="section section--soft" id="nosotros">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Por qué nosotros</span>
          <h2 className="h-display h-2" style={{ maxWidth: "20ch" }}>
            Somos pocos, somos de aquí, y cogemos el teléfono.
          </h2>
        </Reveal>

        <div className="grid">
          {reasons.map((r, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="card">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h-3" style={{ marginTop: 28 }}>
                  {r.title}
                </h3>
                <p className="body">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="photo">
            <Image
              src="/lanzarote-famara.jpg"
              alt="Playa de Famara con sus dunas de arena y los acantilados del Risco al fondo"
              width={1600}
              height={900}
              sizes="(max-width: 1120px) 100vw, 1120px"
            />
          </div>
        </Reveal>
      </div>

      <style jsx>{`
        .grid {
          margin-top: clamp(48px, 6vw, 88px);
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 768px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .num {
          display: inline-block;
          font-size: clamp(48px, 6vw, 80px);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1;
          color: var(--ink);
          border-bottom: 3px solid var(--canary-yellow);
          padding-bottom: 6px;
        }
        .body {
          margin-top: 12px;
          color: var(--ink-soft);
          font-size: 17px;
          line-height: 1.55;
        }
        .photo {
          margin-top: clamp(64px, 8vw, 112px);
          border-radius: var(--radius-card);
          overflow: hidden;
        }
        .photo :global(img) {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>
    </section>
  );
}
