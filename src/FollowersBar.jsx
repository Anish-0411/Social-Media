// import React from "react";
// import "./FollowersBar.css"; // Make sure this path matches your project structure

// const FollowersBar = ({ followers = [] }) => {
//   return (
//     <div className="followers">
//       <h2>Followers</h2>
//       {followers.length === 0 ? (
//         <p style={{ color: "#999" }}>No followers yet.</p>
//       ) : (
//         <ul>
//           {followers.map((follower, index) => (
//             <li key={index}>
//               <a href="#">
//                 <img
//                   src={`https://i.pravatar.cc/150?img=${index + 10}`}
//                   alt="avatar"
//                 />
//                 <span>{follower}</span>
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default FollowersBar;