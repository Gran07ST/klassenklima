"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UebungCard from "@/components/lehrer/UebungCard";
import UebungFilter from "@/components/lehrer/UebungFilter";
import { Uebung } from "@/lib/types";

// Import data
import uebungenData from "@/data/uebungen.json";

export default function UebungenPage() {
  const [uebungen, setUebungen] = useState<Uebung[]>(
    uebungenData.uebungen as Uebung[]
  );
  const [filtered, setFiltered] = useState<Uebung[]>(
    uebungenData.uebungen as Uebung[]
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2d2a26] flex flex-col">
      <Header
        title="Übungen"
        subtitle="Übungskatalog für ein positives Klassenklima"
      />

      <main className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-[#6b665f] text-lg leading-relaxed max-w-3xl">
              Hier findest du eine Sammlung von Übungen zur Förderung des
              Klassenklimas. Filtere nach Zeit, Alter oder Thema.
            </p>
          </div>

          {/* Filter */}
          <UebungFilter uebungen={uebungen} onFilterChange={setFiltered} />

          {/* Results count */}
          <div className="mb-8 text-[#8a847a] text-sm">
            {filtered.length} {filtered.length === 1 ? "Übung" : "Übungen"}
            {filtered.length !== uebungen.length
              ? ` (gefiltert von ${uebungen.length})`
              : ""}
          </div>

          {/* Übungen Grid */}
          <div className="space-y-8">
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#8a847a] text-lg">
                  Keine Übungen gefunden. Versuche andere Filter.
                </p>
              </div>
            ) : (
              filtered.map((uebung) => (
                <UebungCard key={uebung.id} uebung={uebung} />
              ))
            )}
          </div>

          {/* Back link */}
          <div className="mt-16">
            <Link href="/lehrer" className="inline-block">
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
                <span className="text-[#6b665f] text-sm font-normal">
                  Zurück zur Übersicht
                </span>
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
