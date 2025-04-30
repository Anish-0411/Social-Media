const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }, 
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }, 
  type: { type: String, enum: ['text', 'image', 'video'], required: true },
  content: { type: String },
  mediaSrc: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }], 
  comments: [commentSchema],
  shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);  