import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Helper: Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};

// REGISTER
export const register = async (req, res) => {
  try {
    const { fullName, email, password, phone, role, course } = req.body;

    // Check if user already exists by email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new user
    const user = await User.create({
      fullName,
      email,
      password,
      phone,
      role,
      course
    });

    res.status(201).json({
      message: 'User registered successfully',
      token: generateToken(user),
      user: { id: user._id, fullName: user.fullName, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      token: generateToken(user),
      user: { id: user._id, fullName: user.fullName, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
