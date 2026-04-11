"use client";

import Header from "@/components/layout/Header";
import UebungCard from "@/components/lehrer/UebungCard";
import UebungFilter from "@/components/lehrer/UebungFilter";
import { Uebung } from "@/lib/types";
import { useState } from "react";

// Import data
import uebungenData from "@/data/uebungen.json";

export default function UebungenPage() {
  const [uebungen, setUebungen] = useState<Uebung[]>(
    uebungenData.uebungen as Uebung[],
  );
  const [filtered, setFiltered] = useState<Uebung[]>(
    uebungenData.uebungen as Uebung[],
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2d2a26] flex flex-col">
      <Header
        title="Übungen"
        subtitle="Übungskatalog für ein positives Klassenklima"
      />

      <main className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Introduction */}
          <div className="mb-6 md:mb-8">
            <p className="text-[#6b665f] text-sm md:text-base leading-relaxed">
              Hier findest du eine Sammlung von Übungen zur Förderung des
              Klassenklimas. Filtere nach Zeit, Alter oder Thema.
            </p>
          </div>

          {/* Filter */}
          <UebungFilter uebungen={uebungen} onFilterChange={setFiltered} />

          {/* Results count */}
          <div className="mb-6 md:mb-8 text-[#8a847a] text-xs md:text-sm">
            {filtered.length} {filtered.length === 1 ? "Übung" : "Übungen"}
            {filtered.length !== uebungen.length
              ? ` (gefiltert von ${uebungen.length})`
              : ""}
          </div>

          {/* Übungen Grid */}
          <div className="space-y-6 md:space-y-8">
            {filtered.length === 0 ? (
              <div className="text-center py-12 md:py-16">
                <p className="text-[#8a847a] text-sm md:text-base">
                  Keine Übungen gefunden. Versuche andere Filter.
                </p>
              </div>
            ) : (
              filtered.map((uebung) => (
                <UebungCard key={uebung.id} uebung={uebung} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
