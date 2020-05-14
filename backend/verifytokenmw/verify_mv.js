const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, keys.jwtSecret);

    req.user = decoded.user; // Now req.user will be acessed from anywhere

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
