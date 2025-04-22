const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }, // Or ref: 'User'
  type: { type: String, enum: ['like', 'comment', 'follow', 'new-post'], required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }, // Or ref: 'User'
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);