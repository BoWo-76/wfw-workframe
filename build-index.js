// build-index.js
// Ausführen: node build-index.js
// Erzeugt search-index.json im Wiki-Stammverzeichnis
// Muss nach jeder neuen oder geänderten Wiki-Seite einmal ausgeführt werden.

const fs   = require('fs');
const path = require('path');

const PAGES_DIR   = path.join(__dirname, 'pages');
const OUTPUT_FILE = path.join(__dirname, 'search-index.json');

// Einfacher HTML-Tag-Stripper
function stripHtml(html) {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Titel aus <title>-Tag extrahieren
function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? m[1].replace(' – WFW Wiki', '').trim() : '';
}

// Kicker (Modul-Info) aus .kicker extrahieren
function extractKicker(html) {
  const m = html.match(/class="kicker"[^>]*>([^<]+)<\/div>/i);
  return m ? m[1].trim() : '';
}

// Hauptinhalt aus <main> extrahieren
function extractMain(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  return m ? stripHtml(m[1]) : '';
}

const index = [];
const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.html') && !f.startsWith('_'));

files.forEach(file => {
  const filePath = path.join(PAGES_DIR, file);
  const html     = fs.readFileSync(filePath, 'utf8');
  const title    = extractTitle(html);
  const kicker   = extractKicker(html);
  const body     = extractMain(html);

  if (!title) return; // Template-Dateien überspringen

  index.push({
    id:     file.replace('.html', ''),
    title,
    kicker,
    file:   `pages/${file}`,
    body:   body.substring(0, 8000) // max 8KB pro Seite
  });

  console.log(`✓ ${file} — "${title}"`);
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2), 'utf8');
console.log(`\n✅ search-index.json erstellt — ${index.length} Seiten indexiert.`);
