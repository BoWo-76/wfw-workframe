// ============================================================
// WIKI KONFIGURATION — zentrale Steuerdatei
// Neue Seite hinzufügen = neuen Eintrag hier ergänzen.
// Alles andere (Startseite, Sidebar, Suche) aktualisiert sich automatisch.
// ============================================================

const WIKI_CONFIG = {

  title: "WFW Wiki",
  subtitle: "IHK Wirtschaftsfachwirt · Lernunterlagen",
  brand: "WFW",
  footer: "IHK Wirtschaftsfachwirt · Nur für internen Gebrauch",

  modules: [
    { id: "rewe", label: "Rechnungswesen", icon: "🧮", color: "#B42318" },
  ],

  pages: [

    // ── Rechnungswesen ───────────────────────────────────────
    {
      id: "rewe_ls01",
      module: "rewe",
      title: "LS01 · Grundlagen Rechnungswesen",
      file: "pages/rewe_ls01.html",
      status: "fertig",
      updated: "28.06.2026",
      keywords: ["kaufmann", "istkaufmann", "formkaufmann", "kannkaufmann", "scheinkaufmann", "prokura", "durchgriffshaftung", "rechnungswesen", "rewe", "finanzbuchhaltung", "klr", "kosten", "leistung", "aufwand", "ertrag", "gob", "buchführungspflicht", "aufbewahrungsfristen", "wirtschaftlichkeit", "rentabilität", "produktivität", "imparitätsprinzip", "realisationsprinzip", "konstitutiv", "deklaratorisch", "eur", "hgb", "241a", "break-even"]
    },
    {
      id: "rewe_ls02",
      module: "rewe",
      title: "LS02 · Grundlagen Finanzbuchhaltung",
      file: "pages/rewe_ls02.html",
      status: "fertig",
      updated: "28.06.2026",
      keywords: ["finanzbuchhaltung", "fibu", "grundbuch", "hauptbuch", "nebenbuch", "jahresabschluss", "bilanz", "guv", "anhang", "bilanzansatz", "bilanzbewertung", "going concern", "niederstwertprinzip", "höchstwertprinzip", "anschaffungskosten", "abschreibung", "afa", "linear", "degressiv", "leistungsabschreibung", "gwg", "geringwertige wirtschaftsgüter", "sammelposten", "fifo", "lifo", "hifo", "bewertungsvereinfachung", "skonto", "rückstellung", "verbindlichkeit", "periodenfremder aufwand", "übergangsjahr", "debitoren", "kreditoren", "festwert", "gruppenbewertung", "durchschnittsbewertung"]
    },

    {
      id: "rewe_ls03",
      module: "rewe",
      title: "LS03 · Grundlagen KLR",
      file: "pages/rewe_ls03.html",
      status: "fertig",
      updated: "28.06.2026",
      keywords: ["klr", "kosten- und leistungsrechnung", "selbstkosten", "deckungsbeitrag", "wirtschaftlichkeit", "angebotspreis", "einzelkosten", "gemeinkosten", "fixkosten", "variable kosten", "fixkostendegression", "bab", "proportional", "degressiv", "progressiv", "neutraler aufwand", "zusatzkosten", "anderskosten", "grundkosten", "zweckaufwand", "kalkulatorischer unternehmerlohn", "kalkulatorische abschreibung", "wiederbeschaffungswert", "absatzleistung", "lagerleistung", "innerbetriebliche leistung", "bestandserhöhung", "kostenartenrechnung", "kostenstellenrechnung", "kostenträgerrechnung"]
    },

    {
      id: "rewe_ls04",
      module: "rewe",
      title: "LS04 · Kostenartenrechnung",
      file: "pages/rewe_ls04.html",
      status: "fertig",
      updated: "28.06.2026",
      keywords: ["kostenartenrechnung", "kostengliederung", "einzelkosten", "gemeinkosten", "fixkosten", "variable kosten", "fixkostendegression", "proportionale kosten", "degressive kosten", "progressive kosten", "sprungfixe kosten", "intervall-fixe kosten", "mittelwertverfahren", "gewogener mittelwert", "gleitender mittelwert", "arithmetischer mittelwert", "lagerkarteikarte", "istkosten", "normalkosten", "plankosten", "istkostenrechnung", "normalkostenrechnung", "plankostenrechnung", "soll-ist-vergleich", "abweichungsanalyse", "kapazitätsgrenze", "stückkosten", "bab", "betriebsabrechnungsbogen"]
    },

  ]
};
