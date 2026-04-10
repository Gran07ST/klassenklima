# Klassenklima

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
- **Modernes UI**: Warme, minimalistische Gestaltung mit handgezeichneten SVGs
- **Keine Server-Notwendig**: Statische Seite, kann überall gehostet werden

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts (Radar-Chart)
- **UI Components**: shadcn/ui
- **Runtime**: Bun, Node.js, oder andere Next.js-kompatible Runtimes

## Getting Started

### Installation

```bash
# Dependencies installieren
bun install
# oder
npm install

# Development-Server starten
bun dev
# oder
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

### Build für Production

```bash
bun build
# oder
npm run build
```

### Start Production-Server

```bash
bun start
# oder
npm start
```

## Projektstruktur

```
rebecca-projekt/
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

### Fragebogen (`data/fragebogen.json`)
- 10 Fragen zu 7 Subthemen:
  - Empathie, Kommunikation, Teamfähigkeit
  - Selbstregulation, Konfliktlösung
  - Soziale Kompetenz, Selbstbewusstsein
- Jede Frage hat Gewichtung und Skalabezeichnungen

### Studien (`data/studien.json`)
- 3 Statistiken mit Quellen (Hattie, OECD, Wentzel)
- 4 Themenbereiche mit Details

### Übungen (`data/uebungen.json`)
- 6+ Übungen mit Metadaten:
  - Zeitdauer, Alter, Subthema
  - Material, Beschreibung, Tipps

## Scoring

Die App berechnet prozentuale Werte für jedes Subthema:
- **≥ 90%**: Gut, kein Verbesserungsbedarf
- **< 90%**: Verbesserungspotenzial vorhanden

Die Scores werden lokal im Browser gespeichert und für personalisierte Vorschläge verwendet.

## Lizenz

Dieses Projekt ist als Bildungsressource gemeinfrei verfügbar.

---

Entwickelt mit Next.js, TypeScript und Tailwind CSS.
