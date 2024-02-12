const mongoose = require('mongoose');

const checkValidId = (req, res, next) => {
  const { id } = req.params;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  // If the ID is valid, proceed with the next middleware or route handler
  next();
};

module.exports = checkValidId;
