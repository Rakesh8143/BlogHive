import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Styles/ViewPost.css';

const ViewMyPost = () => {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`${apiUrl}/posts/getmypost/${id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await res.json();
                if (res.ok) {
                    setPost(data);
                    setLoading(false);
                } else {
                    toast.error(data.msg);
                    console.log(data.msg);
                }
            } catch (e) {
                toast.error(e.message);
                console.log(`error : ${e.message}`);
            }
        };
        fetchPost();
    }, [id]);

    if (isLoading) return <div className="loading">Loading...</div>;

    return (
        <div className="blog-container">
            <div className="blog-thumbnail">
                <img 
                    src={`data:${post.thumbnail.contentType};base64,${post.thumbnail.data}`} 
                    alt="thumbnail" 
                />
            </div>
            <div className="blog-meta">
                <p className="blog-author">✍️ Author: <span>{post.userId.userName}</span></p>
                <p className="blog-date">📅 Updated on {new Date(post.createdAt).toLocaleString()}</p>
            </div>
            <div className="blog-title">
                <h1>{post.title}</h1>
            </div>
            <div className="blog-body">
                <p>{post.body}</p>
            </div>
        </div>
    );
};

export default ViewMyPost;
