import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils';

function Login() {

const navigate = useNavigate();

const [loginInfo,setLoginInfo] = useState({
    email:'',
    password:''
})
const handleChange=(e)=>{
const {name,value} = e.target
console.log(name,value)
const copySignInfo = {...loginInfo};
copySignInfo[name] = value;
setLoginInfo(copySignInfo)
}

console.log('logininfo->', loginInfo)


const handleLogin = async (e) => {

    e.preventDefault()

    const{email,password} = loginInfo
    if(!email || !password){
return handleError('email and password are required')
    }
    try{
const  url = "http://localhost:8080/auth/login";
const response = await fetch (url,{
    method: 'POST',
    headers:{
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify(loginInfo)
})
const result = await response.json();
const { success, message, jwtoken, name, error } = result;
console.log("Login response →", result); // ✅ Add this
localStorage.setItem('token', jwtoken);


if(success){
  handleSuccess(message);
  localStorage.setItem('token',jwtoken);
  localStorage.setItem('loggedInUser', name)
  setTimeout(() => {
    navigate('/home');
  }, 1000);
} else if (result?.details?.length) {
  const details = result.details[0].message;
  handleError(details);
} else {
  handleError(message);
}

console.log(result);
    }catch(err){
handleError(err);
    }
}


  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
      
          <div>
            <label htmlFor='email'>Email</label>
                <input type='email' name='email' onChange={handleChange}  value={loginInfo.email} autoFocus placeholder='Enter your email...'/>

        </div>
          <div>
            <label htmlFor='password'>Password</label>
                <input type='password' name='password'  onChange={handleChange} value={loginInfo.password} autoFocus placeholder='Enter your password...'/>

        </div>
       <button type='submit'>Signup</button>
       <span>Does't have an account ? <Link to='/signup'>Signup</Link></span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
