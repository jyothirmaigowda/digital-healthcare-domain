/* ═══════════════════════════════════════════════
   CAREVAULT AI — FRONTEND JAVASCRIPT
   Pure localStorage-based for hackathon demo
═══════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────
   INITIAL DEMO DATA SEED
───────────────────────────────────────────── */
function seedDemoData() {
  if (localStorage.getItem('cv_seeded')) return;

  const users = [
    { username: 'patient1', password: 'Patient@123', name: 'Aarav Sharma', email: 'aarav@example.com', role: 'patient' },
    { username: 'patient2', password: 'Patient@123', name: 'Priya Mehta', email: 'priya@example.com', role: 'patient' },
    { username: 'patient3', password: 'Patient@123', name: 'Rohit Verma', email: 'rohit@example.com', role: 'patient' },
    { username: 'doctor1',  password: 'Doctor@123',  name: 'Dr. Neha Kapoor', email: 'neha@hospital.com', role: 'doctor' },
    { username: 'doctor2',  password: 'Doctor@123',  name: 'Dr. Anil Patel', email: 'anil@hospital.com', role: 'doctor' },
  ];
  localStorage.setItem('cv_users', JSON.stringify(users));

  const today = new Date();
  const daysAgo = d => new Date(today - d * 86400000).toISOString().split('T')[0];

  const records = [
    {
      id: 'r1', username: 'patient1', title: 'Complete Blood Count (CBC)', type: 'Lab Report',
      date: daysAgo(3), doctor: 'Dr. Neha Kapoor', file: null,
      description: 'Hemoglobin: 11.2 g/dL (Low). WBC: 11500/μL (slightly elevated). Platelet count: 150000. Patient reports fatigue and dizziness for 2 weeks. Possible iron deficiency anemia detected. Fasting glucose: 127 mg/dL (borderline high).',
      createdAt: new Date(today - 3 * 86400000).toISOString()
    },
    {
      id: 'r2', username: 'patient1', title: 'Diabetes Management Follow-up', type: 'Prescription',
      date: daysAgo(10), doctor: 'Dr. Neha Kapoor', file: null,
      description: 'HbA1c: 7.8%. Fasting blood sugar: 148 mg/dL. Blood pressure: 145/95 mmHg (hypertension noted). Prescribed Metformin 500mg twice daily. Diet counseling advised. Patient complains of frequent urination and excessive thirst.',
      createdAt: new Date(today - 10 * 86400000).toISOString()
    },
    {
      id: 'r3', username: 'patient1', title: 'Chest X-Ray Report', type: 'Radiology',
      date: daysAgo(21), doctor: 'Apollo Radiology Dept', file: null,
      description: 'PA view chest X-Ray performed. Mild cardiomegaly noted. No acute consolidation or pleural effusion. Lung fields appear clear. Bony thorax intact. Impression: mild cardiac enlargement, suggest echocardiography.',
      createdAt: new Date(today - 21 * 86400000).toISOString()
    },
    {
      id: 'r4', username: 'patient2', title: 'Thyroid Function Test (TFT)', type: 'Lab Report',
      date: daysAgo(5), doctor: 'Dr. Anil Patel', file: null,
      description: 'TSH: 0.2 mIU/L (low, indicating hyperthyroidism). T3: 220 ng/dL (high). T4: 14.8 μg/dL (elevated). Patient reports weight loss, palpitations, heat intolerance. Diagnosed with hyperthyroidism. Referred to endocrinologist.',
      createdAt: new Date(today - 5 * 86400000).toISOString()
    },
    {
      id: 'r5', username: 'patient2', title: 'Lipid Profile Test', type: 'Lab Report',
      date: daysAgo(15), doctor: 'City Diagnostics', file: null,
      description: 'Total Cholesterol: 240 mg/dL (High). LDL: 165 mg/dL (High). HDL: 38 mg/dL (Low). Triglycerides: 210 mg/dL (High). Patient has family history of cardiac disease. Advised lifestyle changes and medication.',
      createdAt: new Date(today - 15 * 86400000).toISOString()
    },
    {
      id: 'r6', username: 'patient3', title: 'COVID-19 Vaccination', type: 'Vaccination',
      date: daysAgo(90), doctor: 'PHC Vaccination Centre', file: null,
      description: 'Covishield (AstraZeneca) 2nd dose administered. No adverse reactions observed. Certificate issued. Vaccination complete. Booster due in 9 months.',
      createdAt: new Date(today - 90 * 86400000).toISOString()
    },
    {
      id: 'r7', username: 'patient3', title: 'Hospital Discharge Summary', type: 'Discharge Summary',
      date: daysAgo(30), doctor: 'Dr. Neha Kapoor', file: null,
      description: 'Patient admitted with high fever (104°F), severe dehydration, dengue fever confirmed (NS1 antigen positive). Platelet count dropped to 65000. IV fluids administered. Patient recovered after 5 days. Discharge BP: 118/78. Follow-up in 2 weeks.',
      createdAt: new Date(today - 30 * 86400000).toISOString()
    },
    {
      id: 'r8', username: 'patient1', title: 'Liver Function Test (LFT)', type: 'Lab Report',
      date: daysAgo(7), doctor: 'Metropolis Labs', file: null,
      description: 'SGOT: 52 U/L (slightly elevated). SGPT: 68 U/L (elevated). Alkaline Phosphatase: 110 U/L. Total Bilirubin: 1.2 mg/dL (normal). Serum Albumin: 3.8 g/dL. Mild liver enzyme elevation, possibly fatty liver. Alcohol intake assessment recommended.',
      createdAt: new Date(today - 7 * 86400000).toISOString()
    }
  ];
  localStorage.setItem('cv_records', JSON.stringify(records));
  localStorage.setItem('cv_seeded', 'true');
}

