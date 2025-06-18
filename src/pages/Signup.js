import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils';

function Signup() {

const navigate = useNavigate();

const [signupInfo,setSignupInfo] = useState({
    name:'',
    email:'',
    password:''
})
const handleChange=(e)=>{
const {name,value} = e.target
console.log(name,value)
const copySignInfo = {...signupInfo};
copySignInfo[name] = value;
setSignupInfo(copySignInfo)
}

console.log('logininfo->', signupInfo)


const handleSignup = async (e) => {

    e.preventDefault()

    const{name,email,password} = signupInfo
    if(!name || !email || !password){
return handleError('name,email and password are required')
    }
    try{
const  url = "https://signup-mern-project-2.onrender.com/auth/signup";
const response = await fetch (url,{
    method: 'POST',
    headers:{
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify(signupInfo)
})
const result = await response.json();
const {success, message} = result;
if(success){
  handleSuccess(message);
  setTimeout(() => {
    navigate('/login');
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
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
            <label htmlFor='name'>Name</label>
                <input type='text' name='name' onChange={handleChange} value={signupInfo.name} autoFocus placeholder='Enter your name...'/>

        </div>
          <div>
            <label htmlFor='email'>Email</label>
                <input type='email' name='email' onChange={handleChange}  value={signupInfo.email} autoFocus placeholder='Enter your email...'/>

        </div>
          <div>
            <label htmlFor='password'>Password</label>
                <input type='password' name='password'  onChange={handleChange} value={signupInfo.password} autoFocus placeholder='Enter your password...'/>

        </div>
       <button type='submit'>Signup</button>
       <span>Alearedy have an account ? <Link to='/login'>Login</Link></span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup
