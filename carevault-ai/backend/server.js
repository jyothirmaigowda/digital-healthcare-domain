/**
 * CareVault AI — Backend Server
 * Node.js + Express REST API
 * 
 * Endpoints:
 *   POST /api/auth/signup
 *   POST /api/auth/login
 *   POST /api/auth/forgot-password
 *   GET  /api/records/:username
 *   POST /api/records
 *   DELETE /api/records/:id
 *   GET  /api/doctor/patients
 *   GET  /api/doctor/records
 *   POST /api/ai/insights
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

/* ── MIDDLEWARE ───────────────────────────── */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// File uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename:    (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf','image/jpeg','image/png','image/jpg'];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'));
  }
});

/* ── IN-MEMORY DATA STORE ─────────────────── */
// (For hackathon; swap with MongoDB/PostgreSQL in production)

let users = [
  { id: 'u1', username: 'patient1', password: 'Patient@123', name: 'Aarav Sharma',    email: 'aarav@example.com', role: 'patient', createdAt: new Date().toISOString() },
  { id: 'u2', username: 'patient2', password: 'Patient@123', name: 'Priya Mehta',     email: 'priya@example.com', role: 'patient', createdAt: new Date().toISOString() },
  { id: 'u3', username: 'patient3', password: 'Patient@123', name: 'Rohit Verma',     email: 'rohit@example.com', role: 'patient', createdAt: new Date().toISOString() },
  { id: 'u4', username: 'doctor1',  password: 'Doctor@123',  name: 'Dr. Neha Kapoor', email: 'neha@hospital.com', role: 'doctor',  createdAt: new Date().toISOString() },
  { id: 'u5', username: 'doctor2',  password: 'Doctor@123',  name: 'Dr. Anil Patel',  email: 'anil@hospital.com', role: 'doctor',  createdAt: new Date().toISOString() },
];

const today = new Date();
const daysAgo = d => new Date(today - d * 86400000).toISOString().split('T')[0];

let records = [
  {
    id: 'r1', username: 'patient1', title: 'Complete Blood Count (CBC)', type: 'Lab Report',
    date: daysAgo(3), doctor: 'Dr. Neha Kapoor', file: null,
    description: 'Hemoglobin: 11.2 g/dL (Low). WBC: 11500/μL (slightly elevated). Platelet count: 150000. Patient reports fatigue and dizziness for 2 weeks. Possible iron deficiency anemia detected. Fasting glucose: 127 mg/dL (borderline high).',
    createdAt: new Date(today - 3*86400000).toISOString()
  },
  {
    id: 'r2', username: 'patient1', title: 'Diabetes Management Follow-up', type: 'Prescription',
    date: daysAgo(10), doctor: 'Dr. Neha Kapoor', file: null,
    description: 'HbA1c: 7.8%. Fasting blood sugar: 148 mg/dL. Blood pressure: 145/95 mmHg (hypertension noted). Prescribed Metformin 500mg twice daily. Diet counseling advised. Patient complains of frequent urination and excessive thirst.',
    createdAt: new Date(today - 10*86400000).toISOString()
  },
  {
    id: 'r3', username: 'patient1', title: 'Chest X-Ray Report', type: 'Radiology',
    date: daysAgo(21), doctor: 'Apollo Radiology Dept', file: null,
    description: 'PA view chest X-Ray performed. Mild cardiomegaly noted. No acute consolidation or pleural effusion. Lung fields appear clear. Impression: mild cardiac enlargement, suggest echocardiography.',
    createdAt: new Date(today - 21*86400000).toISOString()
  },
  {
    id: 'r4', username: 'patient2', title: 'Thyroid Function Test (TFT)', type: 'Lab Report',
    date: daysAgo(5), doctor: 'Dr. Anil Patel', file: null,
    description: 'TSH: 0.2 mIU/L (low, indicating hyperthyroidism). T3: 220 ng/dL (high). T4: 14.8 μg/dL (elevated). Patient reports weight loss, palpitations, heat intolerance. Diagnosed with hyperthyroidism.',
    createdAt: new Date(today - 5*86400000).toISOString()
  },
  {
    id: 'r5', username: 'patient2', title: 'Lipid Profile Test', type: 'Lab Report',
    date: daysAgo(15), doctor: 'City Diagnostics', file: null,
    description: 'Total Cholesterol: 240 mg/dL (High). LDL: 165 mg/dL (High). HDL: 38 mg/dL (Low). Triglycerides: 210 mg/dL (High). Patient has family history of cardiac disease.',
    createdAt: new Date(today - 15*86400000).toISOString()
  },
  {
    id: 'r6', username: 'patient3', title: 'COVID-19 Vaccination', type: 'Vaccination',
    date: daysAgo(90), doctor: 'PHC Vaccination Centre', file: null,
    description: 'Covishield (AstraZeneca) 2nd dose administered. No adverse reactions observed. Certificate issued. Booster due in 9 months.',
    createdAt: new Date(today - 90*86400000).toISOString()
  },
  {
    id: 'r7', username: 'patient3', title: 'Hospital Discharge Summary', type: 'Discharge Summary',
    date: daysAgo(30), doctor: 'Dr. Neha Kapoor', file: null,
    description: 'Patient admitted with high fever (104°F), severe dehydration, dengue fever confirmed (NS1 antigen positive). Platelet count dropped to 65000. IV fluids administered. Patient recovered after 5 days.',
    createdAt: new Date(today - 30*86400000).toISOString()
  },
];

