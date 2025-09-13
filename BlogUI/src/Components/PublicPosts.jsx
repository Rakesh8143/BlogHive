import { useState, useEffect } from 'react';
import Post from './Post';
import { toast } from 'react-toastify';
import '../Styles/PublicPosts.css';

const PublicPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3001/posts/allposts', {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await res.json();
                console.log(data)
                setPosts(data);
            } catch (e) {
                console.log(e.message);
                toast.error(e.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="posts-container">
            {posts.map((val) => (
                <Post key={val._id} post={val} />
            ))}
        </div>
    );
};

export default PublicPosts;