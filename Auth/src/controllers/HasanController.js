const AdminUser = require('../models/AdminUser'); // Import your admin user model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginAdminUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin user by email
    const adminUser = await AdminUser.findOne({ email });

    if (!adminUser) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the entered password with the hashed password stored in the database
    const isPasswordValid = await adminUser.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a token for successful login
    const token = generateToken(adminUser._id);

    res.json({ adminUser, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAdminUserDetails = async (req, res) => {
  try {
    // Assuming you use authentication middleware to attach the admin user to the request object
    const adminUser = req.adminUser;

    res.json({ adminUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Helper function to generate a JWT token
const generateToken = (adminUserId) => {
  const secret = 'your-secret-key'; // Change this to a strong, secure secret
  return jwt.sign({ adminUserId }, secret, { expiresIn: '1h' });
};

module.exports = { loginAdminUser, getAdminUserDetails };
