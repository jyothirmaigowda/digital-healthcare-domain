/* ═══════════════════════════════════════════════════════════════
   HealthPortal — Frontend Logic
═══════════════════════════════════════════════════════════════ */

const API = "http://localhost:3001/api";

// ── State ────────────────────────────────────────────────────────────────────
let currentUser = null;
let allRecords  = [];
let allInsights = [];
let selectedRole = "patient";

// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Restore session
  const saved = localStorage.getItem("hp_user");
  if (saved) {
    currentUser = JSON.parse(saved);
    routeByRole();
  }
  // Date
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric" });
  document.querySelectorAll(".topbar-date").forEach(el => el.textContent = dateStr);

  // Char counter
  const desc = document.getElementById("rec-desc");
  if (desc) {
    desc.addEventListener("input", () => {
      document.getElementById("char-count").textContent = `${desc.value.length} / 1000`;
    });
  }
});

// ── Role select on login ──────────────────────────────────────────────────────
function selectRole(role) {
  selectedRole = role;
  document.querySelectorAll(".role-tab").forEach(t => t.classList.remove("active"));
  document.querySelector(`[data-role="${role}"]`).classList.add("active");
}

// ── Fill demo creds ───────────────────────────────────────────────────────────
function fillCreds(email, pw, role) {
  document.getElementById("login-email").value = email;
  document.getElementById("login-password").value = pw;
  selectRole(role);
}

// ── Login ─────────────────────────────────────────────────────────────────────
async function handleLogin() {
  const email    = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const errEl    = document.getElementById("login-error");
  errEl.classList.add("hidden");

  if (!email || !password) {
    showError(errEl, "Please enter your email and password.");
    return;
  }

  try {
    const res  = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role: selectedRole }),
    });
    const data = await res.json();
    if (!res.ok) { showError(errEl, data.error); return; }

    currentUser = data.user;
    localStorage.setItem("hp_user", JSON.stringify(currentUser));
    routeByRole();
  } catch (e) {
    showError(errEl, "Cannot reach server. Make sure the backend is running on port 3001.");
  }
}

// ── Logout ────────────────────────────────────────────────────────────────────
function handleLogout() {
  localStorage.removeItem("hp_user");
  currentUser = null;
  allRecords  = [];
  allInsights = [];
  showPage("login");
  // Reset form
  document.getElementById("login-email").value = "";
  document.getElementById("login-password").value = "";
}

// ── Routing ───────────────────────────────────────────────────────────────────
function routeByRole() {
  if (!currentUser) return;
  if (currentUser.role === "patient") {
    setupPatientDash();
    showPage("patient");
  } else {
    setupDoctorDash();
    showPage("doctor");
  }
}

function showPage(name) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(`page-${name}`).classList.add("active");
}

// ── Patient Dashboard ─────────────────────────────────────────────────────────
function setupPatientDash() {
  const initials = currentUser.name.split(" ").map(n => n[0]).join("").substring(0,2);
  document.getElementById("topbar-avatar").textContent = initials;
  document.getElementById("sidebar-user-info").innerHTML = `
    <div class="s-name">${currentUser.name}</div>
    <div class="s-role">Patient</div>
  `;
  loadPatientRecords();
  showSection("my-records");
}

async function loadPatientRecords() {
  try {
    const res  = await fetch(`${API}/records/my/${currentUser.id}`);
    const data = await res.json();
    allRecords  = data.records;
    allInsights = data.insights;
    renderPatientRecords(allRecords);
    renderInsights(data.insights, "patient-insights-list");
    renderPatientStats(allRecords);
  } catch (e) {
    console.error(e);
  }
}

function renderPatientStats(records) {
  const container = document.getElementById("patient-stats-row");
  const total     = records.length;
  const lastDate  = total ? new Date(records[0].createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}) : "—";
  container.innerHTML = `
    <div class="stat-card">
      <div class="stat-icon blue">📋</div>
      <div><div class="stat-num">${total}</div><div class="stat-label">Total Records</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon teal">📅</div>
      <div><div class="stat-num" style="font-size:1.2rem">${lastDate}</div><div class="stat-label">Latest Record</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon orange">🧠</div>
      <div><div class="stat-num">${allInsights.length}</div><div class="stat-label">AI Insights</div></div>
    </div>
  `;
}

function renderPatientRecords(records) {
  const grid = document.getElementById("patient-records-grid");
  if (!records.length) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-icon">📂</div><p>No records yet. Add your first record!</p></div>`;
    return;
  }
  grid.innerHTML = records.map((r, i) => `
    <div class="record-card" style="animation-delay:${i * .05}s">
      <div class="record-header">
        <div class="record-title">${escHtml(r.title)}</div>
        <div class="record-date">${formatDate(r.date)}</div>
      </div>
      <div class="record-desc">${escHtml(r.description)}</div>
      <div class="record-footer">
        <button class="btn-delete" onclick="deleteRecord(${r.id})">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>
          </svg>
          Delete
        </button>
      </div>
    </div>
  `).join("");
}

