import React, { useState } from 'react';

function PostForm({ onAddPost,onClose }) {
  const [type, setType] = useState('text');
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      type,
      content,
      user: {
        name: 'Current User',
        profilePic: 'user1.jpg',
      },
      mediaSrc: mediaFile ? URL.createObjectURL(mediaFile) : undefined,
    };

    onAddPost(newPost);
    setContent('');
    setType('text');
    setMediaFile(null);
    if (onClose) onClose(); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>

      {(type === 'image' || type === 'video') && (
        <input
          type="file"
          accept={type === 'image' ? 'image/*' : 'video/*'}
          onChange={handleFileChange}
          required
        />
      )}

      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;