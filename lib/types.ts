// ============================================================================
// Grundtypen
// ============================================================================

export type Subthema =
  | "Empathie"
  | "Kommunikation"
  | "Teamfähigkeit"
  | "Selbstregulation"
  | "Konfliktlösung"
  | "Soziale Kompetenz"
  | "Selbstbewusstsein";

export type Rolle = "lehrer" | "schueler";

// ============================================================================
// Fragebogen-Typen
// ============================================================================

export interface Frage {
  id: string;
  subthema: Subthema;
  type: "skala" | "single_choice";
  gewichtung: number;
  aussage?: string;
  frage?: string;
  skalaLabels?: {
    1: string;
    5: string;
  };
  optionen?: FrageOption[];
}

export interface FrageOption {
  text: string;
  wert: number;
}

export interface Antwort {
  frageId: string;
  wert: number;
}

export interface SubthemaScore {
  subthema: Subthema;
  erreichterScore: number;
  maxScore: number;
  prozent: number;
  hatVerbesserungspotenzial: boolean; // prozent < 90
}

export interface GespeicherteAntworten {
  zeitstempel: string; // ISO-Datum
  antworten: Antwort[];
}

export interface GespeicherteScores {
  zeitstempel: string;
  scores: SubthemaScore[];
}

// ============================================================================
// Verbesserungsvorschläge-Typen
// ============================================================================

export interface VerbesserungsvorschlaegeDaten {
  verbesserungsvorschlaege: {
    [subthema: string]: {
      unter90: {
        titel: string;
        text: string;
        tipps: string[];
      };
    };
  };
}

// ============================================================================
// Studien-Typen (für Lehrerbereich)
// ============================================================================

export interface Statistik {
  id: string;
  zahl: string;
  aussage: string;
  quelle: string;
  details: string;
}

export interface ThemaBereich {
  titel: string;
  inhalt: string;
  details: string;
}

export interface StudienDaten {
  einleitung: string;
  statistiken: Statistik[];
  themenBereiche: ThemaBereich[];
}

// ============================================================================
// Übungen-Typen (für Lehrerbereich)
// ============================================================================

export type ZeitBadge = "< 5 Min" | "5–15 Min" | "15–30 Min" | "> 30 Min";
export type AlterBadge = "6–10 Jahre" | "10–13 Jahre" | "13–16 Jahre";

export interface Uebung {
  id: string;
  titel: string;
  kurzbeschreibung: string;
  anleitung: string;
  zeitBadge: ZeitBadge;
  alterBadge: AlterBadge[];
  subthemaBadge: Subthema[];
  material?: string;
  tipps?: string;
}

export interface UebungenDaten {
  uebungen: Uebung[];
}