function renderInsights(insights, containerId) {
  const el = document.getElementById(containerId);
  if (!insights || !insights.length) {
    el.innerHTML = `<div class="insight-item info"><span class="insight-emoji">💡</span><span class="insight-text">No insights available yet.</span></div>`;
    return;
  }
  el.innerHTML = insights.map((ins, i) => `
    <div class="insight-item ${ins.type}" style="animation-delay:${i*.08}s">
      <span class="insight-emoji">${ins.icon}</span>
      <span class="insight-text">${ins.message}</span>
    </div>
  `).join("");
}

// ── Section switching (Patient) ───────────────────────────────────────────────
function showSection(name) {
  document.querySelectorAll("#page-patient .dash-section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll("#page-patient .nav-item").forEach(n => n.classList.remove("active"));
  document.getElementById(`section-${name}`).classList.add("active");

  const titles = { "my-records":"My Records", "add-record":"Add Record", "ai-insights":"AI Health Insights" };
  document.getElementById("topbar-title").textContent = titles[name] || "";

  const navMap = { "my-records":0, "add-record":1, "ai-insights":2 };
  const navItems = document.querySelectorAll("#page-patient .nav-item");
  if (navItems[navMap[name]]) navItems[navMap[name]].classList.add("active");
}

// ── Add record ────────────────────────────────────────────────────────────────
async function handleAddRecord() {
  const title   = document.getElementById("rec-title").value.trim();
  const desc    = document.getElementById("rec-desc").value.trim();
  const errEl   = document.getElementById("add-record-error");
  const sucEl   = document.getElementById("add-record-success");
  errEl.classList.add("hidden");
  sucEl.classList.add("hidden");

  if (!title) { showError(errEl, "Please enter a record title."); return; }
  if (!desc)  { showError(errEl, "Please enter a description."); return; }

  try {
    const res  = await fetch(`${API}/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientId: currentUser.id, patientName: currentUser.name, title, description: desc }),
    });
    const data = await res.json();
    if (!res.ok) { showError(errEl, data.error); return; }

    allRecords.unshift(data.record);
    allInsights = data.insights;
    renderPatientRecords(allRecords);
    renderInsights(data.insights, "patient-insights-list");
    renderPatientStats(allRecords);

    sucEl.textContent = "✓ Record saved successfully!";
    sucEl.classList.remove("hidden");
    clearForm();
    setTimeout(() => sucEl.classList.add("hidden"), 3000);
  } catch (e) {
    showError(errEl, "Failed to save. Is the backend running?");
  }
}

function clearForm() {
  document.getElementById("rec-title").value = "";
  document.getElementById("rec-desc").value  = "";
  document.getElementById("char-count").textContent = "0 / 1000";
}

// ── Delete record ─────────────────────────────────────────────────────────────
async function deleteRecord(id) {
  if (!confirm("Delete this record?")) return;
  try {
    await fetch(`${API}/records/${id}`, { method: "DELETE" });
    allRecords = allRecords.filter(r => r.id !== id);
    renderPatientRecords(allRecords);
    // Refresh insights
    const res  = await fetch(`${API}/records/my/${currentUser.id}`);
    const data = await res.json();
    allInsights = data.insights;
    renderInsights(data.insights, "patient-insights-list");
    renderPatientStats(allRecords);
  } catch(e) { alert("Delete failed."); }
}

// ── Filter records ────────────────────────────────────────────────────────────
function filterRecords() {
  const q = document.getElementById("search-input").value.toLowerCase();
  const filtered = allRecords.filter(r =>
    r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
  );
  renderPatientRecords(filtered);
}

// ── Doctor Dashboard ──────────────────────────────────────────────────────────
let doctorData = null;

async function setupDoctorDash() {
  const initials = currentUser.name.split(" ").map(n => n[0]).join("").substring(0,2);
  document.getElementById("doctor-topbar-avatar").textContent = initials;
  document.getElementById("doctor-sidebar-user-info").innerHTML = `
    <div class="s-name">${currentUser.name}</div>
    <div class="s-role">Doctor</div>
  `;
  await loadDoctorRecords();
  showDoctorSection("all-patients");
}

async function loadDoctorRecords() {
  try {
    const res  = await fetch(`${API}/records/all`);
    doctorData = await res.json();
    renderDoctorStats(doctorData);
    renderDoctorPatients(doctorData.patients);
    renderDoctorInsights(doctorData.patients);
  } catch (e) {
    console.error(e);
  }
}

function renderDoctorStats(data) {
  const container = document.getElementById("doctor-stats-row");
  container.innerHTML = `
    <div class="stat-card">
      <div class="stat-icon blue">👥</div>
      <div><div class="stat-num">${data.patients.length}</div><div class="stat-label">Patients</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon teal">📋</div>
      <div><div class="stat-num">${data.totalRecords}</div><div class="stat-label">Total Records</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon orange">🧠</div>
      <div><div class="stat-num">${data.patients.reduce((a,p) => a + p.insights.filter(i=>i.type==='warning').length, 0)}</div><div class="stat-label">Active Alerts</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon green">✅</div>
      <div><div class="stat-num">${data.patients.filter(p=>p.insights.every(i=>i.type!=='warning')).length}</div><div class="stat-label">Healthy Profiles</div></div>
    </div>
  `;
}

function renderDoctorPatients(patients) {
  const container = document.getElementById("doctor-patients-container");
  if (!patients.length) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">👥</div><p>No patient records found.</p></div>`;
    return;
  }
  container.innerHTML = patients.map((p, gi) => `
    <div class="patient-group" style="animation-delay:${gi*.07}s">
      <div class="patient-group-header" onclick="toggleGroup(${p.patientId})">
        <div class="pg-left">
          <div class="pg-avatar">${p.patientName.split(" ").map(n=>n[0]).join("").substring(0,2)}</div>
          <div>
            <div class="pg-name">${escHtml(p.patientName)}</div>
            <div class="pg-count">${p.records.length} record${p.records.length !== 1 ? "s" : ""} · ${p.insights.filter(i=>i.type==="warning").length} alert${p.insights.filter(i=>i.type==="warning").length !== 1 ? "s" : ""}</div>
          </div>
        </div>
        <span class="pg-chevron" id="chevron-${p.patientId}">▼</span>
      </div>
      <div class="patient-records-list collapsed" id="records-${p.patientId}">
        ${p.records.map((r, i) => `
          <div class="record-card" style="animation-delay:${i*.04}s">
            <div class="record-header">
              <div class="record-title">${escHtml(r.title)}</div>
              <div class="record-date">${formatDate(r.date)}</div>
            </div>
            <div class="record-desc">${escHtml(r.description)}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function toggleGroup(patientId) {
  const list = document.getElementById(`records-${patientId}`);
  const chev = document.getElementById(`chevron-${patientId}`);
  list.classList.toggle("collapsed");
  chev.classList.toggle("open");
}

function renderDoctorInsights(patients) {
  const container = document.getElementById("doctor-insights-list");
  const items = [];
  for (const p of patients) {
    for (const ins of p.insights) {
      items.push(`
        <div class="insight-item ${ins.type}">
          <span class="insight-emoji">${ins.icon}</span>
          <div>
            <div class="insight-patient-name">${p.patientName}</div>
            <span class="insight-text">${ins.message}</span>
          </div>
        </div>
      `);
    }
  }
  container.innerHTML = items.length ? items.join("") : `<div class="insight-item info"><span class="insight-emoji">✅</span><span class="insight-text">No health alerts across patients.</span></div>`;
}

function showDoctorSection(name) {
  document.querySelectorAll("#page-doctor .dash-section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll("#page-doctor .nav-item").forEach(n => n.classList.remove("active"));
  document.getElementById(`section-${name}`).classList.add("active");

  const titles = { "all-patients":"All Patients", "doctor-insights":"AI Insights Overview" };
  document.getElementById("doctor-topbar-title").textContent = titles[name] || "";

  const navItems = document.querySelectorAll("#page-doctor .nav-item");
  if (name === "all-patients" && navItems[0]) navItems[0].classList.add("active");
  if (name === "doctor-insights" && navItems[1]) navItems[1].classList.add("active");
}

function filterDoctorRecords() {
  const q = document.getElementById("doctor-search").value.toLowerCase();
  if (!doctorData) return;
  if (!q) { renderDoctorPatients(doctorData.patients); return; }
  const filtered = doctorData.patients.map(p => ({
    ...p,
    records: p.records.filter(r =>
      r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
    ),
  })).filter(p => p.records.length || p.patientName.toLowerCase().includes(q));
  renderDoctorPatients(filtered);
}

// ── Utilities ─────────────────────────────────────────────────────────────────
function escHtml(str) {
  const d = document.createElement("div");
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });
}

function showError(el, msg) {
  el.textContent = msg;
  el.classList.remove("hidden");
}

// Enter key on login
document.addEventListener("keydown", e => {
  if (e.key === "Enter" && document.getElementById("page-login").classList.contains("active")) {
    handleLogin();
  }
});
