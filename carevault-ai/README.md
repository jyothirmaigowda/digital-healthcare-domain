# 🏥 CareVault AI — Smart Digital Health Record System

> **Hackathon-ready** | Full-stack health records platform with AI insights

---

## 🚀 Quick Start (VS Code)

### Option A — Open Directly in Browser (No Node.js needed)
1. Open the `frontend/` folder in VS Code
2. Right-click `index.html` → **Open with Live Server**  
   *(Install the "Live Server" VS Code extension if not already installed)*
3. The app opens at `http://127.0.0.1:5500`

---

### Option B — Run with Node.js Backend

#### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

#### Steps

```bash
# 1. Open terminal in VS Code (Ctrl+` or View → Terminal)

# 2. Navigate to backend folder
cd carevault-ai/backend

# 3. Install dependencies
npm install

# 4. Start the server
npm start
# OR for auto-reload during development:
npm run dev

# 5. Open your browser at:
#    http://localhost:3000
```

---

## 🔑 Demo Accounts

| Role    | Username   | Password      |
|---------|------------|---------------|
| Patient | `patient1` | `Patient@123` |
| Patient | `patient2` | `Patient@123` |
| Doctor  | `doctor1`  | `Doctor@123`  |

---

## 📁 Project Structure

```
carevault-ai/
├── frontend/
│   ├── index.html      ← Single-page app (all pages)
│   ├── style.css       ← Premium dark glassmorphism UI
│   └── script.js       ← Full frontend logic + AI engine
│
├── backend/
│   ├── server.js       ← Express REST API
│   ├── package.json    ← Dependencies
│   └── uploads/        ← Uploaded files (auto-created)
│
└── README.md
```

---

## ✨ Features

### 🔐 Authentication
- Signup/Login with Patient or Doctor roles
- Strong password validation (8+ chars, uppercase, number, symbol)
- Username uniqueness check
- Forgot password flow
- Session persistence

### 👤 Patient Dashboard
- Upload medical records (title, type, date, doctor, description, file)
- View records in card grid with search & filter
- Health Timeline view (chronological)
- AI Health Insights with pattern detection

### 👨‍⚕️ Doctor Dashboard
- All patients overview with record counts
- All records across all patients
- Critical case highlighting with alert badges
- Activity feed

### 🧠 AI Insights Engine
Detects patterns from descriptions:
- Diabetes / Blood Sugar
- Hypertension / Blood Pressure
- Anemia / Iron Deficiency
- High Cholesterol / Lipids
- Thyroid Dysfunction
- Infection / Fever History
- Vaccination Status
- Cardiac / Radiology Findings

### 🎨 UI/UX
- Dark / Light theme toggle
- Glassmorphism cards with animated gradient backgrounds
- Responsive (mobile-friendly)
- Smooth page transitions
- Toast notifications
- Record detail modal
- Drag & drop file upload

---

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create account |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/forgot-password` | Request reset |
| GET | `/api/auth/check-username/:u` | Check availability |
| GET | `/api/records/:username` | Get user's records |
| POST | `/api/records` | Upload new record |
| DELETE | `/api/records/:id` | Delete record |
| GET | `/api/doctor/patients` | All patients (doctor) |
| GET | `/api/doctor/records` | All records (doctor) |
| GET | `/api/doctor/stats` | Dashboard stats |
| POST | `/api/ai/insights` | Generate AI insights |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JS |
| Fonts | Syne (display) + DM Sans (body) |
| Icons | Font Awesome 6 |
| Backend | Node.js + Express 4 |
| File Upload | Multer |
| Storage | In-memory (demo) / localStorage |

---

## 📌 VS Code Extensions Recommended

- **Live Server** — `ritwickdey.LiveServer`
- **Prettier** — `esbenp.prettier-vscode`
- **Thunder Client** — `rangav.vscode-thunder-client` (API testing)
- **ES Lint** — `dbaeumer.vscode-eslint`

---

## 🏆 Hackathon Notes

This project is built for demo purposes. For production:
- Replace in-memory storage with **MongoDB** or **PostgreSQL**
- Add **JWT authentication** with bcrypt password hashing
- Add **rate limiting** and input sanitization
- Integrate a real AI API (OpenAI, Gemini, Claude) for deeper insights
- Add **email service** for password reset

---

*Built with ❤️ for the hackathon — CareVault AI Team*
