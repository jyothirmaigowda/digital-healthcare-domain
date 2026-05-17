/**
 * Records Controller
 * Handles medical records operations
 */

const Record = require('../models/Record');
const fs = require('fs');
const path = require('path');

/**
 * Get all records for a user
 * GET /api/records/:username
 */
async function getUserRecords(req, res, next) {
  try {
    const { username } = req.params;
    const { type, limit = 10, skip = 0 } = req.query;

    // Build query
    let query = { username };
    if (type) {
      query.type = type;
    }

    // Get records with pagination
    const records = await Record.find(query)
      .sort({ createdAt: -1 }) // Newest first
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await Record.countDocuments(query);

    res.status(200).json({
      success: true,
      count: records.length,
      total,
      records,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get single record by ID
 * GET /api/records/:id
 */
async function getRecordById(req, res, next) {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }

    res.status(200).json({
      success: true,
      record,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Create new record
 * POST /api/records
 */
async function createRecord(req, res, next) {
  try {
    const { username, title, type, description, date, doctor } = req.body;
    const safeDescription =
      description && description.trim()
        ? description.trim()
        : 'Uploaded medical record awaiting detailed notes.';
    const safeDoctor =
      doctor && doctor.trim()
        ? doctor.trim()
        : 'Not specified';

    // Validate required fields
    if (!username || !title || !type || !date) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: username, title, type, date',
      });
    }

    // Handle file upload
    let fileData = null;
    if (req.file) {
      fileData = {
        originalName: req.file.originalname,
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
        mimetype: req.file.mimetype,
        size: req.file.size,
        uploadDate: new Date(),
      };
    }

    // Create record
    const record = await Record.create({
      username,
      title,
      type,
      description: safeDescription,
      date: new Date(date),
      doctor: safeDoctor,
      file: fileData,
    });

    res.status(201).json({
      success: true,
      message: 'Record created successfully',
      record,
    });
  } catch (error) {
    // Delete uploaded file if record creation fails
    if (req.file) {
      fs.unlink(req.file.path, err => {
        if (err) console.error('Failed to delete file:', err);
      });
    }
    next(error);
  }
}

/**
 * Update record
 * PUT /api/records/:id
 */
async function updateRecord(req, res, next) {
  try {
    const { id } = req.params;
    const { title, type, description, date, doctor } = req.body;

    let record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }

    // Update fields
    if (title) record.title = title;
    if (type) record.type = type;
    if (description) record.description = description;
    if (date) record.date = new Date(date);
    if (doctor) record.doctor = doctor;

    // Handle file update
    if (req.file) {
      // Delete old file if exists
      if (record.file && record.file.filename) {
        fs.unlink(record.file.path, err => {
          if (err) console.error('Failed to delete old file:', err);
        });
      }

      record.file = {
        originalName: req.file.originalname,
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
        mimetype: req.file.mimetype,
        size: req.file.size,
        uploadDate: new Date(),
      };
    }

    record = await record.save();

    res.status(200).json({
      success: true,
      message: 'Record updated successfully',
      record,
    });
  } catch (error) {
    // Delete uploaded file if update fails
    if (req.file) {
      fs.unlink(req.file.path, err => {
        if (err) console.error('Failed to delete file:', err);
      });
    }
    next(error);
  }
}

/**
 * Delete record
 * DELETE /api/records/:id
 */
async function deleteRecord(req, res, next) {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }

    // Delete file if exists
    if (record.file && record.file.filename) {
      const filePath = path.join(__dirname, '../uploads', record.file.filename);
      fs.unlink(filePath, err => {
        if (err) console.error('Failed to delete file:', err);
      });
    }

    await Record.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Record deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Search records
 * GET /api/records/search?q=query
 */
async function searchRecords(req, res, next) {
  try {
    const { q, username } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const query = {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } },
      ],
    };

    if (username) {
      query.username = username;
    }

    const records = await Record.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      records,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUserRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
  searchRecords,
};
