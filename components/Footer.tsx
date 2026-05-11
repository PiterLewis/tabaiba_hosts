"use client";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container inner">
        <p>
          © {new Date().getFullYear()} Tabaiba Hosts. Gestión de viviendas
          vacacionales en Lanzarote.
        </p>
        <nav aria-label="Legal" className="links">
          <a href="/aviso-legal">Aviso legal</a>
          <span aria-hidden="true">·</span>
          <a href="/privacidad">Privacidad</a>
        </nav>
      </div>

      <style jsx>{`
        .footer {
          padding-block: 48px;
          border-top: 1px solid var(--line);
          background: var(--bg);
        }
        .inner {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 24px;
          align-items: center;
          justify-content: space-between;
          color: var(--ink-soft);
          font-size: 14px;
        }
        .inner p {
          margin: 0;
        }
        .links {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .links a:hover {
          color: var(--ink);
        }
      `}</style>
    </footer>
  );
}
