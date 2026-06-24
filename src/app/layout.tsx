import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const dancingScript = localFont({
  src: "../../public/fonts/DancingScript.ttf",
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "My Supa Store — Boutique de football",
    template: "%s | My Supa Store",
  },
  description:
    "Découvrez notre sélection de maillots, ballons, chaussures et accessoires de football.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${bebasNeue.variable} ${inter.variable} ${dancingScript.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-pitch-950 font-body text-white antialiased">
        {children}
      </body>
    </html>
  );
}
