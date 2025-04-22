const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  gmail: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    default: 'https://i.pravatar.cc/150?img=1'
  },
  banner: {
    type: String,
    default: 'https://via.placeholder.com/1500x500'
  },
  bio: {
    type: String,
    default: ''
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', profileSchema);