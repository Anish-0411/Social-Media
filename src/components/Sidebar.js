// import React from 'react';
// import ReactDOM from 'react-dom';
// import  { useState, useContext } from 'react';
// import '../styles.css';
// import logo from '../assets/x.webp';
// import profilePic from '../assets/Passport.jpeg';
// import PostForm from './PostForm';
// import { PostContext } from './PostContext';

// import PremiumPage from './PremiumPage'

// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


// function Sidebar({ onAddPost }) {
//     const [showForm, setShowForm] = React.useState(false);

//     const openPostForm = () => setShowForm(true);
//     const closePostForm = () => setShowForm(false);
    
//     return (
//         <div className="side-section">
//             <div className="logo">
//                 <img src={logo} alt="logo" />
//             </div>
//             <nav>
//                 <a href="/home_page.html">
//                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z" fill="#FFFFFF"/>
//                     </svg>  
//                     Home
//                 </a>
//                 <a href="/explore">
//                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" fill="#FFFFFF"/>
//                     </svg>
//                     Explore
//                 </a>
       
//                 <a href="/notifications">
//                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z" fill="#FFFFFF"/>
//                     </svg>
//                 Notifications</a>
//                 <a href="/messages">
//                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M1.998 4.499c0-.828.671-1.499 1.5-1.499h17c.828 0 1.5.671 1.5 1.499v2.858l-10 4.545-10-4.547V4.499zm0 5.053V19.5c0 .828.671 1.5 1.5 1.5h17c.828 0 1.5-.672 1.5-1.5V9.554l-10 4.545-10-4.547z" fill="#FFFFFF"/>
//                     </svg>
//                 Messages</a>
//                 <a href="/bookmarks">
//                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" fill="#FFFFFF"/>
//                     </svg>
//                 Bookmarks</a>
//                 {/* <a href="/premium">
//                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFFFFF"/>
//                     </svg>
//                 Premium</a> */}
//                 <Link to="/premium" >
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//             <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFFFFF"/>
//           </svg>
//           Premium
//         </Link>
                
               
//                 <a href="/profile">
//                 <svg width="24" height="24"viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e" xmlns="http://www.w3.org/2000/svg">
//                     <g>
//                         <path fill="white" d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"/>
//                     </g>
//                 </svg>
//                 Profile</a>
//                 <button id="post" onClick={openPostForm}>Post</button>
//             </nav>
//             <div className="accounts">
//                 <span>
//                     <img src={profilePic} alt="profile-pic" className="profile-pic" />
//                 </span>
//                 <span><h5>Account_Name</h5></span>
//                 <span>
//                     <a href="#">
//                         <svg viewBox="0 0 24 24" width="20" height="20">
//                             <path d="..." />
//                         </svg>
//                     </a>
//                 </span>
//             </div>
//             {showForm &&
//         ReactDOM.createPortal(
//             <div className="modal-overlay">
//                 <div className="modal-content">
//                     <button className="close-btn" onClick={closePostForm}>X</button>
//                     <PostForm
//                         onAddPost={(newPost) => {
//                             onAddPost && onAddPost(newPost);
//                             closePostForm();
//                         }}
//                     />
//                 </div>
//             </div>,
//             document.body
//         )}
//         </div>
//     );
// }

// export default Sidebar;




import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import '../styles.css';
import logo from '../assets/x.webp';
import profilePic from '../assets/Passport.jpeg';
import PostForm from './PostForm';

const handleLogout = () => {
    localStorage.removeItem("user"); 
    window.location.href = "/login";
  };
  
function Sidebar({ onAddPost }) {
  const [showForm, setShowForm] = useState(false);

  const openPostForm = () => setShowForm(true);
  const closePostForm = () => setShowForm(false);

  return (
    <div className="side-section">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <nav>
        <Link to="/">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z" fill="#FFFFFF"/>
          </svg>
          Home
        </Link>

        <Link to="/explore">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" fill="#FFFFFF"/>
          </svg>
          Explore
        </Link>

        <Link to="/notifications">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zM5.134 16l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z" fill="#FFFFFF"/>
          </svg>
          Notifications
        </Link>

        <Link to="/messages">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M1.998 4.499c0-.828.671-1.499 1.5-1.499h17c.828 0 1.5.671 1.5 1.499v2.858l-10 4.545-10-4.547V4.499zm0 5.053V19.5c0 .828.671 1.5 1.5 1.5h17c.828 0 1.5-.672 1.5-1.5V9.554l-10 4.545-10-4.547z" fill="#FFFFFF"/>
          </svg>
          Messages
        </Link>

        <Link to="/bookmarks">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" fill="#FFFFFF"/>
          </svg>
          Bookmarks
        </Link>

        <Link to="/premium" >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFFFFF"/>
          </svg>
          Premium
        </Link>

        <Link to="/profile">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z" fill="white"/>
          </svg>
          Profile
        </Link>

        <button id="post" onClick={openPostForm}>Post</button>
      </nav>

      <div className="accounts">
  <img src={profilePic} alt="profile" className="profile-pic" />
  <h5>Account_Name</h5>
  <div className="logout-hover" onClick={handleLogout}>Log Out</div>
</div>

      {showForm &&
        ReactDOM.createPortal(
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={closePostForm}>X</button>
              <PostForm
                onAddPost={(newPost) => {
                  onAddPost && onAddPost(newPost);
                  closePostForm();
                }}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default Sidebar;