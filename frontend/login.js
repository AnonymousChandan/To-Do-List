import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './style.css'

const Login = () => {
  const navigate=useNavigate()
  const [error,setError]=useState("")
  const [login, setLogin] = useState({username: "", password: ""})


  
const handleloginsubmit=(e)=>{
    e.preventDefault();
        axios({
            url: "http://localhost:3006/login",
            method: "post",
            headers: {
            },
            data: login
        }).then((loginData)=> {
           localStorage.setItem("authorization", loginData.data.authToken);
          
        }).catch((err)=> {
            console.log(err.response.data)
            setError(err.response.data)
        })
        navigate("/Tasksheet")
    }
 



  return (
    <>
    <div className='login-full'>
    <div className='login'>
    
    <h2>Member Login</h2>
    
      <input type="text" placeholder='Username' onChange={(e)=>{setLogin({...login, username: e.target.value})}}/>
      <br></br>
      <input type="password" placeholder='Password' onChange={(e)=>{setLogin({...login, password: e.target.value})}}/>
      <p>{error}</p>
      <button onClick={(e)=>handleloginsubmit(e)}>Submit</button>
      </div>
      </div>
      
    </>
  )
}

export default Login