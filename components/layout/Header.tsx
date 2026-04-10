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
      <div className="max-w-4xl mx-auto">
        {showBackButton && (
          <Link href={getBackUrl()} className="inline-block mb-6">
            <button className="group inline-flex items-center gap-3 text-[#6b665f] hover:text-[#4a403a] transition-colors duration-300">
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
              <span className="text-[#6b665f] text-sm font-normal">Zurück</span>
            </button>
          </Link>
        )}

        <Link href="/" className="inline-block mb-8">
          <svg
            viewBox="45 8 71 37"
            fill="none"
            className="w-16 h-8"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Central figure */}
            <circle
              cx="80"
              cy="18"
              r="9"
              stroke="#4a403a"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M 80 27 L 80 38"
              stroke="#4a403a"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 80 29 L 66 36 L 80 43 L 94 36 L 80 29"
              stroke="#4a403a"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Left figure */}
            <circle
              cx="56"
              cy="20"
              r="7"
              stroke="#4a403a"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 56 27 L 56 35"
              stroke="#4a403a"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M 56 28 L 46 34 L 56 39 L 66 34 L 56 28"
              stroke="#4a403a"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right figure */}
            <circle
              cx="104"
              cy="20"
              r="7"
              stroke="#4a403a"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 104 27 L 104 35"
              stroke="#4a403a"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M 104 28 L 94 34 L 104 39 L 114 34 L 104 28"
              stroke="#4a403a"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Connection arc */}
            <path
              d="M 65 16 Q 80 24 95 16"
              stroke="#4a403a"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </Link>

        <h1
          className="text-4xl md:text-5xl font-light tracking-tight text-[#2d2a26]"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-[#6b665f] mt-3 text-lg font-normal">{subtitle}</p>
        )}
      </div>
    </header>
  );
}