/* ─────────────────────────────────────────────
   PAGE NAVIGATION
───────────────────────────────────────────── */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  window.scrollTo(0, 0);
}

/* ─────────────────────────────────────────────
   SIDEBAR / TAB MANAGEMENT
───────────────────────────────────────────── */
function setActiveTab(el, tabId) {
  const sidebar = el.closest('.sidebar');
  sidebar.querySelectorAll('.snav-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
  const appMain = sidebar.nextElementSibling;
  appMain.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  const tab = document.getElementById(tabId);
  if (tab) tab.classList.add('active');

  // update header title
  const headerTitle = appMain.querySelector('.app-header-title');
  if (headerTitle) headerTitle.textContent = el.querySelector('span').textContent;

  // close sidebar on mobile
  if (window.innerWidth < 768) sidebar.classList.remove('open');
  return false;
}

function setActiveTabById(tabId) {
  const tab = document.getElementById(tabId);
  if (!tab) return;
  const appMain = tab.closest('.app-main');
  const sidebar = appMain.previousElementSibling;
  appMain.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  tab.classList.add('active');
  // match nav item
  const idx = Array.from(appMain.querySelectorAll('.tab-section')).indexOf(tab);
  sidebar.querySelectorAll('.snav-item').forEach((item, i) => {
    item.classList.toggle('active', i === idx);
  });
  const headerTitle = appMain.querySelector('.app-header-title');
  if (headerTitle) {
    const navItem = sidebar.querySelectorAll('.snav-item')[idx];
    if (navItem) headerTitle.textContent = navItem.querySelector('span').textContent;
  }
}

function toggleSidebar() {
  const openSidebars = document.querySelectorAll('.sidebar');
  openSidebars.forEach(s => {
    if (s.closest('#page-patient, #page-doctor') && 
        s.closest('.page.active')) {
      s.classList.toggle('open');
    }
  });
}

/* ─────────────────────────────────────────────
   AUTH HELPERS
───────────────────────────────────────────── */
function getUsers() { return JSON.parse(localStorage.getItem('cv_users') || '[]'); }
function saveUsers(u) { localStorage.setItem('cv_users', JSON.stringify(u)); }
function getCurrentUser() { return JSON.parse(sessionStorage.getItem('cv_current') || 'null'); }
function setCurrentUser(u) { sessionStorage.setItem('cv_current', JSON.stringify(u)); }

function toggleEye(icon, inputId) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

function selectRole(role) {
  document.getElementById('signup-role').value = role;
  document.getElementById('role-patient').classList.toggle('active', role === 'patient');
  document.getElementById('role-doctor').classList.toggle('active', role === 'doctor');
}

function checkUsername(input) {
  const val = input.value.trim();
  const hint = document.getElementById('username-check');
  if (!val) { hint.textContent = ''; return; }
  if (val.length < 3) { hint.textContent = 'Too short'; hint.className = 'field-hint err'; return; }
  const exists = getUsers().some(u => u.username === val);
  if (exists) { hint.textContent = '✕ Username taken'; hint.className = 'field-hint err'; }
  else { hint.textContent = '✓ Available'; hint.className = 'field-hint ok'; }
}

function checkPasswordStrength(input) {
  const val = input.value;
  const fill = document.getElementById('strength-fill');
  const label = document.getElementById('strength-label');
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const levels = [
    { pct: '0%', color: '', text: '' },
    { pct: '25%', color: '#f87171', text: 'Weak' },
    { pct: '50%', color: '#fb923c', text: 'Fair' },
    { pct: '75%', color: '#facc15', text: 'Good' },
    { pct: '100%', color: '#4ade80', text: 'Strong ✓' },
  ];
  const lv = levels[score];
  fill.style.width = lv.pct;
  fill.style.background = lv.color;
  label.textContent = lv.text;
  label.className = score < 2 ? 'field-hint err' : score < 4 ? 'field-hint' : 'field-hint ok';
}

function fillDemo(username, password) {
  document.getElementById('login-username').value = username;
  document.getElementById('login-password').value = password;
}

/* ─────────────────────────────────────────────
   LOGIN
───────────────────────────────────────────── */
function handleLogin() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  errEl.classList.add('hidden');

  if (!username || !password) {
    showError(errEl, 'Please fill in all fields.');
    return;
  }
  const user = getUsers().find(u => u.username === username && u.password === password);
  if (!user) {
    showError(errEl, 'Invalid username or password.');
    return;
  }
  setCurrentUser(user);
  showToast(`Welcome back, ${user.name}! 👋`, 'success');

  if (user.role === 'patient') {
    initPatientDashboard(user);
    showPage('page-patient');
  } else {
    initDoctorDashboard(user);
    showPage('page-doctor');
  }
}

