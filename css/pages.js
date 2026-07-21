// ============================================================
// WIKI KONFIGURATION — zentrale Steuerdatei
// ============================================================

const WIKI_CONFIG = {

  title: "WFW Wiki",
  subtitle: "IHK Wirtschaftsfachwirt · Lernunterlagen",
  brand: "WFW",
  footer: "IHK Wirtschaftsfachwirt · Nur für internen Gebrauch",

  modules: [
    { id: "basics",    label: "Basics Wirtschaftsrechnen",     icon: "🔢", color: "#6d4c9e", dates: "06.03.–02.04.2026", dozent: "Kreß & Steinhof" },
    { id: "methodik",  label: "Lern- und Arbeitsmethodik",     icon: "📋", color: "#2980b9", dates: "07.04.2026",         dozent: "Dorn" },
    { id: "vwlbwl",   label: "Volks- und Betriebswirtschaft", icon: "📊", color: "#16a085", dates: "08.04.–21.04.2026", dozent: "Steinhof" },
    { id: "rewe",      label: "Rechnungswesen",                 icon: "🧮", color: "#B42318", dates: "22.04.–08.05.2026", dozent: "Rank" },
    { id: "recht",     label: "Recht und Steuern",             icon: "⚖️", color: "#1d6a3a", dates: "11.05.–28.05.2026", dozent: "Rank" },
    { id: "uf",        label: "Unternehmensführung",           icon: "🎯", color: "#c0392b", dates: "29.05.–12.06.2026", dozent: "Dern" },
    { id: "bm",        label: "Betriebliches Management",      icon: "🧠", color: "#d35400", dates: "15.06.–26.06.2026", dozent: "Mazajka & Labonté" },
    { id: "finanz",    label: "Finanzmanagement",              icon: "💰", color: "#1a5276", dates: "29.06.–24.07.2026", dozent: "Steinhof" },
    { id: "marketing", label: "Marketing und Vertrieb",        icon: "📣", color: "#7d3c98", dates: "27.07.–07.08.2026", dozent: "Füßler" },
    { id: "fuehrung",  label: "Führung & Zusammenarbeit",      icon: "👥", color: "#1e6b52", dates: "10.08.–21.08.2026", dozent: "Ramm" },
    { id: "logistik",  label: "Logistik und Distribution",     icon: "🚚", color: "#7f6000", dates: "24.08.–04.09.2026", dozent: "Rank" },
  ],

  pages: [

    // ── Meta ─────────────────────────────────────────────────
    {
      id: "about", module: null, title: "Über dieses Wiki",
      file: "pages/about.html", status: "fertig", updated: "29.06.2026",
      keywords: ["über", "about", "wiki", "boris wolff", "wirtschaftsfachwirt", "ihk", "fiverr", "portfolio"]
    },
    {
      id: "handbuch", module: null, title: "Nutzerhandbuch",
      file: "pages/handbuch.html", status: "fertig", updated: "02.07.2026",
      keywords: ["handbuch", "anleitung", "navigation", "suche", "box-system", "definition-box", "prüfungsfalle", "merksatz", "merkhilfe", "formelglossar", "changelog", "werkzeugkasten", "karteikarten", "quiz", "feedback", "lernablauf", "bedienungsanleitung", "hilfe"]
    },

    // ── Lern- und Arbeitsmethodik ────────────────────────────
    {
      id: "methodik_ls01", module: "methodik", title: "LS01 · Lernmethoden im Überblick",
      file: "pages/methodik_ls01.html", status: "fertig", updated: "01.07.2026",
      keywords: ["lernmethoden", "sq3r", "feynman-technik", "pomodoro-technik", "cornell-methode", "karteikarten", "spaced repetition", "leitner-system", "mindmapping", "loci-methode", "gedächtnispalast", "mnemotechnik", "active recall", "aktives erinnern", "testing-effekt", "lerntechnik", "arbeitsmethodik"]
    },

    // ── Rechnungswesen ───────────────────────────────────────
    {
      id: "rewe_ls01", module: "rewe", title: "LS01 · Grundlagen Rechnungswesen",
      file: "pages/rewe_ls01.html", status: "fertig", updated: "28.06.2026",
      keywords: ["kaufmann", "rechnungswesen", "rewe", "finanzbuchhaltung", "klr", "kosten", "leistung", "aufwand", "ertrag", "gob", "buchführungspflicht", "wirtschaftlichkeit", "rentabilität", "imparitätsprinzip", "realisationsprinzip"]
    },
    {
      id: "rewe_ls02", module: "rewe", title: "LS02 · Grundlagen Finanzbuchhaltung",
      file: "pages/rewe_ls02.html", status: "fertig", updated: "28.06.2026",
      keywords: ["finanzbuchhaltung", "fibu", "jahresabschluss", "bilanz", "guv", "abschreibung", "afa", "gwg", "sammelposten", "fifo", "lifo", "rückstellung", "debitoren", "kreditoren"]
    },
    {
      id: "rewe_ls03", module: "rewe", title: "LS03 · Grundlagen KLR",
      file: "pages/rewe_ls03.html", status: "fertig", updated: "28.06.2026",
      keywords: ["klr", "selbstkosten", "deckungsbeitrag", "einzelkosten", "gemeinkosten", "fixkosten", "variable kosten", "fixkostendegression", "bab", "kostenartenrechnung", "kostenstellenrechnung", "kostenträgerrechnung"]
    },
    {
      id: "rewe_ls04", module: "rewe", title: "LS04 · Kostenartenrechnung",
      file: "pages/rewe_ls04.html", status: "fertig", updated: "28.06.2026",
      keywords: ["kostenartenrechnung", "einzelkosten", "gemeinkosten", "fixkosten", "variable kosten", "mittelwertverfahren", "istkosten", "normalkosten", "plankosten", "soll-ist-vergleich", "abweichungsanalyse"]
    },
    {
      id: "rewe_ls05", module: "rewe", title: "LS05 · Kostenstellenrechnung & BAB",
      file: "pages/rewe_ls05.html", status: "fertig", updated: "28.06.2026",
      keywords: ["kostenstellenrechnung", "kostenstelle", "bab", "betriebsabrechnungsbogen", "ilv", "innerbetriebliche leistungsverrechnung", "zuschlagssatz", "mgk", "fgk", "vwgk", "vtgk"]
    },
    {
      id: "rewe_ls06", module: "rewe", title: "LS06 · Kostenträgerrechnung & Kalkulation",
      file: "pages/rewe_ls06.html", status: "fertig", updated: "28.06.2026",
      keywords: ["kostenträger", "kalkulation", "zuschlagskalkulation", "selbstkosten", "barverkaufspreis", "bvp", "nvp", "zvp", "sek", "vorwärtskalkulation", "rückwärtskalkulation", "preisuntergrenze", "kpug", "lpug", "maschinenstundensatz", "handelskalkulation", "handelsspanne", "kalkulationszuschlag"]
    },
    {
      id: "rewe_ls07", module: "rewe", title: "LS07 · Voll- und Teilkostenrechnung",
      file: "pages/rewe_ls07.html", status: "fertig", updated: "29.06.2026",
      keywords: ["vollkostenrechnung", "teilkostenrechnung", "deckungsbeitrag", "stückdeckungsbeitrag", "proportionalisierungsfehler", "leerkosten", "break-even", "bep", "gewinnschwelle", "zusatzauftrag", "engpass", "relativer deckungsbeitrag", "fixkostenremanenz"]
    },
    {
      id: "rewe_ls08", module: "rewe", title: "LS08 · Auswertung betriebswirtschaftlicher Zahlen",
      file: "pages/rewe_ls08.html", status: "fertig", updated: "29.06.2026",
      keywords: ["kennzahlen", "bilanzanalyse", "verhältniszahlen", "bilanzaufbereitung", "eigenkapitalquote", "eigenkapitalrentabilität", "ekr", "gesamtkapitalrentabilität", "gkr", "umsatzrentabilität", "leverage-effekt", "berichtswesen", "standardbericht", "abweichungsbericht", "bedarfsbericht"]
    },
    {
      id: "rewe_ls09", module: "rewe", title: "LS09 · Planungsrechnung",
      file: "pages/rewe_ls09.html", status: "fertig", updated: "21.07.2026",
      keywords: ["planungsrechnung", "planungsebenen", "strategische planung", "taktische planung", "operative planung", "ergebnisplanung", "absatzplanung", "top-down", "bottom-up", "gegenstromverfahren", "regelkreis", "budgetierung", "budget", "zero-base-budgeting", "nullbasisbudgetierung"]
    },
    {
      id: "rewe_ls10", module: "rewe", title: "LS10 · Prozesskostenrechnung",
      file: "pages/rewe_ls10.html", status: "fertig", updated: "21.07.2026",
      keywords: ["prozesskostenrechnung", "pkr", "teilprozess", "hauptprozess", "kostentreiber", "lmi", "lmn", "leistungsmengeninduziert", "leistungsmengenneutral", "prozesskostensatz", "komplexitätsfalle", "cost driver", "warenstelle", "gemischte bezugsgrößen"]
    },
    {
      id: "rewe_ls11", module: "rewe", title: "LS11 · Kostenmanagement & Target Costing",
      file: "pages/rewe_ls11.html", status: "fertig", updated: "21.07.2026",
      keywords: ["kostenmanagement", "target costing", "zielkostenmanagement", "market into company", "zielpreis", "zielgewinn", "zielkosten", "zielkostenlücke", "zielkostenspaltung", "zielkostenindex", "komponenten-nutzen-matrix", "value control chart", "life cycle costing", "wertanalyse"]
    },
    {
      id: "rewe_ls12", module: "rewe", title: "LS12 · Plankostenrechnung",
      file: "pages/rewe_ls12.html", status: "fertig", updated: "21.07.2026",
      keywords: ["plankostenrechnung", "starre plankostenrechnung", "flexible plankostenrechnung", "plankostenverrechnungssatz", "sollkosten", "verrechnete plankosten", "preisabweichung", "verbrauchsabweichung", "beschäftigungsabweichung", "gesamtabweichung", "regelkreis", "gegensteuerung"]
    },

    // ── Finanzmanagement ─────────────────────────────────────
    {
      id: "finanz_ls01", module: "finanz", title: "LS01 · Investitionsrechnung",
      file: "pages/finanz_ls01.html", status: "fertig", updated: "03.07.2026",
      keywords: ["investition", "finanzierung", "investitionsarten", "statische verfahren", "dynamische verfahren", "kostenvergleichsrechnung", "kapitalwertmethode", "kapitalwert", "annuitätenmethode", "interner zinsfuß", "abzinsung", "aufzinsung", "wirtschaftliche nutzungsdauer", "amortisationsdauer"]
    },
    {
      id: "finanz_ls01_schema", module: "finanz", title: "LS01 · Komplettschema (A vs. B)",
      file: "pages/finanz_ls01_schema.html", status: "fertig", updated: "03.07.2026",
      keywords: ["komplettschema", "investitionsrechnung", "kostenvergleichsrechnung", "gewinnvergleichsrechnung", "rentabilitätsvergleich", "amortisationsvergleich", "kapitalwertmethode", "annuitätenmethode", "interner zinsfuß", "wirtschaftliche nutzungsdauer", "alternative a", "alternative b", "durchgehendes rechenbeispiel"]
    },
    {
      id: "finanz_ls02", module: "finanz", title: "LS02 · Finanzierung – Grundlagen & Kapitalbedarfsplanung",
      file: "pages/finanz_ls02.html", status: "fertig", updated: "03.07.2026",
      keywords: ["finanzierung", "kapitalbedarfsplanung", "kapitalbedarf", "anlagekapital", "umlaufkapital", "kumulative methode", "elektive methode", "lieferantenziel", "kapitalbindungsdauer", "bilanzgleichung", "investition und finanzierung"]
    },
    {
      id: "finanz_ls03", module: "finanz", title: "LS03 · Finanzierungsplanung, Fremd- und Eigenfinanzierung, Mezzanines Kapital",
      file: "pages/finanz_ls03.html", status: "fertig", updated: "03.07.2026",
      keywords: ["finanzierungsplanung", "magisches viereck", "liquidität", "rentabilität", "sicherheit", "unabhängigkeit", "fremdfinanzierung", "eigenfinanzierung", "mezzanine", "mezzanines kapital", "nachrangdarlehen", "partiarisches darlehen", "genussrechte", "wandelschuldverschreibung", "optionsschuldverschreibung", "stille beteiligung", "haftungsrisiko", "ausfallrisiko"]
    },
    {
      id: "finanz_ls04", module: "finanz", title: "LS04 · Sicherheiten und Leverage-Effekt",
      file: "pages/finanz_ls04.html", status: "fertig", updated: "03.07.2026",
      keywords: ["sicherheiten", "sicherungsnehmer", "sicherungsgeber", "bürgschaft", "ausfallbürgschaft", "selbstschuldnerische bürgschaft", "patronatserklärung", "avalkredit", "hypothek", "grundschuld", "verpfändung", "sicherungsübereignung", "eigentumsvorbehalt", "verlängerter eigentumsvorbehalt", "erweiterter eigentumsvorbehalt", "kontokorrentvorbehalt", "zession", "mantelzession", "globalzession", "leverage-effekt", "leverage-risk", "verschuldungsgrad", "eigenkapitalrentabilität", "gesamtkapitalrentabilität"]
    },
    {
      id: "finanz_ls05", module: "finanz", title: "LS05 · Liquiditätsplanung",
      file: "pages/finanz_ls05.html", status: "fertig", updated: "03.07.2026",
      keywords: ["liquidität", "liquiditätsplanung", "fristenkongruenz", "liquiditätsgrade", "barliquidität", "einzugsliquidität", "umsatzliquidität", "working capital", "anlagedeckungsgrad", "goldene bilanzregel", "eigenkapitalquote", "fremdkapitalquote", "verschuldungskoeffizient", "cashflow", "dynamischer liquiditätsplan", "zahlungsströme"]
    },
    {
      id: "finanz_ls05_schema", module: "finanz", title: "LS05 · Übungsaufgabe: Dynamischer Liquiditätsplan (Soll/Ist)",
      file: "pages/finanz_ls05_schema.html", status: "fertig", updated: "03.07.2026",
      keywords: ["dynamischer liquiditätsplan", "soll-ist-vergleich", "anfangsbestand", "schlussbestand", "einzahlungen", "auszahlungen", "kredittilgung", "kreditaufnahme", "kundenanzahlung", "übungsaufgabe liquidität"]
    },
    {
      id: "finanz_ls06", module: "finanz", title: "LS06 · Finanzierungsarten-Systematik",
      file: "pages/finanz_ls06.html", status: "fertig", updated: "03.07.2026",
      keywords: ["finanzierungsarten", "kapitalherkunft", "rechtsstellung", "fristigkeit", "anlässe", "innenfinanzierung", "außenfinanzierung", "eigenfinanzierung", "fremdfinanzierung", "kurzfristig", "mittelfristig", "langfristig", "unbefristet", "abschreibungsgegenwerte", "rückstellungen", "kontokorrentkredit", "orthogonale merkmale"]
    },
    {
      id: "finanz_ls07", module: "finanz", title: "LS07 · Innenfinanzierung",
      file: "pages/finanz_ls07.html", status: "fertig", updated: "03.07.2026",
      keywords: ["innenfinanzierung", "selbstfinanzierung", "offene selbstfinanzierung", "stille selbstfinanzierung", "stille reserven", "kapitalfreisetzungseffekt", "kapazitätserweiterungseffekt", "lohmann-ruchti", "rückstellungen", "kapitalfreistellung", "vermögensumschichtung", "sale-and-lease-back", "factoring", "umlaufvermögen"]
    },
    {
      id: "finanz_ls08", module: "finanz", title: "LS08 · Außenfinanzierung: Beteiligungen und Kredite",
      file: "pages/finanz_ls08.html", status: "fertig", updated: "03.07.2026",
      keywords: ["außenfinanzierung", "beteiligungsfinanzierung", "kapitalerhöhung", "ordentliche kapitalerhöhung", "genehmigte kapitalerhöhung", "bedingte kapitalerhöhung", "aktienarten", "stückaktien", "vinkulierte aktien", "kontokorrentkredit", "lieferantenkredit", "avalkredit", "wechselkredit", "skonto", "fälligkeitsdarlehen", "tilgungsdarlehen", "annuitätendarlehen", "kapitaldienst", "anleihen", "wandelschuldverschreibung", "optionsschuldverschreibung", "nullkuponanleihe", "gewinnschuldverschreibung"]
    },
    {
      id: "finanz_ls09", module: "finanz", title: "LS09 · Sonderformen: Factoring und Leasing",
      file: "pages/finanz_ls09.html", status: "fertig", updated: "03.07.2026",
      keywords: ["factoring", "faktor", "echtes factoring", "unechtes factoring", "offenes factoring", "stilles factoring", "delkredere", "leasing", "direktes leasing", "indirektes leasing", "operatives leasing", "finanzierungsleasing", "sale-and-lease-back", "40-90-regel", "grundmietzeit", "wirtschaftliches eigentum", "bmf-leasing-erlasse"]
    },

    // ── Recht und Steuern ────────────────────────────────────
    {
      id: "recht_ls01", module: "recht", title: "LS01 · Grundlagen des Rechts",
      file: "pages/recht_ls01.html", status: "fertig", updated: "29.06.2026",
      keywords: ["rechtsordnung", "öffentliches recht", "privatrecht", "rechtssubjekte", "rechtsfähigkeit", "geschäftsfähigkeit", "taschengeldparagraf", "deliktsfähigkeit", "rechtsgeschäfte", "willenserklärung", "stellvertretung", "formfreiheit", "nichtigkeit", "anfechtbarkeit", "irrtum", "arglistige täuschung"]
    },
    {
      id: "recht_ls02", module: "recht", title: "LS02 · Schuldrecht & AGB",
      file: "pages/recht_ls02.html", status: "fertig", updated: "29.06.2026",
      keywords: ["schuldrecht", "schuldverhältnis", "gläubiger", "schuldner", "vertragsfreiheit", "hauptleistungspflichten", "nebenpflichten", "schuldnerverzug", "mahnung", "unmöglichkeit", "annahmeverzug", "agb", "allgemeine geschäftsbedingungen", "überraschende klauseln", "treu und glauben", "gerichtsstand", "erfüllungsort", "holschuld", "schickschuld", "bringschuld"]
    },
    {
      id: "recht_ls03", module: "recht", title: "LS03 · Kaufvertrag & Vertragsarten",
      file: "pages/recht_ls03.html", status: "fertig", updated: "29.06.2026",
      keywords: ["kaufvertrag", "angebot", "annahme", "invitatio ad offerendum", "veränderte annahme", "trennungsprinzip", "abstraktionsprinzip", "verpflichtungsgeschäft", "verfügungsgeschäft", "eigentum", "besitz", "mietvertrag", "dienstvertrag", "werkvertrag", "darlehen", "leasing", "dienst vs. werk", "verbrauchsgüterkauf", "fernabsatz", "widerrufsrecht"]
    },
    {
      id: "recht_ls04", module: "recht", title: "LS04 · Körperschaftsteuer",
      file: "pages/recht_ls04.html", status: "fertig", updated: "30.06.2026",
      keywords: ["körperschaftsteuer", "kst", "kstg", "verdeckte gewinnausschüttung", "vga", "verdeckte einlage", "§ 8b kstg", "schachtelprivileg", "zinsschranke", "§ 8a kstg", "verlustabzug", "§ 8c kstg", "§ 8d kstg", "einlagekonto", "§ 27 kstg", "abgeltungsteuer", "teileinkünfteverfahren", "tev", "solidaritätszuschlag"]
    },
    {
      id: "recht_ls05", module: "recht", title: "LS05 · Gewerbesteuer",
      file: "pages/recht_ls05.html", status: "fertig", updated: "30.06.2026",
      keywords: ["gewerbesteuer", "gewst", "gewstg", "realsteuer", "gewerbeertrag", "hinzurechnung", "§ 8 gewstg", "kürzung", "§ 9 gewstg", "freibetrag", "hebesatz", "steuermesszahl", "zerlegung", "§ 28 gewstg", "arbeitslöhne", "§ 35 estg", "anrechnung"]
    },
    {
      id: "recht_ls06", module: "recht", title: "LS06 · Kapitalertragsteuer und Abgeltungsteuer",
      file: "pages/recht_ls06.html", status: "fertig", updated: "30.06.2026",
      keywords: ["kapitalertragsteuer", "kapest", "abgeltungsteuer", "sparerpauschbetrag", "freistellungsauftrag", "günstigerprüfung", "teileinkünfteverfahren", "tev", "§ 20 estg", "§ 17 estg", "verlustverrechnung", "aktientopf", "streubesitz", "§ 8b kstg"]
    },
    {
      id: "recht_ls07", module: "recht", title: "LS07 · Umsatzsteuer",
      file: "pages/recht_ls07.html", status: "fertig", updated: "30.06.2026",
      keywords: ["umsatzsteuer", "ust", "ustg", "mehrwertsteuer", "vorsteuerabzug", "vorsteuer", "reverse-charge", "§ 13b ustg", "kleinunternehmer", "§ 19 ustg", "innergemeinschaftliche lieferung", "leistungsort", "steuersatz", "regelsteuersatz", "ermäßigter steuersatz", "rechnung", "§ 14 ustg", "§ 15a ustg"]
    },
    {
      id: "recht_ls08", module: "recht", title: "LS08 · Weitere Steuerarten und AO",
      file: "pages/recht_ls08.html", status: "fertig", updated: "30.06.2026",
      keywords: ["grundsteuer", "grunderwerbsteuer", "grest", "erbschaftsteuer", "schenkungsteuer", "erbstg", "freibetrag", "abgabenordnung", "ao", "verwaltungsakt", "§ 118 ao", "bekanntgabe", "§ 122 ao", "4-tage-regel", "festsetzungsverjährung", "§ 169 ao", "einspruch", "§ 347 ao", "steuerhinterziehung", "§ 370 ao", "selbstanzeige", "§ 371 ao"]
    },

    // ── Betriebliches Management ─────────────────────────────
    {
      id: "bm_ls01", module: "bm", title: "LS01 · Strategische & operative Planungsgrundlagen",
      file: "pages/bm_ls01.html", status: "fertig", updated: "30.06.2026",
      keywords: ["unternehmensphilosophie", "leitbild", "unternehmenskultur", "mission", "vision", "corporate identity", "corporate design", "corporate communication", "corporate behavior", "planung", "regelkreis", "strategisch", "taktisch", "operativ", "zielsystem", "zielpyramide", "sachziele", "formalziele", "zielbeziehungen", "smart", "swot", "normstrategien"]
    },
    {
      id: "bm_ls01e", module: "bm", title: "LS01-E · Gegenstromverfahren & Zielsystem im Gleichgewicht (Ergänzung)",
      file: "pages/bm_ls01e.html", status: "fertig", updated: "30.06.2026",
      keywords: ["gegenstromverfahren", "top-down", "bottom-up", "zielsystem im gleichgewicht", "balanced scorecard", "smart", "finanzen kunden prozesse mitarbeiter"]
    },
    {
      id: "bm_ls02", module: "bm", title: "LS02 · Betriebliche Planungsprozesse & Betriebsstatistik",
      file: "pages/bm_ls02.html", status: "fertig", updated: "30.06.2026",
      keywords: ["betriebsstatistik", "planungsrechnung", "vergleichsrechnung", "zeitvergleich", "betriebsvergleich", "soll-ist-vergleich", "absolute kennzahlen", "verhältniskennzahlen", "abc-analyse", "xyz-analyse", "rentabilität", "eigenkapitalrentabilität", "gesamtkapitalrentabilität", "umsatzrentabilität", "roi", "du-pont", "produktivität", "wirtschaftlichkeit", "ausschussquote", "liquiditätsgrade", "goldene bilanzregel", "anlagendeckungsgrad", "eigenkapitalquote", "verschuldungsgrad"]
    },
    {
      id: "bm_ls03", module: "bm", title: "LS03 · Wissensmanagement im Betrieb",
      file: "pages/bm_ls03.html", status: "fertig", updated: "30.06.2026",
      keywords: ["wissensmanagement", "wissenswürfel", "implizites wissen", "explizites wissen", "individuelles wissen", "kollektives wissen", "strukturelles wissen", "wissensdomänen", "normativ strategisch operativ", "mentoring", "coaching", "dms", "dokumentenmanagementsystem", "lessons learned", "wissensbilanz", "wissenslandkarte", "storytelling", "wissensaudit"]
    },
    {
      id: "bm_ls04", module: "bm", title: "LS04 · Informationstechnologie im Betrieb",
      file: "pages/bm_ls04.html", status: "fertig", updated: "30.06.2026",
      keywords: ["informationstechnologie", "it-elemente", "hardware", "software", "wws", "warenwirtschaftssystem", "erp", "enterprise resource planning", "mis", "management-informationssystem", "data warehouse", "informationsquellen", "interne quellen", "externe quellen", "it-kosten", "it-risiken", "wordingart"]
    },

    // ── Unternehmensführung ──────────────────────────────────
    {
      id: "uf_ls01", module: "uf", title: "LS01 · Betriebliche Planungsprozesse",
      file: "pages/uf_ls01.html", status: "fertig", updated: "30.06.2026",
      keywords: ["unternehmen", "betrieb", "maximalprinzip", "minimalprinzip", "optimumprinzip", "zielsystem", "sachziele", "formalziele", "antinomisch", "smart", "gegenstromverfahren", "top-down", "bottom-up", "pdca", "deming-kreis", "regelkreis", "strategische planung", "operative planung", "porter", "kostenführerschaft", "differenzierung", "fokussierung", "ansoff-matrix", "diversifikation", "penetrationsstrategie", "skimming", "shareholder", "stakeholder", "corporate identity", "eisberg-modell", "schein", "ims", "integriertes managementsystem", "pest-analyse", "benchmarking", "swot", "produktlebenszyklus", "bcg-matrix"]
    },
    {
      id: "uf_ls02", module: "uf", title: "LS02 · Aufbauorganisation",
      file: "pages/uf_ls02.html", status: "fertig", updated: "30.06.2026",
      keywords: ["aufbauorganisation", "ablauforganisation", "organigramm", "aufgabenanalyse", "aufgabensynthese", "kosiol", "stelle", "instanz", "stabstelle", "abteilung", "leitungstiefe", "führungsspanne", "leitungsbreite", "steile pyramide", "flache pyramide", "funktionale organisation", "divisionale organisation", "spartenorganisation", "profit center", "regionale organisation", "einlinienorganisation", "stablinienorganisation", "mehrlinienorganisation", "matrixorganisation", "tensororganisation", "funktionendiagramm", "raci", "controlling", "marketingorganisation"]
    },
    {
      id: "uf_ls03", module: "uf", title: "LS03 · Ablauforganisation",
      file: "pages/uf_ls03.html", status: "fertig", updated: "30.06.2026",
      keywords: ["ablauforganisation", "arbeitsteilung", "taylorismus", "one best way", "akkordlohn", "job enlargement", "job enrichment", "agile arbeitsteilung", "scrum", "kanban", "arbeitsablaufdiagramm", "flussdiagramm", "swimlane", "funktionsband", "und-verzweigung", "oder-verzweigung", "gantt-diagramm", "henry gantt", "netzplantechnik", "vkn", "ekn", "anordnungsbeziehung", "aob", "normalfolge", "anfangsfolge", "endfolge", "sprungfolge", "faz", "fez", "saz", "sez", "gesamtpuffer", "freier puffer", "kritischer pfad", "vorwärtsrechnung", "rückwärtsrechnung"]
    },
    {
      id: "uf_ls04", module: "uf", title: "LS04 · Organisationsentwicklung",
      file: "pages/uf_ls04.html", status: "fertig", updated: "30.06.2026",
      keywords: ["organisationsentwicklung", "institutioneller begriff", "instrumentaler begriff", "funktionaler begriff", "unternehmensentwicklung", "change management", "vuka", "volatilität", "unsicherheit", "komplexität", "ambiguität", "bani", "brittle", "anxious", "non-linear", "incomprehensible", "raat", "resilience", "awareness", "adaptability", "transparency", "formale organisation", "informale organisation", "mintzberg", "strategiebrücke", "intendierte strategie", "realisierte strategie", "emergente strategie", "lewin", "unfreezing", "moving", "refreezing", "drei-phasen-modell", "widerstände", "rationale widerstände", "soziale widerstände", "emotionale widerstände", "innere kündigung", "lernende organisation", "peter senge", "systemdenken"]
    },
    {
      id: "uf_ls05", module: "uf", title: "LS05 · Analysemethoden",
      file: "pages/uf_ls05.html", status: "fertig", updated: "30.06.2026",
      keywords: ["kennzahlen", "kennzahlensystem", "eindimensional", "mehrdimensional", "du-pont-schema", "roi", "umsatzrentabilität", "kapitalumschlag", "balanced scorecard", "bsc", "kaplan norton", "finanzperspektive", "kundenperspektive", "prozessperspektive", "lern- und entwicklungsperspektive", "plankostenrechnung", "forecasting", "soll-ist-vergleich", "starre plankostenrechnung", "flexible plankostenrechnung", "grenzplankostenrechnung", "kano-modell", "basisanforderung", "leistungsanforderung", "begeisterungsanforderung", "kundennutzen", "primärmarktforschung", "sekundärmarktforschung", "befragung", "beobachtung", "experiment", "kundenwertanalyse", "betriebsstatistik", "balkendiagramm", "liniendiagramm", "flächendiagramm", "kreisdiagramm", "struktogramm"]
    },
    {
      id: "uf_ls06", module: "uf", title: "LS06 · Personalführung / Personalplanung / Personalbeschaffung",
      file: "pages/uf_ls06.html", status: "fertig", updated: "30.06.2026",
      keywords: ["personalführung", "führung", "strukturelle führung", "personale führung", "macht", "motivation", "maslow", "bedürfnispyramide", "selbstverwirklichung", "herzberg", "zwei-faktoren-theorie", "motivatoren", "hygienefaktoren", "glasl lievegoed", "führungsstile", "autoritär", "kooperativ", "laissez-faire", "situativer führungsstil", "reifegrad", "aufgabenorientierung", "mitarbeiterorientierung", "partizipationsorientierung", "grid-konzept", "managerial grid", "blake mouton", "führungstechniken", "management by objectives", "mbo", "management by exception", "mbe", "management by delegation", "mbd", "delegation", "gruppe", "team", "arbeitsgruppe", "projektgruppe", "tuckman", "forming", "storming", "norming", "performing", "adjourning", "belbin", "laterale führung", "geteilte führung", "virtuelle teams", "gruppenkohäsion", "gruppenkonvergenz", "groupthink", "personalplanung", "bedarfsplanung", "beschaffungsplanung", "nettopersonalbedarf", "personalbeschaffung", "interne beschaffung", "externe beschaffung", "6 r der logistik", "assessment-center", "entgeltformen", "zeitlohn", "akkordlohn", "prämienlohn", "ergänzungslohn", "potenziallohn"]
    },
    {
      id: "uf_ls07", module: "uf", title: "LS07 · Personalentwicklung",
      file: "pages/uf_ls07.html", status: "fertig", updated: "30.06.2026",
      keywords: ["personalentwicklung", "anforderungsprofil", "eignungsprofil", "entwicklungslücke", "aufstiegsfortbildung", "anpassungsfortbildung", "erweiterungsfortbildung", "erhaltungsfortbildung", "bedarfsanalyse", "zielformulierung", "maßnahmenplanung", "evaluation", "potenzialanalyse", "kompetenzkategorien", "fachkompetenz", "führungskompetenz", "methodenkompetenz", "sozialkompetenz", "wertewahrnehmung", "personalportfolio", "leistungsträger", "potenzialträger", "routinekraft", "problemfall", "on the job", "off the job", "job rotation", "hospitation", "coaching", "mentoring", "projektlernen", "seminare", "supervision", "fachkonferenzen", "karriereplanung", "leistungsgerechtigkeit", "anforderungsgerechtigkeit", "sozialgerechtigkeit"]
    },

    // ── Volks- und Betriebswirtschaft ────────────────────────
    {
      id: "vwlbwl_ls01", module: "vwlbwl", title: "LS01 · Grundlagen der VWL",
      file: "pages/vwlbwl_ls01.html", status: "fertig", updated: "30.06.2026",
      keywords: ["vwl", "bwl", "volkswirtschaftslehre", "betriebswirtschaftslehre", "makroökonomie", "mikroökonomie", "wirtschaftssubjekte", "wirtschaftskreislauf", "private haushalte", "unternehmen", "staat", "ausland", "bedürfnis", "bedarf", "nachfrage", "bedürfniskette", "maslow", "bedürfnispyramide", "güterarten", "knappe güter", "freie güter", "materielle güter", "immaterielle güter", "konsumgüter", "investitionsgüter", "komplementäre güter", "substitutive güter", "inferiore güter", "superiore güter", "kollektive güter", "produktionsfaktoren", "arbeit", "boden", "kapital", "originär", "derivativ", "minimalprinzip", "maximalprinzip", "extremalprinzip", "optimumprinzip", "markt", "angebot", "nachfrage", "preisbildung", "gütermarkt", "faktormarkt", "preis-mengen-diagramm", "gleichgewichtspreis", "angebotsüberhang", "nachfrageüberhang", "preiselastizität", "kreuzpreiselastizität", "marktformen", "monopol", "oligopol", "polypol", "monopson", "vollkommener markt", "unvollkommener markt", "käufermarkt", "verkäufermarkt", "marktpreisfunktionen", "signalfunktion", "ausgleichsfunktion", "allokationsfunktion", "lenkungsfunktion", "selektionsfunktion", "sanktionsfunktion", "konsumentenrente", "produzentenrente"]
    },
    {
      id: "vwlbwl_ls02", module: "vwlbwl", title: "LS02 · Wettbewerb, Kartellrecht & Staatliche Eingriffe",
      file: "pages/vwlbwl_ls02.html", status: "fertig", updated: "30.06.2026",
      keywords: ["wettbewerb", "ruinöser wettbewerb", "leistungswettbewerb", "cournotscher punkt", "wettbewerbspolitik", "kartellrecht", "uwg", "gwb", "kartell", "kartellarten", "preiskartell", "submissionskartell", "gebietskartell", "quotenkartell", "rabattkartell", "importkartell", "exportkartell", "bundeskartellamt", "fusionskontrolle", "missbrauchsaufsicht", "ausbeutungsmissbrauch", "behinderungsmissbrauch", "wirtschaftsordnungen", "freie marktwirtschaft", "soziale marktwirtschaft", "zentralverwaltungswirtschaft", "nachtwächterstaat", "marktkonform", "marktkonträr", "subventionen", "zölle", "mindestpreis", "höchstpreis", "festpreis", "angebotsüberhang", "nachfrageüberhang", "marktversagen", "externe effekte", "öffentliche güter", "informationsasymmetrie", "trittbrettfahrerproblem"]
    },
    {
      id: "vwlbwl_ls03", module: "vwlbwl", title: "LS03 · Konjunktur, Stabilitätspolitik & Geldpolitik",
      file: "pages/vwlbwl_ls03.html", status: "fertig", updated: "30.06.2026",
      keywords: ["konjunktur", "stabilitätspolitik", "geldpolitik", "wirtschaftswunder", "währungsreform", "marshallplan", "walter eucken", "ordoliberalismus", "ludwig erhard", "hyperinflation 1923", "stabilitätsgesetz", "stabg", "magisches viereck", "magisches sechseck", "preisniveaustabilität", "vollbeschäftigung", "außenwirtschaftliches gleichgewicht", "wirtschaftswachstum", "zielkonflikte", "konjunkturzyklus", "konjunkturphasen", "aufschwung", "boom", "hochkonjunktur", "abschwung", "rezession", "depression", "frühindikator", "spätindikator", "ifo-geschäftsklimaindex", "arbeitslosenquote", "erwerbspersonen", "erwerbstätige", "saisonale arbeitslosigkeit", "friktionelle arbeitslosigkeit", "konjunkturelle arbeitslosigkeit", "strukturelle arbeitslosigkeit", "inflation", "deflation", "quantitätsgleichung", "fisher", "geldmenge", "nachfrageinflation", "angebotsinflation", "geldmengeninflation", "inflationsrate", "verbraucherpreisindex", "vpi", "warenkorb", "fiskalpolitik", "finanzpolitik", "expansive fiskalpolitik", "restriktive fiskalpolitik", "deficit spending", "john maynard keynes", "antizyklisch", "crowding-out"]
    },
    {
      id: "vwlbwl_ls04", module: "vwlbwl", title: "LS04 · Geldpolitik & monetäre Grundlagen",
      file: "pages/vwlbwl_ls04.html", status: "fertig", updated: "30.06.2026",
      keywords: ["geld", "geldfunktionen", "tauschmittelfunktion", "rechenfunktion", "wertaufbewahrungsfunktion", "geldmenge", "m1", "m2", "m3", "liquiditätsgrade", "ezb", "umlaufgeschwindigkeit", "quantitätsgleichung", "fisher", "nachfrageorientierte politik", "angebotsorientierte politik", "keynes", "monetarismus", "milton friedman", "deficit spending", "multiplikatoreffekt", "crowding-out-effekt", "wirtschaftswachstum", "bestimmungsfaktoren", "außenbeitrag", "einkommensverteilung", "leistungsgerecht", "bedarfsgerecht", "nivellierung", "zielkonflikt", "leistungsanreiz"]
    },
    {
      id: "vwlbwl_ls05", module: "vwlbwl", title: "LS05 · EZB-Instrumente & Transmissionsmechanismus",
      file: "pages/vwlbwl_ls05.html", status: "fertig", updated: "30.06.2026",
      keywords: ["ezb", "transmissionsmechanismus", "leitzins", "geschäftsbanken", "geldschöpfung", "kreditvergabe", "offenmarktgeschäfte", "tenderverfahren", "mengentender", "zinstender", "mindestreserve", "ständige fazilitäten", "spitzenrefinanzierungsfazilität", "einlagefazilität", "zinskorridor", "quantitative easing", "qe", "wirkungsmatrix", "investitionsfalle", "internationale finanzströme", "lohn-preis-spirale", "ezb-unabhängigkeit", "expansiv", "restriktiv"]
    },
    {
      id: "vwlbwl_ls06", module: "vwlbwl", title: "LS06 · Außenwirtschaft",
      file: "pages/vwlbwl_ls06.html", status: "fertig", updated: "30.06.2026",
      keywords: ["außenwirtschaft", "außenhandel", "internationale arbeitsteilung", "komparative kostenvorteile", "kommerzielle risiken", "politische risiken", "wechselkursrisiken", "embargo", "freihandel", "protektionismus", "tarifäre maßnahmen", "nicht-tarifäre maßnahmen", "importzölle", "exportsubventionen", "importkontingente", "globalisierung", "lieferketten", "europäische union", "binnenmarkt", "grundfreiheiten", "warenverkehr", "personenverkehr", "dienstleistungsverkehr", "kapitalverkehr", "schengen", "währungsunion", "ezb", "maastricht-kriterien", "konvergenzkriterien", "haushaltsdefizit", "staatsverschuldung", "ews ii", "wechselkursstabilität"]
    },
    {
      id: "vwlbwl_ls07", module: "vwlbwl", title: "LS07 · Betriebliche Funktionen",
      file: "pages/vwlbwl_ls07.html", status: "fertig", updated: "01.07.2026",
      keywords: ["betriebliche funktionen", "produktion", "logistik", "marketing", "rechnungswesen", "finanzierung", "investition", "controlling", "personal", "pps", "produktionsplanung", "sachziel", "formalziel", "humanziel", "fertigungsart", "einzelfertigung", "serienfertigung", "massenfertigung", "sortenfertigung", "chargenfertigung", "verbundfertigung", "7r logistik", "supply chain", "lieferkette", "4p", "marketingmix", "produktpolitik", "kontrahierungspolitik", "distributionspolitik", "kommunikationspolitik", "klr", "bab", "betriebsabrechnungsbogen", "einzelkosten", "gemeinkosten", "fixkosten", "variable kosten", "innenfinanzierung", "außenfinanzierung", "eigenkapital", "fremdkapital", "leasing", "factoring", "selbstfinanzierung", "soll-ist-vergleich", "piks", "controlling-kreislauf", "personalaufgaben", "personalplanung"]
    },
    {
      id: "vwlbwl_ls08", module: "vwlbwl", title: "LS08 · Existenzgründung & Rechtsformen",
      file: "pages/vwlbwl_ls08.html", status: "fertig", updated: "01.07.2026",
      keywords: ["existenzgründung", "gründung", "gründungsprozess", "5 phasen", "vorgründungsphase", "gründungsphase", "nachgründungsphase", "geschäftsidee", "marktanalyse", "businessplan", "gewerbeanmeldung", "handelsregister", "finanzamt", "berufsgenossenschaft", "rechtsformwahl", "rechtsformen", "einzelunternehmen", "einzelkaufmann", "freiberufler", "kleingewerbe", "personengesellschaft", "gbr", "ohg", "kg", "komplementär", "kommanditist", "sperrminorität", "partg", "kapitalgesellschaft", "ug", "gmbh", "ag", "kgaa", "se", "mindestkapital", "haftung", "körperschaftsteuer", "einkommensteuer", "publizitätspflicht", "bundesanzeiger", "organe", "geschäftsführer", "vorstand", "aufsichtsrat", "gesellschafterversammlung", "hauptversammlung", "swot", "finanzplan", "liquidität", "gründungsrisiken", "fördermittel", "kfw"]
    },
    {
      id: "vwlbwl_ls09", module: "vwlbwl", title: "LS09 · Unternehmenszusammenschlüsse",
      file: "pages/vwlbwl_ls09.html", status: "fertig", updated: "01.07.2026",
      keywords: ["unternehmenszusammenschluss", "kooperation", "konzentration", "einheitliche leitung", "selbstständigkeit", "rechtliche selbstständigkeit", "wirtschaftliche selbstständigkeit", "joint venture", "arbeitsgemeinschaft", "arge", "konsortium", "interessengemeinschaft", "gelegenheitsgesellschaft", "horizontal", "vertikal", "diagonal", "lateral", "kartell", "preiskartell", "produktionskartell", "gebietskartell", "submissionskartell", "gwb", "art 101 aeuv", "bundeskartellamt", "wettbewerbsbeschränkung", "fusion", "verschmelzung", "verschmelzung durch aufnahme", "verschmelzung durch neugründung", "konzern", "unterordnungskonzern", "gleichordnungskonzern", "beteiligung", "minderheitsbeteiligung", "mehrheitsbeteiligung", "sperrminorität", "tochtergesellschaft", "economies of scale", "synergie", "marktmacht"]
    },
    // ── Basics Wirtschaftsrechnen ────────────────────────────
    {
      id: "basics_ls01", module: "basics", title: "LS01 · Dreisatz – Bruchstrichmethode",
      file: "pages/basics_ls01.html", status: "fertig", updated: "01.07.2026",
      keywords: ["dreisatz", "bruchstrichmethode", "proportional", "antiproportional", "zusammengesetzter dreisatz", "logik-frage", "startwert", "zielwert", "je mehr desto mehr", "je mehr desto weniger", "kürzen", "probe", "zinsformel", "rechenweg", "mathematik"]
    },
    {
      id: "basics_ls02", module: "basics", title: "LS02 · Durchschnittsrechnung",
      file: "pages/basics_ls02.html", status: "fertig", updated: "01.07.2026",
      keywords: ["durchschnittsrechnung", "einfacher durchschnitt", "gewichteter durchschnitt", "gleitender durchschnitt", "zeitlich gewichteter durchschnitt", "arithmetisches mittel", "gesamtkosten", "gesamtmenge", "lagerbewertung", "durchschnittspreis", "lagerbestand", "kontostand", "trendanalyse", "zeitfenster", "zentrierung", "gewicht", "prüfungsverfahren", "stundenlohn"]
    },
    {
      id: "basics_ls03", module: "basics", title: "LS03 · Buchungskreislauf EBK–SBK",
      file: "pages/basics_ls03.html", status: "fertig", updated: "01.07.2026",
      keywords: ["buchungskreislauf", "ebk", "sbk", "eröffnungsbilanzkonto", "schlussbilanzkonto", "buchungssatz", "soll", "haben", "aktivkonto", "passivkonto", "bestandskonto", "erfolgskonto", "aufwandskonto", "ertragskonto", "guv", "gewinn- und verlustkonto", "eigenkapital", "aktivtausch", "passivtausch", "aktiv-passiv-mehrung", "aktiv-passiv-minderung", "bilanzveränderung", "inventur", "inventar", "eröffnungsbilanz", "schlussbilanz", "umsatzsteuer", "buchführung", "laufende buchungen"]
    },
    {
      id: "basics_ls04", module: "basics", title: "LS04 · Die Umsatzsteuer im Buchungskreislauf",
      file: "pages/basics_ls04.html", status: "fertig", updated: "01.07.2026",
      keywords: ["umsatzsteuer", "vorsteuer", "ust", "vst", "erfolgsneutralität", "treuhänder", "zahllast", "vorsteuerüberhang", "verrechnung", "skonto", "gewährte skonti", "erlösschmälerung", "netto", "brutto", "aufwandsorientiert", "bestandsorientiert", "rohstoffe", "umsatzerlöse", "forderungen a. ll", "verbindlichkeiten a. ll"]
    },
    {
      id: "basics_ls05", module: "basics", title: "LS05 · Geringwertige Wirtschaftsgüter (GWG) – Abschreibung",
      file: "pages/basics_ls05.html", status: "fertig", updated: "01.07.2026",
      keywords: ["gwg", "geringwertige wirtschaftsgüter", "sofortabschreibung", "sammelposten", "planmäßige abschreibung", "afa", "wertgrenzen", "§6 abs. 2 estg", "§6 abs. 2a estg", "nettowert", "anlagevermögen", "beweglich", "selbständig nutzungsfähig", "abnutzbar", "nutzungsdauer", "abschreibung"]
    },
    {
      id: "basics_ls06", module: "basics", title: "LS06 · Bezugskosten im Beschaffungsbereich",
      file: "pages/basics_ls06.html", status: "fertig", updated: "01.07.2026",
      keywords: ["bezugskosten", "anschaffungsnebenkosten", "§255 hgb", "frachtkosten", "rollgelder", "transportversicherung", "zölle", "bestandsorientiert", "aufwandsorientiert", "kontenklasse 2", "kontenklasse 6", "unterkonto", "hauptkonto", "beschaffung", "spediteur"]
    },
    {
      id: "basics_ls07", module: "basics", title: "LS07 · Privatkonten im Rechnungswesen",
      file: "pages/basics_ls07.html", status: "fertig", updated: "01.07.2026",
      keywords: ["privatkonten", "privatentnahme", "privateinlage", "trennungsprinzip", "eigenkapital", "geldentnahme", "sachentnahme", "nutzungsentnahme", "leistungsentnahme", "entnahme von gegenständen", "unentgeltliche wertabgabe", "teilwert", "einkommensteuer", "gewerbesteuer", "kirchensteuer", "personensteuer", "erfolgsneutral"]
    },
    {
      id: "basics_ls08", module: "basics", title: "LS08 · Absatz: Nachlässe und Anzahlungen",
      file: "pages/basics_ls08.html", status: "fertig", updated: "01.07.2026",
      keywords: ["absatz", "nachlass", "rabatt", "sofortrabatt", "nachträglicher rabatt", "mengenrabatt", "treuerabatt", "kundenskonto", "gewährte skonti", "erlösschmälerung", "erhaltene anzahlungen", "anzahlung", "umsatzsteuerkorrektur", "realisationsprinzip", "schlussrechnung", "verrechnung"]
    },
    {
      id: "basics_ls09", module: "basics", title: "LS09 · Leasing im Rechnungswesen",
      file: "pages/basics_ls09.html", status: "fertig", updated: "01.07.2026",
      keywords: ["leasing", "leasingnehmer", "leasinggeber", "wirtschaftliches eigentum", "rechtliches eigentum", "operating-leasing", "spezial-leasing", "finanzierungs-leasing", "grundmietzeit", "40-90 prozent regel", "aktivierung", "verbindlichkeiten aus leasing", "zinsanteil", "tilgungsanteil"]
    },
    {
      id: "basics_ls10", module: "basics", title: "LS10 · Darlehen und Disagio – Buchung und Abgrenzung",
      file: "pages/basics_ls10.html", status: "fertig", updated: "01.07.2026",
      keywords: ["darlehen", "disagio", "damnum", "tilgung", "zinsaufwand", "arap", "aktiver rechnungsabgrenzungsposten", "verbindlichkeiten ggü. kreditinstituten", "zusammengesetzter buchungssatz", "erfolgsneutral", "auflösung arap"]
    },
    {
      id: "basics_ls11", module: "basics", title: "LS11 · Grundlagen des Jahresabschlusses (HGB)",
      file: "pages/basics_ls11.html", status: "fertig", updated: "01.07.2026",
      keywords: ["jahresabschluss", "hgb", "bilanz", "guv", "gewinn- und verlustrechnung", "jahresüberschuss", "jahresfehlbetrag", "inventur", "inventar", "aufstellungsfrist", "offenlegungsfrist", "vorsichtsprinzip", "niederstwertprinzip", "höchstwertprinzip", "imparitätsprinzip", "anschaffungswertprinzip", "transitorisch", "antizipativ", "ara", "pra", "rechnungsabgrenzungsposten", "rückstellungen", "sbk"]
    },
    {
      id: "basics_ls12", module: "basics", title: "LS12 · Kosten-Leistungsrechnung (KLR) – Grundlagen",
      file: "pages/basics_ls12.html", status: "fertig", updated: "01.07.2026",
      keywords: ["klr", "kosten-leistungsrechnung", "fibu", "rechnungskreis", "abgrenzungsrechnung", "neutrale aufwendungen", "neutrale erträge", "kalkulatorische kosten", "anderskosten", "zusatzkosten", "kalkulatorische abschreibung", "kalkulatorische zinsen", "kalkulatorischer unternehmerlohn", "kalkulatorische miete", "kalkulatorische wagnisse", "kostenartenrechnung", "kostenstellenrechnung", "kostenträgerrechnung", "bab", "einzelkosten", "gemeinkosten", "fixe kosten", "variable kosten", "fixkostendegression"]
    },
    {
      id: "basics_ls13", module: "basics", title: "LS13 · Bewertungsgrundsätze nach § 252 HGB",
      file: "pages/basics_ls13.html", status: "fertig", updated: "01.07.2026",
      keywords: ["bewertungsgrundsätze", "§252 hgb", "bilanzidentität", "going-concern", "unternehmensfortführung", "einzelbewertung", "saldierungsverbot", "stichtagsbezogenheit", "wertaufhellend", "wertbegründend", "vorsichtsprinzip", "realisationsprinzip", "imparitätsprinzip", "niederstwertprinzip", "höchstwertprinzip", "periodenabgrenzung", "arap", "bewertungsstetigkeit", "gläubigerschutz", "gob"]
    },
    {
      id: "basics_ls14", module: "basics", title: "LS14 · Bilanzanalyse & Bilanzkritik",
      file: "pages/basics_ls14.html", status: "fertig", updated: "01.07.2026",
      keywords: ["bilanzanalyse", "bilanzkritik", "strukturbilanz", "analysenbilanz", "anlagenintensität", "eigenkapitalquote", "anlagendeckungsgrad", "goldene bilanzregel", "fristenkongruenz", "liquidität 2. grades", "liquidität 3. grades", "current ratio", "window dressing", "bilanzkosmetik", "stille reserven", "bewertungswahlrechte", "bilanzgewinn", "vermögenslage", "finanzlage", "ertragslage", "interne bilanzanalyse", "externe bilanzanalyse"]
    },
    {
      id: "basics_ls15", module: "basics", title: "LS15 · GuV-Auswertung & Kennzahlenanalyse",
      file: "pages/basics_ls15.html", status: "fertig", updated: "01.07.2026",
      keywords: ["guv-auswertung", "kennzahlenanalyse", "lagerumschlag", "forderungsumschlag", "kapitalumschlag", "eigenkapitalrentabilität", "gesamtkapitalrentabilität", "leverage-effekt", "ebit", "ebitda", "cashflow", "jahresüberschuss", "rentabilität", "liquidität", "stabilität", "profit is an opinion cash is a fact"]
    },
    {
      id: "basics_ls16", module: "basics", title: "LS16 · Prozentrechnen – Grundlagen & Prüfungsrelevanz",
      file: "pages/basics_ls16.html", status: "fertig", updated: "01.07.2026",
      keywords: ["prozentrechnen", "grundwert", "prozentsatz", "prozentwert", "im hundert", "auf hundert", "rückwärtsrechnen", "faktor-weg", "skontoabzug", "rabattgewährung", "provisionsabrechnung", "brutto-netto-rechnung", "mieterhöhung", "erhöht um", "erhöht auf", "bezugsbasis"]
    },
    {
      id: "basics_ls17", module: "basics", title: "LS17 · Zinsrechnung – Von den Grundlagen zum Zinseszins",
      file: "pages/basics_ls17.html", status: "fertig", updated: "01.07.2026",
      keywords: ["zinsrechnung", "zinsen", "zinseszins", "kapital", "zinssatz", "aufzinsungsfaktor", "herzstückformel", "jahreszinsen", "monatszinsen", "tageszinsen", "unterjährige verzinsung", "30/360", "act/360", "act/act", "kaufmännische zinsformel", "euro-zinsformel", "bgb-zinsformel", "verzugszinsen", "formeln umstellen", "bruchstrich", "einzeiler", "linearisierung", "taschenrechner"]
    },
    {
      id: "basics_ls18", module: "basics", title: "LS18 · Darlehenstilgung – Grundlagen & Prüfungsrelevanz",
      file: "pages/basics_ls18.html", status: "fertig", updated: "01.07.2026",
      keywords: ["darlehenstilgung", "zins vs. tilgung", "ratentilgung", "abzahlungsdarlehen", "annuitätentilgung", "annuitätendarlehen", "annuitätenfaktor", "kapitalwiedergewinnungsfaktor", "restschuld", "tilgungsplan", "rate", "annuität", "endfälliges darlehen", "liquiditätsabfluss", "zinsaufwand"]
    },
    {
      id: "basics_ls19", module: "basics", title: "LS19 · Rentenrechnung – Von den Grundlagen zur Prüfungsrelevanz",
      file: "pages/basics_ls19.html", status: "fertig", updated: "01.07.2026",
      keywords: ["rentenrechnung", "rentenbarwert", "rentenendwert", "barwert", "endwert", "nachschüssig", "vorschüssig", "ewige rente", "unterjährige verzinsung", "periodenzinssatz", "aufzinsen", "abzinsen", "zeitwert des geldes", "kapitalwert", "leasingrate", "sparrate"]
    },
    {
      id: "basics_ls20", module: "basics", title: "LS20 · Mathematische Grundlagen – Das Fundament für die IHK-Prüfung",
      file: "pages/basics_ls20.html", status: "fertig", updated: "01.07.2026",
      keywords: ["mathematische grundlagen", "klapps-regel", "klammern", "punkt vor strich", "distributivgesetz", "variablen", "break-even-analyse", "formeln umstellen", "äquivalenzumformung", "gegenoperationen", "potenzieren", "radizieren", "wurzelziehen", "zinseszins", "rundungsfehler", "zinsfaktor"]
    },
  ]
};
