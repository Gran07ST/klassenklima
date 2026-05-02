# PeerConnect

Eine kleine Web-App für ein grosses Thema: Das Schulklima an Schulen.

## Über das Projekt

Diese App unterstützt Lehrpersonen und Schüler:innen dabei, ein positives Schulklima zu fördern. Sie besteht aus zwei Bereichen:

### Lehrbereich
- **Wissen & Studien**: Wissenschaftliche Grundlagen, Themenbereiche und Studien zum Schul- und Klassenklima
- **Übungen**: Übungskatalog zur Förderung des Klassenklimas (filterbar nach Zeit, Alter und Subthema)

### Schülerbereich
- **Fragebogen**: Selbsteinschätzung zum erlebten Klassenklima
- **Auswertung**: Radar-Diagramm zeigt Ergebnisse pro Subthema
- **Vorschläge**: Personalisierte Verbesserungsvorschläge für Subthemen mit Verbesserungspotenzial

## Features

- **Datenschutz**: Alle Daten bleiben lokal im Browser (LocalStorage)
- **Responsive Design**: Funktioniert auf Desktop, Tablet und Mobile
- **Statisch**: Keine Server-Logik nötig, deploybar als statische Seite (z. B. via GitHub Pages)

## Tech Stack

- **Framework**: Next.js 16+ (App Router, statischer Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts (Radar-Chart)
- **UI Components**: shadcn/ui
- **Runtime**: Bun

## Getting Started

### Installation

```bash
# Dependencies installieren
bun install

# Development-Server starten
bun run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

### Build für Production

```bash
bun run build
```

### Start Production-Server

```bash
bunx serve out
```

## Projektstruktur

```
PeerConnect/
├── app/
│   ├── layout.tsx               # Root-Layout (Header, Footer, globale Styles)
│   ├── globals.css              # Globale Tailwind-Styles
│   ├── page.tsx                 # Landing page (Lehrperson vs. Schüler:in)
│   ├── lehrer/
│   │   ├── page.tsx             # Lehrbereich-Übersicht
│   │   ├── wissen/page.tsx      # Wissenschaftliche Grundlagen & Studien
│   │   └── uebungen/page.tsx    # Übungskatalog
│   └── schueler/
│       ├── page.tsx             # Schülerbereich-Übersicht
│       ├── fragebogen/page.tsx  # Fragebogen
│       ├── auswertung/page.tsx  # Ergebnisse (Radar-Chart)
│       └── vorschlaege/page.tsx # Verbesserungsvorschläge
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Header mit Logo & Navigation
│   │   ├── Footer.tsx           # Footer
│   │   ├── Logo.tsx             # SVG-Logo
│   │   ├── BackButton.tsx       # Zurück-Navigation
│   │   └── RoutingGuard.tsx     # Schutz für geschützte Pages
│   ├── lehrer/
│   │   ├── StatCard.tsx         # Statistik-Karte
│   │   ├── UebungCard.tsx       # Übungskarte
│   │   └── UebungFilter.tsx     # Filter-Komponente
│   ├── schueler/
│   │   ├── QuellenListe.tsx     # Kompakte Quellenliste
│   │   └── Quellenverzeichnis.tsx # Vollständiges Quellenverzeichnis
│   └── ui/                      # shadcn/ui Primitives
├── data/
│   ├── fragebogen.json          # Fragen für die Selbsteinschätzung
│   ├── verbesserungsvorschlaege.json # Tipps pro Subthema
│   ├── studien.json             # Wissenschaftliche Grundlagen, Studien & Quellen
│   └── uebungen.json            # Übungskatalog & Quellen
├── lib/
│   ├── types.ts                 # TypeScript-Typdefinitionen
│   ├── scoring.ts               # Scoring-Logik für Fragebogen
│   └── utils.ts                 # Hilfsfunktionen (z. B. cn())
└── public/                      # Statische Assets
```

## Datenstruktur

Alle Inhalte werden über JSON-Dateien im `data/`-Ordner gepflegt. Änderungen an den JSON-Dateien wirken sich ohne Code-Anpassung aus, sofern die Struktur eingehalten wird.

### Fragebogen (`data/fragebogen.json`)

Enthält die Fragen für die Selbsteinschätzung. Jede Frage gehört zu einem Subthema und ist entweder eine Skala-Frage (5-stufig) oder eine Single-Choice-Frage.

**Skala-Frage:**
```json
{
  "id": "q-001",
  "subthema": "Sozial- und Leistungsdruck",
  "type": "skala",
  "aussage": "Die Lehrpersonen behandeln alle Schüler:innen fair.",
  "gewichtung": 1,
  "skalaLabels": {
    "1": "Stimmt gar nicht",
    "5": "Stimmt voll"
  }
}
```

**Single-Choice-Frage:**
```json
{
  "id": "q-005",
  "subthema": "Sozial- und Leistungsdruck",
  "type": "single_choice",
  "frage": "Wie stark erlebst du den Leistungsdruck?",
  "gewichtung": 1,
  "optionen": [
    { "text": "Sehr stark", "wert": 5 },
    { "text": "Eher stark", "wert": 4 },
    { "text": "Mittel",     "wert": 3 },
    { "text": "Eher wenig", "wert": 2 },
    { "text": "Gar nicht",  "wert": 1 }
  ]
}
```

**Neue Frage hinzufügen:** neues Objekt im `fragen`-Array ergänzen, `id` muss eindeutig sein (`q-001`, `q-002`, …).

**Neues Subthema verwenden:** das Subthema muss im Type `Subthema` in `lib/types.ts` deklariert sein. Anschliessend Fragen dazu im Fragebogen sowie einen Eintrag in `verbesserungsvorschlaege.json` für dieses Subthema ergänzen.

---

### Verbesserungsvorschläge (`data/verbesserungsvorschlaege.json`)

Pro Subthema gibt es einen Vorschlag mit Titel, Einleitungstext und einer Liste von Tipps. Jeder Tipp enthält den Tipptext und eine Quellenangabe.

```json
"verbesserungsvorschlaege": {
  "Sozial- und Leistungsdruck": {
    "vorschlag": {
      "titel": "Stress Schritt für Schritt reduzieren",
      "text": "Wenn dir alles zu viel wird, helfen dir diese Methoden:",
      "tipps": [
        { "text": "Schreib alle deine Aufgaben auf …", "quelle": "(Zimmerman, 2002)" },
        { "text": "Stell dir einen Timer auf 25 Minuten …", "quelle": "(Cirillo, 2006)" }
      ]
    }
  }
}
```

Die Vorschläge werden auf der Vorschläge-Seite nur dann angezeigt, wenn das jeweilige Subthema unter dem Schwellenwert (siehe Scoring) liegt.

---

### Studien (`data/studien.json`)

Enthält die Inhalte für den Lehrbereich „Wissen & Studien“: wissenschaftliche Grundlagen, einzelne Studien und das Quellenverzeichnis.

**Top-Level-Struktur:**
- `wissenschaftlicheGrundlagen`: Objekt mit einleitenden Texten (siehe unten)
- `studien`: Array einzelner Studien mit Kernaussagen und Praxisbeispielen
- `quellen`: Literaturverzeichnis (Autor:innen-Jahr und Titel)

**`wissenschaftlicheGrundlagen` (Objekt):**
- `relevanzFuerPeerbeziehungen`: `{ titel, aspekte[] }`
- `differenzierungKlimabegriffe`: `{ schulklima, klassenklima }`
- `zielgruppenspezifischeZuordnung`: `{ begruendung, lehrpersonen_schulklima, schuelerinnen_klassenklima }`
- `dimensionenDesSchulklimas`: `{ einleitung }`

**Studien-Struktur:**
```json
{
  "id": "stud-001",
  "themenbereich": "Sicherheit",
  "titel": "…",
  "beschreibung": "…",
  "kernaussagen": ["…", "…"],
  "praxisbeispiele": ["…", "…"]
}
```

`themenbereich` ist ein freier String, der auf der Wissen-Seite als Badge angezeigt wird.

**Quelle:**
```json
{ "autorJahr": "Wang, M. T., & Degol, J. L. (2016).", "titel": "School climate: …" }
```

Neue Inhalte werden in das jeweilige Array ergänzt; `id` muss bei Studien eindeutig sein. Die exakte TypeScript-Form ist in `lib/types.ts` (`StudienDaten`, `WissenschaftlicheGrundlagen`, `Studie`, `QuelleEintrag`) definiert.

---

### Übungen (`data/uebungen.json`)

Enthält den Übungskatalog für den Lehrbereich. Top-Level-Keys sind `uebungen` (Array der Übungen) und `quellen` (Literaturverzeichnis im selben Format wie in `studien.json`). Jede Übung verwendet eine flexible `sections`-Struktur, sodass beliebig viele Zusatzabschnitte (z. B. Material, Tipp, Hinweis, Wissenschaftlicher Bezug) ergänzt werden können.

```json
{
  "id": "ueb-001",
  "titel": "Die Dankbarkeits-Ecke",
  "kurzbeschreibung": "Ein fester Ort im Klassenzimmer, an dem sich Schüler:innen für etwas bedanken können.",
  "anleitung": "Eine Ecke des Raums wird zur 'Dankbarkeits-Ecke' …",
  "zeitBadge": "5–15 Min",
  "alterBadge": ["6–10 Jahre", "10–13 Jahre", "13–16 Jahre"],
  "subthemaBadge": ["Gemeinschaft"],
  "sections": [
    { "sectionTitle": "Material", "content": "Notizbuch, Stifte, Box oder Korb" },
    { "sectionTitle": "Tipp",     "content": "Die Lehrperson wirft selbst Zettel ein …" }
  ]
}
```

**Wichtige Felder:**
- `id`: Eindeutige ID (`ueb-001`, `ueb-002`, …)
- `titel`: Name der Übung
- `kurzbeschreibung`: Kurze Einleitung (erscheint in der Übersicht)
- `anleitung`: Detaillierte Schritte (`\n` für Zeilenumbrüche, wird mit `whitespace-pre-wrap` gerendert)
- `zeitBadge`: Zeitspanne als Text (z. B. `5–15 Min`)
- `alterBadge`: Array von Altersgruppen (`6–10 Jahre`, `10–13 Jahre`, `13–16 Jahre`)
- `subthemaBadge`: Array von Subthemen, die gefördert werden
- `sections`: Array von Abschnitten mit `sectionTitle` und `content`. Übliche Titel: `Material`, `Tipp`, `Hinweis`, `Didaktischer Hinweis`, `Wissenschaftlicher Bezug`. Beliebig erweiterbar.

**Neue Übung hinzufügen:** neues Objekt im `uebungen`-Array ergänzen, `id` muss eindeutig sein.

**Neuen Abschnitt hinzufügen:** einfach einen weiteren Eintrag in `sections` ergänzen – die Übungs-Karte rendert alle Abschnitte automatisch.

**Filter nach Alter/Zeit/Thema:** Die Filterkomponente liest die Werte aus `alterBadge`, `zeitBadge` und `subthemaBadge`. Neue Werte in den Daten erscheinen automatisch im Filter.

## Scoring

Die App berechnet pro Subthema einen prozentualen Wert. Ab einem konfigurierbaren Schwellenwert gilt ein Subthema als „gut“, darunter wird Verbesserungspotenzial angezeigt.

```ts
// lib/scoring.ts
export const VERBESSERUNGS_SCORE = 90;
```

- **>= Schwellenwert**: kein Verbesserungsbedarf
- **<  Schwellenwert**: Verbesserungspotenzial → Vorschläge aus `verbesserungsvorschlaege.json` werden angezeigt

Die Scores werden lokal im Browser gespeichert und für die personalisierten Vorschläge verwendet.

## Lizenz

Dieses Projekt ist als Bildungsressource gemeinfrei verfügbar.

---

Entwickelt mit Next.js, TypeScript und Tailwind CSS.
