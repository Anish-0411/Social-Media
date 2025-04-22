import React, { useEffect, useState } from "react";
import NotificationCard from "./components/NotificationCard";
import socket from "./socket"; // Make sure path is correct

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    // Initial static notifications (optional)
    {
      id: 1,
      type: "follow-request",
      user: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=32",
      message: "John Doe sent you a follow request.",
    },
    {
      id: 2,
      type: "comment",
      user: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=45",
      message: "Jane commented on your post.",
    },
    {
      id: 3,
      type: "new-post",
      user: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=60",
      message: "Alex posted a new update.",
    },
  ]);

  useEffect(() => {
    socket.on("new-notification", (notification) => {
      console.log("🔔 New notification received:", notification);
      setNotifications((prev) => [notification, ...prev]); // Prepend to list
    });

    return () => {
      socket.off("new-notification");
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-400">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notif) => (
          <NotificationCard key={notif.id} notification={notif} />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;



// import React, { useState, useEffect } from 'react';


// const sampleNotifications = [
//   {
//     id: 1,
//     type: 'follow',
//     message: 'John Doe started following you.',
//     time: '2 mins ago',
//   },
//   {
//     id: 2,
//     type: 'comment',
//     message: 'Jane commented on your post.',
//     time: '10 mins ago',
//   },
//   {
//     id: 3,
//     type: 'post',
//     message: 'Alex posted a new photo.',
//     time: '1 hour ago',
//   },
// ];

// const NotificationsPage = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Simulating API fetch
//     setTimeout(() => {
//       setNotifications(sampleNotifications);
//     }, 1000);
//   }, []);

//   return (
//     <div className="notifications-container">
//       <h2>Notifications</h2>
//       {notifications.length === 0 ? (
//         <p className="loading">Loading notifications...</p>
//       ) : (
//         <ul className="notifications-list">
//           {notifications.map((notification) => (
//             <li key={notification.id} className={`notification-item ${notification.type}`}>
//               <div className="notification-icon">
//                 {notification.type === 'follow' && '👤'}
//                 {notification.type === 'comment' && '💬'}
//                 {notification.type === 'post' && '📷'}
//               </div>
//               <div className="notification-content">
//                 <p className="message">{notification.message}</p>
//                 <span className="time">{notification.time}</span>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NotificationsPage;
