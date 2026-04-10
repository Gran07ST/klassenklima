# Spezifikation: Klassenklima-WebApp

## 1. Projektübersicht

Eine Next.js-WebApp zur Förderung eines positiven Klassenklimas. Die App richtet sich an zwei Zielgruppen: **Lehrkräfte** und **Schülerinnen & Schüler** (Primar- und Sekundarstufe I, Alter 6–16). Die Applikation ist vollständig auf **Deutsch**, speichert keine Daten auf einem Server und nutzt ausschliesslich den **LocalStorage** des Browsers.

---

## 2. Tech-Stack

| Technologie | Version / Hinweis |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Runtime | Bun |
| UI-Komponenten | shadcn/ui |
| Styling | Tailwind CSS |
| Charts | Recharts (Netzdiagramm / Radar Chart) |
| Icons | Lucide React |
| Datenhaltung | JSON-Dateien (statische Inhalte), LocalStorage (Nutzerdaten) |

---

## 3. Projektstruktur

```
klassenklima/
├── app/
│   ├── page.tsx                        # Landing / Rollenauswahl
│   ├── lehrer/
│   │   ├── page.tsx                    # Lehrerbereich Übersicht
│   │   ├── wissen/
│   │   │   └── page.tsx               # Abschnitt 1: Studien & Fakten
│   │   └── uebungen/
│   │       └── page.tsx               # Abschnitt 2: Übungskatalog
│   └── schueler/
│       ├── page.tsx                    # Schülerbereich Übersicht
│       ├── fragebogen/
│       │   └── page.tsx               # Abschnitt 1: Fragebogen
│       ├── auswertung/
│       │   └── page.tsx               # Abschnitt 2: Netzdiagramm
│       └── vorschlaege/
│           └── page.tsx               # Abschnitt 3: Verbesserungsvorschläge
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── BackButton.tsx
│   ├── lehrer/
│   │   ├── StatCard.tsx               # Statistik-Karte mit Studienzahl
│   │   ├── UebungCard.tsx             # Übungs-Karte mit Badges
│   │   └── UebungFilter.tsx           # Filter-Komponente
│   └── schueler/
│       ├── FragebogenItem.tsx         # Einzelne Frage (Skala / Single Choice)
│       ├── RadarChart.tsx             # Netzdiagramm
│       └── VorschlagCard.tsx          # Verbesserungsvorschlag-Karte
├── data/
│   ├── studien.json                   # Statistiken & Studiendaten
│   ├── uebungen.json                  # Übungen für Lehrkräfte
│   └── fragebogen.json                # Fragen für Schülerinnen & Schüler
├── lib/
│   ├── scoring.ts                     # Score-Berechnung & Auswertungslogik
│   ├── localStorage.ts                # LocalStorage Hilfsfunktionen
│   └── types.ts                       # TypeScript-Typdefinitionen
└── public/
```

---

## 4. Routing & Navigation

Die App verwendet **zwei separate Bereiche** mit einer gemeinsamen Startseite zur Rollenauswahl.

```
/                    → Rollenauswahl (Lehrer / Schüler)
/lehrer              → Lehrerbereich (Übersicht mit beiden Abschnitten)
/lehrer/wissen       → Studien & Fakten
/lehrer/uebungen     → Übungskatalog
/schueler            → Schülerbereich (Übersicht)
/schueler/fragebogen → Fragebogen
/schueler/auswertung → Netzdiagramm (nur zugänglich nach abgeschlossenem Fragebogen)
/schueler/vorschlaege→ Verbesserungsvorschläge (nur zugänglich nach Auswertung)
```

---

## 5. Design & UI

- **Farbschema:** Zwei Designs je nach Rolle:
  - **Lehrerbereich:** Professionell, ruhige Töne (Blau/Grau, shadcn Default)
  - **Schülerbereich:** Hell, freundlich, lebendig (kräftigere Farben, grössere Schrift, runde Elemente)
- **Typografie:** Klare, gut lesbare Schrift; Schülerbereich mit grösserem Basiswert
- **Responsive:** Mobile-first; alle Ansichten funktionieren auf Tablet und Desktop

---

## 6. Lehrerbereich

### 6.1 Abschnitt: Wissen & Studien (`/lehrer/wissen`)

Zeigt allgemeine Informationen zur Wichtigkeit eines positiven Lernklimas, unterstützt durch Studiendaten.

**Komponenten:**
- Einleitungstext (aus `studien.json`)
- `StatCard`-Raster: Jede Karte zeigt eine Zahl/Statistik, Quellenangabe und Kurztext
- Accordion-Bereich mit Vertiefungsinformationen zu verschiedenen Aspekten (Motivation, Wohlbefinden, Leistung, etc.)

