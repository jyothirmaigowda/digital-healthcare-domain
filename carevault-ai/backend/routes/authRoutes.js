/**
 * Authentication Routes
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

/**
 * POST /api/auth/signup
 * Register a new user
 */
router.post(
  '/signup',
  [
    body('username')
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be 3-30 characters'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Invalid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('name')
      .trim()
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters'),
    body('role')
      .optional()
      .isIn(['patient', 'doctor'])
      .withMessage('Role must be patient or doctor'),
  ],
  handleValidationErrors,
  authController.signup
);

/**
 * POST /api/auth/login
 * User login
 */
router.post(
  '/login',
  [
    body('username')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Username is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password is required'),
  ],
  handleValidationErrors,
  authController.login
);

/**
 * GET /api/auth/me
 * Get current user profile (protected)
 */
router.get('/me', protect, authController.getProfile);

/**
 * PUT /api/auth/update
 * Update user profile (protected)
 */
router.put(
  '/update',
  protect,
  [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters'),
    body('email')
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage('Invalid email address'),
    body('phone')
      .optional()
      .trim(),
    body('bio')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Bio cannot exceed 500 characters'),
  ],
  handleValidationErrors,
  authController.updateProfile
);

module.exports = router;
