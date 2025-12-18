import './Register.css';
import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react'
import axios from 'axios';




const Register = () => {

  const[username, setUsername]=useState();
  const[email, setEmail]=useState();
  const[password,setPassword]=useState()
  const navigate =useNavigate();


const handleSubmit=(e)=>{
  
  e.preventDefault();
  axios.post('http://localhost:3000/register',{username,email,password})
  .then(res=>navigate('/login'))
  .catch(err=>console.log(err))
}

  return (
    <div className='signup_container'>
    <div className='signup_form'>
    <h2>Sign up</h2>
   
     <form  onSubmit={handleSubmit}  >
      <div>
     <label htmlFor='name'>Username</label>
     <input className="form_input" type="text"  placeholder="username"
     onChange={e=>setUsername(e.target.value)}/>
      </div>
      <div>
     <label htmlFor='email'>Email</label>
     <input className="form_input" type="email" placeholder="email"
     onChange={e=>setEmail(e.target.value)}/>
      </div>
      <div>
     <label htmlFor='password'>Password</label>
     <input className="form_input" type="password" placeholder="password"
     onChange={e=>setPassword(e.target.value)}/>
      </div>
    <button  className='signup_button'>Sign up</button>
    </form>
    <br></br>
    <p>Already have account?</p>
    <Link to="/login"><button className='Login_button'>Login</button></Link>
    </div>
    </div>
  )
}

export default Register






























