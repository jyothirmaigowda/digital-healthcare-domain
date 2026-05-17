/**
 * AI Insights Routes
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const aiController = require('../controllers/aiController');
const { protect } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

/**
 * POST /api/ai/insights
 * Generate AI insights for a record
 */
router.post(
  '/insights',
  protect,
  [
    body('recordId')
      .isMongoId()
      .withMessage('Invalid record ID'),
  ],
  handleValidationErrors,
  aiController.generateInsights
);

/**
 * GET /api/ai/summary/:username
 * Get health summary and insights for a user
 */
router.get('/summary/:username', aiController.getHealthSummary);

module.exports = router;
