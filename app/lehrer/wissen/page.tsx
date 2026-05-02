"use client";

import Header from "@/components/layout/Header";
import StatCard from "@/components/lehrer/StatCard";
import QuellenListe from "@/components/schueler/QuellenListe";
import { StudienDaten } from "@/lib/types";
import { useState } from "react";

// Import data
import studienData from "@/data/studien.json";

export default function WissenPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const data = studienData as StudienDaten;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2d2a26] flex flex-col">
      <Header
        title="Wissen & Studien"
        subtitle="Forschungsergebnisse zum Klassenklima"
      />

      <main className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Relevanz für Peerbeziehungen */}
          <section className="mb-12 md:mb-20">
            <h2
              className="text-xl md:text-2xl font-light tracking-tight mb-6 md:mb-8"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              {
                data.wissenschaftlicheGrundlagen.relevanzFuerPeerbeziehungen
                  .titel
              }
            </h2>
            <ul className="space-y-3 md:space-y-4">
              {data.wissenschaftlicheGrundlagen.relevanzFuerPeerbeziehungen.aspekte.map(
                (aspekt, i) => (
                  <li key={i} className="flex gap-4 leading-relaxed">
                    <span className="text-accent shrink-0 select-none">—</span>
                    <span>{aspekt}</span>
                  </li>
                ),
              )}
            </ul>
          </section>

          {/* Schulklima vs. Klassenklima */}
          <section className="mb-12 md:mb-20">
            <h2
              className="text-xl md:text-2xl font-light tracking-tight mb-6 md:mb-8"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Schulklima oder Klassenklima?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <article className="border-l-2 border-accent pl-5 md:pl-6">
                <h3
                  className="text-lg md:text-xl font-light tracking-tight mb-3 text-accent"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Schulklima
                </h3>
                <p className="leading-relaxed">
                  {
                    data.wissenschaftlicheGrundlagen
                      .differenzierungKlimabegriffe.schulklima
                  }
                </p>
              </article>
              <article className="border-l-2 border-accent pl-5 md:pl-6">
                <h3
                  className="text-lg md:text-xl font-light tracking-tight mb-3 text-accent"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Klassenklima
                </h3>
                <p className="leading-relaxed">
                  {
                    data.wissenschaftlicheGrundlagen
                      .differenzierungKlimabegriffe.klassenklima
                  }
                </p>
              </article>
            </div>
          </section>

          {/* Zielgruppenspezifische Zuordnung */}
          <section className="mb-12 md:mb-20">
            <h2
              className="text-xl md:text-2xl font-light tracking-tight mb-4 md:mb-6"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Wer schaut auf welches Klima?
            </h2>
            <p className="italic leading-relaxed mb-6 md:mb-8 max-w-3xl">
              {
                data.wissenschaftlicheGrundlagen.zielgruppenspezifischeZuordnung
                  .begruendung
              }
            </p>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <article>
                <div className="text-xs uppercase tracking-[0.2em] text-accent mb-2">
                  Lehrpersonen
                </div>
                <h3
                  className="text-lg md:text-xl font-light tracking-tight mb-3"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  → Schulklima
                </h3>
                <p className="leading-relaxed">
                  {
                    data.wissenschaftlicheGrundlagen
                      .zielgruppenspezifischeZuordnung.lehrpersonen_schulklima
                  }
                </p>
              </article>
              <article>
                <div className="text-xs uppercase tracking-[0.2em] text-accent mb-2">
                  Schüler:innen
                </div>
                <h3
                  className="text-lg md:text-xl font-light tracking-tight mb-3"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  → Klassenklima
                </h3>
                <p className="leading-relaxed">
                  {
                    data.wissenschaftlicheGrundlagen
                      .zielgruppenspezifischeZuordnung
                      .schuelerinnen_klassenklima
                  }
                </p>
              </article>
            </div>
          </section>

          {/* Dimensionen des Schulklimas */}
          <section className="mb-12 md:mb-20">
            <h2
              className="text-xl md:text-2xl font-light tracking-tight mb-6 md:mb-8"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Vier Dimensionen des Schulklimas
            </h2>
            <p className="leading-relaxed mb-6 md:mb-8">
              {
                data.wissenschaftlicheGrundlagen.dimensionenDesSchulklimas
                  .einleitung
              }
            </p>
          </section>

          {/* Studien */}
          <div className="space-y-6 md:space-y-8">
            {data.studien.map((studie) => (
              <article
                key={studie.id}
                className="border-b border-accent pb-6 md:pb-8 last:border-b-0"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-accent mb-2">
                  {studie.themenbereich}
                </div>
                <h3
                  className="text-lg md:text-xl font-light tracking-tight mb-3 md:mb-4"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {studie.titel}
                </h3>
                <p className="leading-relaxed">{studie.beschreibung}</p>

                <button
                  onClick={() =>
                    setExpanded(expanded === studie.id ? null : studie.id)
                  }
                  className="mt-3 md:mt-4 group inline-flex items-center gap-2 hover:text-[#4a403a] transition-colors duration-300"
                >
                  <span className="text-xs md:text-sm font-normal">
                    {expanded === studie.id
                      ? "Weniger zeigen"
                      : "Mehr erfahren"}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      expanded === studie.id ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M 6 9 L 12 15 L 18 9" stroke="currentColor" />
                  </svg>
                </button>

                {expanded === studie.id && (
                  <div className="mt-4 ml-4 md:ml-6 border-l-2 border-accent pl-6 md:pl-8 animate-fade-in-up grid md:grid-cols-2 gap-6 md:gap-10">
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-3">
                        Kernaussagen
                      </h4>
                      <ul className="space-y-2.5">
                        {studie.kernaussagen.map((kern, i) => (
                          <li
                            key={i}
                            className="flex gap-3 leading-relaxed text-sm md:text-base"
                          >
                            <span className="text-accent shrink-0 select-none">
                              —
                            </span>
                            <span>{kern}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-3">
                        Praxisbeispiele
                      </h4>
                      <ul className="space-y-2.5">
                        {studie.praxisbeispiele.map((bsp, i) => (
                          <li
                            key={i}
                            className="flex gap-3 leading-relaxed text-sm md:text-base"
                          >
                            <span className="text-accent shrink-0 select-none">
                              —
                            </span>
                            <span>{bsp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>

          <QuellenListe quellen={data.quellen} />
        </div>
      </main>
    </div>
  );
}