/* ── HELPERS ──────────────────────────────── */
const generateId = prefix => prefix + Date.now() + Math.random().toString(36).slice(2,6);

function validatePassword(pwd) {
  return pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd);
}

function isCritical(record) {
  const text = (record.description + ' ' + record.title).toLowerCase();
  return /critical|emergency|severe|dengue|platelet.*6[0-5]|bp.*16|hypertension|chest pain|stroke|cardiac|cardiomegaly|hba1c.*[89]|high fever|104/.test(text);
}

/* ── AUTH ROUTES ──────────────────────────── */

// POST /api/auth/signup
app.post('/api/auth/signup', (req, res) => {
  const { username, password, name, email, role } = req.body;
  if (!username || !password || !name || !email || !role) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!['patient','doctor'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role. Must be patient or doctor.' });
  }
  if (username.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Password must be 8+ chars with uppercase, number, and symbol.' });
  }
  if (users.some(u => u.username === username)) {
    return res.status(409).json({ error: 'Username already taken.' });
  }
  const user = { id: generateId('u'), username, password, name, email, role, createdAt: new Date().toISOString() };
  users.push(user);
  const { password: _, ...safeUser } = user;
  res.status(201).json({ message: 'Account created successfully.', user: safeUser });
});

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }
  const { password: _, ...safeUser } = user;
  res.json({ message: 'Login successful.', user: safeUser });
});

// POST /api/auth/forgot-password
app.post('/api/auth/forgot-password', (req, res) => {
  const { username } = req.body;
  const user = users.find(u => u.username === username);
  // Always respond the same way (security best practice)
  res.json({ message: 'If that username exists, reset instructions have been sent.' });
});

// GET /api/auth/check-username/:username
app.get('/api/auth/check-username/:username', (req, res) => {
  const taken = users.some(u => u.username === req.params.username);
  res.json({ available: !taken });
});

/* ── RECORDS ROUTES ───────────────────────── */

