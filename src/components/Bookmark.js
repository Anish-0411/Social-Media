import React, { useEffect, useState } from 'react';
import Post from './Post';
import './bookmark.css';

const BookmarksPage = () => {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('bookmarks')) || [];
        setBookmarks(saved);
    }, []);

    const removeBookmark = (indexToRemove) => {
        const updated = bookmarks.filter((_, index) => index !== indexToRemove);
        setBookmarks(updated);
        localStorage.setItem('bookmarks', JSON.stringify(updated));
    };

    return (
        <div className="bookmark-container" style={{ padding: '20px', color: 'white' }}>
            <h2>Bookmarked Posts</h2>
            {bookmarks.length === 0 ? (
                <p>No bookmarks yet.</p>
            ) : (
                bookmarks.map((post, index) => (
                    <div key={index} style={{ position: 'relative', marginBottom: '20px' }}>
                        <Post
                            type={post.type}
                            user={post.user}
                            content={post.content}
                            mediaSrc={post.mediaSrc}
                        />
                        <button
                            onClick={() => removeBookmark(index)}
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                background: 'red',
                                color: 'white',
                                padding: '5px 10px',
                                border: 'none',
                                borderRadius: '5px',
                            }}
                        >
                            🗑️ Remove
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default BookmarksPage;
