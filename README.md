# Social Media Platform

[![React](https://img.shields.io/badge/frontend-React-blue.svg)](https://react.dev/) 
[![Express](https://img.shields.io/badge/backend-Express.js-green.svg)](https://expressjs.com/) 
[![MongoDB](https://img.shields.io/badge/database-MongoDB-brightgreen.svg)](https://www.mongodb.com/)
[![Node](https://img.shields.io/badge/runtime-Node.js-yellow.svg)](https://nodejs.org/)
[![HTML5](https://img.shields.io/badge/markup-HTML5-orange.svg)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/styles-CSS3-blueviolet.svg)](https://developer.mozilla.org/docs/Web/CSS)
[![REST API](https://img.shields.io/badge/api-REST-red.svg)](https://restfulapi.net/)
[![JWT](https://img.shields.io/badge/auth-JWT-orange.svg)](https://jwt.io/)
[![Render](https://img.shields.io/badge/deployment-Render.com-lightgrey.svg)](https://render.com/)

## 🌐 Live Demo

:rocket: [Try it out!](https://connect-0gke.onrender.com)

---

## 📚 Overview

Social Media is a modern, feature-rich full-stack social networking web application. Users can register, connect with friends, create posts, like or comment, and manage their profiles—all in an interactive, responsive environment.

---

## 💎 Features

- **User Authentication:** Signup, login, JWT-based authentication
- **User Profiles:** Avatar, bio, social info
- **Friends System:** Follow/unfollow users, friend suggestions
- **Posts:** Create, edit, delete, like, and comment on posts
- **Feed:** See and interact with posts from other users
- **Notifications:** Real-time updates for important actions
- **Responsive UI:** Seamless experience across devices

---

## 🖥️ Tech Stack

### Frontend
- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react)
- ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5)
- ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3)
- ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript)

### Backend
- ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js)
- ![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express)
- ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb)
- ![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens)

### Deployment & Tools
- ![Render](https://img.shields.io/badge/-Render-313437?logo=render)
- ![REST API](https://img.shields.io/badge/-REST-02569B?logo=rest)

---

## 📦 Project Structure

```
Social-Media/
├── client/           # React frontend
├── server/           # Node.js + Express backend API
├── models/           # Mongoose data models
├── routes/           # API endpoints (authentication, posts, users)
├── controllers/      # Business logic for APIs
├── middleware/       # JWT and error handling
├── public/           # Static assets
└── README.md
```

---

## 🚀 Quick Start

1. **Clone the repository**
    ```bash
    git clone https://github.com/Anish-0411/Social-Media.git
    cd Social-Media
    ```
2. **Install dependencies**
    - Backend:
      ```bash
      cd server
      npm install
      ```
    - Frontend:
      ```bash
      cd ../client
      npm install
      ```
3. **Set Environment Variables**

    - Create `.env` in `server/`:
      ```
      MONGODB_URI=your_mongodb_uri
      JWT_SECRET=your_jwt_secret
      ```

4. **Run the application**
    - Backend:
      ```bash
      cd server
      npm run dev
      ```
    - Frontend:
      ```bash
      cd client
      npm start
      ```

---

## 📖 API Endpoints

- `/api/auth` — User registration and login
- `/api/users` — User profile operations, follow/unfollow
- `/api/posts` — Create, fetch, edit, delete posts
- `/api/comments` — Commenting system

---

## 🛡️ Security

- JWT-based authentication
- Password hashing with bcrypt
- Input validation & sanitization

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue to discuss major changes.

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---

**Crafted with ❤️ by [Anish-0411](https://github.com/Anish-0411)**
