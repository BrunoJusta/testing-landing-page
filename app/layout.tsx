import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "kōmvitis, craft kombucha de folha de videira",
  description:
    "Fermentamos folha de videira colhida numa vinha com nome, casta e ano. O convite para os bons momentos.",
  openGraph: {
    title: "kōmvitis, craft kombucha",
    description:
      "Fermentamos folha de videira colhida numa vinha com nome, casta e ano.",
    locale: "pt_PT",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f2f2f2",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" data-accent="rose">
      <head>
        {/* The two faces the first viewport actually needs. */}
        <link
          rel="preload"
          href="/fonts/inter-tight-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
