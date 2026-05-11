import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tabaiba Hosts · Gestión de viviendas vacacionales en Lanzarote",
  description:
    "Llevamos tu piso en Lanzarote. Mensajes, check-ins, limpieza, incidencias. 20% sobre lo que cobras, sin permanencia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
