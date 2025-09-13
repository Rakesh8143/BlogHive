import { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import hideIcon from '../assets/hide.png'
import showIcon from '../assets/show.png'
import { useNavigate } from 'react-router-dom'
import '../Styles/Login.css'
import { context } from '../ContexProvider'

const Login = () => {
  const {LoggedIn, setLoggedIn, setUserName}=useContext(context);
  const [uname,setUname]= useState("");
  const [pwd,setPwd]=useState("");
  const [pwdHide, setpwdHide]=useState(true);
  const [isInValid,setInValid]=useState(false);
  const navigate=useNavigate();
  async function handleonSubmit(e){
      e.preventDefault();
      const body={
        userName:uname,
        password:pwd
      }
      try {
        const res= await fetch("http://localhost:3001/users/login",{
        method : 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(body)
      })
      if(res.ok)
      {
        const data = await res.json();
        setLoggedIn(true);
        setUserName(data.user.userName)
        toast.success("Logged in successfully")
        navigate('/')
      }
      else{
          setInValid(true);
      }
      } catch (e) {
        console.log(e.message);
        //here i will handle it later
      }
  }
  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      
      <form className="login-form" onSubmit={handleonSubmit}>
        {isInValid && <p>Invalid Credentials</p>}
        <div className="form-group">
          <input
            value={uname}
            onChange={(e)=>{setInValid(false),setUname(e.target.value)}}
            type="text"
            name="userName"
            placeholder="Username"
            className="form-input"
            required
          />
        </div>
        <div className="form-group input-with-icon">
          <input
            value={pwd}
            onChange={(e)=>{setInValid(false);setPwd(e.target.value)}}
            type={pwdHide? "password":"text"}
            name="password"
            placeholder="Password"
            className="form-input"
            required
          />
          <img onClick={()=>setpwdHide(!pwdHide)} src={pwdHide? hideIcon:showIcon} alt="hide-icon" className="icon"/>
        </div>
        <div className="form-group">
          <input disabled={!uname || !pwd} type="submit" className="submit-btn" value="Login" />
        </div>
      </form>
      <p className="register-link" onClick={()=>navigate('/register')}>
        Register
      </p>
    </div>
  )
}

export default Login
