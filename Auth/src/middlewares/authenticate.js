const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AdminUser = require('../models/AdminUser');

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Replace with your actual secret

    // Check if the decoded token contains a userId
    if (decoded.userId) {
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized - Invalid user' });
      }

      req.user = user;
      next();
    } else {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

const authenticateAdminUser = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Replace with your actual secret

    // Check if the decoded token contains an adminUserId
    if (decoded.adminUserId) {
      const adminUser = await AdminUser.findById(decoded.adminUserId);

      if (!adminUser) {
        return res.status(401).json({ error: 'Unauthorized - Invalid admin user' });
      }

      req.adminUser = adminUser;
      next();
    } else {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = { authenticateUser, authenticateAdminUser };
