import React from "react";
import { Bell, MessageCircle, UserPlus } from "lucide-react";

const NotificationCard = ({ notification }) => {
  if (!notification) return null;

  const { type, avatar, message, user } = notification;

  const getIcon = () => {
    switch (type) {
      case "follow-request":
        return <UserPlus style={iconStyles.follow} />;
      case "comment":
        return <MessageCircle style={iconStyles.comment} />;
      case "new-post":
        return <Bell style={iconStyles.post} />;
      default:
        return <Bell style={iconStyles.default} />;
    }
  };

  const notificationCardStyles = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "#000", // Black background
    borderRadius: "1rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    color: "#fff", // White text color
    width: "80vw", // 80% of the viewport width
    maxWidth: "900px", // Maximum width (optional)
    margin: "auto", // Center the card horizontally
  };

  const avatarStyles = {
    width: "50px", // Increased size for larger avatar
    height: "50px", // Increased size for larger avatar
    borderRadius: "9999px",
    objectFit: "cover",
    border: "1px solid #ccc",
  };

  const messageContentStyles = {
    flex: "1",
    color: "#fff", // White text color
    fontSize: "1rem", // Slightly larger text
  };

  const iconContainerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const iconStyles = {
    follow: { color: "#1DA1F2", width: "20px", height: "20px" }, // Twitter Blue
    comment: { color: "#1DA1F2", width: "20px", height: "20px" }, // Twitter Blue
    post: { color: "#1DA1F2", width: "20px", height: "20px" }, // Twitter Blue
    default: { color: "#6b7280", width: "20px", height: "20px" },
  };

  return (
    <div style={notificationCardStyles}>
      <img
        src={avatar || "https://i.pravatar.cc/150?img=50"}
        alt={`${user || "User"}'s avatar`}
        style={avatarStyles}
      />
      <div style={messageContentStyles}>
        <p>{message || "You have a new notification."}</p>
      </div>
      <div style={iconContainerStyles}>{getIcon()}</div>
    </div>
  );
};

export default NotificationCard;