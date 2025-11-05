import { useState, useContext, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import BlogIcon from '../assets/blogger.png';
import menuIcon from '../assets/menu.png';
import { context } from '../ContexProvider';
import { useNavigate } from 'react-router-dom';
import '../Styles/NavBar.css';
import profileIcon from '../assets/profile.png';
import ConfirmDialog from './ConfirmDialog';

const Navbar = () => {
  const dropDownref = useRef(null);
  const { isLoggedIn, userName, setLoggedIn, setUserName, setMenuOpen, isMenuOpen } = useContext(context);
  const [open, setOpen] = useState(false);
  const [showConfrim, setConfirm]= useState(false)
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (dropDownref.current && !dropDownref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutSideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutSideClick);
    };
  }, []);

  const handleLogout = async () => {
     const res = await fetch(`${apiUrl}/users/logout`, {
        method: "POST",
        credentials: 'include'
        });
        if (res.ok) {
          setLoggedIn(false);
          setUserName('');
          setMenuOpen(false);
          toast.info("Logged out successfully");
          navigate('/login');
        }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          {isLoggedIn && (
            <button onClick={()=>setMenuOpen(!isMenuOpen)} className="nav-button">
              <img src={menuIcon} alt="menu" className="nav-icon" />
            </button>
          )}
          <button onClick={() => navigate('/')} className="nav-button blog-home-button">
            <img src={BlogIcon} alt="BlogHome" className="nav-icon" />
          </button>
        </div>
        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <div ref={dropDownref} className="profile-container">
              <button 
                onClick={() => setOpen(!open)} 
                className="profile-button"
              >
                <img src={profileIcon} alt="profileIcon" className="profile-icon" />
              </button>
              <p className="username">{userName}</p>

              {open && (
                <div className="dropdown-menu">
                  <button onClick={()=>{setConfirm(true)}} className="dropdown-item logout-item">
                    Logout
                  </button>
                </div>
              )}
            </div>
            {
              (showConfrim)&&
              (
                <ConfirmDialog message="Are You Sure You want to logout ?" onConfirm={async()=>{
              await handleLogout();
              setConfirm(false);
            }} onCancel={()=>setConfirm(false)}/>
              )
            }
            </>
          ) : (
            <button onClick={() => navigate('/login')} className="nav-button login-button">
              Login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
