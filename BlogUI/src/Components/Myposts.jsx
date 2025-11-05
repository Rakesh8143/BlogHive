import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import updateIcon from "../assets/edit.png";
import deleteIcon from "../assets/bin.png";
import addIcon from "../assets/add.png";
import "../styles/Myposts.css"; 
import ConfirmDialog from "./ConfirmDialog";
import { useNavigate } from "react-router-dom";

const Myposts = () => {
    const [posts, setPosts] = useState([]);
    const [isConfirmOpen, setConfirm] = useState(false);
    const [deleteId, setDeleteId]= useState(null);
    const navigate= useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleDelete = async (id) => {
        const res = await fetch(`${apiUrl}/posts/delete/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (res.ok) {
            setPosts(prev => prev.filter(p => p._id !== id));
            toast.success("Post deleted successfully!");
        } else {
            toast.error("Error occurred while deleting the post!");
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${apiUrl}/posts/myposts`, {
                    method: 'GET',
                    credentials: "include"
                });
                const data = await res.json();
                if (res.ok) {
                    setPosts(data);
                } else {
                    console.log(data);
                }
            } catch (e) {
                console.log(e.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="myposts-container">
            {isConfirmOpen && (
                <ConfirmDialog 
                    message="Are you sure you want to delete this post?" 
                    onConfirm={() => {
                        handleDelete(deleteId);
                        setConfirm(false);
                        setDeleteId(null);
                    }} 
                    onCancel={() => {
                        setConfirm(false);
                        setDeleteId(null);
                    }}
                />
            )}

            <div className="myposts-header">
                <h1>My Posts</h1>
                <button onClick={()=>{navigate('/addpost')}} className="add-post-btn">
                    <img src={addIcon} alt="addIcon" /> Add Post
                </button>
            </div>

            <ul className="posts-list">
                {posts.length > 0 ? (
                    posts.map((val) => (
                        <li key={val._id}>
                            <span onClick={()=>navigate(`/viewmypost/${val._id}`)} className="post-title">{val.title}</span>
                            <div className="post-actions">
                                {/* Update button */}
                                <button onClick={() => navigate(`/updatepost/${val._id}`)}>
                                    <img src={updateIcon} alt="edit" />
                                </button>
                                {/* Delete button */}
                                <button onClick={() => {
                                    setDeleteId(val._id);
                                    setConfirm(true);
                                }}>
                                    <img src={deleteIcon} alt="delete" />
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No posts to display.</p>
                )}
            </ul>
        </div>
    );
};

export default Myposts;