// GET /api/records/:username
app.get('/api/records/:username', (req, res) => {
  const userRecords = records.filter(r => r.username === req.params.username);
  res.json(userRecords.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// POST /api/records (with optional file upload)
app.post('/api/records', upload.single('file'), (req, res) => {
  const { username, title, type, date, doctor, description } = req.body;
  if (!username || !title || !type || !date || !description) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  const record = {
    id: generateId('r'),
    username, title, type, date,
    doctor: doctor || null,
    description,
    file: req.file ? req.file.filename : null,
    originalFileName: req.file ? req.file.originalname : null,
    createdAt: new Date().toISOString()
  };
  records.push(record);
  res.status(201).json({ message: 'Record saved successfully.', record });
});

// DELETE /api/records/:id
app.delete('/api/records/:id', (req, res) => {
  const idx = records.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Record not found.' });
  records.splice(idx, 1);
  res.json({ message: 'Record deleted.' });
});

/* ── DOCTOR ROUTES ────────────────────────── */

// GET /api/doctor/patients
app.get('/api/doctor/patients', (req, res) => {
  const patients = users
    .filter(u => u.role === 'patient')
    .map(({ password, ...p }) => ({
      ...p,
      recordCount: records.filter(r => r.username === p.username).length,
      criticalCount: records.filter(r => r.username === p.username && isCritical(r)).length
    }));
  res.json(patients);
});

// GET /api/doctor/records
app.get('/api/doctor/records', (req, res) => {
  const allRecords = records.map(r => {
    const patient = users.find(u => u.username === r.username);
    return { ...r, patientName: patient ? patient.name : r.username, isCritical: isCritical(r) };
  }).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(allRecords);
});

// GET /api/doctor/stats
app.get('/api/doctor/stats', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  res.json({
    totalPatients: users.filter(u => u.role === 'patient').length,
    totalRecords: records.length,
    criticalCases: records.filter(isCritical).length,
    addedToday: records.filter(r => r.createdAt && r.createdAt.startsWith(today)).length
  });
});

/* ── AI INSIGHTS ROUTE ────────────────────── */

// POST /api/ai/insights
app.post('/api/ai/insights', (req, res) => {
  const { username } = req.body;
  const userRecords = records.filter(r => r.username === username);
  if (!userRecords.length) {
    return res.json({ insights: [], message: 'No records to analyze.' });
  }

  const allText = userRecords.map(r => r.description + ' ' + r.title).join(' ').toLowerCase();
  const insights = [];

  const checks = [
    { pattern: /diabet|glucose|hba1c/, flag: /hba1c[:\s]+[789]|glucose.*high/, title: 'Diabetes Risk', icon: 'droplet', level: 'warning', tags: ['Glucose Monitoring', 'Diet Review'] },
    { pattern: /blood pressure|hypertension|bp/, flag: /hypertension|145\/|160\//, title: 'Blood Pressure', icon: 'heart', level: 'critical', tags: ['Hypertension', 'Cardiac Risk'] },
    { pattern: /hemoglobin|anemia|iron/, flag: /anemia|low hemoglobin/, title: 'Anemia Risk', icon: 'vial', level: 'warning', tags: ['Low Hemoglobin', 'Iron Supplement'] },
    { pattern: /cholesterol|ldl|triglyceride/, flag: /ldl.*1[6-9]\d|cholesterol.*2[4-9]/, title: 'Lipid Profile', icon: 'chart', level: 'critical', tags: ['High Cholesterol', 'Cardiac Risk'] },
    { pattern: /thyroid|tsh/, flag: /tsh.*0\.[01]|hyperthyroid/, title: 'Thyroid Function', icon: 'stethoscope', level: 'warning', tags: ['TSH Abnormal', 'Endocrinology Referral'] },
    { pattern: /vaccin/, flag: null, title: 'Vaccination', icon: 'syringe', level: 'normal', tags: ['Immunization Tracked'] },
  ];

  checks.forEach(c => {
    if (c.pattern.test(allText)) {
      insights.push({
        title: c.title,
        level: c.flag && c.flag.test(allText) ? c.level : 'normal',
        tags: c.tags,
        icon: c.icon,
        recordCount: userRecords.filter(r => c.pattern.test((r.description + r.title).toLowerCase())).length
      });
    }
  });

  insights.push({
    title: 'Health Summary',
    level: 'info',
    tags: [`${userRecords.length} Records`, `${insights.filter(i=>i.level==='critical').length} Critical`],
    icon: 'shield',
    recordCount: userRecords.length
  });

  res.json({ insights, analyzedCount: userRecords.length });
});

/* ── FILE SERVE ───────────────────────────── */
app.get('/uploads/:filename', (req, res) => {
  const fp = path.join(uploadDir, req.params.filename);
  if (fs.existsSync(fp)) res.sendFile(fp);
  else res.status(404).json({ error: 'File not found.' });
});

/* ── SPA FALLBACK ─────────────────────────── */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

/* ── ERROR HANDLER ────────────────────────── */
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large. Max 10 MB.' });
  }
  res.status(500).json({ error: err.message || 'Internal server error.' });
});

/* ── START SERVER ─────────────────────────── */
app.listen(PORT, () => {
  console.log('');
  console.log('  ╔═══════════════════════════════════════╗');
  console.log('  ║       CareVault AI — Server Ready      ║');
  console.log('  ╠═══════════════════════════════════════╣');
  console.log(`  ║  Running on: http://localhost:${PORT}      ║`);
  console.log('  ║  Demo Patient: patient1 / Patient@123  ║');
  console.log('  ║  Demo Doctor:  doctor1  / Doctor@123   ║');
  console.log('  ╚═══════════════════════════════════════╝');
  console.log('');
});

module.exports = app;