/* ─────────────────────────────────────────────
   SIGNUP
───────────────────────────────────────────── */
function handleSignup() {
  const name     = document.getElementById('signup-name').value.trim();
  const username = document.getElementById('signup-username').value.trim();
  const email    = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const role     = document.getElementById('signup-role').value;
  const errEl    = document.getElementById('signup-error');
  const okEl     = document.getElementById('signup-success');
  errEl.classList.add('hidden');
  okEl.classList.add('hidden');

  if (!name || !username || !email || !password) {
    showError(errEl, 'Please fill in all required fields.'); return;
  }
  if (username.length < 3) {
    showError(errEl, 'Username must be at least 3 characters.'); return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError(errEl, 'Please enter a valid email address.'); return;
  }
  if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
    showError(errEl, 'Password must be 8+ chars with uppercase, number, and symbol.'); return;
  }
  const users = getUsers();
  if (users.some(u => u.username === username)) {
    showError(errEl, 'Username already taken. Please choose another.'); return;
  }
  users.push({ username, password, name, email, role });
  saveUsers(users);
  okEl.textContent = '✓ Account created successfully! Redirecting to login...';
  okEl.classList.remove('hidden');
  setTimeout(() => {
    showPage('page-login');
    fillDemo(username, password);
  }, 1500);
}

/* ─────────────────────────────────────────────
   FORGOT PASSWORD
───────────────────────────────────────────── */
function handleForgot() {
  const username = document.getElementById('forgot-username').value.trim();
  const msgEl    = document.getElementById('forgot-msg');
  msgEl.classList.add('hidden');
  if (!username) { showError(msgEl, 'Please enter your username.'); return; }
  const user = getUsers().find(u => u.username === username);
  msgEl.className = 'success-msg';
  msgEl.textContent = user
    ? `✓ Reset instructions sent to ${user.email.replace(/(.{2}).+(@.+)/, '$1***$2')}`
    : '✓ If that username exists, reset instructions have been sent.';
  msgEl.classList.remove('hidden');
}

/* ─────────────────────────────────────────────
   LOGOUT
───────────────────────────────────────────── */
function handleLogout() {
  sessionStorage.removeItem('cv_current');
  showToast('Logged out successfully.', 'success');
  showPage('page-landing');
}

/* ─────────────────────────────────────────────
   RECORDS HELPERS
───────────────────────────────────────────── */
function getRecords() { return JSON.parse(localStorage.getItem('cv_records') || '[]'); }
function saveRecords(r) { localStorage.setItem('cv_records', JSON.stringify(r)); }
function getUserRecords(username) { return getRecords().filter(r => r.username === username); }

/* ─────────────────────────────────────────────
   PATIENT DASHBOARD INIT
───────────────────────────────────────────── */
function initPatientDashboard(user) {
  document.getElementById('patient-greeting-name').textContent = user.name.split(' ')[0];
  document.getElementById('patient-username-display').textContent = user.name;
  document.getElementById('patient-avatar').textContent = user.name.charAt(0).toUpperCase();
  document.getElementById('upload-date').valueAsDate = new Date();
  refreshPatientStats(user.username);
  renderRecentRecords(user.username);
  renderHealthTags(user.username);
  renderRecordsGrid(user.username);
  renderTimeline(user.username);
}

function refreshPatientStats(username) {
  const records = getUserRecords(username);
  document.getElementById('stat-total-records').textContent = records.length;
  document.getElementById('stat-lab-records').textContent = records.filter(r => r.type === 'Lab Report').length;
  document.getElementById('stat-prescription-records').textContent = records.filter(r => r.type === 'Prescription').length;
  document.getElementById('stat-insights-count').textContent = records.length > 0 ? '✓' : '0';
}

function renderRecentRecords(username) {
  const records = getUserRecords(username).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  const el = document.getElementById('dash-recent-list');
  if (!records.length) { el.innerHTML = '<p style="color:var(--text-muted);font-size:0.88rem;">No records yet.</p>'; return; }
  el.innerHTML = records.map(r => `
    <div class="recent-item" onclick="openRecordModal('${r.id}')">
      <div class="recent-item-icon ${typeClass(r.type)}">${typeIcon(r.type)}</div>
      <div class="recent-item-info">
        <strong>${r.title}</strong>
        <span>${formatDate(r.date)}</span>
      </div>
      <span class="recent-item-type">${r.type}</span>
    </div>
  `).join('');
}

