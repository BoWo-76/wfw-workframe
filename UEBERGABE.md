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

---

## Dateistruktur
```
wfw-wiki1/
  index.html              ← Startseite (Kachel-Grid, auto-generiert via engine.js)
  werkzeugkasten.html     ← NEU: Standalone-Seite Werkzeugkasten (eigene Engine)
  build-index.js          ← Node.js-Skript für Volltextsuche-Index
  build-index.bat         ← Doppelklick-Version für Windows
  search-index.json       ← generierter Volltextindex (nach build-index.bat)
  UEBERGABE.md            ← diese Datei
  css/
    style.css             ← gesamtes CSS-Design (inkl. .wk-toggle für Werkzeugkasten-Button)
    engine.js             ← baut Sidebar, Kacheln, Modul-Seiten, Logo, Toggle, Notizzettel,
                             Formelglossar, Changelog, Werkzeugkasten-Button
    pages.js              ← ZENTRALE KONFIGURATION (Module + alle Seiten)
    tiles.css             ← Kachel-Grid CSS (wird in index.html eingebunden)
    formelzeichen.json    ← zentrales Formelzeichen-Glossar
    changelog.json        ← zentraler Changelog
    wk-config.js          ← NEU: Werkzeugkasten-Konfiguration (Gruppen, Tools, PNG-Pfade)
    wk-engine.js          ← NEU: Werkzeugkasten-Engine (Sidebar, Viewer, CSS-Injection)
  pages/
    about.html
    handbuch.html         ← Nutzerhandbuch (Meta-Seite, module: null)
    modul_[id].html       ← 11 Modul-Übersichtsseiten (auto-generiert)
    rewe_ls01.html … rewe_ls09.html
    finanz_ls01.html
    recht_ls01.html … recht_ls08.html
    bm_ls01.html, bm_ls01e.html, bm_ls02.html … bm_ls04.html
    uf_ls01.html … uf_ls07.html
    vwlbwl_ls01.html … vwlbwl_ls09.html   ← LS07–LS09 neu in diesem Chat
    basics_ls01.html … basics_ls03.html   ← neu in diesem Chat (LS04–LS20 folgen)
  images/
    bowo-logo.svg, bowo-logo-light.svg, [weitere Grafiken]
    wk/                   ← NEU: PNG-Exporte der Werkzeugkasten-Folien
      wk_uebersicht_1.PNG … wk_uebersicht_4.PNG
      wk1_ishikawa_s1.PNG, wk1_ishikawa_s2.PNG, … (vollständige Liste siehe unten)
```

---

## Workflow pro neues Skript
1. Boris lädt PDF, PPTX oder HTML hoch (auch ohne Begleittext — Modul/Nummerierung wird aus dem Dokument erkannt bzw. kurz nachgefragt)
2. Claude generiert `pages/[modul]_lsXX.html`
3. Claude aktualisiert `css/pages.js` (neuer Eintrag) **automatisch und ungefragt** — das ist jetzt Standard-Workflow, nicht mehr optional
4. Claude liefert NUR die geänderten/neuen Dateien (kein ZIP mehr nötig im aktuellen Workflow — einzelne Dateien per `present_files`)
5. Boris: Dateien in Wiki-Ordner kopieren → `build-index.bat` (nur bei neuen Seiten) → GitHub Desktop Commit+Push

**Kein build-index.bat nötig**, wenn nur bestehende HTML-Dateien/`engine.js`/`style.css`/`formelzeichen.json` geändert wurden (keine neue Seite) — dann direkt committen.

## Workflow für Grafiken in Skripten
1. Boris exportiert Grafik aus PDF/PowerPoint als PNG/JPG
2. Datei in `images/` ablegen
3. Boris nennt: Dateiname + welche HTML-Seite + wo einfügen
4. Claude liefert nur die eine geänderte HTML-Datei

**Neu:** Bei PDF-Quellen mit „📷 Grafik einfügen"-Platzhaltern (z.B. Dozentenskript-Verweise) übernimmt Claude diese vorerst als gelb hinterlegte Hinweisbox mit Bildbeschreibung + Quellenseite (`.notice.warn`), bis die echte Grafik nachgeliefert wird.

**Wichtig (aus Erfahrung):** Boris benennt exportierte Grafiken oft mit dem Präfix „Grafik " (z.B. `Grafik Kaufmannseigenschaft.png`), nicht nur mit dem reinen Bildnamen. Beim Einfügen eines `<img src="...">`-Tags immer den von Boris genannten Dateinamen exakt (inkl. Leerzeichen/Präfix) übernehmen — nicht eigenständig kürzen oder vereinheitlichen, sonst zeigt das Bild nicht an (404).

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
    // module: "rewe" / "finanz" / "recht" / "bm" / "uf" etc. für Lernseiten
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

## Fertige Skripte (Stand: 01.07.2026)

