import { toast } from 'react-toastify'
import { useState } from 'react'
import hideIcon from '../assets/hide.png'
import showIcon from '../assets/show.png'
import '../Styles/Register.css'
import { useContext } from 'react'
import { context } from '../ContexProvider'

const Register = () => {
  const {setLoggedIn, setUserName}=useContext(context);
  const [uname,setUname]=useState("");
  const [email,setEmail]=useState("");
  const [pwd,setpwd]=useState("");
  const [cnf,setcnf]=useState("");
  const [pwdHide, setpwdHide]=useState(true);
  const [cnfHide, setcnfHide]=useState(true);
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validate=()=> (uname.length>0 && email.length>0 && emailRegex.test(email) && pwd.length>=8 && regex.test(pwd) && pwd===cnf)
  const isValid = validate();

  const handleOnsubmit =async (e)=>{
      e.preventDefault();
      const body={
        userName : uname,
        email    : email,
        password : pwd
      }
      try{
          const res= await fetch("http://localhost:3001/users/register",{
            method : "POST",
            headers :{
              'Content-Type' : "application/json"
            },
            body: JSON.stringify(body),
            credentials: 'include'  
          });
          const data=await res.json();
          if(res.ok)
          {
            setLoggedIn(true)
            setUserName(data.userName)
            toast.success("Registration completed successfully")
          }
      }
      catch(e)
      {
        console.log(e.message);
      }
  }

  return (
    <div className="register-container">
      <h1 className="register-heading">Sign Up</h1>
      <form className="register-form" onSubmit={handleOnsubmit}>
        <div className="form-group">
          <input
            onChange={(e)=>setUname(e.target.value)}
            value={uname}
            type="text"
            className="form-input"
            name="userName"
            id="uname"
            placeholder="Username"
            required
          />
        </div>

        <div className="form-group">
          <input
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="Email"
            required
          />
          {(!email.length==0 && !emailRegex.test(email) )&&<p className="info-text">Please enter a valid email address.</p>}
        </div>

        <div className="form-group">
          <div className="input-with-icon">
            <input
              onChange={(e)=>setpwd(e.target.value)}
              value={pwd}
              type={pwdHide? "password":"text"}
              required
              name="password"
              id="pwd"
              className="form-input"
              placeholder="Password"
            />
            <img onClick={()=>setpwdHide(!pwdHide)} src={pwdHide? hideIcon:showIcon} alt="hide-icon" className="icon" />
          </div>
          {pwd !== "" && !regex.test(pwd) && <p className="info-text">Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.</p>}
        </div>

        <div className="form-group">
          <div className="input-with-icon">
            <input
              onChange={(e)=>setcnf(e.target.value)}
              value={cnf}
              type={cnfHide? "password":"text"}
              name="confirmPassword"
              className="form-input"
              placeholder="Confirm Password"
            />
            <img onClick={()=>setcnfHide(!cnfHide)} src={cnfHide? hideIcon:showIcon} alt="hide-icon" className="icon" />
          </div>
          {(cnf!=="" && cnf!==pwd) && <p className="info-text">Make sure passwords match</p>}
        </div>

        <div className="form-group">
          <input type="submit" disabled={!isValid} className="submit-btn" />
        </div>
      </form>
    </div>
  )
}

export default Register
