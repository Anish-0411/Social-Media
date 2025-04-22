import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img
        src={user.avatar}
        alt={user.name}
        className="user-avatar"
      />
      <h3 className="user-name">{user.name}</h3>
      <p className="user-bio">{user.bio}</p>

      <div className="follow-btn-container">
        <button className="follow-btn">Follow</button>
      </div>
    </div>
  );
};

export default UserCard;