### Basics Wirtschaftsrechnen (basics) — in Arbeit, Dozent Kreß & Steinhof
LS01 Dreisatz – Bruchstrichmethode ✅ (proportional, antiproportional, zusammengesetzt, Fehlerquellen, Verbindung zur Zinsformel)
LS02 Durchschnittsrechnung ✅ (alle 4 Verfahren: einfach, gewichtet, gleitend, zeitlich gewichtet; inkl. Zentrierung gerader Fenster)
LS03 Buchungskreislauf EBK–SBK ✅ (vollständiger Kreislauf in 7 Schritten, 4 Bilanzveränderungsarten, durchgehendes Zahlenbeispiel, Verlust-Exkurs)
LS04–LS20 → folgen in späteren Chats (Dateinamen-Vorgabe bekannt, siehe ursprüngliche Planung)

### Rechnungswesen (rewe) — ABGESCHLOSSEN ✅
LS01 Grundlagen Rechnungswesen · LS02 Grundlagen Fibu · LS03 Grundlagen KLR
LS04 Kostenartenrechnung · LS05 Kostenstellenrechnung & BAB
LS06 Kostenträgerrechnung & Kalkulation · LS07 Voll- und Teilkostenrechnung
LS08 Auswertung betriebswirtschaftlicher Zahlen · LS09 Planungsrechnung

### Finanzmanagement (finanz) — in Arbeit
LS01 Investitionsrechnung ✅

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
LS07 Betriebliche Funktionen ✅ (7 Funktionen: Produktion inkl. Fertigungsarten, Logistik+7R, Marketing+4P, ReWe/KLR, Finanzierung/Investition, Controlling, Personal)
LS08 Existenzgründung & Rechtsformen ✅ (5 Phasen, Businessplan, Formalitäten, alle Rechtsformen, Organe GmbH/AG/KGaA)
LS09 Unternehmenszusammenschlüsse ✅ (Kooperation vs. Konzentration, Kartell §2 GWB, Fusion/Konzern/Beteiligung, große Übersichtstabelle)

### Noch leer (Modul-Übersichtsseiten vorhanden, Skripte fehlen)
methodik · marketing · fuehrung · logistik

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
  <!-- Sidebar-Toggle, Werkzeugkasten-Button, Changelog-Button, Formelglossar-Button,
       Notizzettel-Button und Logo werden von engine.js automatisch eingefügt -->
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

    <!-- Inhalt -->

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

---

## Navigation & Features

- **Startseite:** 12 Kacheln (11 Module + About), 4-spaltig, Fortschrittsbalken
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

### Formelzeichen-Glossar (Σ, auf jeder Seite)
- Icon in der Topbar, links vom Notizzettel-Icon, global auf allen Seiten
- Lädt per `fetch()` aus `css/formelzeichen.json`; gruppiert nach Modul, auf-/zuklappbar; Suchfeld filtert live
- **Pflege ausschließlich über `css/formelzeichen.json`** — Struktur: `[{ modul, eintraege: [{ symbol, bedeutung }] }]`
- Implementiert in `engine.js` (`initFormelzeichen()`) und `style.css`
- Aktuell befüllt für: `finanz`, `rewe`, `recht`, `bm`

### Changelog (📜, auf jeder Seite)
- Icon in der Topbar, links vom Formelglossar-Icon, global auf allen Seiten
- Lädt per `fetch()` aus `css/changelog.json`; Einträge nach Datum gruppiert, neueste zuerst
- **Pflege ausschließlich über `css/changelog.json`** — Struktur: `[{ datum, eintraege: [{ modul, titel, aktion }] }]`
- **Standard-Workflow:** Bei jeder neuen oder geänderten Seite wird automatisch und ungefragt ein Changelog-Eintrag ergänzt
- Implementiert in `engine.js` (`initChangelog()`) und `style.css`

### Nutzerhandbuch (`pages/handbuch.html`)
- Meta-Seite (`module: null`), erklärt Navigation, Suche, Box-System, Formelglossar, Changelog, Werkzeugkasten und empfohlenen Lernablauf
- Verlinkt von der Startseite im Intro-Bereich (`<p class="wiki-meta-links">`)
- **WICHTIGE STANDING-REGEL (seit 30.06.2026):** Sobald ein neues Feature im Wiki eingebaut wird, muss `handbuch.html` entsprechend mitaktualisiert werden. Diese Regel gilt automatisch, ohne explizite Aufforderung.

### Changelog-Pflege — "Neu"-Markierung rotieren
- **WICHTIGE STANDING-REGEL (seit 30.06.2026):** Sobald eine neue Datumsgruppe in `changelog.json` erstellt wird, muss bei ALLEN älteren Einträgen das Attribut `"aktion": "neu"` entfernt werden (Property komplett löschen). Nur die aktuell neueste Datumsgruppe behält die "Neu"-Markierung.

