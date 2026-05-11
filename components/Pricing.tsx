"use client";

import { Reveal } from "./Reveal";

export function Pricing() {
  return (
    <section className="section section--white" id="precio">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Precio</span>
        </Reveal>

        <div className="grid">
          <Reveal>
            <div className="big">
              <span className="num">20</span>
              <span className="pct">%</span>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="copy">
              <h2 className="h-display h-3" style={{ fontSize: "clamp(24px, 2.2vw, 32px)" }}>
                Sobre lo que cobras. Si no cobras, no cobramos.
              </h2>

              <ul className="points">
                <li>
                  <strong>Sin permanencia.</strong> Te vas cuando quieras, sin
                  papeles raros.
                </li>
                <li>
                  <strong>Sin coste de alta.</strong> Empezamos cuando tú nos
                  digas.
                </li>
                <li>
                  <strong>El dinero te entra a ti.</strong> En tu cuenta de
                  Airbnb como siempre. La comisión te la facturamos aparte.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        .grid {
          margin-top: clamp(32px, 4vw, 56px);
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: center;
        }
        @media (min-width: 768px) {
          .grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          }
        }
        .big {
          display: flex;
          align-items: flex-start;
          line-height: 0.85;
          letter-spacing: -0.04em;
          font-weight: 600;
          color: var(--ink);
        }
        .num {
          font-size: clamp(96px, 14vw, 180px);
        }
        .pct {
          font-size: clamp(56px, 8vw, 100px);
          color: var(--canary-blue);
          margin-left: 6px;
          margin-top: clamp(8px, 1vw, 16px);
        }
        .copy h2 {
          line-height: 1.2;
        }
        .points {
          list-style: none;
          padding: 0;
          margin: 28px 0 0;
          display: grid;
          gap: 16px;
        }
        .points li {
          color: var(--ink-soft);
          font-size: 17px;
          line-height: 1.5;
          padding-left: 22px;
          position: relative;
        }
        .points li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.7em;
          width: 8px;
          height: 1px;
          background: var(--ink-soft);
        }
        .points strong {
          color: var(--ink);
          font-weight: 500;
        }
      `}</style>
    </section>
  );
}
