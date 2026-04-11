"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const pathname = usePathname();

  // Bestimme Back-URL basierend auf aktueller Seite
  const getBackUrl = () => {
    if (!pathname) return "/";

    // Wenn auf /schueler/auswertung oder /schueler/vorschlaege, zurück zu /schueler
    if (
      pathname === "/schueler/auswertung" ||
      pathname === "/schueler/vorschlaege"
    ) {
      return "/schueler";
    }

    // Wenn auf /schueler/fragebogen, zurück zu /schueler
    if (pathname === "/schueler/fragebogen") {
      return "/schueler";
    }

    // Wenn auf /lehrer/wissen oder /lehrer/uebungen, zurück zu /lehrer
    if (pathname === "/lehrer/wissen" || pathname === "/lehrer/uebungen") {
      return "/lehrer";
    }

    // Sonst zurück zu /
    return "/";
  };

  const showBackButton =
    pathname !== "/" && pathname !== "/lehrer" && pathname !== "/schueler";

  return (
    <header className="py-8 px-6">
      {showBackButton && (
        <div className="max-w-4xl mx-auto">
          <Link href={getBackUrl()} className="inline-block mb-6">
            <button className="group inline-flex items-center gap-3 text-accent hover:text-[#4a403a] transition-colors duration-300">
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M 19 12 L 5 12" stroke="currentColor" />
                <path d="M 10 7 L 5 12 L 10 17" stroke="currentColor" />
              </svg>
              <span className="text-accent text-sm font-normal">Zurück</span>
            </button>
          </Link>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <h1
          className="text-4xl md:text-5xl font-light tracking-tight text-[#2d2a26]"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {title}
        </h1>
        {subtitle && <p className=" mt-3 text-lg font-normal">{subtitle}</p>}
      </div>
    </header>
  );
}
