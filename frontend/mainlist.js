import axios from 'axios';
import React, { useEffect, useState } from 'react'
import List from './list';



const Mainlist = () => {
  const token = localStorage.getItem("authorization");
  if (token === null) {
    localStorage.setItem("authorization","")
  }
  const [tasks,setTasks]=useState([])
  const [started,setStarted]=useState(false)
  
  const handlestarted=()=>{
    setStarted(!started)
  }
  
  // console.log(started)
  useEffect(()=>{
    fetch("http://localhost:3006/all", {
      method:"GET",
      headers: {
        "authorization": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setTasks(data);
      });
    
  }, [token]);
  return (
    <>
      <table style={{    margin: "10px"}}>
        <thead>
        <tr>
          <th>Activity</th>
          <th>Status</th>
          <th>Time taken in Seconds</th>
          
          <th>Action</th>
          </tr>
        </thead>
        {tasks.map((task,i)=>{  
          return(
          <>
          <List task={task} handlestarted={handlestarted} started={started}/>
          </>
          )
        })}
      </table>
      
    </>
  )
}

export default Mainlist