"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

type Status = "idle" | "sending" | "sent" | "error";

const PISOS_LABEL: Record<string, string> = {
  "1": "1 piso",
  "2": "2 pisos",
  "3": "3 pisos",
  mas: "Más de 3 pisos",
};

const GESTION_LABEL: Record<string, string> = {
  solo: "Lo llevo yo solo",
  ayuda: "Tiene a alguien para la limpieza",
  empresa: "Lo lleva otra empresa",
  "aun-no": "Aún no lo tiene publicado",
  otro: "Otro",
};

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: si el bot rellena este campo, abortamos en silencio.
    if (data.get("botcheck")) {
      setStatus("sent");
      return;
    }

    const nombre = String(data.get("nombre") || "").trim();
    const email = String(data.get("email") || "").trim();
    const telefono = String(data.get("telefono") || "").trim();
    const pisos = String(data.get("pisos") || "");
    const localidad = String(data.get("localidad") || "").trim();
    const gestion = String(data.get("gestion") || "");
    const mensaje = String(data.get("mensaje") || "").trim();

    const payload = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
      from_name: "Tabaiba Hosts — Landing",
      subject: `Nuevo lead — ${nombre || "sin nombre"}${localidad ? ` (${localidad})` : ""}`,
      // Campos visibles en el email
      Nombre: nombre,
      Email: email,
      Teléfono: telefono || "—",
      Localidad: localidad || "—",
      Pisos: PISOS_LABEL[pisos] || pisos,
      "Cómo lo gestiona ahora": GESTION_LABEL[gestion] || gestion || "—",
      Mensaje: mensaje || "—",
    };

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const sent = status === "sent";
  const sending = status === "sending";
  const error = status === "error";

  return (
    <section className="section section--white" id="contacto">
      <div className="container">
        <Reveal>
          <div className="head">
            <span className="eyebrow">Empezamos</span>
            <h2 className="h-display h-2" style={{ maxWidth: "16ch" }}>
              Cuéntanos de tu piso.
            </h2>
            <p className="lead" style={{ marginTop: 20 }}>
              Te contestamos el mismo día. Sin compromiso, sin formulario
              eterno.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          {sent ? (
            <div className="thanks" role="status">
              <p>
                Recibido. Te escribimos hoy mismo al correo o al teléfono que
                nos has dejado.
              </p>
            </div>
          ) : (
            <form className="form" onSubmit={onSubmit} noValidate>
              {/* Honeypot anti-spam (oculto, ningún humano lo rellena) */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: 1,
                  height: 1,
                  opacity: 0,
                }}
                aria-hidden="true"
              />

              <div className="row">
                <div className="field">
                  <label htmlFor="nombre">Nombre</label>
                  <input id="nombre" name="nombre" type="text" required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required autoComplete="email" />
                </div>
              </div>

              <div className="row">
                <div className="field">
                  <label htmlFor="telefono">Teléfono</label>
                  <input id="telefono" name="telefono" type="tel" autoComplete="tel" />
                </div>
                <div className="field">
                  <label htmlFor="pisos">Cuántos pisos tienes</label>
                  <select id="pisos" name="pisos" defaultValue="1">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="mas">Más de 3</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="localidad">¿Dónde está el piso?</label>
                <select id="localidad" name="localidad" defaultValue="">
                  <option value="" disabled>
                    Elige una localidad
                  </option>
                  <optgroup label="Arrecife">
                    <option value="Arrecife">Arrecife</option>
                  </optgroup>
                  <optgroup label="Haría">
                    <option value="Haría">Haría</option>
                    <option value="Arrieta">Arrieta</option>
                    <option value="Punta Mujeres">Punta Mujeres</option>
                    <option value="Mala">Mala</option>
                    <option value="Órzola">Órzola</option>
                    <option value="Máguez">Máguez</option>
                    <option value="Ye">Ye</option>
                    <option value="Tabayesco">Tabayesco</option>
                  </optgroup>
                  <optgroup label="San Bartolomé">
                    <option value="San Bartolomé">San Bartolomé</option>
                    <option value="Playa Honda">Playa Honda</option>
                    <option value="Güime">Güime</option>
                    <option value="El Islote">El Islote</option>
                    <option value="Montaña Blanca">Montaña Blanca</option>
                  </optgroup>
                  <optgroup label="Teguise">
                    <option value="Costa Teguise">Costa Teguise</option>
                    <option value="Teguise (Villa)">Teguise (Villa)</option>
                    <option value="Famara">Famara</option>
                    <option value="Caleta de Famara">Caleta de Famara</option>
                    <option value="Tahíche">Tahíche</option>
                    <option value="Nazaret">Nazaret</option>
                    <option value="Soo">Soo</option>
                    <option value="Tao">Tao</option>
                    <option value="Tiagua">Tiagua</option>
                    <option value="Mozaga">Mozaga</option>
                    <option value="Los Valles">Los Valles</option>
                  </optgroup>
                  <optgroup label="Tías">
                    <option value="Puerto del Carmen">Puerto del Carmen</option>
                    <option value="Tías">Tías</option>
                    <option value="Mácher">Mácher</option>
                    <option value="La Asomada">La Asomada</option>
                    <option value="Conil">Conil</option>
                  </optgroup>
                  <optgroup label="Tinajo">
                    <option value="Tinajo">Tinajo</option>
                    <option value="La Santa">La Santa</option>
                    <option value="Mancha Blanca">Mancha Blanca</option>
                    <option value="El Cuchillo">El Cuchillo</option>
                    <option value="Las Casas">Las Casas</option>
                  </optgroup>
                  <optgroup label="Yaiza">
                    <option value="Playa Blanca">Playa Blanca</option>
                    <option value="Yaiza">Yaiza</option>
                    <option value="Puerto Calero">Puerto Calero</option>
                    <option value="Femés">Femés</option>
                    <option value="Uga">Uga</option>
                    <option value="El Golfo">El Golfo</option>
                    <option value="Las Breñas">Las Breñas</option>
                    <option value="La Hoya">La Hoya</option>
                  </optgroup>
                  <option value="Otro">Otro / no listado</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="gestion">¿Cómo lo gestionas ahora?</label>
                <select id="gestion" name="gestion" defaultValue="">
                  <option value="" disabled>
                    Elige una opción
                  </option>
                  <option value="solo">Lo llevo yo solo</option>
                  <option value="ayuda">Tengo a alguien que me ayuda con la limpieza</option>
                  <option value="empresa">Lo lleva otra empresa</option>
                  <option value="aun-no">Aún no lo tengo publicado</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="mensaje">Algo que quieras contarnos (opcional)</label>
                <textarea id="mensaje" name="mensaje" rows={4} />
              </div>

              <button
                type="submit"
                className="btn btn-primary submit"
                disabled={sending}
                aria-busy={sending}
              >
                {sending ? "Enviando…" : "Empezar conversación"}
              </button>

              {error && (
                <p className="err" role="alert">
                  Algo ha ido mal al enviar. Vuelve a intentarlo o escríbenos
                  directamente a{" "}
                  <a href="mailto:tabaibahosts@gmail.com" className="alt-link">
                    tabaibahosts@gmail.com
                  </a>
                  .
                </p>
              )}

              <p className="alt">
                O escríbenos a{" "}
                <a href="mailto:tabaibahosts@gmail.com" className="alt-link">
                  tabaibahosts@gmail.com
                </a>
              </p>
            </form>
          )}
        </Reveal>
      </div>

      <style jsx>{`
        .head {
          text-align: left;
          max-width: 560px;
          margin: 0 auto clamp(40px, 5vw, 64px);
        }
        .form {
          max-width: 560px;
          margin: 0 auto;
          display: grid;
          gap: 20px;
          position: relative;
        }
        .thanks {
          max-width: 560px;
          margin: 0 auto;
          padding: 32px;
          border: 1px solid var(--line);
          border-radius: var(--radius-card);
          background: var(--bg-section);
          color: var(--ink);
          font-size: 17px;
        }
        .row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 640px) {
          .row {
            grid-template-columns: 1fr 1fr;
          }
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        label {
          font-size: 13px;
          font-weight: 500;
          color: var(--ink-soft);
        }
        input,
        select,
        textarea {
          appearance: none;
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 16px;
          color: var(--ink);
          transition: border-color 200ms var(--ease),
            background-color 200ms var(--ease);
        }
        select {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none' stroke='%236e6e73' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='1 1 6 6 11 1'/></svg>");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 12px 8px;
          padding-right: 44px;
        }
        textarea {
          resize: vertical;
          min-height: 96px;
        }
        input:focus,
        select:focus,
        textarea:focus {
          border-color: var(--ink);
          outline: none;
        }
        .submit {
          margin-top: 8px;
          justify-self: start;
        }
        .submit[disabled] {
          opacity: 0.6;
          cursor: not-allowed;
        }
        @media (max-width: 640px) {
          .submit {
            justify-self: stretch;
          }
        }
        .alt {
          color: var(--ink-soft);
          font-size: 14px;
          margin: 8px 0 0;
        }
        .alt-link {
          color: var(--ink);
          border-bottom: 1px solid var(--line);
        }
        .alt-link:hover {
          border-bottom-color: var(--ink);
        }
        .err {
          color: #b1322b;
          font-size: 14px;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
