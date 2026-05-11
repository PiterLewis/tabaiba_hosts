"use client";

import { PhotoCarousel, type Photo } from "./PhotoCarousel";
import { Reveal } from "./Reveal";

const photos: Photo[] = [
  { src: "/piso-1.jpg", alt: "Salón luminoso con televisor, mueble de madera y puerta verde al exterior" },
  { src: "/piso-2.jpg", alt: "Sala de estar con sofá gris amplio y mesa de centro de madera" },
  { src: "/piso-3.jpg", alt: "Dormitorio con cama de matrimonio, ropa de cama a rayas y cortinas bordadas" },
  { src: "/piso-4.jpg", alt: "Dormitorio con cama vestida en blanco, cojín dorado y cuadros decorativos sobre el cabecero" },
  { src: "/piso-5.jpg", alt: "Dormitorio con luz cálida nocturna y lámpara de mimbre" },
  { src: "/piso-6.jpg", alt: "Cocina americana con muebles blancos, lavadora y nevera de acero" },
  { src: "/piso-7.jpg", alt: "Cocina lineal con encimera oscura, lavadora integrada y luz cálida bajo armarios" },
  { src: "/piso-8.jpg", alt: "Terraza privada con mesa y sillas blancas y carpintería verde" },
];

export function HowItWorks() {
  return (
    <section className="section section--soft" id="como-funciona">
      <div className="container head">
        <Reveal>
          <span className="eyebrow">Cómo funciona</span>
          <h2 className="h-display h-2" style={{ maxWidth: "20ch" }}>
            Tú nos das las llaves. Nosotros lo llevamos.
          </h2>
          <p className="lead" style={{ marginTop: 20 }}>
            Pisos reales que gestionamos hoy. Mismo Airbnb de siempre, sin
            cambiar nada de tu cuenta.
          </p>
        </Reveal>
      </div>

      <div className="carousel-wrap">
        <Reveal>
          <PhotoCarousel photos={photos} />
        </Reveal>
      </div>

      <style jsx>{`
        .head {
          margin-bottom: clamp(40px, 5vw, 64px);
        }
        .carousel-wrap {
          max-width: var(--max-w);
          margin-inline: auto;
        }
      `}</style>
    </section>
  );
}
