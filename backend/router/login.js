const express = require('express');
const router = express.Router();
const verify = require('../verifytokenmw/verify_mv');
const allschemas = require('../models/Schemas');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = allschemas.User;

// @route GET api/login
// desc   test route
// access Public

router.get('/', verify, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/login
// desc   Aauthenticate token and get token
// access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }
    let { email, password } = req.body;
    try {
      // let user = await User.findOne({ email: email })
      //                  ||
      let user = await User.findOne({ email });

      // Check for existence of user exits
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      // user.password is from database

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Return jsonwebtokens
      let payload = {
        user: {
          id: user._id,
        },
      };

      // 25200 means 7 hours one user can be online with the given token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 25200 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send('Server Error');
      console.error(err.message);
    }
  }
);

module.exports = router;
