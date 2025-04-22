import React, { useEffect, useState } from "react";
import axios from "axios";
import "./explore.css";

const ExplorePage = () => {
  const [users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    fetchUsers();
  }, [token]);

  const handleFollow = async (id) => {
    try {
      await axios.post(`http://localhost:5050/api/users/follow/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFollowers([...followers, id]);
    } catch (err) {
      console.error("Follow error", err);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.gmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="explore-container">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search for users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div className="user-card" key={user._id}>
              <img
                src={user.avatar || "https://i.pravatar.cc/150"}
                alt={user.name}
                className="user-avatar"
              />
              <div className="user-name">{user.name}</div>
              <div className="user-bio">{user.bio}</div>
              <div className="follow-btn-container">
                <button
                  className="follow-btn"
                  onClick={() => handleFollow(user._id)}
                  disabled={followers.includes(user._id)}
                >
                  {followers.includes(user._id) ? "Following" : "Follow"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-users">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;