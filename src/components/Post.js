
// import React from 'react';

// function Post({ type, user, content, mediaSrc }) {
//     return (
//         <div className="post">
//             <div className="post-header">
//                 <img src={user.profilePic} alt={user.name} className="profile-pic" />
//                 <h3>{user.name}</h3>
//             </div>
//             <p>{content}</p>
//             {type === "image" && <img src={mediaSrc} alt="Post" className="post-image" />}
//             {type === "video" && (
//                 <video controls className="post-video">
//                     <source src={mediaSrc} type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>
//             )}
//             <div className="post-actions">
//                 <button> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55C7.14 14.24 4 11.61 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 3.11-3.14 5.74-7.1 10.05l-.8.73-.8-.73z" fill="#FFFFFF"/>
//                      </svg>  Like</button>
//                 <button><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M12 2C6.48 2 2 6.03 2 10.72c0 2.22.96 4.29 2.59 5.87L4 22l4.55-2.43C9.55 20 10.74 20 12 20c5.52 0 10-4.03 10-9.28S17.52 2 12 2zm0 16c-1.09 0-2.13-.14-3.09-.41L6 18l.5-2.5C5.09 14 4 12.46 4 10.72 4 7.23 7.58 4 12 4s8 3.23 8 6.72S16.42 18 12 18z" fill="#FFFFFF"/>
//                     </svg> Comment</button>
//                 <button>
//                     <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="white">
//                             <g>
//                             <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>
//                             </g>
//                     </svg> Share</button>
//                 <button onClick={() => alert("Saved!")}>
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" fill="none" 
//                     stroke="#FFFFFF" 
//                     strokeWidth="2"/>
//                 </svg> Save</button>
//             </div>
//         </div>
//     );
// }

// export default Post;



import React from 'react';

function Post({ type, user, content, mediaSrc }) {
    const bookmarkPost = () => {
        const newPost = {
            type,
            user,
            content,
            mediaSrc,
        };

        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

        // Check for duplicates
        const isDuplicate = bookmarks.some(
            (post) =>
                post.content === newPost.content &&
                post.mediaSrc === newPost.mediaSrc &&
                post.user.name === newPost.user.name
        );

        if (!isDuplicate) {
            bookmarks.push(newPost);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            alert("Post bookmarked!");
        } else {
            alert("This post is already bookmarked!");
        }
    };

    return (
        <div className="post">
            <div className="post-header">
                <img src={user.profilePic} alt={user.name} className="profile-pic" />
                <h3>{user.name}</h3>
            </div>
            <p>{content}</p>
            {type === "image" && <img src={mediaSrc} alt="Post" className="post-image" />}
            {type === "video" && (
                <video controls className="post-video">
                    <source src={mediaSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
            <div className="post-actions">
                <button>❤️ Like</button>
                <button>💬 Comment</button>
                <button>🔄 Share</button>
                <button onClick={bookmarkPost}>🔖 Save</button>
            </div>
        </div>
    );
}

export default Post;
