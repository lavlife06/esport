const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String
});

const UserGoogle = mongoose.model('userGoogle', userSchema);

module.exports = UserGoogle

