import React from "react";

const FollowersBar = () => {
  const getRandomFollowers = () => {
    const allFollowers = [
      "Alice Johnson",
      "Bob Smith",
      "Charlie Doe",
      "Daisy Carter",
      "Ethan Blake",
      "Fiona Miles"
    ];
    const shuffled = [...allFollowers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 2) + 3); 
  };

  const followers = getRandomFollowers();

  return (

      <div className="followers">
        <h2>Followers</h2>
        {followers.length === 0 ? (
          <p style={{ color: "#999" }}>No followers yet.</p>
        ) : (
          <ul>
            {followers.map((follower, index) => (
              <li key={index}>
                <a href="#">
                  <img
                    src={`https://i.pravatar.cc/150?img=${index + 10}`}
                    alt="avatar"
                  />
                  <span>{follower}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

  );
};

export default FollowersBar;