import { Frage, Antwort, SubthemaScore, Subthema, Vorschlag } from "./types";

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
const bewerteteFragen = fragen.filter(
  (frage) =>
    frage.type === "skala" ||
    frage.type === "single_choice",
);

  // Aggregiere pro Subthema (Summe erreichter Score und Max-Score über alle Fragen)
  const aggregat = new Map<
    Subthema,
    { erreichterScore: number; maxScore: number }
  >();

for (const frage of bewerteteFragen) {
    const subthema = frage.subthema as Subthema;
    const antwort = antworten.find((a) => a.frageId === frage.id);
    let wert = antwort?.wert ?? 0;
    if (frage.reverse) {
      wert = 6 - wert;
    }
    const erreichterScore = wert * frage.gewichtung;
    const maxScore = 5 * frage.gewichtung;

    const eintrag = aggregat.get(subthema) ?? {
      erreichterScore: 0,
      maxScore: 0,
    };
    eintrag.erreichterScore += erreichterScore;
    eintrag.maxScore += maxScore;
    aggregat.set(subthema, eintrag);
  }

  return Array.from(aggregat.entries()).map(
    ([subthema, { erreichterScore, maxScore }]) => {
const minScore = maxScore / 5;

const prozent =
  maxScore > minScore
    ? Math.round(
        ((erreichterScore - minScore) /
          (maxScore - minScore)) *
          100,
      )
    : 0;
      return {
        subthema,
        erreichterScore: Math.round(erreichterScore),
        maxScore: Math.round(maxScore),
        prozent,
        hatVerbesserungspotenzial: prozent < VERBESSERUNGS_SCORE,
      };
    },
  );
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
      vorschlag: Vorschlag;
    };
  },
): Array<{
  subthema: Subthema;
  score: SubthemaScore;
  vorschlag: Vorschlag;
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
        vorschlag: Vorschlag;
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
