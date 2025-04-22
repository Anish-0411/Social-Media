const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  gmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: 'New User' },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('User', userSchema);