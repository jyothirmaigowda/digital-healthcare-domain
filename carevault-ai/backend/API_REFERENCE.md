# CareVault AI API Quick Reference

## Base URL
```
http://localhost:5000/api
```

## Authentication Header (for protected routes)
```
Authorization: Bearer <jwt-token>
```

---

## 📋 All Endpoints

### 🔐 AUTH ENDPOINTS

| Method | Endpoint | Auth | Body | Response |
|--------|----------|------|------|----------|
| POST | `/auth/signup` | ❌ | `{username, email, password, name, role}` | `{token, user}` |
| POST | `/auth/login` | ❌ | `{username, password}` | `{token, user}` |
| GET | `/auth/me` | ✅ | - | `{user}` |
| PUT | `/auth/update` | ✅ | `{name, email, phone, bio}` | `{user}` |

---

### 📄 RECORDS ENDPOINTS

| Method | Endpoint | Auth | Query/Body | Response |
|--------|----------|------|-----------|----------|
| GET | `/records/:username` | ❌ | `?type=&limit=10&skip=0` | `{records, total}` |
| GET | `/records/id/:id` | ❌ | - | `{record}` |
| POST | `/records` | ✅ | `multipart/form-data` | `{record}` |
| PUT | `/records/:id` | ✅ | `multipart/form-data` | `{record}` |
| DELETE | `/records/:id` | ✅ | - | `{message}` |
| GET | `/records/search?q=query` | ❌ | `?username=` | `{records}` |

---

### 🧠 AI ENDPOINTS

| Method | Endpoint | Auth | Body | Response |
|--------|----------|------|------|----------|
| POST | `/ai/insights` | ✅ | `{recordId}` | `{insights}` |
| GET | `/ai/summary/:username` | ❌ | - | `{summary}` |

---

## 🟢 Record Types

```
Lab Report
Prescription
Radiology
Vaccination
Discharge Summary
Medical History
Consultation Note
Test Report
Other
```

---

## 🔴 Risk Levels (AI)

```
low         - No concerns
medium      - Some factors need attention
high        - Significant health concerns
critical    - Immediate medical attention needed
```

---

## 💾 Sample Data

### Test User - Patient
```
Username: patient1
Password: Patient@123
Role: patient
```

### Test User - Doctor
```
Username: doctor1
Password: Doctor@123
Role: doctor
```

---

## 🧪 Quick Test

```bash
# 1. Health check
curl http://localhost:5000/api/health

# 2. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"patient1","password":"Patient@123"}'

# Copy the token from response

# 3. Get your profile
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <token>"

# 4. Get records
curl http://localhost:5000/api/records/patient1
```

---

## 📦 File Upload

**Max Size:** 10 MB
**Allowed Types:** PDF, PNG, JPG, JPEG
**Storage:** `/uploads/` directory

---

## ⚠️ Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {"field": "email", "message": "Invalid email"}
  ]
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Record not found"
}
```

---

## 🔑 JWT Claims

```json
{
  "id": "user_mongodb_id",
  "iat": 1704000000,
  "exp": 1704604800
}
```

Token expires in **7 days**

---

## 📱 Frontend Integration

### Install Dependencies
```javascript
// Add to your script.js
// See FRONTEND_INTEGRATION.js for complete implementation
```

### Common Usage
```javascript
// Login
const {token, user} = await apiLogin('patient1', 'Patient@123');

// Get Records
const records = await apiGetUserRecords('patient1');

// Create Record
const newRecord = await apiCreateRecord(recordData, file);

// Generate Insights
const insights = await apiGenerateInsights(recordId);

// Search
const results = await apiSearchRecords('diabetes', 'patient1');
```

---

## 🗂️ Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## ⏱️ Rate Limiting

No rate limiting implemented yet. For production, add:
- `express-rate-limit`
- `redis` for distributed rate limiting

---

## 🔐 Security Features

✅ Password hashing (bcryptjs)
✅ JWT authentication
✅ CORS enabled
✅ Input validation
✅ File type validation
✅ Error handling
⚠️ Add rate limiting (production)
⚠️ Add HTTPS (production)
⚠️ Add environment-based logging (production)

---

## 📞 Common Issues

### "Connect ECONNREFUSED 127.0.0.1:27017"
MongoDB is not running. Start with:
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### "Invalid token"
Token may have expired or is malformed. Login again:
```javascript
const result = await apiLogin(username, password);
```

### "CORS error"
Make sure `FRONTEND_URL` is set correctly in `.env`

### "File too large"
Max file size is 10 MB. Check file size and try again.

---

## 📚 Related Files

- Backend Setup: [README.md](./README.md)
- Frontend Integration: [FRONTEND_INTEGRATION.js](./FRONTEND_INTEGRATION.js)
- Environment Config: [.env.example](./.env.example)
- Models: [models/](./models/)
- Controllers: [controllers/](./controllers/)
- Routes: [routes/](./routes/)

---

## 🚀 Next Steps

1. ✅ Backend running
2. ✅ MongoDB connected
3. ⏭️ Connect frontend (use FRONTEND_INTEGRATION.js)
4. ⏭️ Test all endpoints
5. ⏭️ Deploy to production

---

**Version:** 1.0.0  
**Last Updated:** January 2024
