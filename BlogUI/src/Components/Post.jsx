import React from 'react';
import '../Styles/Post.css';
import { useNavigate } from 'react-router-dom';


const Post = ({ post }) => {
    const navigate= useNavigate();
    
    if (!post || !post.userId || !post.thumbnail) {
        return null; // or a loading/error message
    }

    const base64Image = `data:${post.thumbnail.contentType};base64,${post.thumbnail.data}`;

    return (
        <div className="post-card">
            <img className="post-thumbnail" src={base64Image} alt="thumbnail" />
            <div className='textContent'>
                <h1 onClick={()=>{navigate(`/viewpost/${post._id}`)}} className="post-title">{post.title}</h1>
                <p className="post-meta">Updated on {new Date(post.updatedAt).toLocaleDateString()} By {post.userId.userName}</p>
            </div>
        </div>
    );
};

export default Post;