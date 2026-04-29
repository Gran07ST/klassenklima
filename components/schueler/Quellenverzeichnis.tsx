"use client";

import { Quellen } from "@/lib/types";
import { useState } from "react";

interface QuellenverzeichnisProps {
  quellen: Quellen;
}

export default function Quellenverzeichnis({
  quellen,
}: QuellenverzeichnisProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-[#e8e5df]">
      <button
        onClick={() => setExpanded(!expanded)}
        className="group inline-flex items-center gap-2 hover:text-[#4a403a] transition-colors duration-300"
        aria-expanded={expanded}
      >
        <h3
          className="text-lg md:text-xl font-light tracking-tight"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Quellenverzeichnis
        </h3>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M 6 9 L 12 15 L 18 9" stroke="currentColor" />
        </svg>
      </button>

      {expanded && (
        <div className="mt-4 md:mt-6 ml-4 md:ml-6 border-l-2 border-accent pl-6 md:pl-8 animate-fade-in-up">
          <p className="text-xs md:text-sm leading-relaxed text-[#6b665f] mb-4 md:mb-6">
            {quellen.beschreibung}
          </p>

          <ul className="space-y-3 md:space-y-4 mb-4 md:mb-6">
            {quellen.literatur.map((eintrag, index) => (
              <li key={index} className="text-xs md:text-sm leading-relaxed">
                <div>
                  <span className="text-accent font-normal">
                    {eintrag.typ}:{" "}
                  </span>
                  <span className="text-[#6b665f]">{eintrag.autorJahr}</span>
                </div>
                <div className="text-[#6b665f]">{eintrag.titel}</div>
              </li>
            ))}
          </ul>

          <p className="text-xs md:text-sm leading-relaxed text-[#8a847a] italic">
            {quellen.hinweis}
          </p>
        </div>
      )}
    </section>
  );
}
