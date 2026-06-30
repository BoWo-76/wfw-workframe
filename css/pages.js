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
      file: "pages/rewe_ls09.html", status: "fertig", updated: "29.06.2026",
      keywords: ["planungsrechnung", "planungsebenen", "strategische planung", "taktische planung", "operative planung", "ergebnisplanung", "absatzplanung", "top-down", "bottom-up", "gegenstromverfahren", "regelkreis", "abweichungsanalyse", "budgetierung", "budget"]
    },

    // ── Finanzmanagement ─────────────────────────────────────
    {
      id: "finanz_ls01", module: "finanz", title: "LS01 · Investitionsrechnung",
      file: "pages/finanz_ls01.html", status: "fertig", updated: "29.06.2026",
      keywords: ["investition", "finanzierung", "investitionsarten", "statische verfahren", "dynamische verfahren", "kostenvergleichsrechnung", "kapitalwertmethode", "kapitalwert", "annuitätenmethode", "interner zinsfuß", "abzinsung", "aufzinsung", "wirtschaftliche nutzungsdauer", "amortisationsdauer"]
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
  ]
};
