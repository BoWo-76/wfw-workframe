// ============================================================
// WIKI ENGINE — Sidebar, Index, Volltext-Suche via Lunr.js
// ============================================================

const STATUS_BADGE = {
  fertig:   { label: "Fertig",   cls: "ok"      },
  entwurf:  { label: "Entwurf",  cls: "warn"    },
  geplant:  { label: "Geplant",  cls: "neutral" },
};

function getRoot() {
  return window.location.pathname.includes('/pages/') ? '..' : '.';
}

// ── ZULETZT BESUCHT ─────────────────────────────────────────
const VISITED_KEY = 'wfw_last_visited';
const VISITED_MAX = 5;

function trackVisit() {
  const current = window.location.pathname.split('/').pop();
  const page = WIKI_CONFIG.pages.find(p => p.file.split('/').pop() === current);
  if (!page || page.status === 'geplant') return;
  try {
    const visited = JSON.parse(localStorage.getItem(VISITED_KEY) || '[]');
    const filtered = visited.filter(id => id !== page.id);
    filtered.unshift(page.id);
    localStorage.setItem(VISITED_KEY, JSON.stringify(filtered.slice(0, VISITED_MAX)));
  } catch (e) {}
}

function buildLastVisited(sidebarEl) {
  try {
    const visited = JSON.parse(localStorage.getItem(VISITED_KEY) || '[]');
    if (!visited.length) return;
    const r = getRoot();
    const pages = visited.map(id => WIKI_CONFIG.pages.find(p => p.id === id)).filter(Boolean);
    if (!pages.length) return;
    const html = `
      <div class="nav-section nav-last-visited">
        <div class="nav-heading">Zuletzt besucht</div>
        ${pages.map(p => `<a href="${r}/${p.file}">
          <span class="icon" style="font-size:10px;opacity:.5">◷</span> ${p.title}
        </a>`).join('')}
      </div>`;
    sidebarEl.insertAdjacentHTML('beforeend', html);
  } catch (e) {}
}

// ── DRUCKBUTTON ──────────────────────────────────────────────
function buildPrintButton() {
  const header = document.querySelector('.page-header');
  if (!header) return;
  const btn = document.createElement('button');
  btn.innerHTML = '🖨 Drucken';
  btn.style.cssText = `
    margin-top: 10px; padding: 5px 12px; font-size: 13px;
    border: 1px solid var(--line); border-radius: 6px;
    background: var(--card); color: var(--muted);
    cursor: pointer; font-family: Arial, sans-serif;
  `;
  btn.onclick = () => window.print();
  header.appendChild(btn);
}

// ── SIDEBAR ─────────────────────────────────────────────────
function buildSidebar() {
  const r = getRoot();
  const current = window.location.pathname.split('/').pop();
  const activePage = WIKI_CONFIG.pages.find(p => p.file.split('/').pop() === current);
  const activeModule = activePage ? activePage.module : null;

  let html = `
    <div class="nav-section">
      <div class="nav-heading">Navigation</div>
      <a href="${r}/index.html" ${current === 'index.html' || current === '' ? 'class="active"' : ''}>
        <span class="icon">🏠</span> Startseite
      </a>
      <a href="${r}/pages/about.html" ${current === 'about.html' ? 'class="active"' : ''}>
        <span class="icon">ℹ️</span> Über dieses Wiki
      </a>
    </div>`;

  WIKI_CONFIG.modules.forEach(mod => {
    const pages = WIKI_CONFIG.pages.filter(p => p.module === mod.id);
    const modOverviewFile = `modul_${mod.id}.html`;
    const isActiveOverview = current === modOverviewFile;
    const isOpen = mod.id === activeModule || isActiveOverview;
    const modId = `mod-${mod.id}`;

    html += `
      <div class="nav-section">
        <div class="nav-heading collapsible ${isOpen ? 'open' : ''}" onclick="toggleModule('${modId}', this)">
          <span>${mod.icon} ${mod.label}</span>
          <span class="collapse-arrow">${isOpen ? '▾' : '▸'}</span>
        </div>
        <div class="module-pages" id="${modId}" style="display:${isOpen ? 'block' : 'none'}">
          <a href="${r}/pages/${modOverviewFile}" ${isActiveOverview ? 'class="active"' : ''}>
            <span class="icon" style="font-size:10px;opacity:.5">≡</span> Übersicht
          </a>`;

    pages.forEach(p => {
      const fileName  = p.file.split('/').pop();
      const isActive  = current === fileName;
      const dot       = p.status === 'fertig' ? '●' : p.status === 'entwurf' ? '◐' : '○';
      const clickable = p.status !== 'geplant';
      if (clickable) {
        html += `<a href="${r}/${p.file}" ${isActive ? 'class="active"' : ''}>
          <span class="icon" style="font-size:10px;opacity:.6">${dot}</span> ${p.title}
        </a>`;
      } else {
        html += `<span class="nav-disabled">
          <span class="icon" style="font-size:10px;opacity:.4">${dot}</span> ${p.title}
        </span>`;
      }
    });
    html += `</div></div>`;
  });

  document.querySelectorAll('.sidebar').forEach(el => {
    el.innerHTML = html;
    buildLastVisited(el);
  });
}

