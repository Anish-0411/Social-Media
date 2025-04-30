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
                                top: 12,
                                right: 12,
                                backgroundColor: '#1a1a1a',
                                color: '#f1f1f1',
                                padding: '6px 12px',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease',
                            }}
                        >
                             Remove
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default BookmarksPage;
