"use client";

import Header from "@/components/layout/Header";
import RoutingGuard from "@/components/layout/RoutingGuard";
import { alleScoresGenugend, getVerbesserungsvorschlaege } from "@/lib/scoring";
import {
  GespeicherteAntworten,
  Subthema,
  SubthemaScore,
  VerbesserungsvorschlaegeDaten,
} from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Import data
import fragebogenData from "@/data/fragebogen.json";

export default function VorschlaegePage() {
  const router = useRouter();
  const [scores, setScores] = useState<SubthemaScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [vorschlaege, setVorschlaege] = useState<
    Array<{
      subthema: Subthema;
      score: SubthemaScore;
      vorschlag: {
        titel: string;
        text: string;
        tipps: string[];
      };
    }>
  >([]);

  useEffect(() => {
    // Lade Antworten aus LocalStorage
    const gespeicherte = localStorage.getItem(
      "klassenklima_fragebogen_antworten",
    );

    if (!gespeicherte) {
      // Keine Antworten vorhanden -> zur Fragebogen-Seite leiten
      router.push("/schueler/fragebogen");
      return;
    }

    const antwortenData: GespeicherteAntworten = JSON.parse(gespeicherte);

    // Scores berechnen
    const berechneteScores = fragebogenData.fragen
      .filter((frage) => frage.type === "skala")
      .map((frage) => {
        const antworten = antwortenData.antworten.filter(
          (a) => a.frageId === frage.id,
        );
        const erreichterScore = antworten.reduce(
          (sum, a) => sum + a.wert * frage.gewichtung,
          0,
        );
        const maxScore = antworten.reduce(
          (sum, a) => sum + 5 * frage.gewichtung,
          0,
        );
        const prozent =
          maxScore > 0 ? Math.round((erreichterScore / maxScore) * 100) : 0;

        return {
          subthema: frage.subthema as Subthema,
          erreichterScore: Math.round(erreichterScore),
          maxScore: Math.round(maxScore),
          prozent,
          hatVerbesserungspotenzial: prozent < 90,
        };
      });

    setScores(berechneteScores);
    setShowSuccess(alleScoresGenugend(berechneteScores));

    // Vorschläge holen
    const vorschlaegeListe = getVerbesserungsvorschlaege(
      berechneteScores,
      fragebogenData.verbesserungsvorschlaege as VerbesserungsvorschlaegeDaten["verbesserungsvorschlaege"],
    );
    setVorschlaege(vorschlaegeListe);

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <RoutingGuard requiredAnswers={true}>
        <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
          <div className="text-[#8a847a]">Lade...</div>
        </div>
      </RoutingGuard>
    );
  }

  if (showSuccess) {
    return (
      <RoutingGuard requiredAnswers={true}>
        <div className="min-h-screen bg-[#faf9f6] text-[#2d2a26] flex flex-col">
          <Header
            title="Glückwunsch!"
            subtitle="Du bist auf einem guten Weg!"
          />

          <main className="flex-1 px-6 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-12">
                <svg
                  viewBox="0 0 120 120"
                  className="w-32 h-32 mx-auto mb-6"
                  fill="none"
                >
                  {/* Star icon */}
                  <path
                    d="M 60 20 L 72 48 L 102 48 L 78 66 L 86 94 L 60 78 L 34 94 L 42 66 L 18 48 L 48 48 Z"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <h2
                  className="text-3xl md:text-4xl font-light tracking-tight mb-4"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Super gemacht!
                </h2>
                <p className="text-accent text-lg leading-relaxed">
                  Alle deine Werte liegen bei 90% oder höher. Du trägst zu einem
                  sehr positiven Klassenklima bei!
                </p>
              </div>

              <Link href="/schueler">
                <button className="bg-none text-accent border border-accent  hover:bg-accent hover:text-white transition-colors duration-300 px-8 py-4 rounded-2xl font-normal text-lg">
                  Zurück zur Übersicht
                </button>
              </Link>
            </div>
          </main>
        </div>
      </RoutingGuard>
    );
  }

  return (
    <RoutingGuard requiredAnswers={true}>
      <div className="min-h-screen bg-[#faf9f6] text-[#2d2a26] flex flex-col">
        <Header title="Deine Vorschläge" subtitle="Hier sind Tipps für dich" />

        <main className="flex-1 px-6 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="mb-12">
              <h2
                className="text-2xl md:text-3xl font-light tracking-tight mb-4"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Hier sind deine persönlichen Tipps
              </h2>
              <p className="leading-relaxed">
                Die Vorschläge sind nach Wichtigkeit sortiert. Beginne mit dem
                ersten Tipp und arbeite dich nach unten vor.
              </p>
            </div>

            <div className="space-y-8">
              {vorschlaege.map((item) => (
                <div
                  key={item.subthema}
                  className="bg-white border border-accent rounded-2xl p-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-accent font-normal">
                      {item.score.subthema}
                    </span>
                    <span
                      className="text-3xl font-light text-accent"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      {item.score.prozent}%
                    </span>
                  </div>

                  <h3
                    className="text-xl font-light tracking-tight mb-4"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    {item.vorschlag.titel}
                  </h3>

                  <p className=" leading-relaxed mb-6">{item.vorschlag.text}</p>

                  <div className="space-y-3">
                    <p className="text-accent text-sm font-normal mb-3">
                      Tipps:
                    </p>
                    {item.vorschlag.tipps.map((tip, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span className="text-accent ">▹</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <Link href="/schueler">
                <button className="w-full bg-none text-accent border border-accent px-8 py-4 rounded-2xl hover:bg-accent hover:text-white transition-colors duration-300 font-normal text-lg text-center">
                  Zurück zur Übersicht
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </RoutingGuard>
  );
}
