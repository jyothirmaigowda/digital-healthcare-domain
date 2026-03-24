/* ═══════════════════════════════════════════════════════════════
   HealthPortal — CSS
   Aesthetic: Clinical Luxury — deep navy + warm ivory + teal accent
   Fonts: DM Serif Display + DM Sans
═══════════════════════════════════════════════════════════════ */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --navy:      #0f1f3d;
  --navy-mid:  #162847;
  --navy-lt:   #1e3560;
  --teal:      #00b4a6;
  --teal-lt:   #00d4c3;
  --teal-dim:  rgba(0,180,166,.12);
  --ivory:     #f7f4ef;
  --ivory-dk:  #eee9e0;
  --white:     #ffffff;
  --text-1:    #0f1f3d;
  --text-2:    #4a5568;
  --text-3:    #8a97aa;
  --red:       #e05353;
  --green:     #2ecc8e;
  --orange:    #f0924a;
  --yellow:    #f5c842;
  --card-bg:   #ffffff;
  --border:    rgba(15,31,61,.09);
  --shadow-sm: 0 2px 8px rgba(15,31,61,.07);
  --shadow-md: 0 6px 24px rgba(15,31,61,.11);
  --shadow-lg: 0 16px 48px rgba(15,31,61,.15);
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --sidebar-w: 240px;
  --topbar-h:  72px;
  --transition: .2s cubic-bezier(.4,0,.2,1);
}

html, body {
  height: 100%;
  font-family: 'DM Sans', sans-serif;
  background: var(--ivory);
  color: var(--text-1);
  font-size: 15px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}

/* ── Pages ──────────────────────────────────────────────────── */
.page { display: none; height: 100vh; }
.page.active { display: flex; }

/* ── Login ──────────────────────────────────────────────────── */
#page-login {
  align-items: center;
  justify-content: center;
  background: var(--navy);
  position: relative;
  overflow: hidden;
}

.login-bg { position: absolute; inset: 0; pointer-events: none; }
.login-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: .35;
}
.blob1 { width: 500px; height: 500px; background: var(--teal); top: -150px; right: -100px; }
.blob2 { width: 400px; height: 400px; background: #2d5be3; bottom: -100px; left: -80px; }
.blob3 { width: 300px; height: 300px; background: #9b2dca; top: 40%; left: 40%; opacity: .2; }

.login-card {
  position: relative;
  z-index: 1;
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 44px 40px 36px;
  width: 100%;
  max-width: 440px;
  box-shadow: var(--shadow-lg), 0 0 0 1px rgba(255,255,255,.1);
  animation: slideUp .5s cubic-bezier(.4,0,.2,1) both;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.login-brand { text-align: center; margin-bottom: 28px; }
.brand-icon { font-size: 2.2rem; display: block; margin-bottom: 8px; }
.brand-icon.small { font-size: 1.4rem; display: inline; }
.brand-name {
  font-family: 'DM Serif Display', serif;
  font-size: 1.9rem;
  color: var(--navy);
  letter-spacing: -.03em;
}
.brand-sub { color: var(--text-3); font-size: .875rem; margin-top: 4px; }

/* Role tabs */
.role-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  background: var(--ivory);
  border-radius: var(--radius-sm);
  padding: 5px;
  margin-bottom: 24px;
}
.role-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: var(--text-2);
  font-family: 'DM Sans', sans-serif;
  font-size: .9rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}
.role-tab.active {
  background: var(--white);
  color: var(--navy);
  box-shadow: var(--shadow-sm);
  font-weight: 600;
}
.tab-icon { font-size: 1.1rem; }

/* Form fields */
.field { margin-bottom: 18px; }
.field label {
  display: block;
  font-size: .82rem;
  font-weight: 600;
  color: var(--text-2);
  text-transform: uppercase;
  letter-spacing: .06em;
  margin-bottom: 7px;
}
.field input,
.field textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: 'DM Sans', sans-serif;
  font-size: .95rem;
  color: var(--text-1);
  background: var(--ivory);
  transition: var(--transition);
  outline: none;
  resize: vertical;
}
.field input:focus,
.field textarea:focus {
  border-color: var(--teal);
  background: var(--white);
  box-shadow: 0 0 0 3px var(--teal-dim);
}
.field textarea { min-height: 130px; line-height: 1.6; }
.req { color: var(--red); }
.char-count { font-size: .78rem; color: var(--text-3); float: right; margin-top: 4px; }

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 26px;
  background: var(--navy);
  color: var(--white);
  border: none;
  border-radius: var(--radius-sm);
  font-family: 'DM Sans', sans-serif;
  font-size: .95rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
}
.btn-primary:hover {
  background: var(--navy-lt);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
.btn-primary.full { width: 100%; justify-content: center; }

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  background: transparent;
  color: var(--text-2);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: 'DM Sans', sans-serif;
  font-size: .93rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}
.btn-secondary:hover { background: var(--ivory-dk); color: var(--text-1); }

