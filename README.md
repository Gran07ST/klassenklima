# PeerConnect

Eine kleine Web-App für ein grosses Thema: Das Klassenklima an Schulen.

## Über das Projekt

Diese App unterstützt Lehrkräfte und Schüler dabei, ein positives Klassenklima zu fördern. Sie besteht aus zwei Bereichen:

### Lehrbereich
- **Wissen & Studien**: Forschungsergebnisse zum Thema Klassenklima
- **Übungen**: Übungskatalog zur Förderung sozialer Kompetenzen (filterbar nach Zeit, Alter, Thema)

### Schülerbereich
- **Fragebogen**: Beantwortet Fragen zum eigenen Klassenklima
- **Auswertung**: Radar-Diagramm zeigt Ergebnisse in verschiedenen Bereichen
- **Vorschläge**: Personalisierte Verbesserungsvorschläge basierend auf den Ergebnissen

## Features

- **Datenschutz**: Alle Daten bleiben lokal im Browser (LocalStorage)
- **Responsive Design**: Funktioniert auf Desktop, Tablet und Mobile
- **Kein Server-Notwendig**: Statische Seite, kann überall gehostet werden

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
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
│   ├── page.tsx                 # Landing page (Lehrkraft vs. Schüler)
│   ├── lehrer/
│   │   ├── page.tsx             # Lehrbereich-Übersicht
│   │   ├── wissen/
│   │   │   └── page.tsx         # Studien & Fakten
│   │   └── uebungen/
│   │       └── page.tsx         # Übungskatalog
│   └── schueler/
│       ├── page.tsx             # Schülerbereich-Übersicht
│       ├── fragebogen/
│       │   └── page.tsx         # Fragebogen
│       ├── auswertung/
│       │   └── page.tsx         # Ergebnisse (Radar-Chart)
│       └── vorschlaege/
│           └── page.tsx         # Verbesserungsvorschläge
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Header mit Logo & Navigation
│   │   ├── Footer.tsx           # Footer
│   │   └── RoutingGuard.tsx     # Schutz für geschützte Pages
│   └── lehrer/
│       ├── StatCard.tsx         # Statistik-Karte
│       ├── UebungCard.tsx       # Übungskarte
│       └── UebungFilter.tsx     # Filter-Komponente
├── data/
│   ├── fragebogen.json          # 10 Fragen + Verbesserungsvorschläge
│   ├── studien.json             # 3 Statistiken + Themenbereiche
│   └── uebungen.json            # 6+ Übungen
├── lib/
│   ├── types.ts                 # TypeScript-Typdefinitionen
│   └── scoring.ts               # Scoring-Logik für Fragebogen
└── public/                      # Statische Assets
```

## Datenstruktur

Die App verwendet drei JSON-Dateien im `data/`-Ordner, um alle Inhalte zu verwalten.

### Fragebogen (`data/fragebogen.json`)

Enthält Fragen zu verschiedenen Subthemen sowie Verbesserungsvorschläge für niedrige Scores.

**Hauptstrukturen:**
- `subthemen`: Array aller möglichen Subthemen (als Referenz für Filter)
- `fragen`: Array der eigentlichen Fragen (zwei Typen: `skala` oder `single_choice`)
- `verbesserungsvorschlaege`: Objekt mit Tipps pro Subthema für Scores unter 90%

**Frage-Typen:**

1. **Skala-Fragen** (5-stufige Zustimmungsskala):
```json
{
  "id": "q-001",
  "subthema": "Empathie",
  "type": "skala",
  "aussage": "Ich kann mich gut in andere Leute hineinversetzen.",
  "gewichtung": 1,
  "skalaLabels": {
    "1": "Stimme gar nicht zu",
    "5": "Stimme voll zu"
  }
}
```

2. **Single-Choice-Fragen** (Multiple Choice):
```json
{
  "id": "q-002",
  "subthema": "Empathie",
  "type": "single_choice",
  "frage": "Was tust du, wenn ein Klassenkamerad traurig ist?",
  "gewichtung": 1,
  "optionen": [
    { "text": "Ich ignoriere es", "wert": 1 },
    { "text": "Ich frage, ob alles okay ist", "wert": 3 },
    { "text": "Ich tröste ihn/sie", "wert": 5 }
  ]
}
```

**Verbesserungsvorschläge:**
```json
"verbesserungsvorschlaege": {
  "Empathie": {
    "vorschlag": {
      "titel": "Lerne, Gefühle zu erkennen",
      "text": "Empathie bedeutet, dass du dich in andere hineinversetzen kannst...",
      "tipps": ["Achte auf Gesichtsausdrücke", "Frag nach", "Stell dir vor"]
    }
  }
}
```

**Neue Frage hinzufügen:** einfach ein neues Objekt im `fragen`-Array ergänzen, `id` muss eindeutig sein (`q-001`, `q-002`, etc.)

**Neues Subthema hinzufügen:** 
1. Zu `subthemen`-Array hinzufügen
2. Fragen für dieses Subthema erstellen
3. Einträge in `verbesserungsvorschlaege` für dieses Subthema ergänzen

---

### Studien (`data/studien.json`)

Enthält Statistiken aus der Forschung und Themenbereiche zum Klassenklima.

**Hauptstrukturen:**
- `einleitung`: Einleitungstext für die Studien-Seite
- `statistiken`: Array mit Statistiken (jede mit Zahl, Aussage, Quelle, Details)
- `themenBereiche`: Array mit detaillierten Themenbereichen

**Statistik-Struktur:**
```json
{
  "id": "stat-001",
  "zahl": "86%",
  "aussage": "Der Klassenklima hat einen grossen Einfluss auf den Lernerfolg",
  "quelle": "Hattie, 2009",
  "details": "John Hatties grosse Meta-Studie zeigt: ..."
}
```

**Neue Statistik hinzufügen:** neues Objekt mit `id` (`stat-004`, `stat-005`, etc.) zum `statistiken`-Array hinzufügen.

**Themenbereiche:**
```json
{
  "titel": "Motivation und Leistung",
  "inhalt": "Ein positives Klassenklima steigert die Lernmotivation...",
  "details": "Detaillierte Untersuchungen zeigen..."
}
```

**Neuen Themenbereich hinzufügen:** neues Objekt mit `titel`, `inhalt` (kurz) und `details` (ausführlich) zum `themenBereiche`-Array hinzufügen.

---

### Übungen (`data/uebungen.json`)

Enthält eine Sammlung von Aktivitäten zur Förderung des Klassenklimas.

**Übungs-Struktur:**
```json
{
  "id": "ueb-001",
  "titel": "Das Netz der Verbindungen",
  "kurzbeschreibung": "Eine warm-up Übung, um die Klasse als Netzwerk zu erleben...",
  "anleitung": "Alle Teilnehmer stehen im Kreis. Eine Person hält ein Garnknäuel...",
  "zeitBadge": "5–15 Min",
  "alterBadge": ["10–13 Jahre", "13–16 Jahre"],
  "subthemaBadge": ["Teamfähigkeit", "Soziale Kompetenz"],
  "material": "Ein grosses Garnknäuel",
  "tipps": "Für jüngere Klassen kann die Lehrkraft..."
}
```

**Wichtige Felder:**
- `id`: Eindeutige ID (`ueb-001`, `ueb-002`, etc.)
- `titel`: Name der Übung
- `kurzbeschreibung`: Kurze Einleitung (erscheint in der Übersicht)
- `anleitung`: Detaillierte Schritte (evtl. mit `\n` für Zeilenumbrüche)
- `zeitBadge`: Zeitspanne als Text (z.B. "5–15 Min")
- `alterBadge`: Array von Altersgruppen (z.B. "6–10 Jahre", "10–13 Jahre", "13–16 Jahre")
- `subthemaBadge`: Array von Subthemen, die gefördert werden
- `material`: Benötigtes Material (oder "Keine")
- `tipps`: Zusätzliche Hinweise für Lehrkräfte

**Neue Übung hinzufügen:** neues Objekt mit allen Feldern zum `uebungen`-Array hinzufügen, `id` muss eindeutig sein (`ueb-007`, `ueb-008`, etc.).

**Filter nach Alter/Zeit/Thema:** Die Filterkomponente liest die Arrays `alterBadge`, `zeitBadge` (aus `ueb-001` Beispiel), und `subthemaBadge` aus. Neue Werte können einfach hinzugefügt werden, ohne Code zu ändern.

## Scoring

Die App berechnet prozentuale Werte für jedes Subthema:
Standardwert liegt bei 90%, kann aber verändert werden. 

- **>= 90%**: Gut, kein Verbesserungsbedarf
- **< 90%**: Verbesserungspotenzial vorhanden

Der Wert kann in `lib/scoring.ts` angepasst werden. 

```tsx
export const VERBESSERUNGS_SCORE = 90;
```

Die Scores werden lokal im Browser gespeichert und für personalisierte Vorschläge verwendet.

## Lizenz

Dieses Projekt ist als Bildungsressource gemeinfrei verfügbar.

---

Entwickelt mit Next.js, TypeScript und Tailwind CSS.
