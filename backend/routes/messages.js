const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const fs = require("fs");

// Set up multer for video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads/videos/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});
const upload = multer({ storage: storage });

// POST /api/messages/video
router.post("/video", upload.single("video"), (req, res) => {
  const { senderId, receiverId } = req.body;
  const videoUrl = `${req.protocol}://${req.get("host")}/uploads/videos/${req.file.filename}`;

  const newMessage = {
    senderId,
    receiverId,
    type: "video",
    content: videoUrl,
    timestamp: Date.now(),
  };

  // Send to Socket.io
  const io = req.app.get("io");
  io.to(receiverId).emit("newMessage", newMessage);

  res.status(201).json({ message: "Video message sent", data: newMessage });
});

module.exports = router;