"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export type Photo = { src: string; alt: string };

export function PhotoCarousel({ photos }: { photos: Photo[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.55, behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      pausedRef.current = false;
    };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);

    const onVisibility = () => {
      pausedRef.current = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const SPEED = 40; // px / segundo
    const RAMP_MS = 1200; // ease-in al arrancar
    const start = performance.now();
    let last = start;
    let rafId = 0;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current) {
        const half = el.scrollWidth / 2;
        if (half > 0) {
          // Ease-in suave durante el primer ~1.2s
          const elapsed = now - start;
          const t = Math.min(1, elapsed / RAMP_MS);
          const ease = t * t; // ease-in cuadrático
          const v = SPEED * ease;
          let next = el.scrollLeft + v * dt;
          if (next >= half) next -= half; // wrap invisible
          el.scrollLeft = next;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Duplicamos las fotos para wrap continuo invisible
  const loop = [...photos, ...photos];

  return (
    <div className="carousel">
      <div className="track" ref={trackRef}>
        {loop.map((p, i) => (
          <div className="slide" key={i} aria-hidden={i >= photos.length}>
            <Image
              src={p.src}
              alt={i < photos.length ? p.alt : ""}
              width={1200}
              height={800}
              sizes="(max-width: 768px) 85vw, 45vw"
              className="img"
            />
          </div>
        ))}
      </div>

      <button
        className="ctrl prev"
        aria-label="Foto anterior"
        onClick={() => scrollBy(-1)}
        type="button"
      >
        ←
      </button>
      <button
        className="ctrl next"
        aria-label="Foto siguiente"
        onClick={() => scrollBy(1)}
        type="button"
      >
        →
      </button>

      <style jsx>{`
        .carousel {
          position: relative;
          width: 100%;
        }
        .track {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          padding: 0 clamp(24px, 5vw, 64px) 8px;
          scrollbar-width: none;
        }
        .track::-webkit-scrollbar {
          display: none;
        }
        .slide {
          flex: 0 0 85%;
          border-radius: var(--radius-card);
          overflow: hidden;
          background: var(--bg-section);
          aspect-ratio: 4 / 5;
        }
        @media (min-width: 768px) {
          .slide {
            flex-basis: 45%;
            aspect-ratio: 3 / 2;
          }
        }
        .slide :global(.img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 400ms var(--ease);
        }
        .slide:hover :global(.img) {
          transform: scale(1.02);
        }
        .ctrl {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid var(--line);
          color: var(--ink);
          font-size: 18px;
          opacity: 0;
          transition: opacity 200ms var(--ease), background-color 200ms var(--ease);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }
        .carousel:hover .ctrl {
          opacity: 1;
        }
        .ctrl:hover {
          background: #fff;
        }
        .prev {
          left: clamp(8px, 2vw, 24px);
        }
        .next {
          right: clamp(8px, 2vw, 24px);
        }
        @media (max-width: 767px) {
          .ctrl {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
