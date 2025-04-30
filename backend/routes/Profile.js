const express = require('express');
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await Profile.findById(req.params.id).select('-password'); 
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { username, bio, profilePic, banner } = req.body;
    const user = await Profile.findById(req.params.id); 
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.profilePic = profilePic || user.profilePic;
    user.banner = banner || user.banner;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;