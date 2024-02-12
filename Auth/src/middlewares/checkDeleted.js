const checkDeletePermission = (req, res, next) => {
    try {
      // Assuming you have already authenticated the user and attached it to the request object
      const { isAdmin } = req.adminUser || req.user; // Check if it's an admin user or a normal user
  
      if (!isAdmin) {
        return res.status(403).json({ error: 'Forbidden - Insufficient permissions' });
      }
  
      // If the user is an admin, proceed with the deletion
      next();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = checkDeletePermission;
  