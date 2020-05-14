const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserGoogle = require('../models/User')

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done)=> {
  UserGoogle.findById(id).then((user)=>{
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClentSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const user =  await UserGoogle.findOne({googleId: profile.id})
      if(user){
        return done(null, user)
      }
      const newUser =  await new UserGoogle({googleId : profile.id}).save()
      done(null, newUser)
    }
  )
)