function toggleModule(id, heading) {
  const el     = document.getElementById(id);
  const isOpen = el.style.display !== 'none';
  el.style.display = isOpen ? 'none' : 'block';
  heading.classList.toggle('open', !isOpen);
  heading.querySelector('.collapse-arrow').textContent = isOpen ? '▸' : '▾';
}

// ── SUCHBEGRIFF HERVORHEBEN ──────────────────────────────────
function highlightSearchTerm() {
  const params = new URLSearchParams(window.location.search);
  const term   = params.get('q');
  if (!term) return;
  const main = document.querySelector('.main');
  if (!main) return;
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const tag = node.parentElement?.tagName?.toLowerCase();
      if (['script','style','noscript'].includes(tag)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const regex   = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const matches = [];
  let node;
  while ((node = walker.nextNode())) {
    if (regex.test(node.textContent)) matches.push(node);
  }
  let firstMark = null;
  matches.forEach(node => {
    const frag = document.createDocumentFragment();
    const parts = node.textContent.split(regex);
    parts.forEach(part => {
      if (regex.test(part)) {
        const mark = document.createElement('mark');
        mark.className = 'search-highlight';
        mark.textContent = part;
        if (!firstMark) firstMark = mark;
        frag.appendChild(mark);
      } else {
        frag.appendChild(document.createTextNode(part));
      }
      regex.lastIndex = 0;
    });
    node.parentNode.replaceChild(frag, node);
  });
  if (firstMark) setTimeout(() => firstMark.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
}

// ── VOLLTEXT-SUCHE ───────────────────────────────────────────
let lunrIndex  = null;
let searchDocs = {};

async function initSearch() {
  const r       = getRoot();
  const input   = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;
  try {
    const res  = await fetch(`${r}/search-index.json`);
    const docs = await res.json();
    docs.forEach(d => { searchDocs[d.id] = d; });
    lunrIndex = lunr(function () {
      this.ref('id');
      this.field('title', { boost: 10 });
      this.field('kicker', { boost: 5 });
      this.field('body');
      this.pipeline.remove(lunr.stemmer);
      docs.forEach(d => this.add(d));
    });
  } catch (e) {
    console.warn('search-index.json nicht gefunden — Suche deaktiviert.');
    input.placeholder = 'Suche nicht verfügbar';
    input.disabled = true;
    return;
  }
  input.addEventListener('input', () => {
    const q = input.value.trim();
    if (q.length < 2) { results.style.display = 'none'; return; }
    let hits = [];
    try {
      const query = q.split(/\s+/).map(w => `${w}*`).join(' ');
      hits = lunrIndex.search(query);
    } catch (e) { hits = []; }
    if (hits.length === 0) {
      results.innerHTML = '<div class="no-result">Keine Treffer.</div>';
    } else {
      results.innerHTML = hits.slice(0, 8).map(h => {
        const doc  = searchDocs[h.ref];
        const page = WIKI_CONFIG.pages.find(p => p.id === h.ref);
        const m    = page ? WIKI_CONFIG.modules.find(mx => mx.id === page.module) : null;
        if (!doc) return '';
        const url = `${r}/${doc.file}?q=${encodeURIComponent(q)}`;
        return `<a href="${url}">
          <strong>${doc.title}</strong>
          <span>${m ? m.icon + ' ' + m.label : doc.kicker || ''}</span>
        </a>`;
      }).join('');
    }
    results.style.display = 'block';
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) results.style.display = 'none';
  });
}

// ── KACHEL-STARTSEITE ────────────────────────────────────────
function buildIndexPage() {
  const container = document.getElementById('wiki-index');
  if (!container) return;

  let html = '<div class="module-grid">';

  WIKI_CONFIG.modules.forEach(mod => {
    const pages  = WIKI_CONFIG.pages.filter(p => p.module === mod.id);
    const done   = pages.filter(p => p.status === 'fertig').length;
    const total  = pages.length;
    const pct    = total > 0 ? Math.round((done / total) * 100) : 0;
    const hasContent = total > 0;

    // Fortschrittsfarbe: 0% grau, <100% gedimmt, 100% voll
    const tileColor = hasContent ? mod.color : '#aaa';
    const opacity   = hasContent ? 1 : 0.45;

    html += `
      <a class="module-tile ${!hasContent ? 'tile-empty' : ''}"
         href="${hasContent ? 'pages/modul_' + mod.id + '.html' : '#'}"
         style="--tile-color:${tileColor};opacity:${opacity};${!hasContent ? 'cursor:default;pointer-events:none;' : ''}">
        <div class="tile-icon">${mod.icon}</div>
        <div class="tile-label">${mod.label}</div>
        <div class="tile-meta">${mod.dates}</div>
        <div class="tile-progress">
          <div class="tile-bar">
            <div class="tile-fill" style="width:${pct}%"></div>
          </div>
          <span class="tile-pct">${total > 0 ? done + '/' + total + ' Skripte' : 'noch leer'}</span>
        </div>
      </a>`;
  });

  // About-Kachel als 12. Kachel
  html += `
    <a class="module-tile" href="pages/about.html"
       style="--tile-color:#444;">
      <div class="tile-icon">ℹ️</div>
      <div class="tile-label">Über dieses Wiki</div>
      <div class="tile-meta">Portfolio · Technik · Autor</div>
      <div class="tile-progress">
        <div class="tile-bar"><div class="tile-fill" style="width:100%"></div></div>
        <span class="tile-pct">Boris Wolff</span>
      </div>
    </a>`;

  html += '</div>';
  container.innerHTML = html;
}

// ── MODUL-ÜBERSICHTSSEITE ────────────────────────────────────
function buildModulePage() {
  const container = document.getElementById('modul-page');
  if (!container) return;

  const modId = container.dataset.module;
  const mod   = WIKI_CONFIG.modules.find(m => m.id === modId);
  if (!mod) return;

  const pages = WIKI_CONFIG.pages.filter(p => p.module === modId);
  const done  = pages.filter(p => p.status === 'fertig').length;

  // Header färben
  const header = document.querySelector('.page-header');
  if (header) {
    header.style.borderLeftColor = mod.color;
    const kicker = header.querySelector('.kicker');
    if (kicker) kicker.style.color = mod.color;
  }

  let html = `
    <div class="modul-info-bar" style="border-left:4px solid ${mod.color}">
      <span>${mod.icon} <strong>${mod.label}</strong></span>
      <span>📅 ${mod.dates}</span>
      <span>👤 ${mod.dozent}</span>
      <span class="badge ok">${done} / ${pages.length} fertig</span>
    </div>`;

  if (pages.length === 0) {
    html += `<div class="notice warn">Noch keine Skripte für dieses Modul vorhanden.</div>`;
  } else {
    html += '<div class="script-list">';
    pages.forEach(p => {
      const b = STATUS_BADGE[p.status];
      const clickable = p.status !== 'geplant';
      html += clickable
        ? `<a class="script-item" href="../${p.file}">
            <span class="script-icon">${mod.icon}</span>
            <div class="script-info">
              <strong>${p.title}</strong>
              <span>Stand: ${p.updated}</span>
            </div>
            <span class="badge ${b.cls}">${b.label}</span>
           </a>`
        : `<div class="script-item disabled">
            <span class="script-icon" style="opacity:.4">${mod.icon}</span>
            <div class="script-info">
              <strong>${p.title}</strong>
              <span>Noch nicht verfügbar</span>
            </div>
            <span class="badge ${b.cls}">${b.label}</span>
           </div>`;
    });
    html += '</div>';
  }

  container.innerHTML = html;
}


// ── SIDEBAR TOGGLE ───────────────────────────────────────────
const SIDEBAR_KEY = 'wfw_sidebar_open';

function initSidebarToggle() {
  // Toggle-Button in Topbar einfügen (vor dem brand)
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  const btn = document.createElement('button');
  btn.className = 'sidebar-toggle';
  btn.innerHTML = '☰';
  btn.title = 'Navigation ein-/ausblenden';
  btn.setAttribute('aria-label', 'Sidebar umschalten');

  // Vor dem .brand einfügen
  const brand = topbar.querySelector('.brand');
  if (brand) topbar.insertBefore(btn, brand);

  // Startzustand bestimmen
  const isIndex = window.location.pathname.split('/').pop() === 'index.html'
               || window.location.pathname.endsWith('/');
  const stored  = localStorage.getItem(SIDEBAR_KEY);

  // Startseite: standardmäßig zu; Unterseiten: standardmäßig offen
  const startOpen = stored !== null ? stored === 'true' : !isIndex;

  if (!startOpen) document.body.classList.add('sidebar-collapsed');

  btn.addEventListener('click', () => {
    const isCollapsed = document.body.classList.toggle('sidebar-collapsed');
    localStorage.setItem(SIDEBAR_KEY, (!isCollapsed).toString());
  });
}


// ── NOTIZZETTEL ──────────────────────────────────────────────
// Pro Lernseite (LSXX) ein eigener Notizzettel, gespeichert in
// localStorage (gerätegebunden, kein Sync). Nach dem Drucken
// wird die Notiz geleert — Wegwerf-Block für unterwegs.
function initNotizzettel() {
  const current = window.location.pathname.split('/').pop();
  const page = WIKI_CONFIG.pages.find(p => p.file.split('/').pop() === current);

  // Nur auf Lernseiten (haben ein module) — nicht auf Übersichten/About
  if (!page || !page.module) return;

  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  const key = `wfw_notiz_${page.id}`;
  const openKey = 'wfw_notiz_panel_open';

  // Toggle-Button in Topbar
  const btn = document.createElement('button');
  btn.className = 'notiz-toggle';
  btn.innerHTML = '📝<span class="notiz-badge"></span>';
  btn.title = 'Notizzettel öffnen';
  btn.setAttribute('aria-label', 'Notizzettel öffnen');
  const searchWrap = topbar.querySelector('.search-wrap');
  if (searchWrap) topbar.insertBefore(btn, searchWrap.nextSibling);
  else {
    const logo = topbar.querySelector('.topbar-logo');
    if (logo) topbar.insertBefore(btn, logo);
    else topbar.appendChild(btn);
  }

  function updateBadge() {
    const hasContent = !!(localStorage.getItem(key) || '').trim();
    btn.classList.toggle('has-content', hasContent);
  }

  // Panel
  const panel = document.createElement('div');
  panel.className = 'notiz-panel';
  panel.innerHTML = `
    <div class="notiz-print-header">
      <strong>${page.title}</strong><br>
      <span>WFW Wiki · Notiz vom ${new Date().toLocaleDateString('de-DE')}</span>
    </div>
    <div class="notiz-panel-head">
      <h3>📝 Notizzettel</h3>
      <button class="notiz-close-btn" aria-label="Schließen">✕</button>
    </div>
    <textarea placeholder="Notizen zu „${page.title}“ …"></textarea>
    <div class="notiz-actions">
      <button class="notiz-print-btn">🖨 Drucken &amp; löschen</button>
    </div>`;
  document.body.appendChild(panel);

  const textarea = panel.querySelector('textarea');
  textarea.value = localStorage.getItem(key) || '';
  updateBadge();

  // Panel-Status (offen/zu) über Seitenwechsel hinweg merken
  if (localStorage.getItem(openKey) === 'true') {
    panel.classList.add('open');
  }

  let saveTimeout;
  textarea.addEventListener('input', () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      try { localStorage.setItem(key, textarea.value); } catch (e) {}
      updateBadge();
    }, 300);
  });

  btn.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    try { localStorage.setItem(openKey, isOpen.toString()); } catch (e) {}
  });
  panel.querySelector('.notiz-close-btn').addEventListener('click', () => {
    panel.classList.remove('open');
    try { localStorage.setItem(openKey, 'false'); } catch (e) {}
  });

  panel.querySelector('.notiz-print-btn').addEventListener('click', () => {
    if (!textarea.value.trim()) {
      alert('Der Notizzettel ist leer — nichts zu drucken.');
      return;
    }
    const confirmed = confirm('Die Notiz wird nach dem Drucken gelöscht. Fortfahren?');
    if (!confirmed) return;
    document.body.classList.add('notiz-printing');
    window.print();
  });

  window.addEventListener('afterprint', () => {
    if (document.body.classList.contains('notiz-printing')) {
      document.body.classList.remove('notiz-printing');
      textarea.value = '';
      try { localStorage.removeItem(key); } catch (e) {}
      updateBadge();
    }
  });
}

