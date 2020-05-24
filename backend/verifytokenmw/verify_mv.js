const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

module.exports = async (req, res, next) => {
  // Get token from header
  const token = await req.header('x-auth-token');
  // console.log(req.headers);
  // Check for token
  console.log(token)
  if (!token) {
    console.log('not authorized')
    return res
      .status(401)
      .json({ errors: [{ msg: 'No token, authorization denied' }] });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, keys.jwtSecret);

    req.user = decoded.user; // Now req.user will be acessed from anywhere

    next();

  } catch (err) {
    console.log(err)
    return res.status(401).json({ errors: [{ msg: 'Token is not valid' }] });
  }
};