function renderHealthTags(username) {
  const records = getUserRecords(username);
  const tags = detectHealthTags(records);
  const el = document.getElementById('dash-health-tags');
  if (!tags.length) { el.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">Upload records to see health tags.</p>'; return; }
  el.innerHTML = tags.map(t => `<span class="health-tag ${t.cls}">${t.label}</span>`).join('');
}

/* ─────────────────────────────────────────────
   RECORDS GRID (PATIENT)
───────────────────────────────────────────── */
function renderRecordsGrid(username, filter = '') {
  let records = getUserRecords(username);
  const search = (document.getElementById('records-search')?.value || '').toLowerCase();
  const typeFilter = document.getElementById('records-filter-type')?.value || '';
  const sortVal = document.getElementById('records-filter-sort')?.value || 'newest';

  if (search) records = records.filter(r => r.title.toLowerCase().includes(search) || r.description.toLowerCase().includes(search));
  if (typeFilter) records = records.filter(r => r.type === typeFilter);
  if (sortVal === 'newest') records.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  else if (sortVal === 'oldest') records.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
  else records.sort((a,b) => a.title.localeCompare(b.title));

  const grid = document.getElementById('records-grid');
  const empty = document.getElementById('records-empty');
  if (!records.length) { grid.innerHTML = ''; empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  grid.innerHTML = records.map(r => recordCardHTML(r)).join('');
}

function filterRecords() {
  const user = getCurrentUser();
  if (user) renderRecordsGrid(user.username);
}

function recordCardHTML(r, showPatient = false) {
  const isCritical = isCriticalRecord(r);
  return `
    <div class="record-card glass-card ${isCritical ? 'critical' : ''}" onclick="openRecordModal('${r.id}')">
      <div class="rc-top">
        <span class="rc-type-badge ${typeBadgeClass(r.type)}">${r.type}</span>
        ${isCritical ? '<span class="rc-critical-badge"><i class="fa-solid fa-triangle-exclamation"></i> Critical</span>' : ''}
      </div>
      <div class="rc-title">${r.title}</div>
      <div class="rc-desc">${r.description}</div>
      <div class="rc-meta">
        <span class="rc-meta-date"><i class="fa-regular fa-calendar"></i> ${formatDate(r.date)}</span>
        ${showPatient ? `<span class="rc-patient-name"><i class="fa-solid fa-user"></i> ${getPatientName(r.username)}</span>` : `<span>${r.doctor || ''}</span>`}
      </div>
    </div>
  `;
}

/* ─────────────────────────────────────────────
   TIMELINE
───────────────────────────────────────────── */
function renderTimeline(username) {
  const records = getUserRecords(username).sort((a,b) => new Date(b.date) - new Date(a.date));
  const container = document.getElementById('timeline-container');
  const empty = document.getElementById('timeline-empty');
  if (!records.length) { container.innerHTML = ''; empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  container.innerHTML = records.map(r => `
    <div class="timeline-item">
      <div class="timeline-dot">
        <div class="timeline-dot-circle"></div>
      </div>
      <div class="timeline-content glass-card" onclick="openRecordModal('${r.id}')" style="cursor:pointer;">
        <div class="timeline-date"><i class="fa-regular fa-calendar"></i> ${formatDate(r.date)} &nbsp;·&nbsp; <span class="rc-type-badge ${typeBadgeClass(r.type)}" style="display:inline;padding:2px 8px;">${r.type}</span></div>
        <div class="timeline-title">${r.title}</div>
        <div class="timeline-desc">${r.description.substring(0,120)}${r.description.length > 120 ? '…' : ''}</div>
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────
   FILE UPLOAD
───────────────────────────────────────────── */
let selectedFile = null;

function handleFileSelect(input) {
  if (input.files && input.files[0]) {
    const f = input.files[0];
    selectedFile = f;
    showFilePreview(f);
  }
}

function handleFileDrop(e) {
  e.preventDefault();
  const f = e.dataTransfer.files[0];
  if (f) { selectedFile = f; showFilePreview(f); }
}

function showFilePreview(f) {
  const preview = document.getElementById('file-preview');
  preview.classList.remove('hidden');
  preview.innerHTML = `
    <i class="fa-solid fa-file"></i>
    <span>${f.name} (${(f.size/1024).toFixed(1)} KB)</span>
    <i class="fa-solid fa-xmark remove-file" onclick="removeFile()"></i>
  `;
  document.getElementById('file-drop-zone').style.borderColor = 'var(--accent)';
}

function removeFile() {
  selectedFile = null;
  document.getElementById('file-preview').classList.add('hidden');
  document.getElementById('upload-file').value = '';
  document.getElementById('file-drop-zone').style.borderColor = '';
}

/* ─────────────────────────────────────────────
   UPLOAD RECORD
───────────────────────────────────────────── */
function handleUploadRecord() {
  const user = getCurrentUser();
  const title  = document.getElementById('upload-title').value.trim();
  const type   = document.getElementById('upload-type').value;
  const date   = document.getElementById('upload-date').value;
  const doctor = document.getElementById('upload-doctor').value.trim();
  const desc   = document.getElementById('upload-desc').value.trim();
  const okEl   = document.getElementById('upload-success');
  const errEl  = document.getElementById('upload-error');
  okEl.classList.add('hidden');
  errEl.classList.add('hidden');

  if (!title || !type || !date || !desc) {
    showError(errEl, 'Please fill in all required fields (title, type, date, description).'); return;
  }

  const record = {
    id: 'r' + Date.now(),
    username: user.username,
    title, type, date, doctor,
    description: desc,
    file: selectedFile ? selectedFile.name : null,
    createdAt: new Date().toISOString()
  };

  const records = getRecords();
  records.push(record);
  saveRecords(records);

  okEl.textContent = '✓ Record uploaded successfully!';
  okEl.classList.remove('hidden');
  showToast(`Record "${title}" saved!`, 'success');

  // reset form
  document.getElementById('upload-title').value = '';
  document.getElementById('upload-type').value = '';
  document.getElementById('upload-date').valueAsDate = new Date();
  document.getElementById('upload-doctor').value = '';
  document.getElementById('upload-desc').value = '';
  removeFile();

  // refresh stats
  refreshPatientStats(user.username);
  renderRecentRecords(user.username);
  renderRecordsGrid(user.username);
  renderTimeline(user.username);
  renderHealthTags(user.username);

  setTimeout(() => okEl.classList.add('hidden'), 3000);
}

/* ─────────────────────────────────────────────
   RECORD MODAL
───────────────────────────────────────────── */
function openRecordModal(recordId) {
  const records = getRecords();
  const r = records.find(x => x.id === recordId);
  if (!r) return;

  const user = getCurrentUser();
  const isCritical = isCriticalRecord(r);

  const patientName = getPatientName(r.username);
  const showPatientRow = user && user.role === 'doctor' ? `
    <div class="modal-patient-row">
      <i class="fa-solid fa-user-injured"></i>
      <span>Patient: <strong>${patientName}</strong></span>
    </div>` : '';

  const deleteBtn = user && user.username === r.username ? `
    <button class="modal-delete-btn" onclick="deleteRecord('${r.id}')">
      <i class="fa-solid fa-trash"></i> Delete Record
    </button>` : '';

  document.getElementById('modal-content').innerHTML = `
    <span class="rc-type-badge modal-record-type ${typeBadgeClass(r.type)}">${r.type}</span>
    ${isCritical ? '<span class="rc-critical-badge" style="display:inline-flex;margin-left:8px;"><i class="fa-solid fa-triangle-exclamation"></i> Critical Attention Required</span>' : ''}
    <h2 class="modal-title">${r.title}</h2>
    <p class="modal-date"><i class="fa-regular fa-calendar"></i> ${formatDate(r.date)}${r.doctor ? ' &nbsp;·&nbsp; <i class="fa-solid fa-stethoscope"></i> ' + r.doctor : ''}</p>
    ${showPatientRow}
    <p class="modal-desc-label">Description / Findings</p>
    <div class="modal-desc">${r.description.replace(/\n/g, '<br>')}</div>
    ${r.file ? `<button class="modal-file-btn"><i class="fa-solid fa-paperclip"></i> Attached: ${r.file}</button>` : ''}
    ${deleteBtn}
  `;

  document.getElementById('record-modal').classList.remove('hidden');
}

function closeRecordModal() {
  document.getElementById('record-modal').classList.add('hidden');
}

function closeModal(e) {
  if (e.target.id === 'record-modal') closeRecordModal();
}

function deleteRecord(recordId) {
  if (!confirm('Are you sure you want to delete this record?')) return;
  const records = getRecords().filter(r => r.id !== recordId);
  saveRecords(records);
  closeRecordModal();
  const user = getCurrentUser();
  refreshPatientStats(user.username);
  renderRecentRecords(user.username);
  renderRecordsGrid(user.username);
  renderTimeline(user.username);
  renderHealthTags(user.username);
  showToast('Record deleted.', 'success');
}

/* ─────────────────────────────────────────────
   AI INSIGHTS ENGINE
───────────────────────────────────────────── */
function runAIAnalysis() {
  const user = getCurrentUser();
  const records = getUserRecords(user.username);
  const emptyEl   = document.getElementById('insights-empty');
  const loaderEl  = document.getElementById('insights-loader');
  const container = document.getElementById('insights-container');

  if (!records.length) {
    showToast('Upload some records first to get AI insights.', 'error'); return;
  }

  emptyEl.classList.add('hidden');
  container.innerHTML = '';
  loaderEl.classList.remove('hidden');

  setTimeout(() => {
    loaderEl.classList.add('hidden');
    const insights = generateAIInsights(records);
    container.innerHTML = insights.map(ins => insightCardHTML(ins)).join('');
    document.getElementById('stat-insights-count').textContent = insights.length;
    showToast(`${insights.length} insights generated!`, 'success');
  }, 1800);
}

function generateAIInsights(records) {
  const allText = records.map(r => r.description + ' ' + r.title).join(' ').toLowerCase();
  const insights = [];

  // Diabetes analysis
  if (/diabet|glucose|hba1c|sugar|insulin|metformin|fasting blood/.test(allText)) {
    const isHigh = /hba1c[:\s]+([89]|[1-9][0-9])|glucose[:\s]+1[4-9]\d|sugar.*high|borderline.*diabet/.test(allText);
    insights.push({
      icon: 'fa-solid fa-droplet',
      type: isHigh ? 'warning' : 'normal',
      title: 'Diabetes & Blood Sugar',
      summary: isHigh
        ? 'Elevated blood sugar levels detected in your records. Your HbA1c or fasting glucose values suggest pre-diabetic or diabetic range. Consistent monitoring and medication adherence is critical.'
        : 'Blood sugar indicators are present in your records. Values appear to be in a manageable range but continued monitoring is advised.',
      tags: isHigh ? ['Elevated Glucose', 'HbA1c Monitoring', 'Diet Control Needed'] : ['Glucose Tracked', 'Normal Range'],
      tagClass: isHigh ? 'ht-warning' : 'ht-normal'
    });
  }

  // Blood Pressure
  if (/blood pressure|bp|hypertension|systolic|diastolic|145\/|148\/|160\//.test(allText)) {
    const isHigh = /hypertension|145\/|148\/|150\/|160\/|high blood pressure/.test(allText);
    insights.push({
      icon: 'fa-solid fa-heart-pulse',
      type: isHigh ? 'critical' : 'normal',
      title: 'Blood Pressure Analysis',
      summary: isHigh
        ? '⚠️ Elevated blood pressure (hypertension) detected. Readings suggest Stage 1–2 hypertension. This significantly increases risk for heart disease and stroke. Immediate lifestyle changes and medical follow-up recommended.'
        : 'Blood pressure values are within acceptable range. Continue regular monitoring.',
      tags: isHigh ? ['Hypertension Detected', 'High Cardiovascular Risk', 'Urgent Follow-up'] : ['BP Normal', 'Heart Health OK'],
      tagClass: isHigh ? 'ht-critical' : 'ht-normal'
    });
  }

  // Anemia
  if (/hemoglobin|anemia|anaemia|haemoglobin|iron deficiency|fatigue|dizziness/.test(allText)) {
    const isLow = /hemoglobin[:\s]+1[01]\.|anemia|iron deficiency/.test(allText);
    insights.push({
      icon: 'fa-solid fa-vial',
      type: isLow ? 'warning' : 'normal',
      title: 'Blood & Iron Levels',
      summary: isLow
        ? 'Low hemoglobin levels detected, suggesting possible iron-deficiency anemia. Symptoms like fatigue and dizziness align with this finding. Iron supplementation and dietary changes are recommended.'
        : 'Blood count values are present in your records and appear within range.',
      tags: isLow ? ['Low Hemoglobin', 'Anemia Possible', 'Iron Supplement Advised'] : ['CBC Normal'],
      tagClass: isLow ? 'ht-warning' : 'ht-normal'
    });
  }

  // Cholesterol
  if (/cholesterol|ldl|hdl|triglyceride|lipid/.test(allText)) {
    const isHigh = /cholesterol[:\s]+2[4-9]\d|ldl[:\s]+1[6-9]\d|triglyceride[:\s]+2[01]\d/.test(allText);
    insights.push({
      icon: 'fa-solid fa-chart-line',
      type: isHigh ? 'critical' : 'normal',
      title: 'Cholesterol & Lipid Profile',
      summary: isHigh
        ? 'High cholesterol (LDL > 160 mg/dL) and elevated triglycerides detected. This combination poses a significant risk for coronary artery disease. Statin therapy and dietary intervention should be discussed with your cardiologist.'
        : 'Lipid profile is within normal limits. Maintain a heart-healthy diet.',
      tags: isHigh ? ['High LDL', 'High Triglycerides', 'Cardiac Risk Elevated', 'See Cardiologist'] : ['Lipids Normal', 'Low Risk'],
      tagClass: isHigh ? 'ht-critical' : 'ht-normal'
    });
  }

  // Thyroid
  if (/thyroid|tsh|t3|t4|hyperthyroid|hypothyroid/.test(allText)) {
    const isAbnormal = /tsh[:\s]+0\.[0-2]|hyperthyroid|low tsh/.test(allText);
    insights.push({
      icon: 'fa-solid fa-stethoscope',
      type: isAbnormal ? 'warning' : 'info',
      title: 'Thyroid Function',
      summary: isAbnormal
        ? 'Abnormal thyroid hormone levels detected. Low TSH with elevated T3/T4 suggests hyperthyroidism. Symptoms like weight loss, palpitations, and heat intolerance noted. Endocrinology consultation strongly recommended.'
        : 'Thyroid function test results are present. Monitor values as advised by your doctor.',
      tags: isAbnormal ? ['Hyperthyroidism Detected', 'Endocrinology Referral', 'Medication Review'] : ['Thyroid Monitored'],
      tagClass: isAbnormal ? 'ht-warning' : 'ht-normal'
    });
  }

  // Liver
  if (/liver|sgot|sgpt|bilirubin|alkaline phosphatase|lft|hepatic/.test(allText)) {
    const isAbnormal = /sgpt[:\s]+[5-9]\d|sgot[:\s]+[5-9]\d|elevated.*liver/.test(allText);
    insights.push({
      icon: 'fa-solid fa-flask',
      type: isAbnormal ? 'warning' : 'normal',
      title: 'Liver Function',
      summary: isAbnormal
        ? 'Mildly elevated liver enzymes (SGOT/SGPT) detected. This could indicate fatty liver disease, alcohol-related changes, or medication effects. Avoid alcohol, maintain healthy weight, and repeat test in 3 months.'
        : 'Liver function values are within normal limits.',
      tags: isAbnormal ? ['Elevated Enzymes', 'Fatty Liver Possible', 'Avoid Alcohol'] : ['Liver Normal'],
      tagClass: isAbnormal ? 'ht-warning' : 'ht-normal'
    });
  }

  // Fever/Infection
  if (/fever|dengue|malaria|infection|wbc|white blood cell|elevated wbc/.test(allText)) {
    insights.push({
      icon: 'fa-solid fa-temperature-high',
      type: 'warning',
      title: 'Infection & Fever History',
      summary: 'Records indicate past or current infection events including fever. Elevated WBC count or specific illness markers (e.g., dengue) have been noted. Ensure complete recovery and follow post-illness monitoring schedule.',
      tags: ['Infection History', 'Immunity Monitoring', 'Follow-up Advised'],
      tagClass: 'ht-warning'
    });
  }

  // Vaccination
  if (/vaccin|immuniz|covishield|covaxin|hepatitis|typhoid/.test(allText)) {
    insights.push({
      icon: 'fa-solid fa-syringe',
      type: 'normal',
      title: 'Vaccination Status',
      summary: 'Vaccination records are present in your health vault. Staying up to date with immunizations is one of the best ways to protect your health. Review your vaccination schedule for any upcoming boosters.',
      tags: ['Vaccinations Recorded', 'Immunization Active'],
      tagClass: 'ht-normal'
    });
  }

  // Radiology / Heart
  if (/x.ray|cardiomegaly|cardiac|echocardiography|heart|radiology/.test(allText)) {
    insights.push({
      icon: 'fa-solid fa-x-ray',
      type: 'info',
      title: 'Cardiac & Radiology Findings',
      summary: 'Radiology reports in your records mention cardiac or structural findings. Cardiomegaly or other imaging findings warrant follow-up with a cardiologist. Ensure all recommended imaging follow-ups are scheduled.',
      tags: ['Radiology Reviewed', 'Cardiac Follow-up', 'Echocardiogram Suggested'],
      tagClass: 'ht-warning'
    });
  }

  // General health summary
  insights.push({
    icon: 'fa-solid fa-shield-heart',
    type: 'info',
    title: 'Overall Health Summary',
    summary: `Based on ${records.length} health record(s) analyzed, your CareVault AI has identified ${insights.length} health areas requiring attention. Regular monitoring of flagged conditions and timely doctor consultations are strongly recommended. Your health data is safely stored and accessible to your healthcare providers.`,
    tags: [`${records.length} Records Analyzed`, `${insights.filter(i=>i.type==='critical').length} Critical`, `${insights.filter(i=>i.type==='warning').length} Warnings`],
    tagClass: 'ht-normal'
  });

  return insights;
}

function insightCardHTML(ins) {
  const tagHTML = ins.tags.map(t => `<span class="insight-tag ${ins.tagClass}">${t}</span>`).join('');
  return `
    <div class="insight-card glass-card insight-${ins.type}">
      <div class="insight-header">
        <div class="insight-icon"><i class="${ins.icon}"></i></div>
        <div>
          <div class="insight-title">${ins.title}</div>
          <div class="insight-sub">${ins.type.charAt(0).toUpperCase() + ins.type.slice(1)} Priority</div>
        </div>
      </div>
      <div class="insight-body">
        <p>${ins.summary}</p>
        <div class="insight-tags">${tagHTML}</div>
      </div>
    </div>
  `;
}

/* ─────────────────────────────────────────────
   DOCTOR DASHBOARD
───────────────────────────────────────────── */
function initDoctorDashboard(user) {
  document.getElementById('doctor-greeting-name').textContent = user.name;
  document.getElementById('doctor-username-display').textContent = user.name;
  document.getElementById('doctor-avatar').textContent = user.name.charAt(0).toUpperCase();

  const allRecords = getRecords();
  const allPatients = getUsers().filter(u => u.role === 'patient');
  const today = new Date().toISOString().split('T')[0];
  const criticals = allRecords.filter(isCriticalRecord);
  const todayRecords = allRecords.filter(r => r.createdAt && r.createdAt.startsWith(today));

  document.getElementById('doc-stat-patients').textContent = allPatients.length;
  document.getElementById('doc-stat-records').textContent = allRecords.length;
  document.getElementById('doc-stat-critical').textContent = criticals.length;
  document.getElementById('doc-stat-today').textContent = todayRecords.length;

  if (criticals.length > 0) document.getElementById('critical-badge').style.display = 'block';

  // Activity list
  const activityRecords = allRecords.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);
  const actEl = document.getElementById('doc-activity-list');
  actEl.innerHTML = activityRecords.map(r => `
    <div class="recent-item" onclick="openRecordModal('${r.id}')">
      <div class="recent-item-icon ${typeClass(r.type)}">${typeIcon(r.type)}</div>
      <div class="recent-item-info">
        <strong>${r.title}</strong>
        <span>${getPatientName(r.username)} · ${formatDate(r.date)}</span>
      </div>
      <span class="recent-item-type">${r.type}</span>
    </div>
  `).join('');

  renderDocPatients(allPatients);
  renderDocRecords(allRecords);
  renderCriticalCases(criticals);
}

function renderDocPatients(patients) {
  const grid = document.getElementById('doc-patients-grid');
  const allRecords = getRecords();
  grid.innerHTML = patients.map(p => {
    const pRecords = allRecords.filter(r => r.username === p.username);
    const critCount = pRecords.filter(isCriticalRecord).length;
    return `
      <div class="patient-card glass-card">
        <div class="patient-card-avatar">${p.name.charAt(0)}</div>
        <div class="patient-card-name">${p.name}</div>
        <div class="patient-card-meta">${p.email}</div>
        <div class="patient-card-counts">
          <div class="pcc"><span>${pRecords.length}</span><label>Records</label></div>
          <div class="pcc"><span style="color:var(--danger)">${critCount}</span><label>Critical</label></div>
        </div>
      </div>
    `;
  }).join('');
  if (!patients.length) grid.innerHTML = '<p style="color:var(--text-muted);padding:20px;">No patients registered.</p>';
}

function renderDocRecords(records) {
  const grid = document.getElementById('doc-records-grid');
  grid.innerHTML = records.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(r => recordCardHTML(r, true)).join('');
  if (!records.length) grid.innerHTML = '<p style="color:var(--text-muted);padding:20px;">No records found.</p>';
}

function renderCriticalCases(criticals) {
  const grid = document.getElementById('critical-grid');
  const empty = document.getElementById('critical-empty');
  if (!criticals.length) { grid.innerHTML = ''; empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  grid.innerHTML = criticals.map(r => recordCardHTML(r, true)).join('');
}

function filterDocPatients() {
  const search = document.getElementById('doc-patient-search').value.toLowerCase();
  const patients = getUsers().filter(u => u.role === 'patient' && (u.name.toLowerCase().includes(search) || u.username.toLowerCase().includes(search)));
  renderDocPatients(patients);
}

function filterDocRecords() {
  let records = getRecords();
  const search = document.getElementById('doc-records-search').value.toLowerCase();
  const typeFilter = document.getElementById('doc-records-filter').value;
  if (search) records = records.filter(r => r.title.toLowerCase().includes(search) || getPatientName(r.username).toLowerCase().includes(search));
  if (typeFilter) records = records.filter(r => r.type === typeFilter);
  renderDocRecords(records);
}

/* ─────────────────────────────────────────────
   UTILITY FUNCTIONS
───────────────────────────────────────────── */
function detectHealthTags(records) {
  const text = records.map(r => r.description + ' ' + r.title).join(' ').toLowerCase();
  const tags = [];
  if (/diabet|glucose.*high|hba1c.*[789]/.test(text)) tags.push({ label: '⚠ Diabetes Risk', cls: 'ht-warning' });
  if (/hypertension|high blood pressure|bp.*14[5-9]/.test(text)) tags.push({ label: '⚠ Hypertension', cls: 'ht-critical' });
  if (/anemia|low hemoglobin/.test(text)) tags.push({ label: '⚠ Anemia', cls: 'ht-warning' });
  if (/high cholesterol|ldl.*1[6-9]/.test(text)) tags.push({ label: '⚠ High Cholesterol', cls: 'ht-warning' });
  if (/vaccin/.test(text)) tags.push({ label: '✓ Vaccinated', cls: 'ht-normal' });
  if (/thyroid/.test(text)) tags.push({ label: '⚠ Thyroid Issue', cls: 'ht-warning' });
  if (!tags.length) tags.push({ label: '✓ No Critical Flags', cls: 'ht-normal' });
  return tags;
}

function isCriticalRecord(r) {
  const text = (r.description + ' ' + r.title).toLowerCase();
  return /critical|emergency|urgent|severe|dengue|platelet.*6[0-5]|bp.*16|hypertension|chest pain|stroke|cardiac|cardiomegaly|hba1c.*[89]|high fever|104/.test(text);
}

function getPatientName(username) {
  const user = getUsers().find(u => u.username === username);
  return user ? user.name : username;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function typeClass(type) {
  const map = {
    'Lab Report': 'sc-blue', 'Prescription': 'sc-purple', 'Radiology': 'sc-orange',
    'Discharge Summary': 'sc-red', 'Vaccination': 'sc-green', 'Other': ''
  };
  return map[type] || '';
}

function typeIcon(type) {
  const map = {
    'Lab Report': '<i class="fa-solid fa-vial"></i>',
    'Prescription': '<i class="fa-solid fa-pills"></i>',
    'Radiology': '<i class="fa-solid fa-x-ray"></i>',
    'Discharge Summary': '<i class="fa-solid fa-hospital"></i>',
    'Vaccination': '<i class="fa-solid fa-syringe"></i>',
    'Other': '<i class="fa-solid fa-file-medical"></i>'
  };
  return map[type] || '<i class="fa-solid fa-file-medical"></i>';
}

function typeBadgeClass(type) {
  const map = {
    'Lab Report': 'type-lab', 'Prescription': 'type-prescription',
    'Radiology': 'type-radiology', 'Discharge Summary': 'type-discharge',
    'Vaccination': 'type-vaccination', 'Other': 'type-other'
  };
  return map[type] || 'type-other';
}

function showError(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 4000);
}

function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast toast-${type}`;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3500);
}

function toggleTheme() {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  showToast(`Switched to ${html.dataset.theme} mode`, 'success');
}

/* ─────────────────────────────────────────────
   KEYBOARD SHORTCUTS
───────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('record-modal');
    if (!modal.classList.contains('hidden')) closeRecordModal();
  }
  if (e.key === 'Enter') {
    const activePage = document.querySelector('.page.active');
    if (activePage?.id === 'page-login') handleLogin();
    if (activePage?.id === 'page-signup') handleSignup();
  }
});

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  seedDemoData();

  // Auto-login if session exists
  const current = getCurrentUser();
  if (current) {
    if (current.role === 'patient') {
      initPatientDashboard(current);
      showPage('page-patient');
    } else {
      initDoctorDashboard(current);
      showPage('page-doctor');
    }
  } else {
    showPage('page-landing');
  }
});
