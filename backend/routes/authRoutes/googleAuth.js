const express = require('express');
const passport = require('passport');
const User = require('../../models/User');

module.exports = (app) => {
  app.post('/api/google/login_success', async (req, res) => {
    console.log('in side google server')
    try {
      let { name, email } = req.body;     
      let user = await User.findOne({ email });
      // See if user exits
      if (user) {
        console.log('user already exists')
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exits' }] });
      }
      let  newUser = new User({
        name,
        email
      });
      // Save data to atlas
      await newUser.save(); // In atlas data will be saved
      console.log('user from google added')
    }catch(e){
      console.log('google Error from server',e)
    }
  })
}