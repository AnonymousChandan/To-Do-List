import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from './Components/register'
import Login from './Components/login'
import Protected from './Components/Protected'
import Tasksheet from './Components/Tasksheet'


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/tasksheet" element={<Protected><Tasksheet/></Protected>}></Route>
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<Register/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App