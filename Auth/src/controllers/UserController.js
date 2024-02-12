const User = require('../models/User'); // Import your user model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();

    // Optionally, you may generate a token and send it in the response for automatic login
    const token = generateToken(newUser._id);
    
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the entered password with the hashed password stored in the database
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a token for successful login
    const token = generateToken(user._id);

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    // Assuming you use authentication middleware to attach the user to the request object
    const user = req.user;

    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Helper function to generate a JWT token
const generateToken = (userId) => {
  const secret = 'your-secret-key'; // Change this to a strong, secure secret
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
};

module.exports = { registerUser, loginUser, getUserDetails };