// ── FORMELZEICHEN-GLOSSAR ────────────────────────────────────
// Zentrale, von Boris gepflegte Liste (css/formelzeichen.json),
// auf jeder Seite über ein Topbar-Icon erreichbar. Kein Editieren
// im Browser — Pflege ausschliesslich über die JSON-Datei.
async function initFormelzeichen() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;
  const r = getRoot();

  const btn = document.createElement('button');
  btn.className = 'formel-toggle';
  btn.innerHTML = 'Σ';
  btn.title = 'Formelzeichen-Glossar öffnen';
  btn.setAttribute('aria-label', 'Formelzeichen-Glossar öffnen');

  // Direkt links vom Notizzettel-Icon einfügen, sonst vor dem Logo
  const notizBtn = topbar.querySelector('.notiz-toggle');
  const logo = topbar.querySelector('.topbar-logo');
  if (notizBtn) topbar.insertBefore(btn, notizBtn);
  else if (logo) topbar.insertBefore(btn, logo);
  else topbar.appendChild(btn);

  const panel = document.createElement('div');
  panel.className = 'formel-panel';
  panel.innerHTML = `
    <div class="formel-panel-head">
      <h3>Σ Formelzeichen-Glossar</h3>
      <button class="formel-close-btn" aria-label="Schließen">✕</button>
    </div>
    <input type="search" class="formel-search" placeholder="Kürzel oder Bedeutung suchen …" autocomplete="off">
    <div class="formel-list">Lädt …</div>`;
  document.body.appendChild(panel);

  const listEl = panel.querySelector('.formel-list');
  const searchEl = panel.querySelector('.formel-search');

  btn.addEventListener('click', () => panel.classList.toggle('open'));
  panel.querySelector('.formel-close-btn').addEventListener('click', () => panel.classList.remove('open'));

  let data = [];
  const collapsed = new Set(); // Module-IDs, die eingeklappt sind

  try {
    const res = await fetch(`${r}/css/formelzeichen.json`);
    data = await res.json();
  } catch (e) {
    listEl.innerHTML = '<div class="formel-empty">Glossar konnte nicht geladen werden.</div>';
    return;
  }

  function render(filterText) {
    const term = (filterText || '').trim().toLowerCase();
    let html = '';
    data.forEach(group => {
      const mod = WIKI_CONFIG.modules.find(m => m.id === group.modul);
      const label = mod ? `${mod.icon} ${mod.label}` : group.modul;
      const entries = group.eintraege.filter(e =>
        !term || e.symbol.toLowerCase().includes(term) || e.bedeutung.toLowerCase().includes(term)
      );
      if (!entries.length) return;
      // Bei aktiver Suche immer aufgeklappt zeigen, sonst gemerkten Zustand nutzen
      const isOpen = term ? true : !collapsed.has(group.modul);
      html += `<div class="formel-group">
        <div class="formel-group-title" data-modul="${group.modul}">
          <span>${label}</span>
          <span class="formel-arrow">${isOpen ? '▾' : '▸'}</span>
        </div>
        <div class="formel-group-entries" style="display:${isOpen ? 'block' : 'none'}">
          ${entries.map(e => `
            <div class="formel-entry">
              <span class="formel-symbol">${e.symbol}</span>
              <span class="formel-bedeutung">${e.bedeutung}</span>
            </div>`).join('')}
        </div>
      </div>`;
    });
    listEl.innerHTML = html || '<div class="formel-empty">Keine Treffer.</div>';

    listEl.querySelectorAll('.formel-group-title').forEach(title => {
      title.addEventListener('click', () => {
        const modulId = title.dataset.modul;
        const entries = title.nextElementSibling;
        const arrow = title.querySelector('.formel-arrow');
        const willOpen = entries.style.display === 'none';
        entries.style.display = willOpen ? 'block' : 'none';
        arrow.textContent = willOpen ? '▾' : '▸';
        if (willOpen) collapsed.delete(modulId);
        else collapsed.add(modulId);
      });
    });
  }

  render('');
  searchEl.addEventListener('input', () => render(searchEl.value));
}

