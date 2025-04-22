const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }, // Or ref: 'User'
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }, // Or ref: 'User'
  type: { type: String, enum: ['text', 'image', 'video'], required: true },
  content: { type: String },
  mediaSrc: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }], // Or ref: 'User'
  comments: [commentSchema],
  shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }], // Or ref: 'User'
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);