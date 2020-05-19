const express = require('express');
const verify = require('../../verifytokenmw/verify_mv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

module.exports = (app) => {
  app.get('/api/login', verify, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  app.post(
    '/api/login',
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
        let user = await User.findOne({ email });

        // Check for existence of user exits
        if (!user) {
          return res.send('You are not Registered with us.');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        // user.password is from database
        if (!isMatch) {
          return res.send('Password did not match.');
        }
        // Return jsonwebtokens
        let payload = {
          user: {
            id: user._id,
          },
        };
        // 25200 means 7 hours one user can be online with the given token
        jwt.sign(payload, keys.jwtSecret, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      } catch (err) {
        res.status(500).send('Server Error');
        console.error('login error server: ', err.message);
      }
    }
  );
};
