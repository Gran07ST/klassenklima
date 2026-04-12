import { Frage, Antwort, SubthemaScore, Subthema } from "./types";

/**
 * Berechnet die Scores für alle Subthemen basierend auf den Antworten
 * @param antworten - Die eingegebenen Antworten
 * @param fragen - Die Fragen aus dem Fragebogen
 * @returns Array von SubthemaScores
 */

export const VERBESSERUNGS_SCORE = 90;

export function berechneScores(
  antworten: Antwort[],
  fragen: Frage[],
): SubthemaScore[] {
  // Nur Skala-Fragen verwenden (keine single_choice)
  const skalaFragen = fragen.filter((frage) => frage.type === "skala");

  return skalaFragen.map((frage) => {
    // Alle Antworten für diese Frage finden
    const antwort = antworten.find((a) => a.frageId === frage.id);

    // Wenn keine Antwort vorhanden, Score als 0 setzen
    if (!antwort) {
      return {
        subthema: frage.subthema as Subthema,
        erreichterScore: 0,
        maxScore: 5 * frage.gewichtung,
        prozent: 0,
        hatVerbesserungspotenzial: true,
      };
    }

    // Berechne erreichten Score (Antwortwert * Gewichtung)
    const erreichterScore = antwort.wert * frage.gewichtung;

    // Maximaler Score (5 * Gewichtung)
    const maxScore = 5 * frage.gewichtung;

    // Prozent berechnen
    const prozent =
      maxScore > 0 ? Math.round((erreichterScore / maxScore) * 100) : 0;

    return {
      subthema: frage.subthema as Subthema,
      erreichterScore: Math.round(erreichterScore),
      maxScore: Math.round(maxScore),
      prozent,
      hatVerbesserungspotenzial: prozent < VERBESSERUNGS_SCORE,
    };
  });
}

/**
 * Gibt die Verbesserungsvorschläge für Subthemen mit Potenzial zurück
 * @param scores - Die berechneten Scores
 * @param vorschlaege - Die Verbesserungsvorschläge aus dem Fragebogen
 * @returns Array von Subthemen mit Verbesserungspotenzial
 */
export function getVerbesserungsvorschlaege(
  scores: SubthemaScore[],
  vorschlaege: {
    [subthema: string]: {
      vorschlag: {
        titel: string;
        text: string;
        tipps: string[];
      };
    };
  },
): Array<{
  subthema: Subthema;
  score: SubthemaScore;
  vorschlag: {
    titel: string;
    text: string;
    tipps: string[];
  };
}> {
  // Nur Subthemen mit Potenzial (< VERBESSERUNGS_SCORE%)
  const scoresMitPotenzial = scores.filter(
    (score) => score.hatVerbesserungspotenzial,
  );

  // Sortiere nach niedrigstem Score zuerst
  const sortierteScores = [...scoresMitPotenzial].sort(
    (a, b) => a.prozent - b.prozent,
  );

  // Vorschläge hinzufügen
  return sortierteScores
    .map((score) => {
      const vorschlag = vorschlaege[score.subthema]?.vorschlag;
      if (!vorschlag) return null;

      return {
        subthema: score.subthema,
        score,
        vorschlag,
      };
    })
    .filter(
      (
        item,
      ): item is {
        subthema: Subthema;
        score: SubthemaScore;
        vorschlag: {
          titel: string;
          text: string;
          tipps: string[];
        };
      } => item !== null,
    );
}

/**
 * Prüft ob alle Scores >= VERBESSERUNGS_SCORE% sind
 * @param scores - Die berechneten Scores
 * @returns true wenn alle >= VERBESSERUNGS_SCORE%, sonst false
 */
export function alleScoresGenugend(scores: SubthemaScore[]): boolean {
  return scores.every((score) => score.prozent >= VERBESSERUNGS_SCORE);
}
