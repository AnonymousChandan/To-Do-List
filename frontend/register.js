import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./register.css"
const Register = () => {
  const navigate=useNavigate()
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [confirmpass,setConfirmpass]=useState("")
  const [error,setError]=useState("")
  
  const handleusername=(e)=>{
    setUsername(e.target.value)
  }

  const handlepassword=(e)=>{
    setPassword(e.target.value)
  }

  const handleconfirmpass=(e)=>{
    setConfirmpass(e.target.value)
  }
  const handleLogin=()=>{
    navigate("/login")
  }
  const handleregistersubmit=()=>{
     if(password!==confirmpass){
      setError("Passwords dont match")
     }else{
      fetch("http://localhost:3006/register", {
            method: "post",
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res)
            
        }).catch((err) => {
            console.log(err)
        })
     }
  }

  return (
    <>
   <div className='cont'>
   <div className='reg'>
    <input className='ur' type="text" onChange={(e)=>{handleusername(e)}} placeholder="Username"></input>
  <br></br>
  <input className='dr' type="text" onChange={(e)=>{handlepassword(e)}} placeholder="Password"></input>
  <br></br>
  <input className='cr'  type="text" onChange={(e)=>{handleconfirmpass(e)}} placeholder="Confirm Password"></input>
  <p>{error}</p>
  <button className='btn' onClick={()=>handleregistersubmit()}>Submit</button>
  <button className='lg' onClick={handleLogin}>login</button>
    </div>
   </div>
    </>
  )
}

export default Register