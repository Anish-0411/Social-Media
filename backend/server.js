const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
// app.use(cors());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/users', require('./routes/Profile'));
app.use('/api/posts', require('./routes/Post'));
app.use('/api/followers', require('./routes/followers'));
app.use('/api/notifications', require('./routes/notification'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/bookmarks', require('./routes/bookmark'));
app.use('/api/users', require('./routes/userRoutes'));

// Test route
app.get('/', (req, res) => {
  res.send('✅ API is running...');
});

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Handle Socket.io connections
io.on('connection', (socket) => {
  console.log('🟢 New client connected:', socket.id);

  // User joins their own room for direct messaging
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`👤 User ${userId} joined their room`);
  });

  // Message event: send to specific recipient's room
  socket.on('send-message', (data) => {
    const { senderId, receiverId, text, timestamp } = data;
    io.to(receiverId).emit('receive-message', {
      senderId,
      receiverId,
      text,
      timestamp
    });
  });

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
});



// MongoDB connection + Start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});