/**
 * AI Insights Controller
 * Provides simple rule-based health insights
 * (Can be extended with ML/AI models later)
 */

const Record = require('../models/Record');

/**
 * Rule-based keywords for health risk detection
 */
const CRITICAL_KEYWORDS = {
  critical: [
    'critical', 'severe', 'emergency', 'cardiac arrest', 'sepsis',
    'stroke', 'myocardial', 'anaphylaxis', 'acute', 'hemorrhage'
  ],
  high: [
    'elevated', 'high', 'abnormal', 'malignancy', 'cancer', 'tumor',
    'infection', 'hypertension', 'diabetes', 'arrhythmia', 'stenosis'
  ],
  medium: [
    'slightly elevated', 'borderline', 'mild', 'inflammation',
    'deficiency', 'imbalance', 'irregular'
  ],
  low: [
    'normal', 'healthy', 'regular', 'stable', 'maintained'
  ],
};

/**
 * Generate AI insights for a record
 * POST /api/ai/insights
 */
async function generateInsights(req, res, next) {
  try {
    const { recordId } = req.body;

    if (!recordId) {
      return res.status(400).json({
        success: false,
        message: 'recordId is required',
      });
    }

    const record = await Record.findById(recordId);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }

    // Analyze description
    const description = record.description.toLowerCase();
    const title = record.title.toLowerCase();
    const analysisText = `${title} ${description}`;

    let riskLevel = 'low';
    let insights = [];
    let recommendations = [];

    // Check for keywords
    if (CRITICAL_KEYWORDS.critical.some(kw => analysisText.includes(kw))) {
      riskLevel = 'critical';
      insights.push('⚠️ CRITICAL: Immediate medical attention required');
      recommendations.push('Seek emergency medical care immediately');
      recommendations.push('Contact emergency services or go to nearest hospital');
    } else if (CRITICAL_KEYWORDS.high.some(kw => analysisText.includes(kw))) {
      riskLevel = 'high';
      insights.push('⚠️ HIGH RISK: Significant health concerns detected');
      recommendations.push('Schedule urgent consultation with your doctor');
      recommendations.push('Monitor symptoms closely and keep medications as prescribed');
    } else if (CRITICAL_KEYWORDS.medium.some(kw => analysisText.includes(kw))) {
      riskLevel = 'medium';
      insights.push('⚠️ MODERATE: Some health factors need attention');
      recommendations.push('Follow up with your healthcare provider');
      recommendations.push('Consider lifestyle adjustments as recommended');
    } else {
      riskLevel = 'low';
      insights.push('✓ STABLE: Health metrics appear stable');
      recommendations.push('Continue regular check-ups');
      recommendations.push('Maintain current treatment plan');
    }

    // Add type-specific insights
    if (record.type === 'Lab Report') {
      insights.push(`📊 Lab analysis for ${record.title}`);
      if (analysisText.includes('diabetes') || analysisText.includes('glucose')) {
        recommendations.push('Monitor blood sugar levels regularly');
      }
      if (analysisText.includes('cholesterol') || analysisText.includes('lipid')) {
        recommendations.push('Follow dietary guidelines to manage cholesterol');
      }
      if (analysisText.includes('anemia') || analysisText.includes('hemoglobin')) {
        recommendations.push('Increase iron intake and consult for supplementation');
      }
    } else if (record.type === 'Prescription') {
      insights.push(`💊 Prescription review: ${record.title}`);
      recommendations.push('Take medications as prescribed');
      recommendations.push('Report any side effects to your doctor');
    } else if (record.type === 'Radiology') {
      insights.push(`🔍 Radiology findings: ${record.title}`);
      recommendations.push('Follow up imaging may be needed in 3-6 months');
    }

    // Update record with AI insights
    record.aiInsights = {
      riskLevel,
      insights: insights.join(' | '),
      recommendations,
      analysisDate: new Date(),
    };

    await record.save();

    res.status(200).json({
      success: true,
      message: 'AI insights generated successfully',
      insights: record.aiInsights,
      record,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get health summary for a user
 * GET /api/ai/summary/:username
 */
async function getHealthSummary(req, res, next) {
  try {
    const { username } = req.params;

    // Get all records for user
    const records = await Record.find({ username }).sort({ createdAt: -1 });

    if (records.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No records found',
        summary: {
          totalRecords: 0,
          riskLevels: {},
          recentRecords: [],
          recommendations: [],
        },
      });
    }

    // Analyze records
    const riskLevels = { critical: 0, high: 0, medium: 0, low: 0 };
    const allRecommendations = new Set();
    const recordTypes = {};

    records.forEach(record => {
      const riskLevel = record.aiInsights?.riskLevel || 'low';
      riskLevels[riskLevel]++;

      if (record.aiInsights?.recommendations) {
        record.aiInsights.recommendations.forEach(rec => allRecommendations.add(rec));
      }

      recordTypes[record.type] = (recordTypes[record.type] || 0) + 1;
    });

    // Get top recommendations
    const recommendations = Array.from(allRecommendations).slice(0, 5);

    res.status(200).json({
      success: true,
      summary: {
        totalRecords: records.length,
        riskLevels,
        recordTypes,
        recentRecords: records.slice(0, 5).map(r => ({
          id: r._id,
          title: r.title,
          type: r.type,
          date: r.date,
          riskLevel: r.aiInsights?.riskLevel || 'low',
        })),
        recommendations,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  generateInsights,
  getHealthSummary,
};
