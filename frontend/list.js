import React, { useEffect, useState } from 'react'
import {useTimer} from '../hooks/useTimer'

const List = (props) => {
    // console.log(props.task)
    const { pause, reset, running, seconds, start, stop } = useTimer();
    const [noaction,setNoaction]=useState(true)

    const [button,setbutton]=useState(false)
    const [timetaken,Settimetaken]=useState(0)

        useEffect(()=>{
            if(props.task.Status==="Completed"){
                setNoaction(false)
            }
        },[])
        
    
        const handleaction=()=>{
            if(props.started===true){
                alert("Already task is running")
            }else{
                props.handlestarted()
                setbutton(true)
                start()
            }
            
        }

        
          
        const handlepause=()=>{
            props.handlestarted()
            pause()
        }

        const handleEnd=()=>{
            // Settimetaken(seconds)
            props.handlestarted()
            setbutton(false)
            
            handletask()
            window.location.reload()
            
        }
        
        const handletask=()=>{
            fetch("http://localhost:3006/updatetask", {
            method: "post",
            body: JSON.stringify({
                _id:props.task._id,
                timetaken:seconds
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res)=>{
            alert("updatedsuccessfully")
        })
        }
        // console.log(seconds)
  return (
    <>
        <tr>
            <td>{props.task.Activity}</td>
            <td>{props.task.Status}</td>
            <td>{button ? seconds:props.task.timetaken}</td>
            
            <td>{button ? <><button onClick={handlepause}>Pause</button> <button onClick={handleEnd}>End</button></> : <>{noaction ? <button onClick={handleaction}>Start</button> : ""}</>}</td>
          </tr>
    </>
  )
}

export default List