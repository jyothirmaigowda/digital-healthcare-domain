<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HealthPortal – Digital Health Records</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>

<!-- ═══════════════════════════ LOGIN PAGE ═══════════════════════════ -->
<div id="page-login" class="page active">
  <div class="login-bg">
    <div class="login-blob blob1"></div>
    <div class="login-blob blob2"></div>
    <div class="login-blob blob3"></div>
  </div>

  <div class="login-card">
    <div class="login-brand">
      <span class="brand-icon">⚕</span>
      <h1 class="brand-name">HealthPortal</h1>
      <p class="brand-sub">Secure Digital Health Records</p>
    </div>

    <div class="role-tabs">
      <button class="role-tab active" data-role="patient" onclick="selectRole('patient')">
        <span class="tab-icon">🧑‍⚕️</span> Patient
      </button>
      <button class="role-tab" data-role="doctor" onclick="selectRole('doctor')">
        <span class="tab-icon">👨‍⚕️</span> Doctor
      </button>
    </div>

    <div class="login-form">
      <div class="field">
        <label>Email Address</label>
        <input id="login-email" type="email" placeholder="your@email.com" />
      </div>
      <div class="field">
        <label>Password</label>
        <input id="login-password" type="password" placeholder="••••••••" />
      </div>

      <div id="login-error" class="login-error hidden"></div>

      <button class="btn-primary full" onclick="handleLogin()">
        <span>Sign In</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>

    <div class="demo-hints">
      <p class="hint-label">Demo credentials</p>
      <div class="hint-grid">
        <div class="hint-item" onclick="fillCreds('alice@demo.com','patient123','patient')">
          <span class="hint-role">Patient</span>
          <span>alice@demo.com / patient123</span>
        </div>
        <div class="hint-item" onclick="fillCreds('bob@demo.com','patient123','patient')">
          <span class="hint-role">Patient</span>
          <span>bob@demo.com / patient123</span>
        </div>
        <div class="hint-item" onclick="fillCreds('doctor@demo.com','doctor123','doctor')">
          <span class="hint-role">Doctor</span>
          <span>doctor@demo.com / doctor123</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ════════════════════════ PATIENT DASHBOARD ════════════════════════ -->
<div id="page-patient" class="page">

  <!-- Sidebar -->
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
      <span class="brand-icon small">⚕</span>
      <span class="sidebar-brand-name">HealthPortal</span>
    </div>

    <nav class="sidebar-nav">
      <a class="nav-item active" onclick="showSection('my-records')">
        <span class="nav-icon">📋</span><span>My Records</span>
      </a>
      <a class="nav-item" onclick="showSection('add-record')">
        <span class="nav-icon">➕</span><span>Add Record</span>
      </a>
      <a class="nav-item" onclick="showSection('ai-insights')">
        <span class="nav-icon">🧠</span><span>AI Insights</span>
      </a>
    </nav>

    <div class="sidebar-user" id="sidebar-user-info"></div>
    <button class="btn-logout" onclick="handleLogout()">
      <span>↩</span> Logout
    </button>
  </aside>

  <!-- Main -->
  <main class="main-content">
    <header class="topbar">
      <div class="topbar-left">
        <h2 class="topbar-title" id="topbar-title">My Records</h2>
        <span class="topbar-date" id="topbar-date"></span>
      </div>
      <div class="topbar-right">
        <div class="search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input id="search-input" type="text" placeholder="Search records…" oninput="filterRecords()" />
        </div>
        <div class="avatar" id="topbar-avatar"></div>
      </div>
    </header>

    <!-- My Records Section -->
    <section id="section-my-records" class="dash-section active">
      <div class="stats-row" id="patient-stats-row"></div>
      <div class="records-grid" id="patient-records-grid">
        <div class="empty-state">
          <div class="empty-icon">📂</div>
          <p>No records yet. Add your first record!</p>
        </div>
      </div>
    </section>

    <!-- Add Record Section -->
    <section id="section-add-record" class="dash-section">
      <div class="form-card">
        <div class="form-card-header">
          <h3>New Medical Record</h3>
          <p>Add details about your health visit or condition</p>
        </div>
        <div class="field">
          <label>Record Title <span class="req">*</span></label>
          <input id="rec-title" type="text" placeholder="e.g. Annual checkup, Fever, Blood test…" maxlength="100" />
        </div>
        <div class="field">
          <label>Description <span class="req">*</span></label>
          <textarea id="rec-desc" placeholder="Describe symptoms, diagnosis, medications, or doctor notes…" rows="6" maxlength="1000"></textarea>
          <span class="char-count" id="char-count">0 / 1000</span>
        </div>
        <div id="add-record-error" class="login-error hidden"></div>
        <div id="add-record-success" class="success-msg hidden"></div>
        <div class="form-actions">
          <button class="btn-secondary" onclick="clearForm()">Clear</button>
          <button class="btn-primary" onclick="handleAddRecord()">
            <span>Save Record</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- AI Insights Section -->
    <section id="section-ai-insights" class="dash-section">
      <div class="insights-hero">
        <div class="insights-hero-icon">🧠</div>
        <div>
          <h3>AI Health Insights</h3>
          <p>Pattern analysis based on your medical history</p>
        </div>
      </div>
      <div id="patient-insights-list" class="insights-list"></div>
      <div class="insights-disclaimer">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        AI insights are based on keyword analysis and are not a substitute for professional medical advice.
      </div>
    </section>
  </main>
</div>

<!-- ════════════════════════ DOCTOR DASHBOARD ════════════════════════ -->
<div id="page-doctor" class="page">

  <aside class="sidebar doctor-sidebar" id="doctor-sidebar">
    <div class="sidebar-brand">
      <span class="brand-icon small">⚕</span>
      <span class="sidebar-brand-name">HealthPortal</span>
    </div>
    <nav class="sidebar-nav">
      <a class="nav-item active" onclick="showDoctorSection('all-patients')">
        <span class="nav-icon">👥</span><span>All Patients</span>
      </a>
      <a class="nav-item" onclick="showDoctorSection('doctor-insights')">
        <span class="nav-icon">🧠</span><span>Insights Overview</span>
      </a>
    </nav>
    <div class="sidebar-user" id="doctor-sidebar-user-info"></div>
    <button class="btn-logout" onclick="handleLogout()">
      <span>↩</span> Logout
    </button>
  </aside>

  <main class="main-content">
    <header class="topbar">
      <div class="topbar-left">
        <h2 class="topbar-title" id="doctor-topbar-title">All Patients</h2>
        <span class="topbar-date" id="doctor-topbar-date"></span>
      </div>
      <div class="topbar-right">
        <div class="search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input id="doctor-search" type="text" placeholder="Search patients or records…" oninput="filterDoctorRecords()" />
        </div>
        <div class="avatar doctor-av" id="doctor-topbar-avatar"></div>
      </div>
    </header>

    <!-- All Patients -->
    <section id="section-all-patients" class="dash-section active">
      <div class="stats-row" id="doctor-stats-row"></div>
      <div id="doctor-patients-container"></div>
    </section>

    <!-- Doctor Insights Overview -->
    <section id="section-doctor-insights" class="dash-section">
      <div class="insights-hero doctor">
        <div class="insights-hero-icon">🧠</div>
        <div>
          <h3>AI Insights Overview</h3>
          <p>Cross-patient health pattern analysis</p>
        </div>
      </div>
      <div id="doctor-insights-list" class="insights-list"></div>
    </section>
  </main>
</div>

<script src="script.js"></script>
</body>
</html>
