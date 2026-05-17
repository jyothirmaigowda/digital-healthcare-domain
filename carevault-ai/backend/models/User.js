/**
 * User Model
 * Stores patient and doctor information
 */

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
      lowercase: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },

    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, 'Name must be at least 2 characters'],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default in queries
    },

    role: {
      type: String,
      enum: ['patient', 'doctor'],
      default: 'patient',
    },

    // Contact
    phone: {
      type: String,
      trim: true,
    },

    // Medical Info
    dateOfBirth: {
      type: Date,
    },

    bloodGroup: {
      type: String,
      enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', ''],
    },

    medicalHistory: [{
      condition: String,
      diagnosedDate: Date,
      status: { type: String, enum: ['active', 'resolved'] },
    }],

    allergies: [String], // e.g., ["Penicillin", "Latex"]

    // Doctor-specific fields
    specialization: String,
    licenseNumber: String,
    hospitalAffiliation: String,

    // Profile
    profilePicture: String, // URL to uploaded image
    bio: String,

    // Account Status
    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: Date,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

/**
 * Hash password before saving
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Compare password for login
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

/**
 * Return user object without password
 */
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);