// ── CHANGELOG ─────────────────────────────────────────────────
// Zentrale, von Boris gepflegte Liste (css/changelog.json),
// auf jeder Seite über ein Topbar-Icon erreichbar. Kein Editieren
// im Browser — Pflege ausschliesslich über die JSON-Datei.
// Struktur: Array von { datum, eintraege: [{ modul, titel, aktion }] },
// neueste Datumsgruppe zuerst.
async function initChangelog() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;
  const r = getRoot();

  const btn = document.createElement('button');
  btn.className = 'changelog-toggle';
  btn.innerHTML = '📜';
  btn.title = 'Changelog öffnen';
  btn.setAttribute('aria-label', 'Changelog öffnen');

  // Links vom Formelglossar-Icon einfügen, sonst vor Notizzettel/Logo
  const formelBtn = topbar.querySelector('.formel-toggle');
  const notizBtn = topbar.querySelector('.notiz-toggle');
  const logo = topbar.querySelector('.topbar-logo');
  if (formelBtn) topbar.insertBefore(btn, formelBtn);
  else if (notizBtn) topbar.insertBefore(btn, notizBtn);
  else if (logo) topbar.insertBefore(btn, logo);
  else topbar.appendChild(btn);

  const panel = document.createElement('div');
  panel.className = 'changelog-panel';
  panel.innerHTML = `
    <div class="changelog-panel-head">
      <h3>📜 Changelog</h3>
      <button class="changelog-close-btn" aria-label="Schließen">✕</button>
    </div>
    <div class="changelog-list">Lädt …</div>`;
  document.body.appendChild(panel);

  const listEl = panel.querySelector('.changelog-list');

  btn.addEventListener('click', () => panel.classList.toggle('open'));
  panel.querySelector('.changelog-close-btn').addEventListener('click', () => panel.classList.remove('open'));

  let data = [];
  try {
    const res = await fetch(`${r}/css/changelog.json`);
    data = await res.json();
  } catch (e) {
    listEl.innerHTML = '<div class="changelog-empty">Changelog konnte nicht geladen werden.</div>';
    return;
  }

  if (!data.length) {
    listEl.innerHTML = '<div class="changelog-empty">Noch keine Einträge.</div>';
    return;
  }

  const html = data.map(group => `
    <div class="changelog-date-group">
      <div class="changelog-date">${group.datum}</div>
      ${group.eintraege.map(e => {
        const mod = e.modul ? WIKI_CONFIG.modules.find(m => m.id === e.modul) : null;
        const icon = mod ? mod.icon : 'ℹ️';
        const badge = e.aktion === 'neu' ? '<span class="changelog-badge-new">Neu</span>'
                    : e.aktion === 'update' ? '<span class="changelog-badge-new" style="background:var(--muted)">Update</span>'
                    : '';
        return `<div class="changelog-entry">
          <span class="changelog-mod-icon">${icon}</span>
          <span class="changelog-titel">${e.titel}</span>
          ${badge}
        </div>`;
      }).join('')}
    </div>`).join('');

  listEl.innerHTML = html;
}

