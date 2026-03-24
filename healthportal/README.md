# 🏥 HealthPortal — Digital Health Record Portal

A clean, hackathon-ready Digital Health Record Portal with patient/doctor roles and AI-powered health insights.

---

## 🚀 Quick Start (2 steps)

### 1. Start the Backend

```bash
cd backend
npm install
node server.js
```

You should see:
```
🏥  HealthPortal API running at http://localhost:3001
```

### 2. Open the Frontend

Simply open `frontend/index.html` in your browser.

> **No build step required.** The frontend is pure HTML/CSS/JS.

---

## 🔐 Demo Credentials

| Role    | Email              | Password    |
|---------|--------------------|-------------|
| Patient | alice@demo.com     | patient123  |
| Patient | bob@demo.com       | patient123  |
| Doctor  | doctor@demo.com    | doctor123   |

Click any credential hint on the login screen to auto-fill.

---

## 🎯 Demo Flow

1. **Login as Patient** (`alice@demo.com / patient123`)
2. **Add a medical record** — try descriptions with: *fever*, *blood pressure*, *diabetes*, *sugar*
3. **View AI Insights** — watch the 🧠 panel update dynamically
4. **Logout**, then **Login as Doctor** (`doctor@demo.com / doctor123`)
5. **Browse all patient records** grouped by patient
6. **View AI Insights Overview** — cross-patient health patterns

---

## 🧩 Features

- ✅ Patient login & session (localStorage)
- ✅ Doctor login & session (localStorage)
- ✅ Add / delete medical records
- ✅ View own records (Patient)
- ✅ View all patient records (Doctor)
- ✅ AI Health Insights (rule-based keyword detection)
- ✅ Search / filter records
- ✅ Responsive sidebar layout
- ✅ Clean, modern UI with animations

---

## 🧠 AI Insight Keywords

| Keyword(s)                                | Insight Generated                              |
|-------------------------------------------|------------------------------------------------|
| fever, temperature, pyrexia               | Frequent fever-related records detected        |
| diabetes, sugar, insulin, glucose         | Possible diabetes-related history              |
| bp, blood pressure, hypertension, sodium  | Blood pressure-related records found           |
| chest, heart, cardiac, palpitation        | Cardiac-related mentions detected              |
| asthma, breathing, respiratory, inhaler   | Respiratory conditions noted                   |
| migraine, headache, head pain             | Recurring headache or migraine records         |
| allerg, rash, itching, hives              | Allergy-related records found                  |

---

## 📁 Folder Structure

```
healthportal/
├── frontend/
│   ├── index.html    ← Single-page app (all views)
│   ├── style.css     ← Full styling
│   └── script.js     ← All frontend logic
├── backend/
│   ├── server.js     ← Express API + AI engine
│   └── package.json
└── README.md
```

---

## ⚙️ Tech Stack

- **Frontend**: HTML5 + CSS3 + Vanilla JavaScript
- **Backend**: Node.js + Express
- **Database**: In-memory array (demo-ready, no setup)
- **Auth**: Role-based login, session via localStorage
- **AI**: Rule-based keyword engine (no external API)

---

## 📝 Notes

- Data resets on server restart (in-memory store)
- No external APIs or databases needed
- Backend runs on port **3001**
- Frontend runs from file system (no server needed)
