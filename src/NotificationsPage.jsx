import React, { useEffect, useState } from "react";
import NotificationCard from "./components/NotificationCard";
import socket from "./socket";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
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
    {
      id: 4,
      type: "like",
      user: "Emily Carter",
      avatar: "https://i.pravatar.cc/150?img=12",
      message: "Emily liked your post.",
    },
    {
      id: 5,
      type: "mention",
      user: "Michael Lee",
      avatar: "https://i.pravatar.cc/150?img=24",
      message: "Michael mentioned you in a comment.",
    },
    {
      id: 6,
      type: "follow-request",
      user: "Sofia Perez",
      avatar: "https://i.pravatar.cc/150?img=17",
      message: "Sofia sent you a follow request.",
    },
    {
      id: 7,
      type: "message",
      user: "Liam Brown",
      avatar: "https://i.pravatar.cc/150?img=29",
      message: "Liam sent you a new message.",
    },
    {
      id: 8,
      type: "tag",
      user: "Noah Wilson",
      avatar: "https://i.pravatar.cc/150?img=38",
      message: "Noah tagged you in a photo.",
    },
    {
      id: 9,
      type: "like",
      user: "Chloe Davis",
      avatar: "https://i.pravatar.cc/150?img=41",
      message: "Chloe liked your comment.",
    },
    {
      id: 10,
      type: "comment",
      user: "Lucas Thompson",
      avatar: "https://i.pravatar.cc/150?img=50",
      message: "Lucas replied to your comment.",
    },
    {
      id: 11,
      type: "new-post",
      user: "Olivia Martinez",
      avatar: "https://i.pravatar.cc/150?img=61",
      message: "Olivia posted a new update.",
    },
    {
      id: 12,
      type: "message",
      user: "Ethan White",
      avatar: "https://i.pravatar.cc/150?img=72",
      message: "Ethan sent you a new message.",
    },
    {
      id: 13,
      type: "follow-request",
      user: "Ava Robinson",
      avatar: "https://i.pravatar.cc/150?img=89",
      message: "Ava sent you a follow request.",
    }
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

