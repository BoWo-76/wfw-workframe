// ============================================================
// KARTEIKARTEN ENGINE
// Leitner-System (5 Boxen) für Spaced Repetition.
// Zwei Kartenquellen:
//  - Formelglossar (css/formelzeichen.json) — automatisch, read-only
//  - Eigene Karten (localStorage) — vom Nutzer angelegt/bearbeitet
// Fortschritt (Box + Fälligkeitsdatum) wird pro Karten-ID in
// localStorage gespeichert, unabhängig von der Kartenquelle.
// Abhängigkeit: pages.js (WIKI_CONFIG) muss vorher geladen sein.
// ============================================================

const KK_CUSTOM_KEY   = 'wfw_kk_custom';
const KK_PROGRESS_KEY = 'wfw_kk_progress';

// Tage bis zur nächsten Fälligkeit, nach Box einsortiert
const KK_INTERVALS = { 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 };
const KK_BOX_LABELS = {
  1: 'Box 1 · täglich',
  2: 'Box 2 · alle 3 Tage',
  3: 'Box 3 · wöchentlich',
  4: 'Box 4 · alle 2 Wochen',
  5: 'Box 5 · gemeistert (monatlich)'
};

let ALL_CARDS = [];      // { id, front, back, modul, source: 'formel'|'custom' }
let PROGRESS  = {};      // { [id]: { box, nextDue } }
let sessionQueue = [];
let sessionIdx = 0;
let sessionStats = { gewusst: 0, nochmal: 0 };
let sessionModuleFilter = null;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

