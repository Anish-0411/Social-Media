// // src/routes/ProtectedRoute.js

// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   let user = null;

//   try {
//     const storedUser = localStorage.getItem('user');

//     // Validate stored value
//     if (storedUser && storedUser !== 'undefined') {
//       user = JSON.parse(storedUser);
//     } else {
//       localStorage.removeItem('user'); // Clean up bad value
//     }
//   } catch (error) {
//     console.error("Invalid JSON in localStorage 'user'", error);
//     localStorage.removeItem('user'); // Remove corrupted user data
//   }

//   return user ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

// src/routes/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;