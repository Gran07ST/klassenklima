"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Uebung } from "@/lib/types";

interface UebungCardProps {
  uebung: Uebung;
}

export default function UebungCard({ uebung }: UebungCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="border-[#e8e5df] hover:border-[#d4d0c8] transition-colors duration-300 overflow-hidden">
      <CardContent className="p-8">
        <div className="flex flex-col">
          {/* Header: Title + Badges */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h3
              className="text-2xl font-light text-[#2d2a26]"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              {uebung.titel}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="border-[#b8afa7] text-[#6b665f] bg-transparent hover:bg-[#f4f1ea]"
              >
                {uebung.zeitBadge}
              </Badge>
              {uebung.alterBadge.map((alter) => (
                <Badge
                  key={alter}
                  variant="outline"
                  className="border-[#b8afa7] text-[#6b665f] bg-transparent hover:bg-[#f4f1ea]"
                >
                  {alter}
                </Badge>
              ))}
            </div>
          </div>

          {/* Short description */}
          <p className="text-[#6b665f] text-base leading-relaxed mb-6">
            {uebung.kurzbeschreibung}
          </p>

          {/* Toggle button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="group inline-flex items-center gap-2 text-[#6b665f] hover:text-[#4a403a] transition-colors duration-300"
          >
            <span className="text-sm font-normal">
              {expanded ? "Weniger zeigen" : "Anleitung anzeigen"}
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M 6 9 L 12 15 L 18 9" stroke="currentColor" />
            </svg>
          </button>

          {/* Expanded content */}
          {expanded && (
            <div className="mt-6 pt-6 border-t border-[#e8e5df] animate-fade-in-up">
              <div className="prose prose-sm max-w-none">
                <p className="text-[#6b665f] leading-relaxed whitespace-pre-wrap">
                  {uebung.anleitung}
                </p>
                {uebung.material && (
                  <div className="mt-4">
                    <p className="text-sm text-[#8a847a] font-normal mb-2">
                      Material:
                    </p>
                    <p className="text-[#6b665f] text-sm leading-relaxed">
                      {uebung.material}
                    </p>
                  </div>
                )}
                {uebung.tipps && (
                  <div className="mt-4">
                    <p className="text-sm text-[#8a847a] font-normal mb-2">
                      Tipp:
                    </p>
                    <p className="text-[#6b665f] text-sm leading-relaxed">
                      {uebung.tipps}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
