// // src/MainApp.js
// import React, { useState } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Feed from './components/Feed';
// import FollowersBar from './components/FollowersBar';
// import NotificationPage from './NotificationsPage';
// import PremiumPage from './components/PremiumPage';
// import Message from './components/messages';
// import BookmarksPage from './components/Bookmark';
// import ExplorePage from './components/ExplorePage';
// import ProfilePage from './components/ProfilePage';
// import { PostProvider } from './components/PostContext';

// function MainApp() {
//   const [posts, setPosts] = useState([]);
//   const location = useLocation();

//   const hideFollowersBar = ['/messages', '/profile', '/premium', '/bookmarks', '/notifications'].includes(location.pathname);

//   const handleAddPost = (newPost) => {
//     setPosts((prevPosts) => [newPost, ...prevPosts]);
//   };

//   return (
//     <PostProvider>
//       <div className="app-container">
//         <Sidebar onAddPost={handleAddPost} />
//         <Routes>
//           <Route path="/" element={<Feed posts={posts} />} />
//           <Route path="/explore" element={<ExplorePage />} />
//           <Route path="/notifications" element={<NotificationPage />} />
//           <Route path="/bookmarks" element={<BookmarksPage />} />
//           <Route path="/premium" element={<PremiumPage />} />
//           <Route path="/messages" element={<Message />} />
//           <Route path="/profile" element={<ProfilePage />} />
//         </Routes>
//         {!hideFollowersBar && <FollowersBar />}
//       </div>
//     </PostProvider>
//   );
// }

// export default MainApp;

// src/MainApp.js
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import FollowersBar from './components/FollowersBar';
import NotificationPage from './NotificationsPage';
import PremiumPage from './components/PremiumPage';
import Message from './components/messages';
import BookmarksPage from './components/Bookmark';
import ExplorePage from './components/ExplorePage';
import ProfilePage from './components/ProfilePage';
import { PostProvider } from './components/PostContext';

function MainApp() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  const hideFollowersBar = ['/messages', '/profile', '/premium', '/bookmarks', '/notifications'].includes(location.pathname);

  const handleAddPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <PostProvider>
      <div className="app-container">
        {/* Sidebar */}
        <Sidebar onAddPost={handleAddPost} />

        {/* Main content area */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Feed posts={posts} />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/messages" element={<Message />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          {!hideFollowersBar && <FollowersBar />}
        </div>
      </div>
    </PostProvider>
  );
}

export default MainApp;