// ── CSS INJECTION ────────────────────────────────────────────
(function injectStyles() {
  const css = `
    .kk-topbar-title {
      font-family: Arial, sans-serif; font-size: 0.85rem; font-weight: 700;
      color: var(--muted); margin-left: 0.5rem; white-space: nowrap;
    }
    .kk-back-link {
      font-family: Arial, sans-serif; font-size: 0.8rem; color: var(--muted);
      text-decoration: none; margin-left: auto; padding: 4px 10px;
      border: 1px solid var(--line); border-radius: 6px; white-space: nowrap;
      transition: color 0.15s, border-color 0.15s; margin-right: 0.5rem;
    }
    .kk-back-link:hover { color: var(--primary); border-color: var(--primary); }

    .kk-mod-item {
      display: flex; align-items: center; gap: 8px; width: 100%;
      padding: 7px 16px; font-size: 13px; font-family: Arial, sans-serif;
      color: var(--ink); background: none; border: none; cursor: pointer;
      text-align: left; border-left: 3px solid transparent;
    }
    .kk-mod-item:hover { background: var(--primary-soft); color: var(--primary-dark); }
    .kk-mod-item.active { border-left-color: var(--primary); background: var(--primary-soft); color: var(--primary-dark); font-weight: 700; }
    .kk-mod-count { margin-left: auto; font-size: 11px; color: var(--muted); }
    .kk-mod-due { background: var(--warn); color: #fff; border-radius: 999px; padding: 1px 7px; font-size: 10px; font-weight: 700; }

    .kk-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px,1fr)); gap: 12px; margin: 18px 0; }
    .kk-stat-card {
      border: 1px solid var(--line); border-radius: 10px; padding: 14px 16px; background: var(--card);
    }
    .kk-stat-num { font-size: 26px; font-weight: 700; color: var(--primary-dark); line-height: 1.1; }
    .kk-stat-label { font-size: 12px; color: var(--muted); margin-top: 3px; font-family: Arial, sans-serif; }

    .kk-cta-row { display: flex; gap: 10px; flex-wrap: wrap; margin: 18px 0 26px; }
    .kk-btn {
      font-family: Arial, sans-serif; font-size: 14px; font-weight: 700;
      padding: 11px 20px; border-radius: 8px; border: none; cursor: pointer;
      transition: transform 0.1s, box-shadow 0.1s;
    }
    .kk-btn:hover { transform: translateY(-1px); }
    .kk-btn.primary { background: var(--primary); color: #fff; }
    .kk-btn.secondary { background: var(--card); color: var(--primary-dark); border: 1px solid var(--line); }
    .kk-btn.danger { background: var(--danger-soft); color: var(--danger); border: 1px solid #f5c2c0; }
    .kk-btn:disabled { opacity: 0.45; cursor: default; transform: none; }

    .kk-box-bars { display: flex; flex-direction: column; gap: 8px; margin: 14px 0 22px; }
    .kk-box-row { display: flex; align-items: center; gap: 10px; font-size: 12px; font-family: Arial, sans-serif; color: var(--muted); }
    .kk-box-row-label { width: 165px; flex-shrink: 0; }
    .kk-box-track { flex: 1; height: 8px; background: var(--line); border-radius: 4px; overflow: hidden; }
    .kk-box-fill { height: 100%; background: var(--primary); border-radius: 4px; }
    .kk-box-row-count { width: 28px; text-align: right; flex-shrink: 0; color: var(--ink); font-weight: 700; }

    .kk-card-list { display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
    .kk-card-row {
      display: flex; align-items: center; gap: 10px; padding: 10px 14px;
      border: 1px solid var(--line); border-radius: 8px; background: var(--card); font-size: 14px;
    }
    .kk-card-front { flex: 1; }
    .kk-card-badge { font-size: 11px; padding: 2px 8px; border-radius: 999px; font-family: Arial, sans-serif; white-space: nowrap; }
    .kk-card-badge.formel { background: var(--info-soft); color: var(--info); }
    .kk-card-badge.custom { background: var(--ok-soft); color: var(--ok); }
    .kk-card-due { font-size: 11px; color: var(--muted); font-family: Arial, sans-serif; white-space: nowrap; }
    .kk-card-actions button {
      background: none; border: none; cursor: pointer; font-size: 15px; padding: 3px 5px; border-radius: 5px; color: var(--muted);
    }
    .kk-card-actions button:hover { background: var(--primary-soft); color: var(--primary-dark); }

    .kk-empty { color: var(--muted); font-family: Arial, sans-serif; font-size: 14px; padding: 30px 0; text-align: center; }

    /* ── LERNSESSION ── */
    .kk-session { display: none; flex-direction: column; align-items: center; padding-top: 10px; }
    .kk-session.active { display: flex; }
    .kk-session-progress { font-family: Arial, sans-serif; font-size: 13px; color: var(--muted); margin-bottom: 18px; }
    .kk-flashcard {
      width: 100%; max-width: 480px; min-height: 220px; border-radius: 14px;
      background: var(--card); border: 1px solid var(--line); box-shadow: 0 4px 18px rgba(0,0,0,0.08);
      display: flex; align-items: center; justify-content: center; text-align: center;
      padding: 30px 26px; font-size: 19px; line-height: 1.5; cursor: pointer; user-select: none;
      position: relative;
    }
    .kk-flashcard .kk-face-label {
      position: absolute; top: 12px; left: 16px; font-size: 11px; font-family: Arial, sans-serif;
      text-transform: uppercase; letter-spacing: .06em; color: var(--muted);
    }
    .kk-flashcard.back { background: var(--primary-soft); }
    .kk-flip-hint { margin-top: 12px; font-size: 12px; color: var(--muted); font-family: Arial, sans-serif; }
    .kk-session-actions { display: flex; gap: 14px; margin-top: 24px; }
    .kk-session-actions .kk-btn { min-width: 150px; font-size: 15px; padding: 13px 20px; }
    .kk-session-summary { text-align: center; padding: 40px 0; }
    .kk-session-summary .kk-summary-num { font-size: 40px; font-weight: 700; color: var(--primary-dark); }

    /* ── FORM MODAL ── */
    .kk-modal-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 300;
      align-items: center; justify-content: center; padding: 20px;
    }
    .kk-modal-overlay.open { display: flex; }
    .kk-modal {
      background: var(--card); border-radius: 12px; padding: 22px; width: 100%; max-width: 440px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }
    .kk-modal h3 { color: var(--primary-dark); font-size: 17px; margin-bottom: 14px; }
    .kk-modal label { display: block; font-size: 12px; font-weight: 700; color: var(--muted); margin: 12px 0 4px; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: .04em; }
    .kk-modal select, .kk-modal textarea {
      width: 100%; border: 1px solid var(--line); border-radius: 8px; padding: 9px 11px;
      font-family: Arial, sans-serif; font-size: 14px; resize: vertical;
    }
    .kk-modal textarea { min-height: 60px; }
    .kk-modal-actions { display: flex; gap: 10px; margin-top: 18px; justify-content: flex-end; }

    @media (max-width: 768px) {
      .kk-session-actions { flex-direction: column; width: 100%; max-width: 480px; }
      .kk-session-actions .kk-btn { width: 100%; }
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
})();

// ── SIDEBAR TOGGLE (☰) — analog Werkzeugkasten ──────────────
const KK_SIDEBAR_KEY = 'wfw_kk_sidebar_open';
function initKKSidebarToggle() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;
  const btn = document.createElement('button');
  btn.className = 'sidebar-toggle';
  btn.innerHTML = '☰';
  btn.title = 'Navigation ein-/ausblenden';
  const brand = topbar.querySelector('.brand');
  if (brand) topbar.insertBefore(btn, brand);
  else topbar.prepend(btn);

  const stored = localStorage.getItem(KK_SIDEBAR_KEY);
  const startOpen = stored !== null ? stored === 'true' : true;
  if (!startOpen) document.body.classList.add('sidebar-collapsed');

  btn.addEventListener('click', () => {
    const collapsed = document.body.classList.toggle('sidebar-collapsed');
    localStorage.setItem(KK_SIDEBAR_KEY, (!collapsed).toString());
  });
}

// ── DATEN LADEN ──────────────────────────────────────────────
function loadProgress() {
  try { PROGRESS = JSON.parse(localStorage.getItem(KK_PROGRESS_KEY) || '{}'); }
  catch (e) { PROGRESS = {}; }
}
function saveProgress() {
  try { localStorage.setItem(KK_PROGRESS_KEY, JSON.stringify(PROGRESS)); } catch (e) {}
}
function loadCustomCards() {
  try { return JSON.parse(localStorage.getItem(KK_CUSTOM_KEY) || '[]'); }
  catch (e) { return []; }
}
function saveCustomCards(cards) {
  try { localStorage.setItem(KK_CUSTOM_KEY, JSON.stringify(cards)); } catch (e) {}
}

async function loadFormelCards() {
  try {
    const res = await fetch('css/formelzeichen.json');
    const data = await res.json();
    const cards = [];
    data.forEach(group => {
      group.eintraege.forEach(e => {
        cards.push({
          id: `formel_${group.modul}_${e.symbol}`,
          front: e.symbol,
          back: e.bedeutung,
          modul: group.modul,
          source: 'formel'
        });
      });
    });
    return cards;
  } catch (e) {
    return [];
  }
}

function getCardProgress(id) {
  return PROGRESS[id] || { box: 1, nextDue: todayISO() };
}
function isDue(card) {
  const p = getCardProgress(card.id);
  return p.nextDue <= todayISO();
}

// ── DASHBOARD / MODUL-VIEW ───────────────────────────────────
function moduleLabel(modId) {
  const mod = (window.WIKI_CONFIG && WIKI_CONFIG.modules) ? WIKI_CONFIG.modules.find(m => m.id === modId) : null;
  return mod ? `${mod.icon} ${mod.label}` : (modId || 'Ohne Modul');
}

function buildKKSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  const modIds = [...new Set(ALL_CARDS.map(c => c.modul))].sort();

  let html = `<div class="nav-section">
    <div class="nav-heading">🎴 Karteikarten</div>
    <button class="kk-mod-item ${sessionModuleFilter === null ? 'active' : ''}" onclick="kkSelectModule(null)">
      <span>≡ Alle Module</span>
      <span class="kk-mod-count">${ALL_CARDS.length}</span>
    </button>`;

  modIds.forEach(modId => {
    const cards = ALL_CARDS.filter(c => c.modul === modId);
    const due = cards.filter(isDue).length;
    html += `
      <button class="kk-mod-item ${sessionModuleFilter === modId ? 'active' : ''}" onclick="kkSelectModule('${modId}')">
        <span>${moduleLabel(modId)}</span>
        ${due > 0 ? `<span class="kk-mod-due">${due}</span>` : `<span class="kk-mod-count">${cards.length}</span>`}
      </button>`;
  });

  html += `</div>`;
  sidebar.innerHTML = html;
}

function kkSelectModule(modId) {
  sessionModuleFilter = modId;
  buildKKSidebar();
  renderDashboard();
}

function renderDashboard() {
  const container = document.getElementById('kk-main');
  if (!container) return;
  document.getElementById('kk-session').classList.remove('active');
  container.style.display = 'block';

  const cards = sessionModuleFilter ? ALL_CARDS.filter(c => c.modul === sessionModuleFilter) : ALL_CARDS;
  const due = cards.filter(isDue);
  const boxCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  cards.forEach(c => { boxCounts[getCardProgress(c.id).box]++; });
  const maxBox = Math.max(1, ...Object.values(boxCounts));

  let html = `
    <div class="page-header" style="margin-bottom:18px">
      <div class="kicker">Karteikarten</div>
      <h1>${sessionModuleFilter ? moduleLabel(sessionModuleFilter) : 'Alle Module'}</h1>
    </div>

    <div class="kk-stats-grid">
      <div class="kk-stat-card"><div class="kk-stat-num">${cards.length}</div><div class="kk-stat-label">Karten gesamt</div></div>
      <div class="kk-stat-card"><div class="kk-stat-num">${due.length}</div><div class="kk-stat-label">Heute fällig</div></div>
      <div class="kk-stat-card"><div class="kk-stat-num">${boxCounts[5]}</div><div class="kk-stat-label">Gemeistert (Box 5)</div></div>
    </div>

    <div class="kk-cta-row">
      <button class="kk-btn primary" ${due.length === 0 ? 'disabled' : ''} onclick="kkStartSession()">🚀 Jetzt lernen (${due.length})</button>
      <button class="kk-btn secondary" onclick="kkOpenModal()">+ Neue Karte</button>
    </div>

    <h3>Verteilung auf die Leitner-Boxen</h3>
    <div class="kk-box-bars">
      ${[1,2,3,4,5].map(b => `
        <div class="kk-box-row">
          <span class="kk-box-row-label">${KK_BOX_LABELS[b]}</span>
          <span class="kk-box-track"><span class="kk-box-fill" style="width:${(boxCounts[b]/maxBox*100)||0}%"></span></span>
          <span class="kk-box-row-count">${boxCounts[b]}</span>
        </div>`).join('')}
    </div>

    <h3>Karten ${sessionModuleFilter ? 'in diesem Modul' : ''}</h3>
    <div class="kk-card-list">
      ${cards.length === 0 ? '<div class="kk-empty">Noch keine Karten. Leg mit „+ Neue Karte" los oder wechsle zu einem Modul mit Formelglossar-Einträgen.</div>' :
        cards.map(c => {
          const p = getCardProgress(c.id);
          const dueLabel = p.nextDue <= todayISO() ? 'fällig' : `fällig ${p.nextDue}`;
          return `
          <div class="kk-card-row">
            <span class="kk-card-front">${c.front}</span>
            <span class="kk-card-badge ${c.source}">${c.source === 'formel' ? 'Glossar' : 'Eigene'}</span>
            <span class="kk-card-due">Box ${p.box} · ${dueLabel}</span>
            ${c.source === 'custom' ? `
            <span class="kk-card-actions">
              <button onclick="kkOpenModal('${c.id}')" title="Bearbeiten">✏️</button>
              <button onclick="kkDeleteCard('${c.id}')" title="Löschen">🗑</button>
            </span>` : ''}
          </div>`;
        }).join('')}
    </div>
  `;
  container.innerHTML = html;
}

// ── LERNSESSION ──────────────────────────────────────────────
function kkStartSession() {
  const pool = sessionModuleFilter ? ALL_CARDS.filter(c => c.modul === sessionModuleFilter) : ALL_CARDS;
  sessionQueue = pool.filter(isDue);
  // Mischen
  for (let i = sessionQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sessionQueue[i], sessionQueue[j]] = [sessionQueue[j], sessionQueue[i]];
  }
  sessionIdx = 0;
  sessionStats = { gewusst: 0, nochmal: 0 };
  if (sessionQueue.length === 0) return;

  document.getElementById('kk-main').style.display = 'none';
  document.getElementById('kk-session').classList.add('active');
  renderSessionCard();
}

function renderSessionCard() {
  const sessionEl = document.getElementById('kk-session');
  if (sessionIdx >= sessionQueue.length) {
    sessionEl.innerHTML = `
      <div class="kk-session-summary">
        <div>🎉 Session abgeschlossen!</div>
        <div class="kk-summary-num">${sessionStats.gewusst} / ${sessionQueue.length}</div>
        <div style="color:var(--muted);font-family:Arial,sans-serif;font-size:13px;margin-bottom:20px">richtig gewusst</div>
        <button class="kk-btn primary" onclick="renderDashboard()">Zurück zur Übersicht</button>
      </div>`;
    return;
  }

  const card = sessionQueue[sessionIdx];
  let flipped = false;

  sessionEl.innerHTML = `
    <div class="kk-session-progress">Karte ${sessionIdx + 1} von ${sessionQueue.length} · ${moduleLabel(card.modul)}</div>
    <div class="kk-flashcard" id="kk-flash-card">
      <span class="kk-face-label">Frage</span>
      <span id="kk-flash-text">${card.front}</span>
    </div>
    <div class="kk-flip-hint">Klicken zum Umdrehen</div>
    <div class="kk-session-actions" id="kk-session-actions" style="display:none">
      <button class="kk-btn danger" onclick="kkAnswer(false)">❌ Nochmal</button>
      <button class="kk-btn primary" onclick="kkAnswer(true)">✅ Gewusst</button>
    </div>
  `;

  const flashEl = document.getElementById('kk-flash-card');
  flashEl.addEventListener('click', () => {
    if (flipped) return;
    flipped = true;
    flashEl.classList.add('back');
    flashEl.querySelector('.kk-face-label').textContent = 'Antwort';
    document.getElementById('kk-flash-text').textContent = card.back;
    document.getElementById('kk-session-actions').style.display = 'flex';
  });
}

function kkAnswer(correct) {
  const card = sessionQueue[sessionIdx];
  const p = getCardProgress(card.id);
  let newBox = correct ? Math.min(p.box + 1, 5) : 1;
  const interval = KK_INTERVALS[newBox];
  PROGRESS[card.id] = { box: newBox, nextDue: addDays(todayISO(), interval) };
  saveProgress();

  if (correct) sessionStats.gewusst++; else sessionStats.nochmal++;

  sessionIdx++;
  renderSessionCard();
}

// ── EIGENE KARTEN: ANLEGEN / BEARBEITEN / LÖSCHEN ────────────
function kkOpenModal(editId) {
  const overlay = document.getElementById('kk-modal-overlay');
  const custom = editId ? loadCustomCards().find(c => c.id === editId) : null;

  const modOptions = (window.WIKI_CONFIG ? WIKI_CONFIG.modules : [])
    .map(m => `<option value="${m.id}" ${custom && custom.modul === m.id ? 'selected' : ''}>${m.icon} ${m.label}</option>`).join('');

  overlay.innerHTML = `
    <div class="kk-modal">
      <h3>${editId ? '✏️ Karte bearbeiten' : '+ Neue Karteikarte'}</h3>
      <label>Modul</label>
      <select id="kk-form-modul">${modOptions}</select>
      <label>Frage (Vorderseite)</label>
      <textarea id="kk-form-front" placeholder="z. B. Was besagt das Imparitätsprinzip?">${custom ? custom.front : ''}</textarea>
      <label>Antwort (Rückseite)</label>
      <textarea id="kk-form-back" placeholder="z. B. Drohende Verluste müssen sofort gebucht werden, Gewinne erst bei Realisation.">${custom ? custom.back : ''}</textarea>
      <div class="kk-modal-actions">
        <button class="kk-btn secondary" onclick="kkCloseModal()">Abbrechen</button>
        <button class="kk-btn primary" onclick="kkSaveCard('${editId || ''}')">Speichern</button>
      </div>
    </div>`;
  overlay.classList.add('open');
}
function kkCloseModal() {
  document.getElementById('kk-modal-overlay').classList.remove('open');
}
function kkSaveCard(editId) {
  const modul = document.getElementById('kk-form-modul').value;
  const front = document.getElementById('kk-form-front').value.trim();
  const back  = document.getElementById('kk-form-back').value.trim();
  if (!front || !back) { alert('Bitte Frage und Antwort ausfüllen.'); return; }

  let custom = loadCustomCards();
  if (editId) {
    const c = custom.find(c => c.id === editId);
    if (c) { c.front = front; c.back = back; c.modul = modul; }
  } else {
    custom.push({ id: `custom_${Date.now()}`, front, back, modul, source: 'custom' });
  }
  saveCustomCards(custom);
  kkCloseModal();
  initKarteikarten(true);
}
function kkDeleteCard(id) {
  if (!confirm('Diese Karte wirklich löschen?')) return;
  let custom = loadCustomCards().filter(c => c.id !== id);
  saveCustomCards(custom);
  delete PROGRESS[id];
  saveProgress();
  initKarteikarten(true);
}

// ── INIT ─────────────────────────────────────────────────────
async function initKarteikarten(skipShellRebuild) {
  loadProgress();
  const formelCards = await loadFormelCards();
  const customCards  = loadCustomCards().map(c => ({ ...c, source: 'custom' }));
  ALL_CARDS = [...formelCards, ...customCards];

  if (!skipShellRebuild) {
    const overlay = document.createElement('div');
    overlay.className = 'kk-modal-overlay';
    overlay.id = 'kk-modal-overlay';
    overlay.addEventListener('click', e => { if (e.target === overlay) kkCloseModal(); });
    document.body.appendChild(overlay);
  }

  buildKKSidebar();
  renderDashboard();
}

document.addEventListener('DOMContentLoaded', () => {
  initKKSidebarToggle();
  initKarteikarten(false);
});
