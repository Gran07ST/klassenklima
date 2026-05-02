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
  | "Selbstbewusstsein"
  | "Sozial- und Leistungsdruck"
  | "Schülerzentriertheit"
  | "Lerngemeinschaft"
  | "Rivalität und Störneigung";

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
  hatVerbesserungspotenzial: boolean; // prozent < VERBESSERUNGS_SCORE
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

export interface Tipp {
  text: string;
  quelle: string;
}

export interface Vorschlag {
  titel: string;
  text: string;
  tipps: Tipp[];
}

export interface VerbesserungsvorschlaegeDaten {
  verbesserungsvorschlaege: {
    [subthema: string]: {
      vorschlag: Vorschlag;
    };
  };
}

// ============================================================================
// Quellen-Typen (für Fragebogen)
// ============================================================================

export interface QuelleEintrag {
  autorJahr: string;
  titel: string;
}

export interface QuellenLiteratur extends QuelleEintrag {
  typ: string;
}

export interface Quellen {
  beschreibung: string;
  literatur: QuellenLiteratur[];
  hinweis: string;
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

export interface ThemaDetail {
  untertitel: string;
  text: string;
}

export interface ThemaBereich {
  titel: string;
  inhalt: string;
  details: ThemaDetail[];
}

export interface RelevanzFuerPeerbeziehungen {
  titel: string;
  aspekte: string[];
}

export interface DifferenzierungKlimabegriffe {
  schulklima: string;
  klassenklima: string;
}

export interface ZielgruppenspezifischeZuordnung {
  begruendung: string;
  lehrpersonen_schulklima: string;
  schuelerinnen_klassenklima: string;
}

export interface DimensionenDesSchulklimas {
  einleitung: string;
}

export interface WissenschaftlicheGrundlagen {
  relevanzFuerPeerbeziehungen: RelevanzFuerPeerbeziehungen;
  differenzierungKlimabegriffe: DifferenzierungKlimabegriffe;
  zielgruppenspezifischeZuordnung: ZielgruppenspezifischeZuordnung;
  dimensionenDesSchulklimas: DimensionenDesSchulklimas;
}

export interface Studie {
  id: string;
  themenbereich: string;
  titel: string;
  beschreibung: string;
  kernaussagen: string[];
  praxisbeispiele: string[];
}

export interface StudienDaten {
  wissenschaftlicheGrundlagen: WissenschaftlicheGrundlagen;
  studien: Studie[];
  quellen: QuelleEintrag[];
}

// ============================================================================
// Übungen-Typen (für Lehrerbereich)
// ============================================================================

export type ZeitBadge = "< 5 Min" | "5–15 Min" | "15–30 Min" | "> 30 Min";
export type AlterBadge = "6–10 Jahre" | "10–13 Jahre" | "13–16 Jahre";

export interface UebungSection {
  sectionTitle: string;
  content: string;
}

export interface Uebung {
  id: string;
  titel: string;
  kurzbeschreibung: string;
  anleitung: string;
  zeitBadge: ZeitBadge;
  alterBadge: AlterBadge[];
  subthemaBadge: Subthema[];
  sections: UebungSection[];
}

export interface UebungenDaten {
  uebungen: Uebung[];
  quellen: QuelleEintrag[];
}
