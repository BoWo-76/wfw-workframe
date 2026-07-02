// ============================================================
// QUIZ ENGINE
// Multiple-Choice-Fragen aus css/quiz-data.json.
// Datenpflege: nur die JSON-Datei bearbeiten — pro Frage ein
// Objekt mit modul, ls (optional), frage, 4 optionen,
// correctIndex und optionaler erklaerung. Kein Code-Umbau nötig,
// wenn neue Fragensets (z.B. aus einem PDF) ergänzt werden.
// Abhängigkeit: pages.js (WIKI_CONFIG) muss vorher geladen sein.
// ============================================================

let QUIZ_ALL = [];
let quizQueue = [];
let quizIdx = 0;
let quizStats = { richtig: 0, falsch: 0 };
let quizModuleFilter = null;
let quizAnswered = false;

// ── CSS INJECTION ────────────────────────────────────────────
(function injectStyles() {
  const css = `
    .qz-topbar-title {
      font-family: Arial, sans-serif; font-size: 0.85rem; font-weight: 700;
      color: var(--muted); margin-left: 0.5rem; white-space: nowrap;
    }
    .qz-back-link {
      font-family: Arial, sans-serif; font-size: 0.8rem; color: var(--muted);
      text-decoration: none; margin-left: auto; padding: 4px 10px;
      border: 1px solid var(--line); border-radius: 6px; white-space: nowrap;
      transition: color 0.15s, border-color 0.15s; margin-right: 0.5rem;
    }
    .qz-back-link:hover { color: var(--primary); border-color: var(--primary); }

    .qz-mod-item {
      display: flex; align-items: center; gap: 8px; width: 100%;
      padding: 7px 16px; font-size: 13px; font-family: Arial, sans-serif;
      color: var(--ink); background: none; border: none; cursor: pointer;
      text-align: left; border-left: 3px solid transparent;
    }
    .qz-mod-item:hover { background: var(--primary-soft); color: var(--primary-dark); }
    .qz-mod-item.active { border-left-color: var(--primary); background: var(--primary-soft); color: var(--primary-dark); font-weight: 700; }
    .qz-mod-count { margin-left: auto; font-size: 11px; color: var(--muted); }

    .qz-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px,1fr)); gap: 12px; margin: 18px 0; }
    .qz-stat-card { border: 1px solid var(--line); border-radius: 10px; padding: 14px 16px; background: var(--card); }
    .qz-stat-num { font-size: 26px; font-weight: 700; color: var(--primary-dark); line-height: 1.1; }
    .qz-stat-label { font-size: 12px; color: var(--muted); margin-top: 3px; font-family: Arial, sans-serif; }

    .qz-cta-row { display: flex; gap: 10px; flex-wrap: wrap; margin: 18px 0 26px; }
    .qz-btn {
      font-family: Arial, sans-serif; font-size: 14px; font-weight: 700;
      padding: 11px 20px; border-radius: 8px; border: none; cursor: pointer;
      transition: transform 0.1s;
    }
    .qz-btn:hover { transform: translateY(-1px); }
    .qz-btn.primary { background: var(--primary); color: #fff; }
    .qz-btn.secondary { background: var(--card); color: var(--primary-dark); border: 1px solid var(--line); }
    .qz-btn:disabled { opacity: 0.45; cursor: default; transform: none; }

    .qz-empty { color: var(--muted); font-family: Arial, sans-serif; font-size: 14px; padding: 30px 0; text-align: center; }

    /* ── QUIZ SESSION ── */
    .qz-session { display: none; flex-direction: column; align-items: center; padding-top: 10px; }
    .qz-session.active { display: flex; }
    .qz-session-progress { font-family: Arial, sans-serif; font-size: 13px; color: var(--muted); margin-bottom: 8px; }
    .qz-score { font-family: Arial, sans-serif; font-size: 13px; color: var(--muted); margin-bottom: 18px; }
    .qz-score strong.ok { color: var(--ok); }
    .qz-score strong.danger { color: var(--danger); }

    .qz-question-card {
      width: 100%; max-width: 560px; border-radius: 14px;
      background: var(--card); border: 1px solid var(--line); box-shadow: 0 4px 18px rgba(0,0,0,0.08);
      padding: 26px 28px;
    }
    .qz-question-text { font-size: 18px; line-height: 1.5; margin-bottom: 20px; color: var(--ink); font-weight: 700; }
    .qz-options { display: flex; flex-direction: column; gap: 10px; }
    .qz-option {
      display: flex; align-items: center; gap: 12px; text-align: left;
      padding: 13px 16px; border-radius: 9px; border: 1.5px solid var(--line);
      background: var(--bg); cursor: pointer; font-size: 14.5px; font-family: Arial, sans-serif;
      transition: border-color 0.12s, background 0.12s;
    }
    .qz-option:hover:not(.disabled) { border-color: var(--primary); background: var(--primary-soft); }
    .qz-option .qz-option-letter {
      width: 24px; height: 24px; border-radius: 50%; background: var(--card); border: 1.5px solid var(--line);
      display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;
      flex-shrink: 0; color: var(--muted);
    }
    .qz-option.correct { border-color: var(--ok); background: var(--ok-soft); }
    .qz-option.correct .qz-option-letter { background: var(--ok); color: #fff; border-color: var(--ok); }
    .qz-option.wrong { border-color: var(--danger); background: var(--danger-soft); }
    .qz-option.wrong .qz-option-letter { background: var(--danger); color: #fff; border-color: var(--danger); }
    .qz-option.disabled { cursor: default; }

    .qz-explanation {
      margin-top: 18px; padding: 13px 15px; border-radius: 8px; font-size: 13.5px;
      background: var(--info-soft); border-left: 4px solid var(--info); display: none;
    }
    .qz-explanation.show { display: block; }
    .qz-explanation strong { color: var(--info); display: block; margin-bottom: 3px; font-size: 12px; text-transform: uppercase; letter-spacing: .04em; }

    .qz-next-row { margin-top: 20px; display: flex; justify-content: flex-end; }

    .qz-session-summary { text-align: center; padding: 40px 0; }
    .qz-session-summary .qz-summary-num { font-size: 40px; font-weight: 700; color: var(--primary-dark); }

    @media (max-width: 768px) {
      .qz-question-card { padding: 20px; }
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
})();

// ── SIDEBAR TOGGLE (☰) ───────────────────────────────────────
const QZ_SIDEBAR_KEY = 'wfw_qz_sidebar_open';
function initQZSidebarToggle() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;
  const btn = document.createElement('button');
  btn.className = 'sidebar-toggle';
  btn.innerHTML = '☰';
  btn.title = 'Navigation ein-/ausblenden';
  const brand = topbar.querySelector('.brand');
  if (brand) topbar.insertBefore(btn, brand);
  else topbar.prepend(btn);

  const stored = localStorage.getItem(QZ_SIDEBAR_KEY);
  const startOpen = stored !== null ? stored === 'true' : true;
  if (!startOpen) document.body.classList.add('sidebar-collapsed');

  btn.addEventListener('click', () => {
    const collapsed = document.body.classList.toggle('sidebar-collapsed');
    localStorage.setItem(QZ_SIDEBAR_KEY, (!collapsed).toString());
  });
}

// ── DATEN LADEN ──────────────────────────────────────────────
async function loadQuizData() {
  try {
    const res = await fetch('css/quiz-data.json');
    return await res.json();
  } catch (e) {
    return [];
  }
}

function moduleLabelQZ(modId) {
  const mod = (window.WIKI_CONFIG && WIKI_CONFIG.modules) ? WIKI_CONFIG.modules.find(m => m.id === modId) : null;
  return mod ? `${mod.icon} ${mod.label}` : (modId || 'Ohne Modul');
}

// ── SIDEBAR ──────────────────────────────────────────────────
function buildQZSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  const modIds = [...new Set(QUIZ_ALL.map(q => q.modul))].sort();

  let html = `<div class="nav-section">
    <div class="nav-heading">❓ Quiz</div>
    <button class="qz-mod-item ${quizModuleFilter === null ? 'active' : ''}" onclick="qzSelectModule(null)">
      <span>≡ Alle Module</span>
      <span class="qz-mod-count">${QUIZ_ALL.length}</span>
    </button>`;

  modIds.forEach(modId => {
    const count = QUIZ_ALL.filter(q => q.modul === modId).length;
    html += `
      <button class="qz-mod-item ${quizModuleFilter === modId ? 'active' : ''}" onclick="qzSelectModule('${modId}')">
        <span>${moduleLabelQZ(modId)}</span>
        <span class="qz-mod-count">${count}</span>
      </button>`;
  });

  html += `</div>`;
  sidebar.innerHTML = html;
}

function qzSelectModule(modId) {
  quizModuleFilter = modId;
  buildQZSidebar();
  renderQZDashboard();
}

// ── DASHBOARD ────────────────────────────────────────────────
function renderQZDashboard() {
  const container = document.getElementById('qz-main');
  if (!container) return;
  document.getElementById('qz-session').classList.remove('active');
  container.style.display = 'block';

  const questions = quizModuleFilter ? QUIZ_ALL.filter(q => q.modul === quizModuleFilter) : QUIZ_ALL;
  const lsCount = new Set(questions.map(q => q.ls).filter(Boolean)).size;

  let html = `
    <div class="page-header" style="margin-bottom:18px">
      <div class="kicker">Quiz</div>
      <h1>${quizModuleFilter ? moduleLabelQZ(quizModuleFilter) : 'Alle Module'}</h1>
    </div>

    <div class="qz-stats-grid">
      <div class="qz-stat-card"><div class="qz-stat-num">${questions.length}</div><div class="qz-stat-label">Fragen verfügbar</div></div>
      <div class="qz-stat-card"><div class="qz-stat-num">${lsCount}</div><div class="qz-stat-label">Lernskripte abgedeckt</div></div>
    </div>

    <div class="qz-cta-row">
      <button class="qz-btn primary" ${questions.length === 0 ? 'disabled' : ''} onclick="qzStartQuiz()">▶️ Quiz starten (${questions.length} Fragen)</button>
    </div>

    ${questions.length === 0 ? '<div class="qz-empty">Für dieses Modul liegen noch keine Fragen vor. Sobald ein Fragen-PDF verarbeitet wurde, taucht es hier automatisch auf.</div>' : ''}
  `;
  container.innerHTML = html;
}

// ── QUIZ-SESSION ─────────────────────────────────────────────
function qzStartQuiz() {
  const pool = quizModuleFilter ? QUIZ_ALL.filter(q => q.modul === quizModuleFilter) : QUIZ_ALL;
  quizQueue = [...pool];
  for (let i = quizQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quizQueue[i], quizQueue[j]] = [quizQueue[j], quizQueue[i]];
  }
  quizIdx = 0;
  quizStats = { richtig: 0, falsch: 0 };
  if (quizQueue.length === 0) return;

  document.getElementById('qz-main').style.display = 'none';
  document.getElementById('qz-session').classList.add('active');
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const sessionEl = document.getElementById('qz-session');
  if (quizIdx >= quizQueue.length) {
    const pct = Math.round((quizStats.richtig / quizQueue.length) * 100);
    sessionEl.innerHTML = `
      <div class="qz-session-summary">
        <div>🎉 Quiz abgeschlossen!</div>
        <div class="qz-summary-num">${quizStats.richtig} / ${quizQueue.length}</div>
        <div style="color:var(--muted);font-family:Arial,sans-serif;font-size:13px;margin-bottom:20px">richtig beantwortet (${pct}%)</div>
        <button class="qz-btn primary" onclick="renderQZDashboard()">Zurück zur Übersicht</button>
      </div>`;
    return;
  }

  quizAnswered = false;
  const q = quizQueue[quizIdx];
  const letters = ['A', 'B', 'C', 'D'];

  sessionEl.innerHTML = `
    <div class="qz-session-progress">Frage ${quizIdx + 1} von ${quizQueue.length} · ${moduleLabelQZ(q.modul)}</div>
    <div class="qz-score">✅ <strong class="ok">${quizStats.richtig}</strong> &nbsp;·&nbsp; ❌ <strong class="danger">${quizStats.falsch}</strong></div>
    <div class="qz-question-card">
      <div class="qz-question-text">${q.frage}</div>
      <div class="qz-options" id="qz-options">
        ${q.optionen.map((opt, i) => `
          <button class="qz-option" data-idx="${i}" onclick="qzAnswer(${i})">
            <span class="qz-option-letter">${letters[i]}</span>
            <span>${opt}</span>
          </button>`).join('')}
      </div>
      <div class="qz-explanation" id="qz-explanation">
        <strong>Erklärung</strong>
        <span id="qz-explanation-text"></span>
      </div>
      <div class="qz-next-row" id="qz-next-row" style="display:none">
        <button class="qz-btn primary" onclick="qzNext()">${quizIdx + 1 < quizQueue.length ? 'Nächste Frage →' : 'Ergebnis anzeigen →'}</button>
      </div>
    </div>
  `;
}

function qzAnswer(selectedIdx) {
  if (quizAnswered) return;
  quizAnswered = true;

  const q = quizQueue[quizIdx];
  const options = document.querySelectorAll('#qz-options .qz-option');
  options.forEach((el, i) => {
    el.classList.add('disabled');
    el.onclick = null;
    if (i === q.correctIndex) el.classList.add('correct');
    else if (i === selectedIdx) el.classList.add('wrong');
  });

  if (selectedIdx === q.correctIndex) quizStats.richtig++;
  else quizStats.falsch++;

  if (q.erklaerung) {
    document.getElementById('qz-explanation-text').textContent = q.erklaerung;
    document.getElementById('qz-explanation').classList.add('show');
  }
  document.getElementById('qz-next-row').style.display = 'flex';
}

function qzNext() {
  quizIdx++;
  renderQuizQuestion();
}

// ── INIT ─────────────────────────────────────────────────────
async function initQuiz() {
  QUIZ_ALL = await loadQuizData();
  buildQZSidebar();
  renderQZDashboard();
}

document.addEventListener('DOMContentLoaded', () => {
  initQZSidebarToggle();
  initQuiz();
});
