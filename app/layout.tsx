import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Klassenklima - Eine App für ein positives Miteinander",
  description:
    "Eine WebApp zur Förderung eines positiven Klassenklimas für Lehrkräfte und Schüler/innen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
