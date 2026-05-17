/**
 * Authentication Controller
 * Handles user signup and login
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRE = '7d'; // Token expires in 7 days

/**
 * Generate JWT Token
 */
function generateToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
}

/**
 * User Signup
 * POST /api/auth/signup
 */
async function signup(req, res, next) {
  try {
    const { username, email, password, name, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or username',
      });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      name,
      role: role || 'patient',
    });

    // Generate token
    const token = generateToken(user._id);

    // Return user and token
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
}

/**
 * User Login
 * POST /api/auth/login
 */
async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
    }

    // Find user by username (select password because it's hidden by default)
    const user = await User.findOne({ username }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    // Compare password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Return user and token
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get Current User Profile
 * GET /api/auth/me
 */
async function getProfile(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Update User Profile
 * PUT /api/auth/update
 */
async function updateProfile(req, res, next) {
  try {
    const { name, email, phone, bio, dateOfBirth, bloodGroup } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        phone,
        bio,
        dateOfBirth,
        bloodGroup,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  login,
  getProfile,
  updateProfile,
};
