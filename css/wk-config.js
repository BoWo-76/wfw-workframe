// ============================================================
// WERKZEUGKASTEN KONFIGURATION
// Pflege: nur diese Datei — keine Änderungen in wk-engine.js nötig
// Neue Tools: Eintrag in "tools" + PNG-Dateien in images/wk/ ablegen
// ============================================================

const WK_CONFIG = {

  gruppen: [

    // ── WK I · MANAGEMENT- & ANALYSEMETHODEN ─────────────────
    {
      id:    "wk1",
      label: "WK I · Management- & Analysemethoden",
      icon:  "🔧",
      kategorien: [
        {
          label: null, // kein Trennlabel für Übersicht
          tools: [
            {
              id: "wk1_uebersicht",
              label: "Gesamtübersicht WK I",
              icon: "≡",
              seiten: ["images/wk/wk_uebersicht_1.PNG"]
            }
          ]
        },
        {
          label: "Ursachenanalyse",
          tools: [
            { id: "wk1_ishikawa",      label: "Ishikawa-Diagramm", seiten: ["images/wk/wk1_ishikawa_s1.PNG",       "images/wk/wk1_ishikawa_s2.PNG"] },
            { id: "wk1_5why",          label: "5-Why-Methode",     seiten: ["images/wk/wk1_5why_s1.PNG",            "images/wk/wk1_5why_s2.PNG"] }
          ]
        },
        {
          label: "Prozessverbesserung",
          tools: [
            { id: "wk1_pdca",          label: "PDCA-Zyklus",       seiten: ["images/wk/wk1_pdca_s1.PNG",            "images/wk/wk1_pdca_s2.PNG"] },
            { id: "wk1_pareto_analyse",label: "Pareto-Analyse",    seiten: ["images/wk/wk1_pareto_analyse_s1.PNG",   "images/wk/wk1_pareto_analyse_s2.PNG"] },
            { id: "wk1_fmea",          label: "FMEA",              seiten: ["images/wk/wk1_fmea_s1.PNG",            "images/wk/wk1_fmea_s2.PNG"] }
          ]
        },
        {
          label: "Priorisierung",
          tools: [
            { id: "wk1_abc",           label: "ABC-Analyse",       seiten: ["images/wk/wk1_abc_s1.PNG",             "images/wk/wk1_abc_s2.PNG"] },
            { id: "wk1_pareto_prinzip",label: "Pareto-Prinzip",    seiten: ["images/wk/wk1_pareto_prinzip_s1.PNG",   "images/wk/wk1_pareto_prinzip_s2.PNG"] }
          ]
        },
        {
          label: "Strategie & Analyse",
          tools: [
            { id: "wk1_swot",          label: "SWOT-Analyse",      seiten: ["images/wk/wk1_swot_s1.PNG",            "images/wk/wk1_swot_s2.PNG"] },
            { id: "wk1_benchmarking",  label: "Benchmarking",      seiten: ["images/wk/wk1_benchmarking_s1.PNG",    "images/wk/wk1_benchmarking_s2.PNG"] },
            { id: "wk1_szenariotechnik",label:"Szenariotechnik",   seiten: ["images/wk/wk1_szenariotechnik_s1.PNG", "images/wk/wk1_szenariotechnik_s2.PNG"] }
          ]
        },
        {
          label: "Entscheidungsfindung",
          tools: [
            { id: "wk1_kosten_nutzen", label: "Kosten-Nutzen-Analyse",    seiten: ["images/wk/wk1_kosten_nutzen_s1.PNG",     "images/wk/wk1_kosten_nutzen_s2.PNG"] },
            { id: "wk1_morphkasten",   label: "Morphologischer Kasten",   seiten: ["images/wk/wk1_morphkasten_s1.PNG",       "images/wk/wk1_morphkasten_s2.PNG"] },
            { id: "wk1_nutzwert_ref",  label: "Nutzwertanalyse",         seiten: ["images/wk/wk3_nutzwert_s1.PNG",          "images/wk/wk3_nutzwert_s2.PNG"],          quelle: "WK III" },
            { id: "wk1_matrix_ref",    label: "Entscheidungsmatrix",     seiten: ["images/wk/wk3_entscheidungsmatrix_s1.PNG","images/wk/wk3_entscheidungsmatrix_s2.PNG"], quelle: "WK III" }
          ]
        },
        {
          label: "Zielmanagement",
          tools: [
            { id: "wk1_smart",         label: "SMART-Methode",     seiten: ["images/wk/wk1_smart_s1.PNG",           "images/wk/wk1_smart_s2.PNG"] },
            { id: "wk1_zielpyramide",  label: "Zielpyramide",      seiten: ["images/wk/wk1_zielpyramide_s1.PNG",    "images/wk/wk1_zielpyramide_s2.PNG"] }
          ]
        },
        {
          label: "Projektmanagement",
          tools: [
            { id: "wk1_netzplan",      label: "Netzplantechnik",   seiten: ["images/wk/wk1_netzplan_s1.PNG",        "images/wk/wk1_netzplan_s2.PNG"] },
            { id: "wk1_gantt",         label: "Gantt-Diagramm",    seiten: ["images/wk/wk1_gantt_s1.PNG",           "images/wk/wk1_gantt_s2.PNG"] },
            { id: "wk1_meilenstein",   label: "Meilensteinplan",   seiten: ["images/wk/wk1_meilenstein_s1.PNG",     "images/wk/wk1_meilenstein_s2.PNG"] }
          ]
        },
        {
          label: "Stakeholder & Kommunikation",
          tools: [
            { id: "wk1_stakeholder",   label: "Stakeholderanalyse", seiten: ["images/wk/wk1_stakeholder_s1.PNG",   "images/wk/wk1_stakeholder_s2.PNG"] },
            { id: "wk1_mindmap",       label: "Mindmap",            seiten: ["images/wk/wk1_mindmap_s1.PNG",        "images/wk/wk1_mindmap_s2.PNG"] },
            { id: "wk1_brainstorming", label: "Brainstorming",      seiten: ["images/wk/wk1_brainstorming_s1.PNG",  "images/wk/wk1_brainstorming_s2.PNG"] },
            { id: "wk1_6hut",          label: "6-Hut-Methode",     seiten: ["images/wk/wk1_6hut_s1.PNG",           "images/wk/wk1_6hut_s2.PNG"] }
          ]
        }
      ]
    },

    // ── WK II · STRATEGISCHE ANALYSE & PROJEKTSTEUERUNG ──────
    {
      id:    "wk2",
      label: "WK II · Strategische Analyse & Projektsteuerung",
      icon:  "📊",
      kategorien: [
        {
          label: null,
          tools: [
            {
              id: "wk2_uebersicht",
              label: "Gesamtübersicht WK II",
              icon: "≡",
              seiten: ["images/wk/wk_uebersicht_2.PNG"]
            }
          ]
        },
        {
          label: "Strategische Umfeldanalyse",
          tools: [
            { id: "wk2_pestel",        label: "PESTEL-Analyse",    seiten: ["images/wk/wk2_pestel_s1.PNG",          "images/wk/wk2_pestel_s2.PNG"] },
            { id: "wk2_stakeholder",   label: "Stakeholderanalyse",seiten: ["images/wk/wk2_stakeholder_s1.PNG",     "images/wk/wk2_stakeholder_s2.PNG"] }
          ]
        },
        {
          label: "Portfolio & Strategie",
          tools: [
            { id: "wk2_portfolio_bcg", label: "Portfolioanalyse (BCG)", seiten: ["images/wk/wk2_portfolio_bcg_s1.PNG","images/wk/wk2_portfolio_bcg_s2.PNG"] },
            { id: "wk2_szenariotechnik",label:"Szenariotechnik",   seiten: ["images/wk/wk2_szenariotechnik_s1.PNG", "images/wk/wk2_szenariotechnik_s2.PNG"] }
          ]
        },
        {
          label: "Entscheidungsfindung",
          tools: [
            { id: "wk2_nutzwert_ref",  label: "Nutzwertanalyse",        seiten: ["images/wk/wk3_nutzwert_s1.PNG",           "images/wk/wk3_nutzwert_s2.PNG"],           quelle: "WK III" },
            { id: "wk2_matrix_ref",    label: "Entscheidungsmatrix",    seiten: ["images/wk/wk3_entscheidungsmatrix_s1.PNG", "images/wk/wk3_entscheidungsmatrix_s2.PNG"], quelle: "WK III" },
            { id: "wk2_morph_ref",     label: "Morphologischer Kasten", seiten: ["images/wk/wk1_morphkasten_s1.PNG",        "images/wk/wk1_morphkasten_s2.PNG"],         quelle: "WK I" }
          ]
        },
        {
          label: "Projektsteuerung",
          tools: [
            { id: "wk2_mta",           label: "Meilensteintrend (MTA)", seiten: ["images/wk/wk2_mta_s1.PNG",              "images/wk/wk2_mta_s2.PNG"] }
          ]
        },
        {
          label: "Qualitätsmanagement",
          tools: [
            { id: "wk2_six_sigma",     label: "Six Sigma (DMAIC)", seiten: ["images/wk/wk2_six_sigma_s1.PNG",       "images/wk/wk2_six_sigma_s2.PNG"] },
            { id: "wk2_fmea_ref",      label: "FMEA",              seiten: ["images/wk/wk1_fmea_s1.PNG",            "images/wk/wk1_fmea_s2.PNG"],            quelle: "WK I" }
          ]
        },
        {
          label: "Investitionen & Ressourcen",
          tools: [
            { id: "wk2_kosten_nutzen_ref", label: "Kosten-Nutzen-Analyse", seiten: ["images/wk/wk1_kosten_nutzen_s1.PNG","images/wk/wk1_kosten_nutzen_s2.PNG"], quelle: "WK I" }
          ]
        },
        {
          label: "Veränderungsmanagement",
          tools: [
            { id: "wk2_6hut_ref",      label: "6-Hut-Methode",    seiten: ["images/wk/wk1_6hut_s1.PNG",            "images/wk/wk1_6hut_s2.PNG"],            quelle: "WK I" }
          ]
        }
      ]
    },

    // ── WK III · ENTSCHEIDUNGS- & BEWERTUNGSTECHNIKEN ────────
    {
      id:    "wk3",
      label: "WK III · Entscheidungs- & Bewertungstechniken",
      icon:  "⚖️",
      kategorien: [
        {
          label: null,
          tools: [
            {
              id: "wk3_uebersicht",
              label: "Gesamtübersicht WK III",
              icon: "≡",
              seiten: ["images/wk/wk_uebersicht_3.PNG"]
            }
          ]
        },
        {
          label: "Entscheidungs- & Bewertungstechniken",
          tools: [
            { id: "wk3_nutzwert",            label: "Nutzwertanalyse",       seiten: ["images/wk/wk3_nutzwert_s1.PNG",            "images/wk/wk3_nutzwert_s2.PNG"] },
            { id: "wk3_entscheidungsmatrix",  label: "Entscheidungsmatrix",   seiten: ["images/wk/wk3_entscheidungsmatrix_s1.PNG", "images/wk/wk3_entscheidungsmatrix_s2.PNG"] },
            { id: "wk3_kosten_nutzen",        label: "Kosten-Nutzen-Analyse", seiten: ["images/wk/wk3_kosten_nutzen_s1.PNG",       "images/wk/wk3_kosten_nutzen_s2.PNG"] },
            { id: "wk3_scoring",              label: "Scoring-Modell",        seiten: ["images/wk/wk3_scoring_s1.PNG",             "images/wk/wk3_scoring_s2.PNG"] },
            { id: "wk3_sensitivitaet",        label: "Sensitivitätsanalyse",  seiten: ["images/wk/wk3_sensitivitaet_s1.PNG",       "images/wk/wk3_sensitivitaet_s2.PNG"] },
            { id: "wk3_szenariotechnik",      label: "Szenariotechnik",       seiten: ["images/wk/wk3_szenariotechnik_s1.PNG",     "images/wk/wk3_szenariotechnik_s2.PNG"] }
          ]
        }
      ]
    },

    // ── WK IV · PROJEKTMANAGEMENT ────────────────────────────
    {
      id:    "wk4",
      label: "WK IV · Projektmanagement",
      icon:  "📋",
      kategorien: [
        {
          label: null,
          tools: [
            {
              id: "wk4_uebersicht",
              label: "Gesamtübersicht WK IV",
              icon: "≡",
              seiten: ["images/wk/wk_uebersicht_4.PNG"]
            }
          ]
        },
        {
          label: "Projektorganisation",
          tools: [
            { id: "wk4_projektorganisation", label: "Projektorganisation",        seiten: ["images/wk/wk4_projektorganisation_s1.PNG","images/wk/wk4_projektorganisation_s2.PNG"] },
            { id: "wk4_org_formen",          label: "Projektorganisationsformen", seiten: ["images/wk/wk4_org_formen_s1.PNG",         "images/wk/wk4_org_formen_s2.PNG"] }
          ]
        },
        {
          label: "Ziele & Rahmen",
          tools: [
            { id: "wk4_mag_dreieck",         label: "Magisches Dreieck",     seiten: ["images/wk/wk4_mag_dreieck_s1.PNG",      "images/wk/wk4_mag_dreieck_s2.PNG"] }
          ]
        },
        {
          label: "Planung",
          tools: [
            { id: "wk4_projektplanung",      label: "Projektplanung",        seiten: ["images/wk/wk4_projektplanung_s1.PNG",   "images/wk/wk4_projektplanung_s2.PNG"] }
          ]
        },
        {
          label: "Risikomanagement",
          tools: [
            { id: "wk4_risikoanalyse",       label: "Risikoanalyse",         seiten: ["images/wk/wk4_risikoanalyse_s1.PNG",   "images/wk/wk4_risikoanalyse_s2.PNG"] }
          ]
        },
        {
          label: "Steuerung & Kontrolle",
          tools: [
            { id: "wk4_projektsteuerung",    label: "Projektsteuerung",      seiten: ["images/wk/wk4_projektsteuerung_s1.PNG","images/wk/wk4_projektsteuerung_s2.PNG"] }
          ]
        },
        {
          label: "Dokumentation",
          tools: [
            { id: "wk4_projektdoku",         label: "Projektdokumentation",  seiten: ["images/wk/wk4_projektdoku_s1.PNG",     "images/wk/wk4_projektdoku_s2.PNG"] }
          ]
        }
      ]
    }

  ] // Ende gruppen
};
