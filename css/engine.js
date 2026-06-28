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
    </div>`;

  WIKI_CONFIG.modules.forEach(mod => {
    const pages = WIKI_CONFIG.pages.filter(p => p.module === mod.id);
    if (!pages.length) return;
    const isOpen = mod.id === activeModule;
    const modId  = `mod-${mod.id}`;

    html += `
      <div class="nav-section">
        <div class="nav-heading collapsible ${isOpen ? 'open' : ''}" onclick="toggleModule('${modId}', this)">
          <span>${mod.icon} ${mod.label}</span>
          <span class="collapse-arrow">${isOpen ? '▾' : '▸'}</span>
        </div>
        <div class="module-pages" id="${modId}" style="display:${isOpen ? 'block' : 'none'}">`;

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

  document.querySelectorAll('.sidebar').forEach(el => el.innerHTML = html);
}

function toggleModule(id, heading) {
  const el     = document.getElementById(id);
  const isOpen = el.style.display !== 'none';
  el.style.display = isOpen ? 'none' : 'block';
  heading.classList.toggle('open', !isOpen);
  heading.querySelector('.collapse-arrow').textContent = isOpen ? '▸' : '▾';
}

// ── VOLLTEXT-SUCHE via Lunr.js ───────────────────────────────
let lunrIndex   = null;
let searchDocs  = {};

async function initSearch() {
  const r       = getRoot();
  const input   = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  // search-index.json laden
  try {
    const res  = await fetch(`${r}/search-index.json`);
    const docs = await res.json();

    docs.forEach(d => { searchDocs[d.id] = d; });

    lunrIndex = lunr(function () {
      this.ref('id');
      this.field('title', { boost: 10 });
      this.field('kicker', { boost: 5 });
      this.field('body');
      this.pipeline.remove(lunr.stemmer); // kein Stemming für Deutsch
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
      // Wildcard-Suche: jedes Wort mit * anhängen
      const query = q.split(/\s+/).map(w => `${w}*`).join(' ');
      hits = lunrIndex.search(query);
    } catch (e) {
      hits = [];
    }

    if (hits.length === 0) {
      results.innerHTML = '<div class="no-result">Keine Treffer.</div>';
    } else {
      const mod = id => WIKI_CONFIG.modules.find(m => {
        const page = WIKI_CONFIG.pages.find(p => p.id === id);
        return page && m.id === page.module;
      });
      results.innerHTML = hits.slice(0, 8).map(h => {
        const doc  = searchDocs[h.ref];
        const page = WIKI_CONFIG.pages.find(p => p.id === h.ref);
        const m    = page ? WIKI_CONFIG.modules.find(mx => mx.id === page.module) : null;
        if (!doc) return '';
        return `<a href="${r}/${doc.file}">
          <strong>${doc.title}</strong>
          <span>${m ? m.icon + ' ' + m.label : doc.kicker}</span>
        </a>`;
      }).join('');
    }
    results.style.display = 'block';
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) results.style.display = 'none';
  });
}

// ── INDEX PAGE (einklappbare Module) ────────────────────────
function buildIndexPage() {
  const container = document.getElementById('wiki-index');
  if (!container) return;

  let html = '';

  WIKI_CONFIG.modules.forEach((mod, idx) => {
    const pages = WIKI_CONFIG.pages.filter(p => p.module === mod.id);
    if (!pages.length) return;

    const done  = pages.filter(p => p.status === 'fertig').length;
    const draft = pages.filter(p => p.status === 'entwurf').length;
    const total = pages.length;
    const pct   = Math.round((done / total) * 100);
    const listId = `idx-mod-${mod.id}`;
    const isOpen = idx === 0;

    html += `
      <div class="module-block">
        <div class="module-header" style="border-left-color:${mod.color};cursor:pointer"
             onclick="toggleIndexModule('${listId}', this)">
          <span class="module-icon">${mod.icon}</span>
          <div>
            <div class="module-title">${mod.label}</div>
            <div class="module-meta">${done} fertig · ${draft} Entwurf · ${total - done - draft} geplant</div>
          </div>
          <div class="module-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${pct}%;background:${mod.color}"></div>
            </div>
            <span>${pct}%</span>
            <span class="idx-arrow" style="font-size:13px;margin-left:8px;opacity:.6">${isOpen ? '▾' : '▸'}</span>
          </div>
        </div>
        <div class="page-list" id="${listId}" style="display:${isOpen ? 'block' : 'none'}">`;

    pages.forEach(p => {
      const b         = STATUS_BADGE[p.status];
      const clickable = p.status !== 'geplant';
      html += clickable
        ? `<a class="page-item" href="${p.file}">
            <span class="page-title">${p.title}</span>
            <span class="badge ${b.cls}">${b.label}</span>
           </a>`
        : `<div class="page-item disabled">
            <span class="page-title">${p.title}</span>
            <span class="badge ${b.cls}">${b.label}</span>
           </div>`;
    });

    html += `</div></div>`;
  });

  container.innerHTML = html;
}

function toggleIndexModule(id, header) {
  const el     = document.getElementById(id);
  const isOpen = el.style.display !== 'none';
  el.style.display = isOpen ? 'none' : 'block';
  const arrow  = header.querySelector('.idx-arrow');
  if (arrow) arrow.textContent = isOpen ? '▸' : '▾';
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
  buildTopbar();
  buildSidebar();
  buildIndexPage();
  initSearch();
});
