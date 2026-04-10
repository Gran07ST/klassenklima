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
    if (pathname === "/schueler/auswertung" || pathname === "/schueler/vorschlaege") {
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

  const showBackButton = pathname !== "/" && pathname !== "/lehrer" && pathname !== "/schueler";

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
              viewBox="0 0 120 40"
              className="w-48 h-16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
             >
               {/* Simple logo: book icon + text */}
               <rect
                x="10"
                y="10"
                width="24"
                height="18"
                rx="2"
                stroke="#4a403a"
                strokeWidth="1.5"
                fill="none"
               />
               <path d="M 18 16 L 28 16" stroke="#4a403a" strokeWidth="0.8" />
               <path d="M 18 20 L 26 20" stroke="#4a403a" strokeWidth="0.8" />
               <path
                d="M 36 12 L 36 28 L 44 28"
                stroke="#4a403a"
                strokeWidth="1.5"
                fill="none"
               />
               {/* Text */}
               <text
                x="60"
                y="28"
                className="text-[#2d2a26]"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "24px",
                  fontWeight: 400,
                 }}
               >
                Klassenklima
               </text>
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
