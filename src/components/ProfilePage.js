import React, { useState } from 'react';
import './profile.css';

const ProfilePage = () => {
  const [user, setUser] = useState({
    avatar: 'https://i.pravatar.cc/150?img=1',
    banner: 'https://via.placeholder.com/1500x500',
    username: 'UserX',
    bio: 'Welcome to my X profile!',
  });

  const [newAvatar, setNewAvatar] = useState(null);
  const [newBanner, setNewBanner] = useState(null);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newBio, setNewBio] = useState(user.bio);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBanner(URL.createObjectURL(file));
    }
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleBioChange = (e) => {
    setNewBio(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      avatar: newAvatar || user.avatar,
      banner: newBanner || user.banner,
      username: newUsername,
      bio: newBio,
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Banner */}
        <div className="banner-container">
          <img
            src={newBanner || user.banner}
            alt="Profile Banner"
            className="profile-banner"
          />
          <input
            type="file"
            accept="image/*"
            id="banner"
            className="banner-input"
            onChange={handleBannerChange}
          />
          <label htmlFor="banner" className="banner-edit-btn">
            Edit Banner
          </label>
        </div>

        {/* Profile Avatar */}
        <div className="avatar-container">
          <img
            src={newAvatar || user.avatar}
            alt="User Avatar"
            className="user-avatar"
          />
          <input
            type="file"
            accept="image/*"
            id="avatar"
            className="avatar-input"
            onChange={handleAvatarChange}
          />
          <label htmlFor="avatar" className="avatar-edit-btn">
            Edit
          </label>
        </div>

        {/* Form */}
        <div className="form-container">
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username" className="input-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={newUsername}
                onChange={handleUsernameChange}
                className="input-field"
                placeholder="Your username"
                maxLength="15"
              />
            </div>

            <div className="input-group">
              <label htmlFor="bio" className="input-label">
                Bio
              </label>
              <textarea
                id="bio"
                value={newBio}
                onChange={handleBioChange}
                className="bio-input"
                placeholder="Tell the world about yourself..."
                maxLength="160"
              />
            </div>

            <button type="submit" className="submit-btn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;