// ── WERKZEUGKASTEN-BUTTON ────────────────────────────────────
// Fügt 🧰-Link in die Topbar ein (links vom 📜-Changelog-Icon).
// Öffnet werkzeugkasten.html im selben Tab.
function initWerkzeugkasten() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;
  const r = getRoot();

  const btn = document.createElement('a');
  btn.className = 'wk-toggle';
  btn.href      = `${r}/werkzeugkasten.html`;
  btn.innerHTML = '🧰';
  btn.title     = 'Werkzeugkasten öffnen';
  btn.setAttribute('aria-label', 'Werkzeugkasten öffnen');

  // Links vom Changelog-Icon einfügen — ergibt Reihenfolge: 🎴 🧰 📜 Σ 📝 Logo
  const changelogBtn = topbar.querySelector('.changelog-toggle');
  const formelBtn    = topbar.querySelector('.formel-toggle');
  const logo         = topbar.querySelector('.topbar-logo');
  if (changelogBtn)      topbar.insertBefore(btn, changelogBtn);
  else if (formelBtn)    topbar.insertBefore(btn, formelBtn);
  else if (logo)         topbar.insertBefore(btn, logo);
  else topbar.appendChild(btn);
}

// ── KARTEIKARTEN-BUTTON ──────────────────────────────────────
// Fügt 🎴-Link in die Topbar ein (links vom 🧰-Werkzeugkasten-Icon).
// Öffnet karteikarten.html im selben Tab.
function initKarteikartenLink() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;
  const r = getRoot();

  const btn = document.createElement('a');
  btn.className = 'kk-toggle';
  btn.href      = `${r}/karteikarten.html`;
  btn.innerHTML = '🎴';
  btn.title     = 'Karteikarten öffnen';
  btn.setAttribute('aria-label', 'Karteikarten öffnen');

  // Links vom Werkzeugkasten-Icon einfügen, sonst gleiche Fallback-Kette
  const wkBtn         = topbar.querySelector('.wk-toggle');
  const changelogBtn  = topbar.querySelector('.changelog-toggle');
  const formelBtn     = topbar.querySelector('.formel-toggle');
  const logo          = topbar.querySelector('.topbar-logo');
  if (wkBtn)              topbar.insertBefore(btn, wkBtn);
  else if (changelogBtn)  topbar.insertBefore(btn, changelogBtn);
  else if (formelBtn)     topbar.insertBefore(btn, formelBtn);
  else if (logo)          topbar.insertBefore(btn, logo);
  else topbar.appendChild(btn);
}

