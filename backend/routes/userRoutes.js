const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all users
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Follow a user
router.post('/follow/:id', auth, async (req, res) => {
  const userId = req.user.id;
  const followId = req.params.id;

  if (userId === followId) return res.status(400).json({ message: "You can't follow yourself" });

  try {
    const user = await User.findById(userId);
    const followUser = await User.findById(followId);

    if (!followUser) return res.status(404).json({ message: 'User not found' });

    if (!user.following.includes(followId)) {
      user.following.push(followId);
      followUser.followers.push(userId);

      await user.save();
      await followUser.save();
    }

    res.json({ message: 'Followed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error following user' });
  }
});

module.exports = router;