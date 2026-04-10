"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Frage, Antwort, SubthemaScore, GespeicherteAntworten } from "@/lib/types";
import { Progress } from "@/components/ui/progress";

// Import data
import fragebogenData from "@/data/fragebogen.json";

export default function FragebogenPage() {
  const router = useRouter();
  const fragen = fragebogenData.fragen as Frage[];
  const [currentStep, setCurrentStep] = useState(0);
  const [antworten, setAntworten] = useState<Antwort[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentFrage = fragen[currentStep];
  const progress = ((currentStep + 1) / fragen.length) * 100;

  const handleAnswer = (wert: number) => {
    const neueAntwort: Antwort = {
      frageId: currentFrage.id,
      wert,
    };

    const neueAntworten = [...antworten, neueAntwort];
    setAntworten(neueAntworten);

    // Speichern im LocalStorage
    const gespeicherteAntworten: GespeicherteAntworten = {
      zeitstempel: new Date().toISOString(),
      antworten: neueAntworten,
    };
    localStorage.setItem(
      "klassenklima_fragebogen_antworten",
      JSON.stringify(gespeicherteAntworten)
    );

    if (currentStep < fragen.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = () => {
    router.push("/schueler/auswertung");
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#faf9f6] text-[#2d2a26] flex flex-col">
        <Header
          title="Fragebogen abgeschlossen"
          subtitle="Danke für deine Mitarbeit!"
        />

        <main className="flex-1 px-4 py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center px-4">
            <div className="mb-12 md:mb-16">
              <svg
                viewBox="0 0 120 120"
                className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6"
                fill="none"
              >
                {/* Checkmark */}
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  stroke="#4a403a"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 35 60 L 50 75 L 85 40"
                  stroke="#4a403a"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight mb-4"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Vielen Dank!
              </h2>
              <p className="text-[#6b665f] text-sm md:text-base leading-relaxed">
                Deine Antworten wurden gespeichert. Klicke auf "Weiter", um
                deine Auswertung zu sehen.
              </p>
            </div>

            <button
              onClick={handleContinue}
              className="bg-[#4a403a] text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl hover:bg-[#3d352f] transition-colors duration-300 font-normal text-sm md:text-base"
            >
              Weiter zur Auswertung
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2d2a26] flex flex-col">
      <Header
        title="Fragebogen"
        subtitle="Beantworte die Fragen ehrlich"
      />

      <main className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Progress */}
          <div className="mb-8 md:mb-12">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <span className="text-[#8a847a] text-xs md:text-sm font-normal">
                Frage {currentStep + 1} von {fragen.length}
              </span>
              <span className="text-[#8a847a] text-xs md:text-sm font-normal">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2 md:h-3 bg-[#e8e5df]" />
          </div>

          {/* Question */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <span className="text-[#8a847a] text-xs md:text-sm font-normal">
                Subthema:
              </span>
              <span className="text-[#6b665f] text-xs md:text-sm font-normal">
                {currentFrage.subthema}
              </span>
            </div>

            <h2
              className="text-lg md:text-xl lg:text-2xl font-light tracking-tight mb-6 md:mb-8"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              {currentFrage.aussage || currentFrage.frage}
            </h2>

            {/* Answer Options */}
            {currentFrage.type === "skala" ? (
              <div className="grid grid-cols-5 gap-1 md:gap-2">
                {[1, 2, 3, 4, 5].map((wert) => (
                  <button
                    key={wert}
                    onClick={() => handleAnswer(wert)}
                    className={`py-3 md:py-4 rounded-lg md:rounded-xl border-2 transition-all duration-300 font-normal text-xs md:text-sm ${
                      antworten[currentStep]?.wert === wert
                        ? "bg-[#4a403a] text-white border-[#4a403a]"
                        : "bg-white text-[#6b665f] border-[#e8e5df] hover:border-[#d4d0c8]"
                    }`}
                  >
                    {wert}
                  </button>
                ))}
                <div className="col-span-5 grid grid-cols-5 gap-2 mt-2 text-xs text-[#8a847a]">
                  <span className="text-center">{currentFrage.skalaLabels?.["1"]}</span>
                  <span className="text-center">{currentFrage.skalaLabels?.["5"]}</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {currentFrage.optionen?.map((option) => (
                  <button
                    key={option.wert}
                    onClick={() => handleAnswer(option.wert)}
                    className={`p-4 md:p-6 rounded-lg md:rounded-xl border-2 transition-all duration-300 font-normal text-xs md:text-sm text-left ${
                      antworten[currentStep]?.wert === option.wert
                        ? "bg-[#4a403a] text-white border-[#4a403a]"
                        : "bg-white text-[#6b665f] border-[#e8e5df] hover:border-[#d4d0c8]"
                    }`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`group inline-flex items-center gap-2 transition-colors duration-300 ${
                currentStep === 0
                  ? "text-[#c8c2b7] cursor-not-allowed"
                  : "text-[#6b665f] hover:text-[#4a403a]"
              }`}
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M 19 12 L 5 12" stroke="currentColor" />
                <path d="M 10 17 L 5 12 L 10 7" stroke="currentColor" />
              </svg>
              <span className="text-[#6b665f] text-xs font-normal">
                Zurück
              </span>
            </button>

            {currentStep < fragen.length - 1 && (
              <span className="text-[#8a847a] text-xs font-normal">
                {fragen.length - currentStep - 1} Fragen übrig
              </span>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
