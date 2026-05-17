# CareVault AI — Backend Server

Production-ready Node.js + Express + MongoDB backend for healthcare records management.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **MongoDB** (Local or Atlas)
- **npm** or **yarn**

### Installation

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file (copy from .env.example)
cp .env.example .env

# 4. Configure MongoDB URI in .env
# For local: mongodb://localhost:27017/carevault-ai
# For Atlas: mongodb+srv://user:pass@cluster.mongodb.net/carevault-ai

# 5. Start MongoDB (if local)
# Windows:
net start MongoDB
# macOS:
brew services start mongodb-community
# Linux:
sudo systemctl start mongod

# 6. Start the server
npm run dev   # Development with nodemon
npm start     # Production
```

Server will run at: **http://localhost:5000**

---

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   ├── User.js              # User schema (Patient/Doctor)
│   └── Record.js            # Medical record schema
├── routes/
│   ├── authRoutes.js        # Authentication endpoints
│   ├── recordRoutes.js      # Record management endpoints
│   └── aiRoutes.js          # AI insights endpoints
├── controllers/
│   ├── authController.js    # Auth logic
│   ├── recordController.js  # Record operations
│   └── aiController.js      # AI analysis
├── middleware/
│   ├── auth.js              # JWT verification
│   ├── errorHandler.js      # Error handling
│   └── validation.js        # Input validation
├── uploads/                 # Uploaded files storage
├── server.js                # Main server file
├── .env                     # Environment variables
└── package.json
```

---

## 🔌 API Endpoints

### Authentication

```
POST   /api/auth/signup       Register new user
POST   /api/auth/login        User login
GET    /api/auth/me           Get current profile (protected)
PUT    /api/auth/update       Update profile (protected)
```

### Records Management

```
GET    /api/records/:username          Get all user records
GET    /api/records/id/:id             Get single record
POST   /api/records                    Create new record (protected, file upload)
PUT    /api/records/:id                Update record (protected)
DELETE /api/records/:id                Delete record (protected)
GET    /api/records/search?q=query     Search records
```

### AI Insights

```
POST   /api/ai/insights                Generate AI insights for record (protected)
GET    /api/ai/summary/:username       Get health summary
```

---

## 🔐 Authentication

All protected endpoints require JWT token in header:

```
Authorization: Bearer <your-jwt-token>
```

### Token Expiration

Tokens expire after **7 days** by default (configurable in `.env`)

---

## 📝 Request/Response Examples

### 1. Signup

**Request:**
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "username": "patient1",
  "email": "patient@example.com",
  "password": "SecurePass123!",
  "name": "John Doe",
  "role": "patient"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k",
    "username": "patient1",
    "email": "patient@example.com",
    "name": "John Doe",
    "role": "patient"
  }
}
```

### 2. Create Record

**Request:**
```bash
POST /api/records
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "username": "patient1",
  "title": "Complete Blood Count",
  "type": "Lab Report",
  "description": "Hemoglobin: 11.2 g/dL (Low)...",
  "date": "2024-01-15T10:30:00Z",
  "doctor": "Dr. Neha Kapoor",
  "file": <PDF file>
}
```

**Response:**
```json
{
  "success": true,
  "message": "Record created successfully",
  "record": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0l",
    "username": "patient1",
    "title": "Complete Blood Count",
    "type": "Lab Report",
    "description": "Hemoglobin: 11.2 g/dL (Low)...",
    "date": "2024-01-15T10:30:00Z",
    "doctor": "Dr. Neha Kapoor",
    "file": {
      "originalName": "report.pdf",
      "filename": "1735689000123_report.pdf",
      "path": "/uploads/1735689000123_report.pdf",
      "size": 245000
    },
    "createdAt": "2024-01-15T11:00:00Z"
  }
}
```

### 3. Generate AI Insights

**Request:**
```bash
POST /api/ai/insights
Authorization: Bearer <token>
Content-Type: application/json

