import React, { createContext, useState } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([
        {
            type: 'text',
            user: { name: 'User Name', profilePic: 'user1.jpg' },
            content: 'This is a sample text post.',
        },
        {
            type: 'image',
            user: { name: 'Another User', profilePic: 'user2.jpg' },
            content: 'Check out this amazing view!',
            mediaSrc: 'post-image.jpg',
        },
        {
            type: 'video',
            user: { name: 'Video Lover', profilePic: 'user3.jpg' },
            content: 'Here’s a cool video!',
            mediaSrc: 'video.mp4',
        },
    ]);

    const addPost = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    return (
        <PostContext.Provider value={{ posts, addPost }}>
            {children}
        </PostContext.Provider>
    );
};

// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const PostContext = createContext();

// export const PostProvider = ({ children }) => {
//     const [posts, setPosts] = useState([]);

//     // Fetch posts from backend
//     useEffect(() => {
//         axios.get('/api/posts')
//             .then(res => setPosts(res.data))
//             .catch(err => console.error('Failed to fetch posts:', err));
//     }, []);

//     // Add a new post to backend
//     const addPost = async (newPost) => {
//         try {
//             const res = await axios.post('/api/posts', newPost);
//             setPosts(prev => [res.data, ...prev]);
//         } catch (error) {
//             console.error('Failed to add post:', error);
//         }
//     };

//     return (
//         <PostContext.Provider value={{ posts, addPost }}>
//             {children}
//         </PostContext.Provider>
//     );
// };