**Datenstruktur `studien.json`:**
```json
{
  "einleitung": "string",
  "statistiken": [
    {
      "id": "string",
      "zahl": "string",           // z.B. "87%"
      "aussage": "string",        // Kurze Beschreibung
      "quelle": "string",         // z.B. "Hattie, 2009"
      "details": "string"         // Längerer Erklärungstext (für Accordion)
    }
  ],
  "themenBereiche": [
    {
      "titel": "string",
      "inhalt": "string"
    }
  ]
}
```

---

### 6.2 Abschnitt: Übungskatalog (`/lehrer/uebungen`)

Sammlung konkreter Übungen zur Verbesserung des Klassen- und Lernklimas.

**Komponenten:**
- `UebungFilter`: Filter-Leiste mit drei Filter-Kategorien (Zeit, Alter, Subthema)
- `UebungCard`-Raster: Jede Karte zeigt Titel, Kurzbeschreibung, Badges und bei Klick/Expand die vollständige Anleitung

**Filter-Kategorien:**
- **Zeit:** `< 5 Min`, `5–15 Min`, `15–30 Min`, `> 30 Min`
- **Alter:** `6–10 Jahre`, `10–13 Jahre`, `13–16 Jahre`
- **Subthema:** `Teamfähigkeit`, `Empathie`, `Kommunikation`, `Selbstregulation`, `Konfliktlösung`, `Soziale Kompetenz`, `Selbstbewusstsein`

**Datenstruktur `uebungen.json`:**
```json
{
  "uebungen": [
    {
      "id": "string",
      "titel": "string",
      "kurzbeschreibung": "string",
      "anleitung": "string",           // Markdown-fähiger Fliesstext
      "zeitBadge": "< 5 Min",          // Einer der definierten Werte
      "alterBadge": ["6–10 Jahre"],    // Array, da mehrere möglich
      "subthemaBadge": ["Empathie", "Kommunikation"],
      "material": "string",            // Optional: benötigtes Material
      "tipps": "string"               // Optional: Hinweise für Lehrkräfte
    }
  ]
}
```

**UX-Details:**
- Filter sind kombinierbar (AND-Verknüpfung)
- Anzahl der gefundenen Übungen wird angezeigt
- Bei keinen Treffern: freundliche Leermeldung
- Übungs-Karten expandieren in-place (Accordion oder Sheet/Dialog)

---

## 7. Schülerbereich

### 7.1 Abschnitt: Fragebogen (`/schueler/fragebogen`)

Ein dynamisch aus `fragebogen.json` geladener Fragebogen zur Selbsteinschätzung.

**Fragentypen:**

1. **Skala 1–5** (`type: "skala"`)
   - Aussage wird angezeigt
   - 5 auswählbare Stufen mit Labels (z.B. „Stimme gar nicht zu" bis „Stimme voll zu")
   - Visuell als Schaltflächen-Reihe oder Slider

2. **Single Choice** (`type: "single_choice"`)
   - Frage wird angezeigt
   - 3–5 Antwortoptionen als klickbare Karten

**UX-Details:**
- Eine Frage pro Bildschirm (Step-by-Step)
- Fortschrittsbalken oben
- „Zurück"-Button ab Frage 2
- Animierter Übergang zwischen Fragen
- Alle Fragen müssen beantwortet sein, bevor es weitergeht
- Ergebnisse werden am Ende in LocalStorage gespeichert

**Datenstruktur `fragebogen.json`:**
```json
{
  "subthemen": ["Empathie", "Kommunikation", "Teamfähigkeit", "Selbstregulation", "Konfliktlösung", "Soziale Kompetenz", "Selbstbewusstsein"],
  "fragen": [
    {
      "id": "string",
      "subthema": "Empathie",
      "type": "skala",
      "aussage": "string",
      "gewichtung": 1,               // Multiplikator für die Score-Berechnung
      "skalaLabels": {
        "1": "Stimme gar nicht zu",
        "5": "Stimme voll zu"
      }
    },
    {
      "id": "string",
      "subthema": "Kommunikation",
      "type": "single_choice",
      "frage": "string",
      "gewichtung": 1,
      "optionen": [
        { "text": "string", "wert": 1 },
        { "text": "string", "wert": 3 },
        { "text": "string", "wert": 5 }
      ]
    }
  ]
}
```

---

### 7.2 Abschnitt: Auswertung / Netzdiagramm (`/schueler/auswertung`)

Visualisierung der Fragebogen-Ergebnisse als Radar-/Netzdiagramm.

**Berechnung:**
- Pro Subthema: `erreichterScore = Summe(antwortWert × gewichtung)`
- Pro Subthema: `maxScore = Summe(maxAntwortWert × gewichtung)`
- Prozentwert: `(erreichterScore / maxScore) × 100`
- Im Netzdiagramm wird der Prozentwert (0–100%) dargestellt

**Komponenten:**
- `RadarChart` (Recharts): Alle 7 Subthemen als Achsen, gefüllte Fläche
- Legende mit Prozentwert pro Subthema
- Farbliche Hervorhebung von Subthemen unter 90%
- Button: „Zu meinen Verbesserungsvorschlägen"

