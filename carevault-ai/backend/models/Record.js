/**
 * Record Model
 * Stores medical records (lab reports, prescriptions, etc.)
 */

const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
  {
    // Reference to User
    username: {
      type: String,
      required: [true, 'Username is required'],
      ref: 'User',
      index: true,
    },

    // Record Details
    title: {
      type: String,
      required: [true, 'Record title is required'],
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },

    type: {
      type: String,
      required: [true, 'Record type is required'],
      enum: [
        'Lab Report',
        'Prescription',
        'Radiology',
        'Vaccination',
        'Discharge Summary',
        'Medical History',
        'Consultation Note',
        'Test Report',
        'Other'
      ],
      index: true,
    },

    description: {
      type: String,
      default: 'Uploaded medical record awaiting detailed notes.',
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },

    date: {
      type: Date,
      required: [true, 'Record date is required'],
      default: new Date(),
    },

    doctor: {
      type: String,
      default: 'Not specified',
      minlength: [3, 'Doctor name must be at least 3 characters'],
    },

    // File Handling (via multer)
    file: {
      originalName: String,
      filename: String,
      path: String,
      mimetype: String,
      size: Number,
      uploadDate: Date,
    },

    // Medical Metrics (optional fields)
    findings: {
      normalResults: [String],
      abnormalResults: [String],
      remarks: String,
    },

    // Tags for search/filter
    tags: [String], // e.g., ["diabetes", "hypertension"]

    // Visibility
    isPrivate: {
      type: Boolean,
      default: false,
    },

    // AI Analysis
    aiInsights: {
      riskLevel: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical', ''],
        default: '',
      },
      insights: String,
      recommendations: [String],
      analysisDate: Date,
    },

    // Metadata
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Index for faster queries
 */
recordSchema.index({ username: 1, createdAt: -1 }); // Get records for a user, sorted by newest first
recordSchema.index({ type: 1, createdAt: -1 }); // Filter by type

/**
 * Update updatedAt on save
 */
recordSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Record', recordSchema);
