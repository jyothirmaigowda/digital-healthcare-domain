/**
 * CAREVAULT AI — FRONTEND API INTEGRATION GUIDE
 * ═══════════════════════════════════════════════════════════════════
 * 
 * This file shows how to replace localStorage with real backend API calls.
 * Replace these functions in your script.js
 */

// ═══════════════════════════════════════════════════════════════════
// API BASE URL
// ═══════════════════════════════════════════════════════════════════

const API_BASE = 'http://localhost:5000/api';
const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${API_BASE}/auth/signup`,
    LOGIN: `${API_BASE}/auth/login`,
    ME: `${API_BASE}/auth/me`,
    UPDATE: `${API_BASE}/auth/update`,
  },
  RECORDS: {
    GET_USER_RECORDS: (username) => `${API_BASE}/records/${username}`,
    GET_BY_ID: (id) => `${API_BASE}/records/id/${id}`,
    CREATE: `${API_BASE}/records`,
    UPDATE: (id) => `${API_BASE}/records/${id}`,
    DELETE: (id) => `${API_BASE}/records/${id}`,
    SEARCH: `${API_BASE}/records/search`,
  },
  AI: {
    INSIGHTS: `${API_BASE}/ai/insights`,
    SUMMARY: (username) => `${API_BASE}/ai/summary/${username}`,
  },
};

// ═══════════════════════════════════════════════════════════════════
// AUTHENTICATION
// ═══════════════════════════════════════════════════════════════════

/**
 * User Signup
 */
async function apiSignup(userData) {
  try {
    const response = await fetch(API_ENDPOINTS.AUTH.SIGNUP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: userData.role || 'patient',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    // Save token to localStorage
    localStorage.setItem('cv_token', data.token);
    localStorage.setItem('cv_user', JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

/**
 * User Login
 */
async function apiLogin(username, password) {
  try {
    const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Save token and user to localStorage
    localStorage.setItem('cv_token', data.token);
    localStorage.setItem('cv_user', JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Get Current User
 */
async function apiGetProfile() {
  try {
    const token = localStorage.getItem('cv_token');

    const response = await fetch(API_ENDPOINTS.AUTH.ME, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch profile');
    }

    return data.user;
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
}

/**
 * Update Profile
 */
async function apiUpdateProfile(updates) {
  try {
    const token = localStorage.getItem('cv_token');

    const response = await fetch(API_ENDPOINTS.AUTH.UPDATE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile');
    }

    localStorage.setItem('cv_user', JSON.stringify(data.user));
    return data.user;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════════
// RECORDS MANAGEMENT
// ═══════════════════════════════════════════════════════════════════

/**
 * Get Records for User
 */
async function apiGetUserRecords(username, type = null, limit = 10, skip = 0) {
  try {
    let url = API_ENDPOINTS.RECORDS.GET_USER_RECORDS(username);

    const params = new URLSearchParams();
    if (type) params.append('type', type);
    params.append('limit', limit);
    params.append('skip', skip);

    if (params.toString()) {
      url += '?' + params.toString();
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch records');
    }

    return data.records;
  } catch (error) {
    console.error('Get records error:', error);
    throw error;
  }
}

/**
 * Get Record by ID
 */
async function apiGetRecordById(id) {
  try {
    const response = await fetch(API_ENDPOINTS.RECORDS.GET_BY_ID(id), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Record not found');
    }

    return data.record;
  } catch (error) {
    console.error('Get record error:', error);
    throw error;
  }
}

/**
 * Create New Record
 */
async function apiCreateRecord(recordData, file = null) {
  try {
    const token = localStorage.getItem('cv_token');

    const formData = new FormData();
    formData.append('username', recordData.username);
    formData.append('title', recordData.title);
    formData.append('type', recordData.type);
    formData.append('description', recordData.description);
    formData.append('date', recordData.date);
    formData.append('doctor', recordData.doctor);

    if (file) {
      formData.append('file', file);
    }

    const response = await fetch(API_ENDPOINTS.RECORDS.CREATE, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData, // Don't set Content-Type for FormData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create record');
    }

    return data.record;
  } catch (error) {
    console.error('Create record error:', error);
    throw error;
  }
}

/**
 * Update Record
 */
async function apiUpdateRecord(id, updates, file = null) {
  try {
    const token = localStorage.getItem('cv_token');

    const formData = new FormData();
    if (updates.title) formData.append('title', updates.title);
    if (updates.type) formData.append('type', updates.type);
    if (updates.description) formData.append('description', updates.description);
    if (updates.date) formData.append('date', updates.date);
    if (updates.doctor) formData.append('doctor', updates.doctor);

    if (file) {
      formData.append('file', file);
    }

    const response = await fetch(API_ENDPOINTS.RECORDS.UPDATE(id), {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update record');
    }

    return data.record;
  } catch (error) {
    console.error('Update record error:', error);
    throw error;
  }
}

/**
 * Delete Record
 */
async function apiDeleteRecord(id) {
  try {
    const token = localStorage.getItem('cv_token');

    const response = await fetch(API_ENDPOINTS.RECORDS.DELETE(id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete record');
    }

    return data;
  } catch (error) {
    console.error('Delete record error:', error);
    throw error;
  }
}

/**
 * Search Records
 */
async function apiSearchRecords(query, username = null) {
  try {
    let url = API_ENDPOINTS.RECORDS.SEARCH + '?q=' + encodeURIComponent(query);
    if (username) {
      url += '&username=' + encodeURIComponent(username);
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Search failed');
    }

    return data.records;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════════
// AI INSIGHTS
// ═══════════════════════════════════════════════════════════════════

/**
 * Generate AI Insights for a Record
 */
async function apiGenerateInsights(recordId) {
  try {
    const token = localStorage.getItem('cv_token');

    const response = await fetch(API_ENDPOINTS.AI.INSIGHTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ recordId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to generate insights');
    }

    return data.insights;
  } catch (error) {
    console.error('Generate insights error:', error);
    throw error;
  }
}

/**
 * Get Health Summary for User
 */
async function apiGetHealthSummary(username) {
  try {
    const response = await fetch(API_ENDPOINTS.AI.SUMMARY(username), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch health summary');
    }

    return data.summary;
  } catch (error) {
    console.error('Get health summary error:', error);
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════════
// USAGE EXAMPLES IN YOUR FRONTEND
// ═══════════════════════════════════════════════════════════════════

/*

// 1. LOGIN
try {
  const result = await apiLogin('patient1', 'Patient@123');
  console.log('Logged in as:', result.user.name);
  // Token is automatically saved
} catch (error) {
  console.error('Login failed:', error.message);
}

// 2. GET RECORDS
try {
  const records = await apiGetUserRecords('patient1');
  console.log('Retrieved records:', records);
} catch (error) {
  console.error('Failed to get records:', error.message);
}

// 3. CREATE RECORD
try {
  const newRecord = await apiCreateRecord({
    username: 'patient1',
    title: 'New Lab Test',
    type: 'Lab Report',
    description: 'Results of recent blood work...',
    date: new Date().toISOString(),
    doctor: 'Dr. Neha Kapoor',
  });
  console.log('Record created:', newRecord);
} catch (error) {
  console.error('Failed to create record:', error.message);
}

// 4. GENERATE AI INSIGHTS
try {
  const insights = await apiGenerateInsights(recordId);
  console.log('AI Insights:', insights);
} catch (error) {
  console.error('Failed to generate insights:', error.message);
}

// 5. SEARCH RECORDS
try {
  const results = await apiSearchRecords('diabetes', 'patient1');
  console.log('Search results:', results);
} catch (error) {
  console.error('Search failed:', error.message);
}

*/

// ═══════════════════════════════════════════════════════════════════
// HELPER: Check if user is authenticated
// ═══════════════════════════════════════════════════════════════════

function isAuthenticated() {
  return !!localStorage.getItem('cv_token');
}

function getAuthToken() {
  return localStorage.getItem('cv_token');
}

function logout() {
  localStorage.removeItem('cv_token');
  localStorage.removeItem('cv_user');
}

// ═══════════════════════════════════════════════════════════════════
// EXPORT (if using modules)
// ═══════════════════════════════════════════════════════════════════

// Uncomment if using ES6 modules:
// export {
//   apiSignup,
//   apiLogin,
//   apiGetProfile,
//   apiUpdateProfile,
//   apiGetUserRecords,
//   apiCreateRecord,
//   apiUpdateRecord,
//   apiDeleteRecord,
//   apiSearchRecords,
//   apiGenerateInsights,
//   apiGetHealthSummary,
//   isAuthenticated,
//   getAuthToken,
//   logout,
// };
