import React from 'react'
import Addnewtask from './Addnewtask'
import Header from './header'
import Mainlist from './mainlist'
import Sidebar from './sidebar'

const Tasksheet = () => {
  return (
    <>
        <Header></Header>
        <div style={{display:"flex"}}>
        <Sidebar/>
        <div style={{
    width: "-webkit-fill-available",
    height: "800px"

}}>
          <Addnewtask/>
        <Mainlist/>

        </div>
        </div>
    </>
  )
}

export default Tasksheet