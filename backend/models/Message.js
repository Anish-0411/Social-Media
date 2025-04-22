const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }, // Or ref: 'User'
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }, // Or ref: 'User'
  text: { type: String },
  file: { type: String },
  type: { type: String, enum: ['text', 'image', 'video'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);