/* Error / success */
.login-error {
  padding: 11px 14px;
  border-radius: var(--radius-sm);
  background: #fff0f0;
  color: var(--red);
  font-size: .88rem;
  margin-bottom: 14px;
  border: 1px solid #ffd6d6;
}
.success-msg {
  padding: 11px 14px;
  border-radius: var(--radius-sm);
  background: #eafff6;
  color: #1a9966;
  font-size: .88rem;
  margin-bottom: 14px;
  border: 1px solid #b6f0d4;
}
.hidden { display: none !important; }

/* Demo hints */
.demo-hints { margin-top: 28px; border-top: 1px solid var(--border); padding-top: 20px; }
.hint-label { font-size: .78rem; font-weight: 600; color: var(--text-3); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 10px; }
.hint-grid { display: flex; flex-direction: column; gap: 7px; }
.hint-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  background: var(--ivory);
  border-radius: 8px;
  font-size: .82rem;
  color: var(--text-2);
  cursor: pointer;
  transition: var(--transition);
}
.hint-item:hover { background: var(--ivory-dk); }
.hint-role {
  font-weight: 600;
  font-size: .75rem;
  padding: 2px 8px;
  border-radius: 20px;
  background: var(--navy);
  color: var(--white);
  white-space: nowrap;
}

/* ── Layout: Sidebar + Main ─────────────────────────────────── */
#page-patient, #page-doctor {
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: var(--sidebar-w);
  min-width: var(--sidebar-w);
  background: var(--navy);
  display: flex;
  flex-direction: column;
  padding: 28px 16px 20px;
  gap: 0;
  position: relative;
  overflow: hidden;
}
.sidebar::before {
  content: '';
  position: absolute;
  top: -60px; right: -60px;
  width: 200px; height: 200px;
  background: var(--teal);
  border-radius: 50%;
  filter: blur(80px);
  opacity: .18;
  pointer-events: none;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  margin-bottom: 32px;
}
.sidebar-brand-name {
  font-family: 'DM Serif Display', serif;
  font-size: 1.15rem;
  color: var(--white);
  letter-spacing: -.02em;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 12px;
  border-radius: var(--radius-sm);
  color: rgba(255,255,255,.55);
  font-size: .9rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
  user-select: none;
}
.nav-item:hover { background: rgba(255,255,255,.08); color: rgba(255,255,255,.85); }
.nav-item.active { background: var(--teal); color: var(--white); font-weight: 600; }
.nav-icon { font-size: 1.05rem; width: 20px; text-align: center; }

.sidebar-user {
  padding: 14px 10px 10px;
  border-top: 1px solid rgba(255,255,255,.08);
  margin-top: 12px;
  margin-bottom: 10px;
}
.sidebar-user .s-name { color: var(--white); font-weight: 600; font-size: .9rem; }
.sidebar-user .s-role {
  font-size: .75rem;
  color: var(--teal);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: .06em;
  margin-top: 2px;
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--radius-sm);
  color: rgba(255,255,255,.55);
  font-family: 'DM Sans', sans-serif;
  font-size: .88rem;
  cursor: pointer;
  transition: var(--transition);
}
.btn-logout:hover { background: rgba(224,83,83,.25); color: #ff9a9a; }

/* ── Main content ───────────────────────────────────────────── */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--ivory);
}

/* Top bar */
.topbar {
  height: var(--topbar-h);
  background: var(--white);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  flex-shrink: 0;
  box-shadow: var(--shadow-sm);
}
.topbar-left { display: flex; flex-direction: column; gap: 1px; }
.topbar-title {
  font-family: 'DM Serif Display', serif;
  font-size: 1.35rem;
  color: var(--navy);
  letter-spacing: -.02em;
}
.topbar-date { font-size: .78rem; color: var(--text-3); }
.topbar-right { display: flex; align-items: center; gap: 14px; }

.search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--ivory);
  border: 1.5px solid var(--border);
  border-radius: 8px;
  padding: 8px 12px;
}
.search-wrap svg { color: var(--text-3); flex-shrink: 0; }
.search-wrap input {
  border: none;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: .88rem;
  color: var(--text-1);
  outline: none;
  width: 180px;
}

.avatar {
  width: 38px; height: 38px;
  border-radius: 50%;
  background: var(--navy);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: .9rem;
  flex-shrink: 0;
}
.avatar.doctor-av { background: var(--teal); }

/* Sections */
.dash-section {
  display: none;
  flex: 1;
  overflow-y: auto;
  padding: 28px 28px 40px;
}
.dash-section.active { display: block; }

/* Stats row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
.stat-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 20px 22px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: 14px;
  animation: fadeIn .35s ease both;
}
.stat-icon {
  width: 46px; height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  flex-shrink: 0;
}
.stat-icon.blue { background: #e8efff; }
.stat-icon.teal { background: var(--teal-dim); }
.stat-icon.orange { background: #fff3e8; }
.stat-icon.green { background: #e8fff4; }
.stat-num { font-family: 'DM Serif Display', serif; font-size: 1.8rem; line-height: 1; color: var(--navy); }
.stat-label { font-size: .78rem; color: var(--text-3); margin-top: 2px; font-weight: 500; }

/* Records grid */
.records-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.record-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 22px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  animation: fadeIn .3s ease both;
  position: relative;
  overflow: hidden;
}
.record-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--teal), #6c63ff);
}
.record-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }

