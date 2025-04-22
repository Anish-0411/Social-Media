import React, { useState, useRef, useEffect } from 'react';
import '../styles.css';
import profilePic from '../assets/Passport.jpeg';
import socket from '../socket'; // Ensure this is configured correctly

const MessagePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatHistory, setChatHistory] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const currentUser = 'Alice'; // Replace with logged-in user (e.g., from auth context)
  const followers = [
    { name: 'Bob Smith', img: 'profile2.jpg', id: 'bob123' },
    { name: 'Alice Johnson', img: 'profile1.jpg', id: 'alice456' },
  ];

  useEffect(() => {
    // Join socket room using currentUser
    socket.emit('join', currentUser);

    // Listen for messages
    socket.on('receive-message', (msg) => {
      if (msg.recipient === currentUser) {
        setChatHistory((prev) => ({
          ...prev,
          [msg.sender]: [...(prev[msg.sender] || []), msg],
        }));
      }
    });

    return () => {
      socket.off('receive-message');
    };
  }, [currentUser]);

  const filteredFollowers = followers.filter((follower) =>
    follower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSend = () => {
    if ((!newMessage.trim() && !file) || !selectedUser) return;

    const message = {
      sender: currentUser,
      recipient: selectedUser.name,
      text: newMessage,
      file: file ? URL.createObjectURL(file) : null,
      type: file ? (file.type.startsWith('video') ? 'video' : 'image') : 'text',
      timestamp: new Date(),
    };

    socket.emit('send-message', message);

    setChatHistory((prev) => ({
      ...prev,
      [selectedUser.name]: [...(prev[selectedUser.name] || []), message],
    }));

    setNewMessage('');
    setFile(null);
    fileInputRef.current.value = '';
  };

  const messages = selectedUser ? chatHistory[selectedUser.name] || [] : [];

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="people">
        <h3 style={{ fontSize: '24px', margin: '15px', color: 'white' }}>Messages</h3>
        <div className="mess-search-bar">
          <svg viewBox="0 0 24 24" fill="white">
            <path d="M10 2a8 8 0 105.293 14.293l5.207 5.207-1.414 1.414-5.207-5.207A8 8 0 1010 2z" />
          </svg>
          <input
            type="text"
            placeholder="Enter a Name to Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredFollowers.map((follower, index) => (
          <div className="p1" key={index} onClick={() => handleUserClick(follower)}>
            <a href="#">
              <img src={follower.img} alt="profile" />
              <span>{follower.name}</span>
            </a>
          </div>
        ))}
      </div>

      {/* Chat */}
      <div className="message-section">
        <div className="user-name">
          {selectedUser ? (
            <a href="#" className="user-link">
              <img className="user-icon" alt="user-profile" src={profilePic} />
              <span className="user-text">{selectedUser.name}</span>
            </a>
          ) : (
            <span className="user-text" style={{ marginLeft: '20px', color: 'white' }}>
              Select a user to start chatting
            </span>
          )}
        </div>

        <div className="chat-display">
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: msg.sender === currentUser ? 'flex-end' : 'flex-start',
              }}
            >
              <div className={msg.sender === currentUser ? 'message sent' : 'message'}>
                {msg.type === 'text' && <p>{msg.text}</p>}
                {msg.type === 'image' && (
                  <img
                    src={msg.file}
                    alt="upload"
                    style={{ maxWidth: '200px', borderRadius: '10px' }}
                  />
                )}
                {msg.type === 'video' && (
                  <video controls style={{ maxWidth: '200px', borderRadius: '10px' }}>
                    <source src={msg.file} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="chat-container">
          <div className="message-bar">
            <label className="icon-btn">
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <svg viewBox="0 0 24 24" className="upload-icon">
                <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5v9.086l3-3 3 3 5-5 3 3V5.5H5.5z" />
              </svg>
            </label>
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={!selectedUser}
            />
            <button className="send-btn icon-btn" onClick={handleSend} disabled={!selectedUser}>
              <svg viewBox="0 0 24 24" className="forward-icon">
                <path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12S3.04 4.281 3.03 4.243L2.504 2.134 22.236 12 2.504 21.866zM5.981 13H10v-2H5.981c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;



// import { useEffect } from 'react';
// import socket from '../socket'; // Adjust path based on your structure

// const MessagePage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [chatHistory, setChatHistory] = useState({});
//   const [newMessage, setNewMessage] = useState('');
//   const [file, setFile] = useState(null);
//   const fileInputRef = useRef(null);

//   // Replace this with your auth logic
//   const currentUser = localStorage.getItem('username') || 'me';

//   const followers = [
//     { name: 'Alice Johnson', img: 'profile1.jpg' },
//     { name: 'Bob Smith', img: 'profile2.jpg' },
//   ];

//   useEffect(() => {
//     if (currentUser) {
//       socket.emit('join', currentUser);
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     socket.on('receive-message', (msg) => {
//       const sender = msg.sender;

//       const incomingMsg = {
//         ...msg,
//         sender: sender,
//       };

//       setChatHistory((prev) => ({
//         ...prev,
//         [sender]: [...(prev[sender] || []), incomingMsg],
//       }));
//     });

//     return () => {
//       socket.off('receive-message');
//     };
//   }, []);

//   const filteredFollowers = followers.filter((follower) =>
//     follower.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleUserClick = (user) => {
//     setSelectedUser(user.name);
//   };

//   const handleSend = () => {
//     if ((!newMessage.trim() && !file) || !selectedUser) return;

//     const newMsg = {
//       text: newMessage,
//       file: file ? URL.createObjectURL(file) : null,
//       type: file ? (file.type.startsWith('video') ? 'video' : 'image') : 'text',
//       sender: 'me',
//       recipient: selectedUser,
//       timestamp: new Date(),
//     };

//     setChatHistory((prev) => ({
//       ...prev,
//       [selectedUser]: [...(prev[selectedUser] || []), newMsg],
//     }));

//     socket.emit('send-message', {
//       ...newMsg,
//       sender: currentUser,
//       file: null, // File sending not implemented yet
//     });

//     setNewMessage('');
//     setFile(null);
//     fileInputRef.current.value = '';
//   };

//   const messages = chatHistory[selectedUser] || [];

//   return (
//     <div className="container">
//       {/* Followers section */}
//       <div className="people">
//         <h3 style={{ fontSize: '24px', margin: '15px', color: 'white' }}>Messages</h3>

//         <div className="mess-search-bar">
//           <svg viewBox="0 0 24 24" fill="white">
//             <path d="M10 2a8 8 0 105.293 14.293l5.207 5.207-1.414 1.414-5.207-5.207A8 8 0 1010 2z" />
//           </svg>
//           <input
//             type="text"
//             placeholder="Enter a Name to Search"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {filteredFollowers.map((follower, index) => (
//           <div className="p1" key={index} onClick={() => handleUserClick(follower)}>
//             <a href="#">
//               <img src={follower.img} alt="profile" />
//               <span>{follower.name}</span>
//             </a>
//           </div>
//         ))}
//       </div>

//       {/* Chat section */}
//       <div className="message-section">
//         <div className="user-name">
//           {selectedUser ? (
//             <a href="#" className="user-link">
//               <img className="user-icon" alt="user-profile" src="Passport.jpeg" />
//               <span className="user-text">{selectedUser}</span>
//             </a>
//           ) : (
//             <span className="user-text" style={{ marginLeft: '20px', color: 'white' }}>
//               Select a user to start chatting
//             </span>
//           )}
//         </div>

//         <div className="chat-display">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               style={{
//                 display: 'flex',
//                 justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start',
//               }}
//             >
//               <div className={msg.sender === 'me' ? 'message sent' : 'message'}>
//                 {msg.type === 'text' && <p>{msg.text}</p>}
//                 {msg.type === 'image' && (
//                   <img
//                     src={msg.file}
//                     alt="upload"
//                     style={{ maxWidth: '200px', borderRadius: '10px' }}
//                   />
//                 )}
//                 {msg.type === 'video' && (
//                   <video controls style={{ maxWidth: '200px', borderRadius: '10px' }}>
//                     <source src={msg.file} type="video/mp4" />
//                   </video>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Input field */}
//         <div className="chat-container">
//           <div className="message-bar">
//             <label className="icon-btn">
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 style={{ display: 'none' }}
//                 accept="image/*,video/*"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//               <svg viewBox="0 0 24 24" className="upload-icon">
//                 <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5v9.086l3-3 3 3 5-5 3 3V5.5H5.5z" />
//               </svg>
//             </label>
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               disabled={!selectedUser}
//             />
//             <button className="send-btn icon-btn" onClick={handleSend} disabled={!selectedUser}>
//               <svg viewBox="0 0 24 24" className="forward-icon">
//                 <path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12S3.04 4.281 3.03 4.243L2.504 2.134 22.236 12 2.504 21.866zM5.981 13H10v-2H5.981c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183z" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessagePage;























