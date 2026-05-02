import Footer from "@/components/layout/Footer";
import Logo from "@/components/layout/Logo";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Schulklima - Eine App für ein positives Miteinander",
  description:
    "Eine WebApp zur Förderung eines positiven Schulklimas für Lehrkräfte und Schüler:innen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <div className="px-6 md:px-20 bg-[#faf9f6] text-[#2d2a26]">
          <div className="max-w-4xl mx-auto pt-8">
            <Logo />
          </div>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
