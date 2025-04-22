const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }, // Or ref: 'User'
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);