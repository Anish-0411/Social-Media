



// import React, { useState } from 'react';
// import './App.css';
// import './styles.css';
// import './App.css';
// import Sidebar from './components/Sidebar';
// import Feed from './components/Feed';
// import FollowersBar from './components/FollowersBar';
// import NotificationPage from './NotificationsPage';
// import PremiumPage from './components/PremiumPage';
// import Message from './components/messages';

// import { PostProvider } from './components/PostContext';
// import { Routes, Route } from 'react-router-dom';

// function App() {
//   const [posts, setPosts] = useState([]);

//   const handleAddPost = (newPost) => {
//     setPosts((prevPosts) => [newPost, ...prevPosts]);
//   };

//   return (
//     <PostProvider>
//       <div className="app-container">
//         <Sidebar onAddPost={handleAddPost} />
//         <Routes>
//           <Route path="/" element={<Feed posts={posts} />} />
//           <Route path="/notifications" element={<NotificationPage />} />
//           <Route path="/premium" element={<PremiumPage />} />
//           <Route path="/messages" element={<Message />} />
//         </Routes>
//         <FollowersBar/>
//       </div>
//     </PostProvider>
//   );
// }

// export default App;
// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MainApp from './MainApp';
import ProtectedRoute from './routes/ProtectedRoute';
import socket from './socket';
import { useEffect } from 'react';

function App() {
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      socket.emit('join', userId);
    }
  }, [userId]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={
        <ProtectedRoute>
          <MainApp />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;