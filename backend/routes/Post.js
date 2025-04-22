const express = require('express');
const Post = require('../models/Post');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'username profilePic');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { type, content, mediaSrc } = req.body;
    const post = new Post({ userId: req.user.id, type, content, mediaSrc });
    await post.save();

    const user = await require('../models/Profile').findById(req.user.id); // Or require('../models/User') if using User.js
    user.followers.forEach(async (followerId) => {
      const notification = new Notification({
        userId: followerId,
        type: 'new-post',
        senderId: req.user.id,
        postId: post._id,
        message: `${user.username} posted a new update.`,
      });
      await notification.save();
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const liked = post.likes.includes(req.user.id);
    if (liked) {
      post.likes = post.likes.filter(id => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
      if (post.userId.toString() !== req.user.id) {
        const user = await require('../models/Profile').findById(req.user.id); // Or require('../models/User')
        const notification = new Notification({
          userId: post.userId,
          type: 'like',
          senderId: req.user.id,
          postId: post._id,
          message: `${user.username} liked your post.`,
        });
        await notification.save();
      }
    }
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = { userId: req.user.id, text };
    post.comments.push(comment);
    await post.save();

    if (post.userId.toString() !== req.user.id) {
      const user = await require('../models/Profile').findById(req.user.id); // Or require('../models/User')
      const notification = new Notification({
        userId: post.userId,
        type: 'comment',
        senderId: req.user.id,
        postId: post._id,
        message: `${user.username} commented on your post.`,
      });
      await notification.save();
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/share', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const shared = post.shares.includes(req.user.id);
    if (shared) {
      post.shares = post.shares.filter(id => id.toString() !== req.user.id);
    } else {
      post.shares.push(req.user.id);
    }
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;