"use client";

import Header from "@/components/layout/Header";
import RoutingGuard from "@/components/layout/RoutingGuard";
import { berechneScores, VERBESSERUNGS_SCORE } from "@/lib/scoring";
import { Frage, GespeicherteAntworten, SubthemaScore } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import fragebogenData from "@/data/fragebogen.json";

export default function AuswertungPage() {
  const router = useRouter();
  const [scores, setScores] = useState<SubthemaScore[]>([]);
  const [loading, setLoading] = useState(true);
  const fragen = fragebogenData.fragen as Frage[];

  useEffect(() => {
    const gespeicherte = localStorage.getItem(
      "klassenklima_fragebogen_antworten",
    );

    if (!gespeicherte) {
      router.push("/schueler/fragebogen");
      return;
    }

    let antwortenData: GespeicherteAntworten;
    try {
      antwortenData = JSON.parse(gespeicherte);
    } catch (error) {
      console.error("Failed to parse saved answers:", error);
      router.push("/schueler/fragebogen");
      return;
    }

    const berechneteScores = berechneScores(antwortenData.antworten, fragen);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScores(berechneteScores);
    setLoading(false);
  }, [router, fragen]);

  const chartData = scores.map((score) => ({
    subthema: score.subthema,
    prozent: score.prozent,
  }));

  const handleContinue = () => {
    router.push("/schueler/vorschlaege");
  };

  const handleDeleteData = () => {
    localStorage.removeItem("klassenklima_fragebogen_antworten");
    localStorage.removeItem("klassenklima_scores");
    router.push("/schueler/fragebogen");
  };

  if (loading) {
    return (
      <RoutingGuard requiredAnswers={true}>
        <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
          <div className="text-[#8a847a]">Lade...</div>
        </div>
      </RoutingGuard>
    );
  }

  return (
    <RoutingGuard requiredAnswers={true}>
      <div className="min-h-screen bg-[#faf9f6] text-[#2d2a26] flex flex-col">
        <Header title="Auswertung" subtitle="Deine Ergebnisse im Überblick" />

        <main className="flex-1 px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-2xl md:text-3xl font-light tracking-tight mb-4"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Hier siehst du deine Ergebnisse
              </h2>
              <p className="leading-relaxed">
                Die Prozentwerte zeigen, wie gut du in jedem Bereich bist. Unter{" "}
                {VERBESSERUNGS_SCORE}% bedeutet: Hier gibt es
                Verbesserungspotenzial!
              </p>
            </div>

            <div className="mb-16">
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={chartData}
                  >
                    <PolarGrid gridType="polygon" stroke="#e8e5df" />
                    <PolarAngleAxis
                      dataKey="subthema"
                      tick={{ fill: "#6b665f", fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={false}
                      axisLine={false}
                    />
                    <Radar
                      name="Prozent"
                      dataKey="prozent"
                      stroke="var(--accent)"
                      strokeWidth={2}
                      fill="var(--accent)"
                      fillOpacity={0.2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mb-16">
              <h3
                className="text-xl font-light mb-6"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Deine Ergebnisse
              </h3>
              <div className="space-y-4">
                {scores.map((score) => (
                  <div
                    key={score.subthema}
                    className={`p-6 rounded-2xl border-2 ${
                      score.hatVerbesserungspotenzial
                        ? "border-accent bg-white"
                        : "border-[#4a403a] bg-[#f4f1ea]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className=" font-normal">{score.subthema}</span>
                      <span
                        className={`text-3xl font-light ${
                          score.hatVerbesserungspotenzial
                            ? "text-accent"
                            : "text-[#2d2a26]"
                        }`}
                        style={{ fontFamily: '"Playfair Display", serif' }}
                      >
                        {score.prozent}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#e8e5df] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          score.hatVerbesserungspotenzial
                            ? "bg-accent"
                            : "bg-[#2d2a26]"
                        }`}
                        style={{ width: `${score.prozent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleContinue}
                className="w-full bg-none text-accent border border-accent  hover:bg-accent hover:text-white transition-colors duration-300 px-8 py-4 rounded-2xl font-normal text-lg text-center"
              >
                Zu meinen Verbesserungsvorschlägen
              </button>

              <button
                onClick={handleDeleteData}
                className="w-full bg-none text-destructive border border-destructive hover:bg-destructive hover:text-white transition-colors duration-300 px-8 py-4 rounded-2xl font-normal text-lg text-center"
              >
                Meine Daten löschen
              </button>
            </div>
          </div>
        </main>
      </div>
    </RoutingGuard>
  );
}
