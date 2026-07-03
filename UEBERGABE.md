# WFW Wiki — Übergabe-Notiz für neue Chats

## Kontext
Boris Wolff baut ein persönliches IHK-Lernwiki (Wirtschaftsfachwirt) als statisches HTML-System.
Kein CMS, keine Datenbank — läuft lokal und auf GitHub Pages.

---

## Technischer Stand
- Wiki-Ordner: `wfw-wiki1/` auf OneDrive (Boris' PC)
- GitHub: Repository `BoWo-76/wfw-wiki1` (public)
- Hosting: GitHub Pages — `https://bowo-76.github.io/wfw-wiki1/`
- Netlify wurde aufgegeben (Build-Credits aufgebraucht)
- **Sicherheitsthema (offen, Stand 02.07.2026):** Wiki ist bei Google auffindbar ("wfw wiki github" → erster Treffer). Boris möchte den Kursleuten aus dem WhatsApp-Kurs, die den aktuellen Link haben, den Zugriff entziehen, ohne Fremde stärker zu blockieren als bisher. Lösung besprochen: **Repository umbenennen** (Settings → Repository name → Rename). Alte Pages-URL wird NICHT automatisch weitergeleitet (anders als bei normalen Git-Links) → alte Links sterben (404). Den neuen Link dann an niemanden weitergeben — weder Kursgruppe noch sonst wen —, dann ist er für alle unerreichbar, bis Boris ihn selbst wieder teilt. **Noch nicht umgesetzt**, evtl. am Wochenende.

---

## Dateistruktur
```
wfw-wiki1/
  index.html              ← Startseite (Kachel-Grid, auto-generiert via engine.js)
  werkzeugkasten.html     ← Standalone-Seite Werkzeugkasten (eigene Engine)
  karteikarten.html       ← NEU: Standalone-Seite Karteikarten/Leitner-System (eigene Engine)
  quiz.html               ← NEU: Standalone-Seite Quiz/Multiple Choice (eigene Engine)
  build-index.js          ← Node.js-Skript für Volltextsuche-Index
  build-index.bat         ← Doppelklick-Version für Windows
  search-index.json       ← generierter Volltextindex (nach build-index.bat)
  UEBERGABE.md            ← diese Datei
  css/
    style.css             ← gesamtes CSS-Design (inkl. .wk-toggle/.kk-toggle/.qz-toggle/.feedback-toggle)
    engine.js              ← baut Sidebar, Kacheln, Modul-Seiten, Logo, Toggle, Notizzettel,
                             Formelglossar, Changelog, Werkzeugkasten-Button, Karteikarten-Link,
                             Quiz-Link, Feedback-Button (mailto)
    pages.js               ← ZENTRALE KONFIGURATION (Module + alle Seiten)
    tiles.css              ← Kachel-Grid CSS (wird in index.html eingebunden)
    formelzeichen.json     ← zentrales Formelzeichen-Glossar
    changelog.json         ← zentraler Changelog
    wk-config.js           ← Werkzeugkasten-Konfiguration (Gruppen, Tools, PNG-Pfade)
    wk-engine.js            ← Werkzeugkasten-Engine (Sidebar, Viewer, CSS-Injection)
    kk-engine.js            ← NEU: Karteikarten-Engine (Leitner-System, Formelglossar-Deck, eigene Karten)
    quiz-engine.js          ← NEU: Quiz-Engine (Multiple Choice, Fragenanzahl-Auswahl, Gesamtstatistik)
    quiz-data.json          ← NEU: zentrale Fragendatenbank für das Quiz (wächst inkrementell)
  pages/
    about.html
    handbuch.html          ← Nutzerhandbuch (Meta-Seite, module: null) — jetzt 10 Kapitel
    modul_[id].html        ← Modul-Übersichtsseiten (auto-generiert)
    rewe_ls01.html … rewe_ls09.html
    finanz_ls01.html
    recht_ls01.html … recht_ls08.html
    bm_ls01.html, bm_ls01e.html, bm_ls02.html … bm_ls04.html
    uf_ls01.html … uf_ls07.html
    vwlbwl_ls01.html … vwlbwl_ls09.html
    basics_ls01.html … basics_ls20.html   ← NEU: komplett! (LS01–LS20, keine Lücken mehr)
    methodik_ls01.html     ← NEU: Lernmethoden im Überblick (Eigenrecherche, kein Dozentenskript!)
  images/
    bowo-logo.svg, bowo-logo-light.svg, [weitere Grafiken]
    wk/                    ← PNG-Exporte der Werkzeugkasten-Folien (weiterhin ausstehend, siehe unten)
      wk_uebersicht_1.PNG … wk_uebersicht_4.PNG
      wk1_ishikawa_s1.PNG, wk1_ishikawa_s2.PNG, … (vollständige Liste siehe unten)
```

---

## Workflow pro neues Skript
1. Boris lädt PDF, PPTX oder HTML hoch (auch ohne Begleittext — Modul/Nummerierung wird aus dem Dokument erkannt bzw. kurz nachgefragt)
2. Claude generiert `pages/[modul]_lsXX.html` — **NEU (seit 02.07.2026): Rechenbeispiele/Rechenschemata werden bei neuen Skripten direkt mit eingebaut**, nicht erst nachträglich ergänzt. Bestehende ältere Skripte werden nur bei explizitem Bedarf nachgerüstet.
3. Claude aktualisiert `css/pages.js` (neuer Eintrag) **automatisch und ungefragt** — Standard-Workflow
4. Claude liefert NUR die geänderten/neuen Dateien (kein ZIP — einzelne Dateien per `present_files`)
5. Boris: Dateien in Wiki-Ordner kopieren → `build-index.bat` (nur bei neuen Seiten) → GitHub Desktop Commit+Push

**Kein build-index.bat nötig**, wenn nur bestehende HTML-Dateien/`engine.js`/`style.css`/`formelzeichen.json`/`quiz-data.json` geändert wurden (keine neue Seite) — dann direkt committen.

## Workflow für Grafiken in Skripten
1. Boris exportiert Grafik aus PDF/PowerPoint als PNG/JPG
2. Datei in `images/` ablegen
3. Boris nennt: Dateiname + welche HTML-Seite + wo einfügen
4. Claude liefert nur die eine geänderte HTML-Datei

Bei PDF-Quellen mit „📷 Grafik einfügen"-Platzhaltern (z.B. Dozentenskript-Verweise) übernimmt Claude diese vorerst als gelb hinterlegte Hinweisbox mit Bildbeschreibung + Quellenseite (`.notice.warn`), bis die echte Grafik nachgeliefert wird.

**Wichtig (aus Erfahrung):** Boris benennt exportierte Grafiken oft mit dem Präfix „Grafik " (z.B. `Grafik Kaufmannseigenschaft.png`), nicht nur mit dem reinen Bildnamen. Beim Einfügen eines `<img src="...">`-Tags immer den von Boris genannten Dateinamen exakt (inkl. Leerzeichen/Präfix) übernehmen — nicht eigenständig kürzen oder vereinheitlichen, sonst zeigt das Bild nicht an (404).

## NEU: Workflow für Quiz-Fragen (quiz-data.json)
1. Boris liefert Fragen als PDF/MD, oft von Gemini generiert (Format variiert stark — mal `Richtig: X`/`Erklärung:`, mal `### Richtiges Ergebnis: X`/`### Erklärung:`, mal mit LaTeX-Notation `\frac{}{}`/`\text{}`, mal mit `[cite: N]`-Zitatresten). **Claude passt sich dem jeweiligen Format an, statt Boris auf ein festes Format festzunageln** (funktioniert bei Gemini erfahrungsgemäß nicht zuverlässig über mehrere Durchläufe).
2. Bei kleinen Batches (1–3 Dateien): Fragen manuell in JSON-Objekte umwandeln.
3. **Bei großen Batches (8–9 Dateien am Stück):** Claude baut sich sich einen Python-Parser (`parse_quiz_md_v2` o.ä.) mit Regex-Extraktion + LaTeX-Bereinigung (`\frac{a}{b}` → „a ÷ b", `\text{}` → Inhalt, `_{}` → Klammern, `$...$` entfernen, `[cite: N]` entfernen) statt alles von Hand abzutippen — deutlich weniger fehleranfällig bei 80–90 Fragen.
4. **Immer validieren** vor dem Ausliefern: exakt 4 Optionen pro Frage, gültiger `correctIndex` (0–3), keine Zitat-/LaTeX-Artefakte übrig, eindeutige IDs (`<modul>_ls<XX>_q<N>`), Modul-/LS-Verteilung als Kontrolle ausgeben.
5. **Boris möchte modulweise komplett** bearbeitet bekommen (alle LS-Dateien eines Moduls in einer Nachricht), nicht häppchenweise — effizienter für beide Seiten.
6. Auffälligkeiten (doppelte Antwortoptionen, leere Erklärungsfelder, fachlich fragwürdige Prüfungsfallen) werden Boris kurz gemeldet, aber nicht eigenmächtig "korrigiert" — er entscheidet, ob er bei Gemini nachbessert.
7. Claude liefert **ausschließlich** `css/quiz-data.json` (+ `css/changelog.json`) zurück — nie die Engine-Dateien, außer es ändert sich das Feature selbst.
8. **Löschen auf Zuruf:** Boris kann jederzeit ganze Module aus dem Quiz entfernen lassen ("lösche alle Fragen aus Modul X") — einfacher Python-Filter auf `modul`-Feld.

**Fragen-Datenstruktur (`quiz-data.json`):**
```json
{
  "id": "recht_ls04_q1",
  "modul": "recht",
  "ls": "recht_ls04",
  "frage": "Fragetext...",
  "optionen": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 1,
  "erklaerung": "Begründung, warum die Antwort richtig ist..."
}
```

**Aktueller Fragenstand (Stand 02.07.2026): 230 Fragen**
- finanz: 10 (LS01)
- bm: 50 (LS01, LS01-E, LS02, LS03, LS04)
- recht: 80 (LS01–LS08, komplettes Modul)
- rewe: 90 (LS01–LS09, komplettes Modul)
- basics: 0 (alle 138 Fragen auf Boris' Wunsch wieder entfernt — "bringt nicht so wirklich was" bei Wirtschaftsrechnen-Themen)

---

## pages.js — Struktur (KRITISCH: exakt so, sonst bricht Sidebar/Startseite)

```javascript
const WIKI_CONFIG = {
  title: "WFW Wiki",
  subtitle: "IHK Wirtschaftsfachwirt · Lernunterlagen",
  brand: "WFW",
  footer: "IHK Wirtschaftsfachwirt · Nur für internen Gebrauch",

  modules: [
    { id: "basics",    label: "Basics Wirtschaftsrechnen",     icon: "🔢", color: "#6d4c9e", dates: "06.03.–02.04.2026", dozent: "Kreß & Steinhof" },
    { id: "methodik",  label: "Lern- und Arbeitsmethodik",     icon: "📋", color: "#2980b9", dates: "07.04.2026",         dozent: "Dorn" },
    { id: "vwlbwl",   label: "Volks- und Betriebswirtschaft", icon: "📊", color: "#16a085", dates: "08.04.–21.04.2026", dozent: "Steinhof" },
    { id: "rewe",      label: "Rechnungswesen",                icon: "🧮", color: "#B42318", dates: "22.04.–08.05.2026", dozent: "Rank" },
    { id: "recht",     label: "Recht und Steuern",             icon: "⚖️", color: "#1d6a3a", dates: "11.05.–28.05.2026", dozent: "Rank" },
    { id: "uf",        label: "Unternehmensführung",           icon: "🎯", color: "#c0392b", dates: "29.05.–12.06.2026", dozent: "Dern" },
    { id: "bm",        label: "Betriebliches Management",      icon: "🧠", color: "#d35400", dates: "15.06.–26.06.2026", dozent: "Mazajka & Labonté" },
    { id: "finanz",    label: "Finanzmanagement",              icon: "💰", color: "#1a5276", dates: "29.06.–24.07.2026", dozent: "Steinhof" },
    { id: "marketing", label: "Marketing und Vertrieb",        icon: "📣", color: "#7d3c98", dates: "27.07.–07.08.2026", dozent: "Füßler" },
    { id: "fuehrung",  label: "Führung & Zusammenarbeit",      icon: "👥", color: "#1e6b52", dates: "10.08.–21.08.2026", dozent: "Ramm" },
    { id: "logistik",  label: "Logistik und Distribution",     icon: "🚚", color: "#7f6000", dates: "24.08.–04.09.2026", dozent: "Rank" },
  ],

  pages: [
    // module: null für Meta-Seiten (about, handbuch)
    // module: "rewe" / "finanz" / "recht" / "bm" / "uf" / "basics" / "methodik" etc. für Lernseiten
    {
      id: "about", module: null, title: "Über dieses Wiki",
      file: "pages/about.html", status: "fertig", updated: "29.06.2026",
      keywords: [...]
    },
    // ...weitere Einträge, siehe aktuelle pages.js für vollständige Liste
  ]
};
```

⚠️ **Hinweis (geklärt):** Im `modules`-Array steht beim Modul `bm` (Betriebliches Management) `dozent: "Mazajka & Labonté"`, obwohl die gelieferten bm-Skripte (LS01–LS04) durchgängig Michael Dern als Dozent zeigen. Boris hat klargestellt: **Der Dozentenname in den Skripten ist irrelevant** — das Feld bleibt unverändert, keine weitere Klärung nötig.

---

## Fertige Skripte (Stand: 02.07.2026)

### Basics Wirtschaftsrechnen (basics) — ABGESCHLOSSEN ✅ (LS01–LS20, komplett, Dozent Kreß & Steinhof)
LS01 Dreisatz – Bruchstrichmethode ✅ · LS02 Durchschnittsrechnung ✅ · LS03 Buchungskreislauf EBK–SBK ✅
LS04 Umsatzsteuer im Buchungskreislauf ✅ · LS05 Geringwertige Wirtschaftsgüter (GWG) ✅ · LS06 Bezugskosten ✅
LS07 Privatkonten ✅ · LS08 Absatz: Nachlässe und Anzahlungen ✅ · LS09 Leasing ✅
LS10 Darlehen und Disagio ✅ · LS11 Grundlagen des Jahresabschlusses (HGB) ✅ · LS12 KLR-Grundlagen ✅
LS13 Bewertungsgrundsätze § 252 HGB ✅ · LS14 Bilanzanalyse & Bilanzkritik ✅ · LS15 GuV-Auswertung & Kennzahlenanalyse ✅
LS16 Prozentrechnen ✅ · LS17 Zinsrechnung ✅ · LS18 Darlehenstilgung ✅ · LS19 Rentenrechnung ✅ · LS20 Mathematische Grundlagen ✅

### Lern- und Arbeitsmethodik (methodik) — 1 Seite ✅ (Eigenrecherche, KEIN Dozentenskript!)
LS01 Lernmethoden im Überblick ✅ — Modul wurde im Kurs (07.04.2026, Dozent Dorn) inhaltlich nicht behandelt. Seite ist selbst zusammengestellte Übersicht (SQ3R, Feynman-Technik, Pomodoro, Cornell-Methode, Karteikarten/Spaced Repetition, Mindmapping, Loci-Methode, Active Recall) — deutlich als Eigenrecherche gekennzeichnet, kein IHK-Prüfungsstoff im engeren Sinne.

### Rechnungswesen (rewe) — ABGESCHLOSSEN ✅
LS01 Grundlagen Rechnungswesen · LS02 Grundlagen Fibu · LS03 Grundlagen KLR
LS04 Kostenartenrechnung · LS05 Kostenstellenrechnung & BAB
LS06 Kostenträgerrechnung & Kalkulation · LS07 Voll- und Teilkostenrechnung
LS08 Auswertung betriebswirtschaftlicher Zahlen · LS09 Planungsrechnung

### Finanzmanagement (finanz) — in Arbeit, Dozent Steinhof (läuft bis 24.07.2026)
LS01 Investitionsrechnung ✅ — **02.07.2026 überarbeitet:** Rechenbeispiele/Rechenschemata in allen Kapiteln ergänzt (Kostenvergleich, Gewinnvergleich, Rentabilität, Auf-/Abzinsung, Kapitalwert, Annuität, interner Zinsfuß, wirtschaftliche Nutzungsdauer). Zusätzlich neuer Unterabschnitt **„Sonderfall: unterschiedliche Kapazitäten"** in Kapitel 4.1 mit echtem IHK-Prüfungsbeispiel (Angebot 1/2, 8.500/9.500 Stück Kapazität, 8.000 Stück Absatzmenge) inkl. Fixkosten-Proportionalisierungs-Prüfungsfalle und Verlinkung auf externe Quelle (controllingportal.de). Weitere LS folgen, sobald Boris neue Skripte liefert.

### Recht und Steuern (recht) — ABGESCHLOSSEN ✅ (Baustein Recht: LS01–LS03; Baustein Steuern: LS04–LS08, fortlaufend nummeriert)
LS01 Grundlagen des Rechts · LS02 Schuldrecht & AGB · LS03 Kaufvertrag & Vertragsarten
LS04 Körperschaftsteuer · LS05 Gewerbesteuer · LS06 Kapitalertragsteuer und Abgeltungsteuer
LS07 Umsatzsteuer · LS08 Weitere Steuerarten und AO

### Betriebliches Management (bm) — in Arbeit, Dozent Michael Dern
LS01 Strategische & operative Planungsgrundlagen ✅
LS01-E Gegenstromverfahren & Zielsystem im Gleichgewicht (Ergänzung zu LS01) ✅
LS02 Betriebliche Planungsprozesse & Betriebsstatistik ✅
LS03 Wissensmanagement im Betrieb ✅
LS04 Informationstechnologie im Betrieb ✅

### Unternehmensführung (uf) — ABGESCHLOSSEN ✅ (LS01–LS07, Dozent Michael Dern)
LS01 Betriebliche Planungsprozesse ✅ (mehrere "📷 Grafik einfügen"-Platzhalter offen)
LS02 Aufbauorganisation ✅ (mehrere "📷 Grafik einfügen"-Platzhalter offen; Kapitel 7 noch nicht vom Dozenten behandelt)
LS03 Ablauforganisation ✅
LS04 Organisationsentwicklung ✅ (mehrere "📷 Grafik einfügen"-Platzhalter offen)
LS05 Analysemethoden ✅ (mehrere "📷 Grafik einfügen"-Platzhalter offen)
LS06 Personalführung / Personalplanung / Personalbeschaffung ✅ (mehrere "📷 Grafik einfügen"-Platzhalter offen)
LS07 Personalentwicklung ✅ (mehrere "📷 Grafik einfügen"-Platzhalter offen)

### Volks- und Betriebswirtschaft (vwlbwl) — ABGESCHLOSSEN ✅ (LS01–LS09, Dozent Steinhof)
LS01 Grundlagen der VWL ✅
LS02 Wettbewerb, Kartellrecht & Staatliche Eingriffe ✅
LS03 Konjunktur, Stabilitätspolitik & Geldpolitik ✅
LS04 Geldpolitik & monetäre Grundlagen ✅
LS05 EZB-Instrumente & Transmissionsmechanismus ✅
LS06 Außenwirtschaft ✅
LS07 Betriebliche Funktionen ✅
LS08 Existenzgründung & Rechtsformen ✅
LS09 Unternehmenszusammenschlüsse ✅

### Noch leer (Modul-Übersichtsseiten vorhanden, Skripte fehlen — starten erst später im Kursverlauf)
marketing (ab 27.07.2026) · fuehrung (ab 10.08.2026) · logistik (ab 24.08.2026)

---

## HTML-Seitenstruktur (EXAKT so — nicht abweichen!)
```html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>LSXX · Titel – WFW Wiki</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

<div class="topbar">
  <a class="brand" href="../index.html">WFW<span>Wiki</span></a>
  <div class="search-wrap">
    <input id="search-input" type="search" placeholder="Thema suchen …" autocomplete="off">
    <div id="search-results"></div>
  </div>
  <!-- Sidebar-Toggle, Quiz-Button, Karteikarten-Button, Werkzeugkasten-Button, Changelog-Button,
       Formelglossar-Button, Notizzettel-Button, Feedback-Button und Logo werden von engine.js
       automatisch eingefügt -->
</div>

<div class="layout">
  <nav class="sidebar"></nav>
  <main class="main">
    <div class="breadcrumb">
      <a href="../index.html">Startseite</a> › Modulname › LSXX Titel
    </div>
    <div class="page-header">
      <div class="kicker">Modulname · LSXX</div>
      <h1>LSXX · Titel</h1>
      <div class="meta">
        <span>Untertitel / Dozent</span>
        <span>Stand: TT.MM.JJJJ</span>
        <span><span class="badge ok">Fertig</span></span>
      </div>
    </div>

    <!-- Inhalt — Rechenbeispiele/Rechenschemata bei neuen Skripten direkt einbauen! -->

    <div class="related-topics">
      <h3>Verwandte Themen</h3>
      <ul>
        <li><a href="[modul]_lsXX.html">LSXX · Titel</a> – Beschreibung</li>
      </ul>
    </div>
  </main>
</div>

<footer class="page-footer">
  <div>WFW Wiki · IHK Wirtschaftsfachwirt</div>
  <div>MODUL LSXX · Stand: TT.MM.JJJJ</div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.3.9/lunr.min.js"></script>
<script src="../css/pages.js"></script>
<script src="../css/engine.js"></script>
</body>
</html>
```

---

## CSS-Klassen für Inhaltsboxen
```
.def-box          ← Definition (grüner linker Rand)
.pruef-box        ← Prüfungsrelevant/Merksatz (gelb, mit ✏️-Label) — alternativ zu .notice.danger
.notice.info      ← Hinweis/Rechenbeispiel/Praxisbeispiel/Musterlösung (blau)
.notice.ok        ← Merksatz positiv (grün)
.notice.warn      ← Zusatzwissen / Grafik-Platzhalter (orange)
.notice.danger    ← Prüfungsfalle (rot, mit ⛔)
.two-col          ← Zweispaltiges Grid
.content-card     ← Karte innerhalb two-col oder standalone
.related-topics   ← Verwandte Themen am Seitenende
.badge.ok         ← Grünes "Fertig"-Badge
```

**WICHTIG:** `.notice` hat `display: block` (nicht flex) — Text bleibt immer untereinander.

**BUGFIX (02.07.2026):** `.notice strong` war global auf `display: block` gesetzt — das riss JEDES `<strong>` in einer Box auf eine eigene Zeile, nicht nur den Titel. Fiel bei alten Boxen kaum auf (meist nur 1–2 `<strong>` pro Box), brach aber sichtbar bei Boxen mit mehreren kurzen Inline-Betonungen im Fließtext. **Fix: `.notice strong` → `.notice strong:first-child`** — nur das erste `<strong>` (= der Titel) steht blockweise, alle weiteren bleiben normal inline. Globaler Fix in `style.css`, wirkt rückwirkend auf alle bestehenden Boxen im ganzen Wiki. `:first-child` funktioniert auch bei Boxen mit Icon-Präfix vor dem Titel (z.B. „⛔ **Titel**") — Textknoten zählen nicht als Element-Geschwister.

---

**Box-Mapping bei PDF/PPTX-Quellen mit eigenem Label-System** (z.B. „⬣ DEFINITION", „⚠ PRÜFUNGSFALLE", „■ PRAXISBEISPIEL", „✓ MERKSATZ", „✓ MUSTERLÖSUNG", „ℹ HINWEIS", „🧮 RECHENBEISPIEL", „+ ZUSATZWISSEN"):
- DEFINITION → `.def-box`
- PRÜFUNGSFALLE → `.notice.danger` mit „⛔ Prüfungsfalle"
- PRAXISBEISPIEL / MUSTERLÖSUNG / HINWEIS / RECHENBEISPIEL → `.notice.info`
- MERKSATZ → `.notice.ok`
- ZUSATZWISSEN / Grafik-Platzhalter → `.notice.warn`
- Anwendungsanker / Formulierungsbaustein (aus bm-Skripten) → `.def-box`

---

## Tabellen — Layoutregeln (aus Fehlern gelernt)
- Max. 5 Spalten — bei mehr zerfällt das Layout
- Header so kurz wie möglich (Abkürzungen bevorzugen)
- Viel Text pro Zelle → lieber `two-col` mit `content-card`
- Text nach Tabelle NIEMALS in derselben `.notice`-Box — neue Box aufmachen
- Rechenbeispiele mit mehreren Schritten → je Schritt eigene Box
- Leere Zellen bei Ergebniszeilen → `colspan` + grauer Hinweistext
- **NEU:** Mehrwertige Nebenrechnungen (z.B. "Kalk. AfA A = ... | Kalk. AfA B = ...") NIEMALS als Fließtext mit `&nbsp;|&nbsp;`-Trenner — bricht bei schmaler Spaltenbreite an ungünstigen Stellen um. Stattdessen `.two-col`/`.content-card`-Grid verwenden (je Alternative eine Karte).

---

## Navigation & Features

- **Startseite:** Kacheln (11 Module + About), 4-spaltig, Fortschrittsbalken
- **Modul-Übersichtsseite:** `pages/modul_[id].html` — Skript-Liste mit Datum/Dozent
- **Sidebar:** einklappbar per `☰` Button (engine.js), Zustand in localStorage
  - Startseite: standardmäßig eingeklappt
  - Unterseiten: standardmäßig ausgeklappt
- **Logo:** `bowo-logo-light.svg` wird per engine.js dynamisch rechts in Topbar eingefügt
- **About-Kachel:** 12. Kachel auf Startseite → `pages/about.html`
- **Volltext-Suche:** Lunr.js, nach build-index.bat
- **Zuletzt besucht:** localStorage, 5 Einträge, in Sidebar

### Notizzettel (📝, nur auf Lernseiten)
- Icon in der Topbar, Panel slide-in von rechts
- Pro Skript eigener Eintrag in `localStorage` (Key: `wfw_notiz_<page.id>`), gerätegebunden
- Auto-Save beim Tippen (debounced), orangener Badge-Punkt bei Inhalt
- Panel-Status seitenübergreifend gemerkt (`localStorage`-Key `wfw_notiz_panel_open`)
- „🖨 Drucken & löschen"-Button: druckt NUR die Notiz, löscht sie danach automatisch
- Implementiert in `engine.js` (`initNotizzettel()`) und `style.css`
- **Offene Idee:** JSON-Backup-Export der Notizen (siehe Roadmap unten)

### Formelzeichen-Glossar (Σ, auf jeder Seite)
- Icon in der Topbar, global auf allen Seiten
- Lädt per `fetch()` aus `css/formelzeichen.json`; gruppiert nach Modul, auf-/zuklappbar; Suchfeld filtert live
- **Pflege ausschließlich über `css/formelzeichen.json`** — Struktur: `[{ modul, eintraege: [{ symbol, bedeutung }] }]`
- Implementiert in `engine.js` (`initFormelzeichen()`) und `style.css`
- Aktuell befüllt für: `finanz`, `rewe`, `recht`, `bm`
- Dient gleichzeitig als **automatisches Startdeck für die Karteikarten** (siehe unten)

### Changelog (📜, auf jeder Seite)
- Icon in der Topbar, global auf allen Seiten
- Lädt per `fetch()` aus `css/changelog.json`; Einträge nach Datum gruppiert, neueste zuerst
- **Pflege ausschließlich über `css/changelog.json`** — Struktur: `[{ datum, eintraege: [{ modul, titel, aktion }] }]`
- **Standard-Workflow:** Bei jeder neuen oder geänderten Seite wird automatisch und ungefragt ein Changelog-Eintrag ergänzt
- Implementiert in `engine.js` (`initChangelog()`) und `style.css`

### Nutzerhandbuch (`pages/handbuch.html`)
- Meta-Seite (`module: null`), **jetzt 10 Kapitel:** 1 Navigation · 2 Suche · 3 Aufbau eines Lernskripts · 4 Formelzeichen-Glossar · 5 Changelog · 6 Werkzeugkasten · 7 Karteikarten · 8 Quiz · 9 Feedback · 10 Empfohlener Lernablauf
- Verlinkt von der Startseite im Intro-Bereich (`<p class="wiki-meta-links">`)
- **WICHTIGE STANDING-REGEL (seit 30.06.2026):** Sobald ein neues Feature im Wiki eingebaut wird, muss `handbuch.html` entsprechend mitaktualisiert werden. Diese Regel gilt automatisch, ohne explizite Aufforderung.

### Changelog-Pflege — "Neu"-Markierung rotieren
- **WICHTIGE STANDING-REGEL (seit 30.06.2026):** Sobald eine neue Datumsgruppe in `changelog.json` erstellt wird, muss bei ALLEN älteren Einträgen das Attribut `"aktion": "neu"` entfernt werden (Property komplett löschen). Nur die aktuell neueste Datumsgruppe behält die "Neu"-Markierung.

### Werkzeugkasten (🧰, auf jeder Seite)
- Öffnet `werkzeugkasten.html` im selben Tab (kein Panel, sondern eigene Seite)
- **Standalone-Seite** — lädt NICHT `engine.js`/`pages.js`, sondern eigene Scripts:
  - `css/wk-config.js` — Konfiguration (Gruppen, Kategorien, Tools, PNG-Pfade)
  - `css/wk-engine.js` — Sidebar + Viewer-Logik + CSS-Injection
- Eigene Sidebar mit 4 kollabierenden WK-Gruppen; Kategorien als visuelle Trennlabels (`.wk-cat-label`)
- Tool-Klick → stacked PNGs im Hauptbereich (Doppelseite = 2 PNG untereinander)
- Fehlt ein PNG → Platzhalter mit Dateiname (kein Absturz)
- Hash-Navigation: URL-Hash = Tool-ID, ermöglicht Direktverlinkung (`werkzeugkasten.html#wk1_fmea`)
- **Sidebar standardmäßig offen** (localStorage-Key: `wfw_wk_sidebar_open`)
- **Cross-Referenzen:** Tools, die in mehreren WKs gelistet sind, zeigen einen `(→ WK X)`-Badge und verlinken auf die Quelle. Nur eine PNG-Kopie nötig.
- **Pflege:** Neue Tools → Eintrag in `css/wk-config.js` + PNG-Dateien in `images/wk/` ablegen
- **WICHTIG – Dateiendung:** PowerPoint exportiert PNGs immer mit `.PNG` (Großbuchstaben). GitHub Pages (Linux) ist case-sensitiv, Windows nicht → lokal funktioniert alles, auf GitHub Pages erscheint nichts. **Lösung: In `wk-config.js` immer `.PNG` (Großbuchstaben) eintragen**, nicht `.png`.
- Implementiert in `engine.js` (`initWerkzeugkasten()`) und `style.css` (`.wk-toggle`)
- **PNG-Exporte weiterhin ausstehend** — siehe Offene Punkte unten

### NEU: Karteikarten (🎴, auf jeder Seite)
- Öffnet `karteikarten.html` im selben Tab — **Standalone-Seite** wie Werkzeugkasten, lädt `css/pages.js` (für Modul-Labels/Icons) + `css/kk-engine.js`
- **Leitner-System, 5 Boxen:** Box 1 = täglich fällig, Box 2 = alle 3 Tage, Box 3 = wöchentlich, Box 4 = alle 2 Wochen, Box 5 = alle 30 Tage ("gemeistert"). Richtig beantwortet → eine Box hoch; falsch → zurück auf Box 1.
- **Zwei Kartenquellen:**
  - **Formelglossar-Deck** (automatisch aus `css/formelzeichen.json` generiert, ID-Schema `formel_<modul>_<symbol>`) — read-only, wächst automatisch mit dem Glossar mit
  - **Eigene Karten** (vom Nutzer über „+ Neue Karte" angelegt, in `localStorage` Key `wfw_kk_custom`) — bearbeitbar/löschbar
- Fortschritt (Box + Fälligkeitsdatum je Karte) in `localStorage` Key `wfw_kk_progress`, geräte-/browserbezogen — kein Sync, kein öffentlicher Zugriff
- **Dashboard** pro Modul: Kartenanzahl, heute fällig, Box-Verteilung als Balkendiagramm
- **Lernsession:** fällige Karten gemischt, Flip-Karte (Klick zum Umdrehen: Frage → Antwort), Bewertung „Gewusst"/„Nochmal", Session-Zusammenfassung
- Implementiert in `css/kk-engine.js` (komplett eigenständig), Topbar-Link via `engine.js` (`initKarteikartenLink()`) und `style.css` (`.kk-toggle`)
- **Datenstruktur Formelkarte:** `{ id, front: symbol, back: bedeutung, modul, source: 'formel' }`
- **Datenstruktur eigene Karte:** `{ id: 'custom_<timestamp>', front, back, modul, source: 'custom' }`

### NEU: Quiz (❓, auf jeder Seite)
- Öffnet `quiz.html` im selben Tab — **Standalone-Seite**, lädt `css/pages.js` + `css/quiz-engine.js` + `css/quiz-data.json`
- **Multiple Choice**, 4 Antwortoptionen je Frage, sofortige farbliche Auswertung (richtig/falsch markiert) + Erklärungstext nach Antwort
- **Fragenanzahl-Auswahl vor Sessionstart** (10/20/30/„Alle (N)") — Optionen dynamisch aus tatsächlich verfügbarer Fragenzahl generiert, letzte Wahl in `localStorage` (`wfw_qz_count_pref`) gemerkt. **Wichtig eingeführt, weil bei 20 Fragensätzen à 10 Fragen sonst automatisch 200 Fragen am Stück liefen.**
- **Gesamtstatistik auf Dashboard:** Fragen gestellt / richtig / falsch / Trefferquote, über alle Module und Sessions hinweg (`localStorage` Key `wfw_qz_lifetime_stats`), mit Reset-Knopf
- Modul-Filter über Sidebar, wie bei Karteikarten
- Implementiert in `css/quiz-engine.js`, Topbar-Link via `engine.js` (`initQuizLink()`) und `style.css` (`.qz-toggle`)
- Fragen-Workflow siehe Abschnitt oben ("Workflow für Quiz-Fragen")
- **Datenschutz:** Statistik/Präferenzen rein lokal in `localStorage` — niemand mit dem Wiki-Link sieht Boris' persönliche Quiz-Statistik, nur die Fragen selbst sind öffentlich (kommen aus `quiz-data.json` im Repo)

### NEU: Feedback-Button (✉️, auf jeder Seite via engine.js)
- Einfacher `mailto:`-Link, kein externer Dienst, keine Anmeldung nötig
- Adresse: `wfw.wiki@gmail.com` (dedizierte Adresse, extra für diesen Zweck angelegt, getrennt vom privaten Postfach — Spam ist damit irrelevant)
- Öffnet E-Mail-Programm mit vorausgefülltem Betreff „Feedback zum WFW Wiki" und kurzem Anschreiben-Template
- Grund: Wiki ist öffentlich (GitHub Pages benötigt öffentliches Repo für kostenlosen Tarif) und bei Google auffindbar → Gelegenheit für Fremdfeedback, falls jemand die Seite findet
- Implementiert in `engine.js` (`initFeedbackLink()`), Icon direkt vor dem BoWo-Logo platziert, `style.css` (`.feedback-toggle`)

#### wk-config.js — Struktur
```javascript
const WK_CONFIG = {
  gruppen: [
    {
      id: "wk1",
      label: "WK I · Management- & Analysemethoden",
      icon: "🔧",
      kategorien: [
        {
          label: null,          // null = kein Trennlabel (für Übersicht-Einträge)
          tools: [
            { id: "wk1_uebersicht", label: "Gesamtübersicht WK I", icon: "≡",
              seiten: ["images/wk/wk_uebersicht_1.PNG"] }
          ]
        },
        {
          label: "Ursachenanalyse",   // sichtbares Trennlabel in Sidebar
          tools: [
            { id: "wk1_ishikawa", label: "Ishikawa-Diagramm",
              seiten: ["images/wk/wk1_ishikawa_s1.PNG", "images/wk/wk1_ishikawa_s2.PNG"] },
            // Cross-Referenz auf ein anderes WK:
            { id: "wk1_nutzwert_ref", label: "Nutzwertanalyse",
              seiten: ["images/wk/wk3_nutzwert_s1.PNG", "images/wk/wk3_nutzwert_s2.PNG"],
              quelle: "WK III" }
          ]
        }
      ]
    }
    // ... weitere Gruppen WK II, WK III, WK IV
  ]
};
```

#### PNG-Dateinamen-Konvention (`images/wk/`)
```
Gesamtübersichten (aus Gesamtübersicht-PPTX):
  wk_uebersicht_1.PNG … wk_uebersicht_4.PNG

WK I (aus WK I PPTX, je Tool 2 Seiten):
  wk1_ishikawa_s1.PNG/s2.PNG        wk1_5why_s1.PNG/s2.PNG
  wk1_pdca_s1.PNG/s2.PNG            wk1_pareto_analyse_s1.PNG/s2.PNG
  wk1_fmea_s1.PNG/s2.PNG            wk1_abc_s1.PNG/s2.PNG
  wk1_pareto_prinzip_s1.PNG/s2.PNG  wk1_swot_s1.PNG/s2.PNG
  wk1_benchmarking_s1.PNG/s2.PNG    wk1_szenariotechnik_s1.PNG/s2.PNG
  wk1_kosten_nutzen_s1.PNG/s2.PNG   wk1_morphkasten_s1.PNG/s2.PNG
  wk1_smart_s1.PNG/s2.PNG           wk1_zielpyramide_s1.PNG/s2.PNG
  wk1_netzplan_s1.PNG/s2.PNG        wk1_gantt_s1.PNG/s2.PNG
  wk1_meilenstein_s1.PNG/s2.PNG     wk1_stakeholder_s1.PNG/s2.PNG
  wk1_mindmap_s1.PNG/s2.PNG         wk1_brainstorming_s1.PNG/s2.PNG
  wk1_6hut_s1.PNG/s2.PNG

WK II (aus WK II PPTX):
  wk2_pestel_s1.PNG/s2.PNG          wk2_stakeholder_s1.PNG/s2.PNG
  wk2_portfolio_bcg_s1.PNG/s2.PNG   wk2_szenariotechnik_s1.PNG/s2.PNG
  wk2_mta_s1.PNG/s2.PNG             wk2_six_sigma_s1.PNG/s2.PNG

WK III (aus WK III PPTX):
  wk3_nutzwert_s1.PNG/s2.PNG              wk3_entscheidungsmatrix_s1.PNG/s2.PNG
  wk3_kosten_nutzen_s1.PNG/s2.PNG         wk3_scoring_s1.PNG/s2.PNG
  wk3_sensitivitaet_s1.PNG/s2.PNG         wk3_szenariotechnik_s1.PNG/s2.PNG

WK IV (aus WK IV PPTX):
  wk4_projektorganisation_s1.PNG/s2.PNG   wk4_org_formen_s1.PNG/s2.PNG
  wk4_mag_dreieck_s1.PNG/s2.PNG           wk4_projektplanung_s1.PNG/s2.PNG
  wk4_risikoanalyse_s1.PNG/s2.PNG         wk4_projektsteuerung_s1.PNG/s2.PNG
  wk4_projektdoku_s1.PNG/s2.PNG
```

---

## Lieferformat
- Geänderte/neue Dateien werden einzeln per `present_files` geliefert (kein ZIP)
- `pages/neueseite.html` + `css/pages.js` (immer beide zusammen, automatisch) bei neuen Skripten
- `css/changelog.json` wird bei jeder neuen oder geänderten Seite ebenfalls automatisch mitgeliefert
- Nur einzelne HTML-Datei bei Grafik-Einbettungen oder kleinen Korrekturen
- `css/engine.js`, `css/style.css`, `css/formelzeichen.json` oder `css/changelog.json` nur wenn Features/Glossar/Changelog geändert werden
- `css/wk-config.js` nur bei Änderungen am Werkzeugkasten (neue Tools, neue Gruppen)
- **NEU: `css/quiz-data.json` bei neuen/gelöschten Quiz-Fragen — ausschließlich diese Datei (+ changelog), nie die Engine mitliefern, wenn sich nur Inhalte ändern**

---

## Bekannte technische Details
- `engine.js` fügt Logo, Sidebar-Toggle, Quiz-Button, Karteikarten-Button, Werkzeugkasten-Button, Changelog-Button, Formelglossar-Button, Notizzettel-Button und Feedback-Button automatisch ein — NICHT manuell in HTML
- Init-Reihenfolge in `engine.js` (DOMContentLoaded), Stand 02.07.2026:
  `initSidebarToggle()` → `initNotizzettel()` → `initFormelzeichen()` → `initChangelog()` → `initWerkzeugkasten()` → `initKarteikartenLink()` → `initQuizLink()` → `initFeedbackLink()` → `initSearch()`
- **Topbar-Icon-Positionierung (Stand 02.07.2026):** ☰ Sidebar-Toggle → Brand "WFWWiki" → Suchfeld → ❓ Quiz → 🎴 Karteikarten → 🧰 Werkzeugkasten → 📜 Changelog → Σ Formelglossar → 📝 Notizzettel → ✉️ Feedback → (Lücke via `margin-left:auto` auf `.topbar-logo`) → BoWo-Logo
- `werkzeugkasten.html`, `karteikarten.html`, `quiz.html` liegen alle im Wiki-Root (nicht in `pages/`), jeweils eigene Standalone-Engine, KEIN `lunr.js` oder `engine.js`
- `build-index.bat` nach jeder neuen Wiki-Seite ausführen (Node.js erforderlich) — NICHT bei Werkzeugkasten/Karteikarten/Quiz (kein pages.js-Eintrag für diese drei Standalone-Seiten)
- `.notice { display: block }` — verhindert Flex-Layout-Fehler bei Merksätzen
- `.notice strong:first-child { display: block }` — NEU (02.07.2026), siehe Bugfix-Hinweis oben
- GitHub Pages URL: `https://bowo-76.github.io/wfw-wiki1/` — **evtl. bald geändert, siehe Sicherheitsthema oben**
- `index.html` muss `<link rel="stylesheet" href="css/tiles.css">` enthalten
- **Niemals `localStorage`/`sessionStorage` in Claude-Artifacts verwenden** — im echten Wiki ist das problemlos möglich und wird für Notizzettel, Panel-Status, Sidebar-Status, Werkzeugkasten-Sidebar, Karteikarten (Fortschritt + eigene Karten) und Quiz (Statistik + Präferenzen) aktiv genutzt
- **WIKI_CONFIG als `window.WIKI_CONFIG =`** (nicht `const`) — wichtig für zuverlässige cross-browser/file://-Verfügbarkeit, gilt für alle Standalone-Seiten, die `pages.js` mitladen (Karteikarten, Quiz)

---

## Geplante Erweiterungen / Offene Punkte

### Direkt ausstehend
- **Werkzeugkasten PNG-Exporte** weiterhin ausstehend — Boris exportiert aus WK I–IV PPTX als PNG und legt sie in `images/wk/` ab (Dateinamenliste vollständig oben dokumentiert)
- **Grafiken** für „📷 Grafik einfügen"-Platzhalter nachliefern (betrifft uf_ls01, uf_ls02, uf_ls04–uf_ls07: Eisberg-Modell, BCG-Matrix, Organigramm-Darstellungen, PDCA-Kreislauf, VUKA/BANI-Grafiken, Mintzberg-Strategiebrücke, Du-Pont-Pyramide, Kano-Diagramm, Maslow-Pyramide, Herzberg-Diagramm, Grid-Konzept-Gitter, Tuckman-Kurve, Nettopersonalbedarfsrad, Personalportfolio-Matrix)
- **Kapitel 7** in `uf_ls02` (Personalwirtschaftliche Organisation) ergänzen, sobald Dozent das Thema behandelt hat
- **Repository umbenennen** (Sicherheitsthema, siehe oben) — evtl. am Wochenende
- **LogiBase-Wiki-Demo** (Fiverr-Portfolio) — Boris möchte sich am Wochenende evtl. wieder darum kümmern, siehe Fiverr-Kontext unten

### Roadmap-Ideen (vorgeschlagen 01.07.2026, teils bereits umgesetzt)
- ✅ Karteikarten-Widget mit Spaced Repetition/Leitner-System — **umgesetzt**
- ✅ Quiz mit Multiple Choice — **umgesetzt** (ursprünglich nicht in der Ideenliste, kam später dazu)
- ✅ Feedback-Möglichkeit für Fremdbesucher — **umgesetzt** (mailto)
- ⬜ Active-Recall-Modus pro Seite (Prüfungsboxen/Checklisten ausblenden, nur Fragen zeigen)
- ⬜ „Gelernt"-Häkchen pro LS mit persönlichem Fortschrittsbalken (zusätzlich zum Fertig/Entwurf-Status)
- ⬜ Prüfungs-Countdown-Widget (Prüfung November 2026)
- ⬜ Suchtreffer-Highlighting in Lunr-Ergebnissen (gematchter Begriff fett im Snippet)
- ⬜ „Zuletzt angesehen"-Liste (unabhängig von der bereits vorhandenen Sidebar-Historie, ggf. redundant — prüfen)
- ⬜ JSON-Backup/Export für Notizzettel (und jetzt auch Karteikarten/Quiz-Statistik) — bei Verlust/Browserwechsel sonst alles weg
- ⬜ Dark Mode via CSS-Variablen-Toggle

---

## Fiverr-Kontext
Das Wiki dient als Portfolio-Demo für Freelance-Leistungen:
Prozessdokumentation · SOPs · interne Wiki-Systeme für KMUs
Verkaufsargument: kein Lock-in, keine Lizenzkosten, läuft lokal im Intranet oder auf eigenem Server.

Separates Demo-Projekt: **LogiBase Wiki** (fiktive LogiBase GmbH, dark blue/amber Branding, gleiche Architektur) — vollständig fertig, dient als zeigbares Fiverr-Portfolio-Stück unabhängig vom persönlichen WFW-Wiki. **Boris plant, sich am kommenden Wochenende (04./05.07.2026) wieder darum zu kümmern** — konkrete nächste Schritte noch offen, nächster Chat dazu wird's zeigen.
