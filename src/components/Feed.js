import React, { useState, useContext} from 'react';
import Post from './Post';
import PostForm from './PostForm';
import { PostContext } from './PostContext';

function Feed() {
    // const [posts, setPosts] = useState([
    //     {
    //         type: 'text',
    //         user: { name: 'User Name', profilePic: 'user1.jpg' },
    //         content: 'This is a sample text post.',
    //     },
    //     {
    //         type: 'image',
    //         user: { name: 'Another User', profilePic: 'user2.jpg' },
    //         content: 'Check out this amazing view!',
    //         mediaSrc: 'post-image.jpg',
    //     },
    //     {
    //         type: 'video',
    //         user: { name: 'Video Lover', profilePic: 'user3.jpg' },
    //         content: 'Here’s a cool video!',
    //         mediaSrc: 'video.mp4',
    //     },
    // ]);

    const { posts, addPost } = useContext(PostContext);

    return (
        <div className="feed">
            
            <PostForm onAddPost={addPost} />
            {posts.map((post, index) => (
                <Post key={index} {...post} />
            ))}
        </div>
    );
}

export default Feed;