.record-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
.record-title { font-weight: 600; font-size: 1rem; color: var(--navy); flex: 1; }
.record-date {
  font-size: .75rem;
  color: var(--text-3);
  background: var(--ivory);
  padding: 3px 8px;
  border-radius: 20px;
  white-space: nowrap;
  flex-shrink: 0;
}
.record-desc { font-size: .88rem; color: var(--text-2); line-height: 1.6; margin-bottom: 14px; }
.record-patient {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: .78rem;
  font-weight: 600;
  color: var(--teal);
  background: var(--teal-dim);
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 12px;
}
.record-footer { display: flex; align-items: center; justify-content: flex-end; }
.btn-delete {
  background: none;
  border: none;
  color: var(--text-3);
  font-size: .8rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 4px;
}
.btn-delete:hover { color: var(--red); background: #fff0f0; }

/* Empty state */
.empty-state {
  grid-column: 1/-1;
  text-align: center;
  padding: 60px 20px;
  color: var(--text-3);
}
.empty-icon { font-size: 3rem; margin-bottom: 12px; }
.empty-state p { font-size: .95rem; }

/* Form card */
.form-card {
  max-width: 640px;
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 36px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
  animation: fadeIn .3s ease both;
}
.form-card-header { margin-bottom: 28px; }
.form-card-header h3 {
  font-family: 'DM Serif Display', serif;
  font-size: 1.5rem;
  color: var(--navy);
  margin-bottom: 4px;
}
.form-card-header p { font-size: .88rem; color: var(--text-3); }
.form-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 6px; }

/* Insights */
.insights-hero {
  display: flex;
  align-items: center;
  gap: 16px;
  background: linear-gradient(135deg, var(--navy) 0%, var(--navy-lt) 100%);
  color: var(--white);
  border-radius: var(--radius-lg);
  padding: 24px 28px;
  margin-bottom: 20px;
  box-shadow: var(--shadow-md);
}
.insights-hero.doctor { background: linear-gradient(135deg, #005f5a 0%, var(--teal) 100%); }
.insights-hero-icon { font-size: 2.5rem; }
.insights-hero h3 { font-family: 'DM Serif Display', serif; font-size: 1.4rem; }
.insights-hero p { font-size: .85rem; opacity: .75; margin-top: 3px; }

.insights-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
.insight-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 18px 20px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  animation: fadeIn .3s ease both;
  border-left: 4px solid var(--border);
}
.insight-item.warning { border-left-color: var(--orange); }
.insight-item.success { border-left-color: var(--green); }
.insight-item.info    { border-left-color: var(--teal); }
.insight-emoji { font-size: 1.6rem; flex-shrink: 0; }
.insight-text { font-size: .92rem; color: var(--text-1); line-height: 1.55; }
.insight-patient-name { font-size: .78rem; font-weight: 600; color: var(--text-3); text-transform: uppercase; letter-spacing: .05em; margin-bottom: 4px; }

.insights-disclaimer {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: .8rem;
  color: var(--text-3);
  padding: 12px 16px;
  background: var(--ivory-dk);
  border-radius: 8px;
}

/* Doctor: patient group */
.patient-group {
  background: var(--white);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  margin-bottom: 20px;
  overflow: hidden;
  animation: fadeIn .35s ease both;
}
.patient-group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: var(--navy);
  color: var(--white);
  cursor: pointer;
  user-select: none;
  transition: var(--transition);
}
.patient-group-header:hover { background: var(--navy-lt); }
.pg-left { display: flex; align-items: center; gap: 12px; }
.pg-avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--teal);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: .88rem;
}
.pg-name { font-weight: 600; font-size: .95rem; }
.pg-count { font-size: .78rem; opacity: .65; margin-top: 1px; }
.pg-chevron {
  transition: transform .25s ease;
  font-size: .9rem;
  opacity: .6;
}
.pg-chevron.open { transform: rotate(180deg); }
.patient-records-list {
  display: none;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}
.patient-records-list.collapsed { display: none; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Scrollbar */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--ivory-dk); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--text-3); }

/* Loading shimmer */
.shimmer {
  background: linear-gradient(90deg, var(--ivory) 25%, var(--ivory-dk) 50%, var(--ivory) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
  height: 20px;
}
@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

/* Responsive */
@media (max-width: 700px) {
  .sidebar { width: 60px; min-width: 60px; padding: 20px 8px; }
  .sidebar-brand-name, .nav-item span:last-child, .sidebar-user .s-name,
  .sidebar-user .s-role, .btn-logout span:last-child { display: none; }
  .nav-item { justify-content: center; padding: 12px; }
  .btn-logout { justify-content: center; }
  .records-grid { grid-template-columns: 1fr; }
  .stats-row { grid-template-columns: 1fr 1fr; }
  .form-card { padding: 22px 18px; }
}