// ── QUIZ-BUTTON ───────────────────────────────────────────────
// Fügt ❓-Link in die Topbar ein (links vom 🎴-Karteikarten-Icon).
// Öffnet quiz.html im selben Tab.
function initQuizLink() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;
  const r = getRoot();

  const btn = document.createElement('a');
  btn.className = 'qz-toggle';
  btn.href      = `${r}/quiz.html`;
  btn.innerHTML = '❓';
  btn.title     = 'Quiz öffnen';
  btn.setAttribute('aria-label', 'Quiz öffnen');

  // Links vom Karteikarten-Icon einfügen, sonst gleiche Fallback-Kette
  const kkBtn         = topbar.querySelector('.kk-toggle');
  const wkBtn         = topbar.querySelector('.wk-toggle');
  const changelogBtn  = topbar.querySelector('.changelog-toggle');
  const formelBtn     = topbar.querySelector('.formel-toggle');
  const logo          = topbar.querySelector('.topbar-logo');
  if (kkBtn)              topbar.insertBefore(btn, kkBtn);
  else if (wkBtn)         topbar.insertBefore(btn, wkBtn);
  else if (changelogBtn)  topbar.insertBefore(btn, changelogBtn);
  else if (formelBtn)     topbar.insertBefore(btn, formelBtn);
  else if (logo)          topbar.insertBefore(btn, logo);
  else topbar.appendChild(btn);
}