### NEU: Werkzeugkasten (🧰, auf jeder Seite)
- Icon in der Topbar, links vom 📜 Changelog-Icon, global auf allen Seiten
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
- **WICHTIG – Dateiendung:** PowerPoint exportiert PNGs immer mit `.PNG` (Großbuchstaben). GitHub Pages (Linux) ist case-sensitiv, Windows nicht → lokal funktioniert alles, auf GitHub Pages erscheint nichts. **Lösung: In `wk-config.js` immer `.PNG` (Großbuchstaben) eintragen**, nicht `.png`. Gilt für alle Bilder in `images/wk/`.
- Implementiert in `engine.js` (`initWerkzeugkasten()`) und `style.css` (`.wk-toggle`)

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

---

## Bekannte technische Details
- `engine.js` fügt Logo, Sidebar-Toggle, Werkzeugkasten-Button, Changelog-Button, Formelglossar-Button und Notizzettel-Button automatisch ein — NICHT manuell in HTML
- Init-Reihenfolge in `engine.js` (DOMContentLoaded):
  `trackVisit()` → `buildTopbar()` → `initSidebarToggle()` → `buildLogo()` → `initNotizzettel()` → `initFormelzeichen()` → `initChangelog()` → **`initWerkzeugkasten()`** → `buildSidebar()` → `buildIndexPage()` → `buildModulePage()` → `buildPrintButton()` → `initSearch()` → `highlightSearchTerm()`
- **Topbar-Icon-Positionierung (Stand 01.07.2026):** Alle Buttons rechts neben dem Suchfeld, Reihenfolge von links nach rechts: ☰ Sidebar-Toggle → Brand "WFWWiki" → Suchfeld → 🧰 Werkzeugkasten → 📜 Changelog → Σ Formelglossar → 📝 Notizzettel → (Lücke via `margin-left:auto` auf `.topbar-logo`) → BoWo-Logo
- `werkzeugkasten.html` liegt im Wiki-Root (nicht in `pages/`), lädt `css/style.css` + `css/wk-config.js` + `css/wk-engine.js` (KEIN `lunr.js`, `pages.js` oder `engine.js`)
- `build-index.bat` nach jeder neuen Wiki-Seite ausführen (Node.js erforderlich) — NICHT beim Werkzeugkasten (kein pages.js-Eintrag)
- `.notice { display: block }` — verhindert Flex-Layout-Fehler bei Merksätzen
- GitHub Pages URL: `https://bowo-76.github.io/wfw-wiki1/`
- `index.html` muss `<link rel="stylesheet" href="css/tiles.css">` enthalten
- **Niemals `localStorage`/`sessionStorage` in Claude-Artifacts verwenden** — im echten Wiki ist das problemlos möglich und wird für Notizzettel, Panel-Status, Sidebar-Status und Werkzeugkasten-Sidebar aktiv genutzt

---

## Geplante Erweiterungen / Offene Punkte
- **basics LS04–LS20** folgen in späteren Chats (Dateinamen-Liste bekannt):
  LS04 Umsatzsteuer · LS05 Abschreibungen GWG · LS06 Bezugskosten · LS07 Privatkonten
  LS08 Absatz · LS09 Leasing · LS10 Darlehen · LS11 Jahresabschluss Grundlagen
  LS12 KLR Grundlagen · LS13 Bilanzbewertung Grundlagen · LS14 Bilanzanalyse Kritik Final
  LS15 GuV Auswertung · LS16 Prozentrechnen · LS17 Zinsrechnen · LS18 Darlehenstilgung
  LS19 Rentenrechnung · LS20 Mathe Grundlagen
- **Werkzeugkasten PNG-Exporte** noch ausstehend — Boris exportiert aus WK I–IV PPTX als PNG und legt sie in `images/wk/` ab (Dateinamenliste vollständig in dieser Übergabe dokumentiert)
- **Grafiken** für „📷 Grafik einfügen"-Platzhalter nachliefern (betrifft uf_ls01, uf_ls02, uf_ls04–uf_ls07: Eisberg-Modell, BCG-Matrix, Organigramm-Darstellungen, PDCA-Kreislauf, VUKA/BANI-Grafiken, Mintzberg-Strategiebrücke, Du-Pont-Pyramide, Kano-Diagramm, Maslow-Pyramide, Herzberg-Diagramm, Grid-Konzept-Gitter, Tuckman-Kurve, Nettopersonalbedarfsrad, Personalportfolio-Matrix)
- **Kapitel 7** in `uf_ls02` (Personalwirtschaftliche Organisation) ergänzen, sobald Dozent das Thema behandelt hat
- **handbuch.html** muss noch um den Werkzeugkasten-Abschnitt (🧰-Button, Bedienung) ergänzt werden — Standing Rule gilt

---

## Fiverr-Kontext
Das Wiki dient als Portfolio-Demo für Freelance-Leistungen:
Prozessdokumentation · SOPs · interne Wiki-Systeme für KMUs
Verkaufsargument: kein Lock-in, keine Lizenzkosten, läuft lokal im Intranet oder auf eigenem Server.

Separates Demo-Projekt: **LogiBase Wiki** (fiktive LogiBase GmbH, dark blue/amber Branding, gleiche Architektur) — vollständig fertig, dient als zeigbares Fiverr-Portfolio-Stück unabhängig vom persönlichen WFW-Wiki.
