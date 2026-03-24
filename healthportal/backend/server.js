const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ── In-memory store ──────────────────────────────────────────────────────────

const users = [
  { id: 1, name: "Alice Johnson",  email: "alice@demo.com",  password: "patient123", role: "patient" },
  { id: 2, name: "Bob Smith",      email: "bob@demo.com",    password: "patient123", role: "patient" },
  { id: 3, name: "Dr. Emily Chen", email: "doctor@demo.com", password: "doctor123",  role: "doctor"  },
];

let records = [
  {
    id: 1,
    patientId: 1,
    patientName: "Alice Johnson",
    title: "Annual Checkup",
    description: "Routine annual checkup. Blood pressure slightly elevated. Doctor advised reducing sodium intake.",
    date: "2024-11-15",
    createdAt: new Date("2024-11-15").toISOString(),
  },
  {
    id: 2,
    patientId: 1,
    patientName: "Alice Johnson",
    title: "Fever & Cold",
    description: "High fever of 102°F with cold and body aches. Prescribed antibiotics and rest.",
    date: "2025-01-20",
    createdAt: new Date("2025-01-20").toISOString(),
  },
  {
    id: 3,
    patientId: 2,
    patientName: "Bob Smith",
    title: "Diabetes Follow-up",
    description: "Sugar levels were high at 210 mg/dL. Doctor adjusted insulin dosage. Diabetes management plan updated.",
    date: "2025-02-10",
    createdAt: new Date("2025-02-10").toISOString(),
  },
];

let nextRecordId = 4;

// ── AI Insight Engine ────────────────────────────────────────────────────────

function generateInsights(patientRecords) {
  if (!patientRecords.length) {
    return [{ type: "info", icon: "💡", message: "No records yet. Add your first medical record to get AI insights." }];
  }

  const combined = patientRecords.map((r) => `${r.title} ${r.description}`).join(" ").toLowerCase();
  const insights = [];

  const patterns = [
    { keywords: ["fever", "temperature", "pyrexia"],      icon: "🌡️", message: "Frequent fever-related records detected — monitor for recurring infections." },
    { keywords: ["diabetes", "sugar", "insulin", "glucose", "hba1c"], icon: "🩸", message: "Possible diabetes-related history — regular blood sugar monitoring advised." },
    { keywords: ["bp", "blood pressure", "hypertension", "pressure", "sodium"], icon: "❤️", message: "Blood pressure-related records found — cardiovascular monitoring recommended." },
    { keywords: ["chest", "heart", "cardiac", "palpitation"],          icon: "🫀", message: "Cardiac-related mentions detected — consult a cardiologist if recurring." },
    { keywords: ["asthma", "breathing", "respiratory", "inhaler", "wheez"], icon: "🫁", message: "Respiratory conditions noted — track breathing patterns and triggers." },
    { keywords: ["migraine", "headache", "head pain"],                 icon: "🧠", message: "Recurring headache or migraine records — stress and hydration management suggested." },
    { keywords: ["allerg", "rash", "itching", "hives"],               icon: "🌿", message: "Allergy-related records found — identify and avoid known triggers." },
  ];

  for (const p of patterns) {
    if (p.keywords.some((kw) => combined.includes(kw))) {
      insights.push({ type: "warning", icon: p.icon, message: p.message });
    }
  }

  if (!insights.length) {
    insights.push({ type: "success", icon: "✅", message: "No major health patterns detected — keep up the healthy routine!" });
  }

  return insights;
}

// ── Auth Routes ──────────────────────────────────────────────────────────────

app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body;
  const user = users.find((u) => u.email === email && u.password === password && u.role === role);
  if (!user) return res.status(401).json({ error: "Invalid credentials or role mismatch." });
  const { password: _, ...safeUser } = user;
  res.json({ success: true, user: safeUser });
});

// ── Records Routes ───────────────────────────────────────────────────────────

// Patient: get own records
app.get("/api/records/my/:patientId", (req, res) => {
  const id = parseInt(req.params.patientId);
  const myRecords = records.filter((r) => r.patientId === id);
  const insights = generateInsights(myRecords);
  res.json({ records: myRecords.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), insights });
});

// Doctor: get all records grouped by patient
app.get("/api/records/all", (req, res) => {
  const sorted = [...records].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Group by patient
  const grouped = {};
  for (const r of sorted) {
    if (!grouped[r.patientId]) {
      grouped[r.patientId] = { patientId: r.patientId, patientName: r.patientName, records: [] };
    }
    grouped[r.patientId].records.push(r);
  }

  // Insights per patient
  const patientsWithInsights = Object.values(grouped).map((p) => ({
    ...p,
    insights: generateInsights(p.records),
  }));

  res.json({ patients: patientsWithInsights, totalRecords: records.length });
});

// Patient: add record
app.post("/api/records", (req, res) => {
  const { patientId, patientName, title, description } = req.body;
  if (!patientId || !title || !description) return res.status(400).json({ error: "Missing required fields." });

  const newRecord = {
    id: nextRecordId++,
    patientId: parseInt(patientId),
    patientName,
    title: title.trim(),
    description: description.trim(),
    date: new Date().toISOString().split("T")[0],
    createdAt: new Date().toISOString(),
  };
  records.push(newRecord);

  const myRecords = records.filter((r) => r.patientId === parseInt(patientId));
  const insights = generateInsights(myRecords);
  res.status(201).json({ success: true, record: newRecord, insights });
});

// Patient: delete own record
app.delete("/api/records/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return res.status(404).json({ error: "Record not found." });
  records.splice(idx, 1);
  res.json({ success: true });
});

// ── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n🏥  HealthPortal API running at http://localhost:${PORT}`);
  console.log("─".repeat(50));
  console.log("Demo credentials:");
  console.log("  Patient → alice@demo.com / patient123");
  console.log("  Patient → bob@demo.com   / patient123");
  console.log("  Doctor  → doctor@demo.com / doctor123");
  console.log("─".repeat(50) + "\n");
});
