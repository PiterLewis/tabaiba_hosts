"use client";

import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-logo" aria-label="Tabaiba Hosts">
          Tabaiba<span style={{ color: "var(--canary-blue)" }}> · </span>Hosts
        </a>
        <a href="#contacto" className="nav-cta">
          <span className="cta-full">Hablar con nosotros</span>
          <span className="cta-short">Contacto</span>
        </a>
      </div>

      <style jsx>{`
        .nav {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 50;
          height: 52px;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid transparent;
          transition: border-color 200ms var(--ease);
        }
        .nav--scrolled {
          border-bottom-color: var(--line);
        }
        .nav-inner {
          height: 100%;
          max-width: var(--max-w);
          margin-inline: auto;
          padding-inline: clamp(20px, 5vw, 64px);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          font-weight: 500;
          font-size: 17px;
          letter-spacing: -0.01em;
          color: var(--ink);
        }
        .nav-cta {
          font-weight: 500;
          font-size: 14px;
          color: var(--ink);
          padding: 8px 16px;
          border-radius: var(--radius-pill);
          border: 1px solid var(--line);
          transition: background-color 200ms var(--ease),
            color 200ms var(--ease);
          white-space: nowrap;
        }
        .nav-cta:hover {
          background: var(--ink);
          color: #fff;
          border-color: var(--ink);
        }
        .cta-short {
          display: none;
        }
        @media (max-width: 480px) {
          .cta-full {
            display: none;
          }
          .cta-short {
            display: inline;
          }
        }
      `}</style>
    </header>
  );
}
