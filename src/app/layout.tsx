import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PT Nusantara Ember Indonesia | Premium Coconut Shell Charcoal Briquettes Exporter",
  description:
    "Direct manufacturer and global exporter of laboratory-grade 100% coconut shell charcoal briquettes for shisha and BBQ. SMM & MSDS certified, <2.2% white ash, shipping to 42+ ports worldwide.",
  keywords: [
    "coconut shell charcoal",
    "charcoal briquettes",
    "shisha charcoal",
    "hookah charcoal indonesia",
    "indonesian charcoal exporter",
    "briket arang batok kelapa",
    "PT Nusantara Ember Indonesia",
    "FCL charcoal exporter",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary">
        {children}
      </body>
    </html>
  );
}