// ── LOGO ─────────────────────────────────────────────────────
function buildLogo() {
  const topbar = document.querySelector('.topbar');
  if (!topbar || topbar.querySelector('.topbar-logo')) return;
  const r = getRoot();
  const logo = document.createElement('div');
  logo.className = 'topbar-logo';
  logo.innerHTML = `<img src="${r}/images/bowo-logo-light.svg" alt="BoWo – Boris Wolff" height="34">`;
  topbar.appendChild(logo);
}

// ── TOPBAR ───────────────────────────────────────────────────
function buildTopbar() {
  const r  = getRoot();
  const el = document.querySelector('.topbar .brand');
  if (el) {
    el.href      = `${r}/index.html`;
    el.innerHTML = `${WIKI_CONFIG.brand}<span>Wiki</span>`;
  }
}

// ── INIT ─────────────────────────────────────────────────────
// ── FEEDBACK-BUTTON ──────────────────────────────────────────
// Fügt ✉️-Link in die Topbar ein (unmittelbar vor dem Logo).
// Öffnet das E-Mail-Programm des Besuchers mit vorausgefülltem Betreff.
function initFeedbackLink() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  const subject = encodeURIComponent('Feedback zum WFW Wiki');
  const body    = encodeURIComponent('Hallo,\n\nich habe folgendes Feedback zum WFW Wiki:\n\n');

  const btn = document.createElement('a');
  btn.className = 'feedback-toggle';
  btn.href      = `mailto:wfw.wiki@gmail.com?subject=${subject}&body=${body}`;
  btn.innerHTML = '✉️';
  btn.title     = 'Feedback per E-Mail senden';
  btn.setAttribute('aria-label', 'Feedback per E-Mail senden');

  const logo = topbar.querySelector('.topbar-logo');
  if (logo) topbar.insertBefore(btn, logo);
  else topbar.appendChild(btn);
}

document.addEventListener('DOMContentLoaded', () => {
  trackVisit();
  buildTopbar();
  initSidebarToggle();
  buildLogo();
  initNotizzettel();
  initFormelzeichen();
  initChangelog();
  initWerkzeugkasten();
  initKarteikartenLink();
  initQuizLink();
  initFeedbackLink();
  buildSidebar();
  buildIndexPage();
  buildModulePage();
  buildPrintButton();
  initSearch();
  highlightSearchTerm();
});
