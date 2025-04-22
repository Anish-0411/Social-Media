const express = require('express');
const Bookmark = require('../models/Bookmark');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user.id })
      .populate({
        path: 'postId',
        populate: { path: 'userId', select: 'username profilePic' },
      });
    res.json(bookmarks.map(b => b.postId));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { postId } = req.body;
    const existingBookmark = await Bookmark.findOne({ userId: req.user.id, postId });
    if (existingBookmark) return res.status(400).json({ message: 'Post already bookmarked' });

    const bookmark = new Bookmark({ userId: req.user.id, postId });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:postId', auth, async (req, res) => {
  try {
    const result = await Bookmark.deleteOne({ userId: req.user.id, postId: req.params.postId });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Bookmark not found' });
    res.json({ message: 'Bookmark removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;