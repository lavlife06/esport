const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  // tag: {
  //   type: String,
  // },
  // name: {
  //   type: String,
  // },
  bio: {
    type: String,
  },
  // numoffollowers:{type:Number},
  // numoffollowing:{type:Number},
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  following: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  // achievements: [
  //   {
  //     eventname: {
  //       type: String,
  //     },
  //     eventdescription: {
  //       type: String,
  //     },
  //   },
  // ],
  // profileviewers: {
  //   type: String,
  // },
  // numofviewers:{
  // type: Number
  // },
  // location: {
  //   type: String,
  // },
  gameinterest: {
    type: [String],
  },
  social: {
    // youtube: {
    //   type: String,
    // },
    // twitter: {
    //   type: String,
    // },
    // facebook: {
    //   type: String,
    // },
    // linkedin: {
    //   type: String,
    // },
    instagram: {
      type: String,
    },
  },
  // Otherlinks like mineown website link or as origanization i have website to share here
  // platformname can be like mywebsite or other gaming platformnames and its link
  // otherlinks: [
  //   {
  //     platformname: {
  //       type: String,
  //     },
  //     link: {
  //       type: String,
  //     },
  //   },
  // ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;
