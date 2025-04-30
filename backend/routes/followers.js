const express = require('express');
const Profile = require('../models/Profile'); 
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/follow', auth, async (req, res) => {
  try {
    const { followingId } = req.body;
    const user = await Profile.findById(req.user.id); 
    const followingUser = await Profile.findById(followingId); 

    if (!followingUser) return res.status(404).json({ message: 'User not found' });

    if (!user.following.includes(followingId)) {
      user.following.push(followingId);
      followingUser.followers.push(req.user.id);
      await user.save();
      await followingUser.save();

      const notification = new Notification({
        userId: followingId,
        type: 'follow',
        senderId: req.user.id,
        message: `${user.username} started following you.`,
      });
      await notification.save();
    }

    res.json({ message: 'Followed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/unfollow', auth, async (req, res) => {
  try {
    const { followingId } = req.body;
    const user = await Profile.findById(req.user.id); 
    const followingUser = await Profile.findById(followingId); 

    if (!followingUser) return res.status(404).json({ message: 'User not found' });

    user.following = user.following.filter(id => id.toString() !== followingId);
    followingUser.followers = followingUser.followers.filter(id => id.toString() !== req.user.id);
    await user.save();
    await followingUser.save();

    res.json({ message: 'Unfollowed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const user = await Profile.findById(req.params.userId).populate('followers', 'username profilePic');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.followers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/following/:userId', async (req, res) => {
  try {
    const user = await Profile.findById(req.params.userId).populate('following', 'username profilePic');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.following);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const users = await Profile.find({
      username: { $regex: query, $options: 'i' },
    }).select('username profilePic bio');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;