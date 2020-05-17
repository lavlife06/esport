const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const User = require('../../models/User');

// @route POST api/signup
// desc   test route
// access Public
module.exports = (app) => {
  app.post(
    '/api/signup',
    [
      // We want the info of user according to the given below condition

      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'PLease enter password with >6 letter').isLength({
        min: 6,
      }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }
      let { name, email, password } = req.body;

      // Remove space between the name if any
      name = name.trim().split(' ').join('');

      try {
        // let user = await User.findOne({ email: email })
        //                  ||
        let user = await User.findOne({ email });
        // See if user exits
        console.log(user)
        if (user) {
          return res.send('You already have an account.')
        }

        // Create tag
        let tag = `@${name}`;

        // setupostinfo
        let setuppostinfo = false;

        // setupprofile
        let setupprofile = false;

        // Get avatar
        // let avatar =

        // Creating user instance
        user = new User({
          name,
          email,
          password,
          tag,
          setuppostinfo,
          setupprofile,
          // avatar,
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save data to atlas
        await user.save(); // In atlas data will be saved
        console.log('user added')
        // create jsonwebtoken
        let payload = {
          user: {
            id: user._id,
          },
        };

        jwt.sign(
          payload,
          keys.jwtSecret,
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
};
