import axios from 'axios';
import React, { useState } from 'react'

const Addnewtask = () => {
    const token = localStorage.getItem("authorization");
  if (token === null) {
    localStorage.setItem("authorization", "")
  }
    const [Activity,setActivity]=useState("")
    const payload=Activity
    console.log(payload)
    const handleaddtask=()=>{
        if(Activity===""){
            alert("Please Enter A task")
        }
        else{
          axios.post("http://localhost:3006/add",
        {Activity},
          {
            headers: {
             "Content-Type": "application/json",
             "authorization": token,
          }
        }).then((Activity)=> {
                  setActivity(Activity)
          }).catch((err)=> {
            console.log(err)
          });
        }
    }

  return (
    <div>
    <input type="text" onChange={(e)=>{setActivity(e.target.value)}}></input>
        <button onClick={handleaddtask}>ADD NEW</button>
    </div>
  )
}

export default Addnewtask