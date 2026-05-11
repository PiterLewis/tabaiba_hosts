"use client";

import Image from "next/image";
import { useState } from "react";

type Col = { src: string; alt: string };

const cols: Col[] = [
  {
    src: "/lanzarote-timanfaya.jpg",
    alt: "Paisaje volcánico de Timanfaya: conos rojos sobre tierra negra al amanecer",
  },
  {
    src: "/lanzarote-cactus.jpg",
    alt: "Cactus redondos del Jardín de Cactus de Guatiza sobre tierra volcánica negra, con roca y cielo al fondo",
  },
  {
    src: "/lanzarote-jameos.jpg",
    alt: "Piscina turquesa de Jameos del Agua rodeada de roca volcánica y palmeras, obra de César Manrique",
  },
];

export function Hero() {
  const [loaded, setLoaded] = useState(0);
  const ready = loaded >= cols.length;

  return (
    <section className="hero" id="top">
      <div
        className={`hero-collage ${ready ? "is-ready" : ""}`}
        aria-hidden="true"
      >
        {cols.map((c, i) => (
          <div
            key={c.src}
            className="hero-col"
            style={{ ["--d" as string]: `${i * 160}ms` }}
          >
            <Image
              src={c.src}
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 34vw, 34vw"
              onLoad={() => setLoaded((n) => n + 1)}
            />
          </div>
        ))}
      </div>

      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-content">
        <span className="eyebrow eyebrow--light">Lanzarote</span>
        <h1 className="h-display h-1 hero-title">
          Tu piso en <span className="canary-flag">Lanzarote</span>,
          <br />
          funcionando solo.
        </h1>
        <p className="hero-sub">
          Llevamos los mensajes, los check-ins, la limpieza y las incidencias.
          Tú cobras como siempre.
        </p>
        <div className="hero-ctas">
          <a href="#contacto" className="btn btn-primary">
            Empezar conversación
          </a>
          <a href="#como-funciona" className="btn btn-secondary btn-on-dark">
            Cómo funciona <span className="arrow">→</span>
          </a>
        </div>
      </div>

      <span className="sr-only">
        Collage de paisajes de Lanzarote: Timanfaya, Jardín de Cactus y Jameos
        del Agua.
      </span>

      <style jsx>{`
        .eyebrow--light {
          color: rgba(255, 255, 255, 0.82);
        }
        .hero-title {
          color: #fff;
          max-width: 18ch;
          text-shadow: 0 1px 30px rgba(0, 0, 0, 0.18);
          text-wrap: balance;
        }
        .hero-sub {
          margin-top: 20px;
          font-size: clamp(18px, 1.6vw, 22px);
          color: rgba(255, 255, 255, 0.9);
          max-width: 48ch;
          line-height: 1.45;
          font-weight: 400;
          text-shadow: 0 1px 16px rgba(0, 0, 0, 0.25);
        }
        .hero-ctas {
          margin-top: 36px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px 24px;
          align-items: center;
        }
      `}</style>
    </section>
  );
}
