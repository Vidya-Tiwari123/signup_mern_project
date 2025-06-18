import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([])
  
  const navigate = useNavigate(); // ✅ hook

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])


  const handleLogout=(e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('user loggedout')
    setTimeout(()=>{
      navigate('/login')
    },1000)
  }

const fetchProducts = async()=>{
  try{
    // const url = "http://localhost:8080/products";
  const token = localStorage.getItem("token");


const response = await fetch("https://signup-mern-project-2.onrender.com/products", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}` // ✅ Bearer token format
  }
});

   const result = await response.json();

if (Array.isArray(result)) {
  setProducts(result);
} else {
  console.error("Expected array but got:", result);
}


    setProducts(result)
  }catch(err){
    handleError(err)
  }
}
useEffect(()=>{
  fetchProducts()
},[])

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
          products && products?.map((item, index)=>(
            <ul key={index}>
              <span>{item.name} : {item.price}</span>
            </ul>
          ))
        }
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home