{
  "recordId": "65a1b2c3d4e5f6g7h8i9j0l"
}
```

**Response:**
```json
{
  "success": true,
  "message": "AI insights generated successfully",
  "insights": {
    "riskLevel": "medium",
    "insights": "📊 Lab analysis | ⚠️ Anemia detected",
    "recommendations": [
      "Increase iron intake",
      "Schedule follow-up in 2 weeks",
      "Monitor symptoms"
    ],
    "analysisDate": "2024-01-15T11:05:00Z"
  }
}
```

---

## 🗄️ MongoDB Models

### User Model

```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed),
  name: String,
  role: String (enum: ['patient', 'doctor']),
  phone: String,
  dateOfBirth: Date,
  bloodGroup: String,
  allergies: [String],
  specialization: String (for doctors),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Record Model

```javascript
{
  username: String (indexed),
  title: String,
  type: String (enum: ['Lab Report', 'Prescription', 'Radiology', ...]),
  description: String,
  date: Date,
  doctor: String,
  file: {
    originalName: String,
    filename: String,
    path: String,
    mimetype: String,
    size: Number,
    uploadDate: Date
  },
  aiInsights: {
    riskLevel: String,
    insights: String,
    recommendations: [String],
    analysisDate: Date
  },
  tags: [String],
  isPrivate: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 Frontend Integration

See `FRONTEND_INTEGRATION.js` for complete API integration examples.

### Key Functions

```javascript
// Authentication
apiLogin(username, password)
apiSignup(userData)
apiGetProfile()
apiUpdateProfile(updates)

// Records
apiGetUserRecords(username)
apiCreateRecord(recordData, file)
apiUpdateRecord(id, updates, file)
apiDeleteRecord(id)
apiSearchRecords(query)

// AI
apiGenerateInsights(recordId)
apiGetHealthSummary(username)
```

### Example: Login & Fetch Records

```javascript
// 1. Login
const result = await apiLogin('patient1', 'Patient@123');
console.log('Logged in as:', result.user.name);

// 2. Fetch records
const records = await apiGetUserRecords('patient1');
records.forEach(record => {
  console.log(`${record.title} - ${record.date}`);
});

// 3. Generate insights
const insights = await apiGenerateInsights(records[0]._id);
console.log('Risk Level:', insights.riskLevel);
```

---

## 🧪 Testing with cURL

### Signup

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username":"testuser",
    "email":"test@example.com",
    "password":"Test@1234",
    "name":"Test User",
    "role":"patient"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"Test@1234"}'
```

### Get Records

```bash
curl -X GET http://localhost:5000/api/records/testuser \
  -H "Content-Type: application/json"
```

### Create Record

```bash
curl -X POST http://localhost:5000/api/records \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "username=testuser" \
  -F "title=Test Report" \
  -F "type=Lab Report" \
  -F "description=Test description" \
  -F "date=2024-01-15T10:00:00Z" \
  -F "doctor=Dr. Test" \
  -F "file=@path/to/file.pdf"
```

---

## ⚙️ Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/carevault-ai
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

---

## 🔍 Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (access denied)
- `404` - Not Found
- `500` - Server Error

---

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.5.0",
  "cors": "^2.8.5",
  "multer": "^1.4.5-lts.1",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.1.0",
  "express-validator": "^7.0.0",
  "dotenv": "^16.3.1"
}
```

---

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Development server (with nodemon)
npm run dev

# Production server
npm start

# Run tests (if implemented)
npm test
```

---

## 🚀 Deployment

### To MongoDB Atlas

1. Create cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/carevault-ai
   ```

### To Heroku

```bash
# 1. Create Heroku app
heroku create carevault-ai-backend

# 2. Set environment variables
heroku config:set MONGODB_URI=<your-atlas-uri>
heroku config:set JWT_SECRET=<your-secret>

# 3. Deploy
git push heroku main
```

---

## 📧 Support & Documentation

- API Docs: Run server and visit `http://localhost:5000/api/health`
- Frontend Integration: See `FRONTEND_INTEGRATION.js`
- Issues: Create GitHub issue or contact team

---

## 📄 License

MIT License - See LICENSE file

---

## 👨‍💻 Team

CareVault AI Development Team

**Last Updated:** January 2024
