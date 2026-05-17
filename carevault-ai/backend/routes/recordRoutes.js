/**
 * Records Routes
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body } = require('express-validator');
const recordController = require('../controllers/recordController');
const { protect } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

/**
 * Multer configuration for file uploads
 */
const uploadDir = path.join(__dirname, '../uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, PNG, and JPEG files are allowed'));
    }
  },
});

/**
 * GET /api/records/:username
 * Get all records for a user
 */
router.get(
  '/:username',
  [
    body('username')
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage('Invalid username'),
  ],
  handleValidationErrors,
  recordController.getUserRecords
);

/**
 * GET /api/records/id/:id
 * Get single record by ID
 */
router.get('/id/:id', recordController.getRecordById);

/**
 * POST /api/records
 * Create new record with optional file upload
 */
router.post(
  '/',
  protect, // Authentication required
  upload.single('file'), // File upload (optional)
  [
    body('username')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Valid username is required'),
    body('title')
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage('Title must be 3-100 characters'),
    body('type')
      .isIn(['Lab Report', 'Prescription', 'Radiology', 'Vaccination', 'Discharge Summary', 'Medical History', 'Consultation Note', 'Test Report', 'Other'])
      .withMessage('Invalid record type'),
    body('description')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ min: 10, max: 5000 })
      .withMessage('Description must be 10-5000 characters'),
    body('date')
      .isISO8601()
      .withMessage('Invalid date format'),
    body('doctor')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Doctor name is required'),
  ],
  handleValidationErrors,
  recordController.createRecord
);

/**
 * PUT /api/records/:id
 * Update record
 */
router.put(
  '/:id',
  protect,
  upload.single('file'),
  [
    body('title')
      .optional()
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage('Title must be 3-100 characters'),
    body('type')
      .optional()
      .isIn(['Lab Report', 'Prescription', 'Radiology', 'Vaccination', 'Discharge Summary', 'Medical History', 'Consultation Note', 'Test Report', 'Other'])
      .withMessage('Invalid record type'),
    body('description')
      .optional()
      .trim()
      .isLength({ min: 10, max: 5000 })
      .withMessage('Description must be 10-5000 characters'),
  ],
  handleValidationErrors,
  recordController.updateRecord
);

/**
 * DELETE /api/records/:id
 * Delete record
 */
router.delete('/:id', protect, recordController.deleteRecord);

/**
 * GET /api/records/search?q=query
 * Search records
 */
router.get('/search/query', recordController.searchRecords);

module.exports = router;
