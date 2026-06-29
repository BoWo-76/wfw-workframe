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
document.addEventListener('DOMContentLoaded', () => {
  trackVisit();
  buildTopbar();
  buildSidebar();
  buildIndexPage();
  buildModulePage();
  buildPrintButton();
  initSearch();
  highlightSearchTerm();
});
