"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SubthemaScore, GespeicherteAntworten, Frage, Antwort, Subthema } from "@/lib/types";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

// Import data
import fragebogenData from "@/data/fragebogen.json";

export default function AuswertungPage() {
  const router = useRouter();
  const [scores, setScores] = useState<SubthemaScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Antwort[]>([]);
  const fragen = fragebogenData.fragen as Frage[];

  useEffect(() => {
     // Lade Antworten aus LocalStorage
    const gespeicherte = localStorage.getItem("klassenklima_fragebogen_antworten");

    if (!gespeicherte) {
       // Keine Antworten vorhanden -> zur Fragebogen-Seite leiten
      router.push("/schueler/fragebogen");
      return;
       }

    const antwortenData: GespeicherteAntworten = JSON.parse(gespeicherte);
    setAnswers(antwortenData.antworten);

     // Berechne Scores
    const berechneteScores: SubthemaScore[] = fragebogenData.fragen
       .filter((frage) => frage.type === "skala")
       .map((frage) => {
        const antworten = antwortenData.antworten.filter(
           (a) => a.frageId === frage.id
         );
        const erreichterScore = antworten.reduce(
           (sum, a) => sum + a.wert * frage.gewichtung,
           0
         );
        const maxScore = antworten.reduce(
           (sum, a) => sum + 5 * frage.gewichtung,
           0
         );
        const prozent = maxScore > 0 ? Math.round((erreichterScore / maxScore) * 100) : 0;

        return {
          subthema: frage.subthema as Subthema,
          erreichterScore: Math.round(erreichterScore),
          maxScore: Math.round(maxScore),
          prozent,
          hatVerbesserungspotenzial: prozent < 90,
          };
        });

    setScores(berechneteScores);
    setLoading(false);
     }, [router]);

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
         <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
           <div className="text-[#8a847a]">Lade...</div>
         </div>
        );
   }

  return (
       <div className="min-h-screen bg-[#faf9f6] text-[#2d2a26] flex flex-col">
         <Header
          title="Auswertung"
          subtitle="Deine Ergebnisse im Überblick"
          />

         <main className="flex-1 px-6 py-12">
           <div className="max-w-4xl mx-auto">
             {/* Introduction */}
             <div className="text-center mb-12">
               <h2
                className="text-2xl md:text-3xl font-light tracking-tight mb-4"
                style={{ fontFamily: '"Playfair Display", serif' }}
                 >
                Hier siehst du deine Ergebnisse
               </h2>
               <p className="text-[#6b665f] leading-relaxed">
                Die Prozentwerte zeigen, wie gut du in jedem Bereich bist.
                Unter 90% bedeutet: Hier gibt es Verbesserungspotenzial!
               </p>
             </div>

             {/* Radar Chart */}
             <div className="mb-16">
               <div className="h-96 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                     <PolarGrid gridType="polygon" stroke="#e8e5df" />
                     <PolarAngleAxis
                      dataKey="subthema"
                      tick={{ fill: "#6b665f", fontSize: 12 }}
                     />
                     <Radar
                      name="Prozent"
                      dataKey="prozent"
                      stroke="#4a403a"
                      strokeWidth={2}
                      fill="#4a403a"
                      fillOpacity={0.2}
                     />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Scores Table */}
              <div className="mb-16">
                <h3 className="text-xl font-light mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                 Deine Ergebnisse
                </h3>
                <div className="space-y-4">
                  {scores.map((score) => (
                    <div
                    key={score.subthema}
                    className={`p-6 rounded-2xl border-2 ${
                      score.hatVerbesserungspotenzial
                         ? "border-[#d4d0c8] bg-white"
                         : "border-[#4a403a] bg-[#f4f1ea]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[#6b665f] font-normal">{score.subthema}</span>
                        <span
                        className={`text-3xl font-light ${
                          score.hatVerbesserungspotenzial
                             ? "text-[#4a403a]"
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
                             ? "bg-[#4a403a]"
                             : "bg-[#2d2a26]"
                          }`}
                        style={{ width: `${score.prozent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                onClick={handleContinue}
                className="w-full bg-[#4a403a] text-white px-8 py-4 rounded-2xl hover:bg-[#3d352f] transition-colors duration-300 font-normal text-lg text-center"
                >
                 Zu meinen Verbesserungsvorschlägen
                </button>

                <button
                onClick={handleDeleteData}
                className="w-full bg-white border border-[#e8e5df] text-[#6b665f] px-8 py-4 rounded-2xl hover:border-[#d4d0c8] transition-colors duration-300 font-normal text-lg text-center"
                >
                 Meine Daten löschen
                </button>
              </div>
            </div>
          </main>

          <Footer />
        </div>
     );
}
