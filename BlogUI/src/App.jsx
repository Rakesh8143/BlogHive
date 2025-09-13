import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Styles/App.css';
import { Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Myposts from "./Components/Myposts";
import AddPost from "./Components/AddPost";
import UpdatePost from "./Components/UpdatePost";
import Navbar from './Components/Navbar';
import ServerError from "./Components/ServerError";
import PublicPosts from "./Components/PublicPosts";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import {context} from "./ContexProvider"
import { useContext } from "react";
import MenuBar from "./Components/MenuBar";
import ViewPost from "./Components/ViewPost";
import ViewMyPost from "./Components/ViewMyPost";

const App = () => {
  const {isLoading, isMenuOpen} = useContext(context)

  if(isLoading) {
    return <div>Loading......</div>
  }

  return (
    <div className="app-container">
      <ToastContainer position="top-right" />
      <Navbar />
      <div>
        {
          isMenuOpen && (
            <MenuBar className={isMenuOpen ? "open" : "closed"} />
          )
        }
        <div className={`main-content ${isMenuOpen ? 'shifted' : ''}`}>
          <Routes>
            <Route path="/" element={<PublicPosts />} />
            <Route path="/register" element={<PublicRoute><Register/></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} /> 
            <Route path="/myposts" element={<ProtectedRoute><Myposts /></ProtectedRoute>} />
            <Route path="/addpost" element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
            <Route path="/updatepost/:id" element={<ProtectedRoute><UpdatePost /></ProtectedRoute>} />
            <Route path="/viewpost/:id" element={<ViewPost/>}/>
            <Route path="/viewmypost/:id" element={<ViewMyPost/>}/>
            <Route path="/server-error" element={<ServerError />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;