---

### 7.3 Abschnitt: Verbesserungsvorschläge (`/schueler/vorschlaege`)

Personalisierte Empfehlungen basierend auf den Fragebogen-Ergebnissen.

**Logik:**
- Für jedes Subthema mit Score < 90% des Maximums: Zeige `VorschlagCard`
- Wenn alle Subthemen ≥ 90%: Zeige Glückwunsch-Nachricht
- Reihenfolge: Niedrigster Score zuerst

**VorschlagCard:**
- Subthema-Name & Score-Anzeige (z.B. „68%")
- Titel des Verbesserungsvorschlags
- Beschreibungstext (konkrete, altersgerechte Tipps)
- Optional: Weiterführende Ressource oder Übung

**Datenstruktur (Teil von `fragebogen.json`):**
```json
{
  "verbesserungsvorschlaege": {
    "Empathie": {
      "unter90": {
        "titel": "string",
        "text": "string",
        "tipps": ["string", "string"]
      }
    }
  }
}
```

---

## 8. Scoring-Logik (`lib/scoring.ts`)

```typescript
interface SubthemaScore {
  subthema: string;
  erreichterScore: number;
  maxScore: number;
  prozent: number;
  hatVerbesserungspotenzial: boolean; // prozent < 90
}

function berechneScores(antworten: Antwort[], fragen: Frage[]): SubthemaScore[]

function getVerbesserungsvorschlaege(scores: SubthemaScore[], vorschlaege: VorschlaegeDaten): Vorschlag[]
```

---

## 9. LocalStorage-Schema

Alle Nutzerdaten werden nur lokal gespeichert und können jederzeit gelöscht werden.

```typescript
// Key: "klassenklima_fragebogen_antworten"
interface GespeicherteAntworten {
  zeitstempel: string;       // ISO-Datum
  antworten: {
    frageId: string;
    wert: number;
  }[];
}

// Key: "klassenklima_scores"
interface GespeicherteScores {
  zeitstempel: string;
  scores: SubthemaScore[];
}
```

---

## 10. Startseite / Rollenauswahl (`/`)

- Kurze Begrüssungsnachricht und App-Name
- Zwei grosse, klar beschriftete Karten/Buttons:
  - 🧑‍🏫 **Ich bin Lehrkraft** → `/lehrer`
  - 🎒 **Ich bin Schüler/in** → `/schueler`
- Kein Login, kein Passwortschutz
- Hinweis: „Deine Daten bleiben auf deinem Gerät"

---

## 11. Datenschutz & Hinweise

- Banner/Info-Box auf der Startseite: „Diese App speichert keine Daten auf einem Server. Alle Angaben bleiben auf deinem Gerät."
- Im Schülerbereich: Button „Meine Daten löschen" (löscht LocalStorage-Einträge)
- Keine Analytics, keine Cookies, kein Backend

---

## 12. Implementierungs-Reihenfolge (empfohlen für Claude Code)

1. **Setup:** Next.js + Bun + shadcn/ui initialisieren, Ordnerstruktur anlegen
2. **Typen & Daten:** `lib/types.ts` und alle drei JSON-Dateien mit Beispieldaten erstellen
3. **Startseite:** Rollenauswahl-Page
4. **Lehrerbereich – Wissen:** StatCards + Accordion
5. **Lehrerbereich – Übungen:** Karten + Filter
6. **Schülerbereich – Fragebogen:** Step-by-Step-Flow + LocalStorage
7. **Schülerbereich – Auswertung:** Scoring-Logik + Radar Chart
8. **Schülerbereich – Vorschläge:** Verbesserungsvorschlag-Karten
9. **Layout & Navigation:** Header, Footer, BackButton, Routing-Guards
10. **Feinschliff:** Animationen, Responsive-Check, leere Zustände

---

## 13. Abhängigkeiten (package.json)

```json
{
  "dependencies": {
    "next": "^14",
    "react": "^18",
    "react-dom": "^18",
    "recharts": "^2",
    "lucide-react": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "@types/react": "^18",
    "@types/node": "^20",
    "typescript": "^5",
    "tailwindcss": "^3",
    "autoprefixer": "latest",
    "postcss": "latest"
  }
}
```

---

## 14. Beispiel-Befehle für Claude Code

```bash
# Projekt initialisieren
bunx create-next-app@latest klassenklima --typescript --tailwind --app --use-bun

# shadcn/ui einrichten
bunx shadcn@latest init

# shadcn-Komponenten installieren
bunx shadcn@latest add button card badge accordion progress sheet tabs

# Recharts installieren
bun add recharts
```

---

## 15. Offene Entscheidungen (für spätere Erweiterung)

- Druckansicht für Lehrkraft-Übungen
- Export der Schüler-Auswertung als PDF
- Mehrsprachigkeit (i18n) nachrüsten
- Klassenansicht: Aggregierte anonyme Auswertung mehrerer Schüler
