import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SingIn from './pages/SingIn'
import SingUp from './pages/SingUp'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/sing-in' element={<SingIn/>}/>
        <Route path='/sing-up' element={<SingUp/>}/>
      </Routes>
    </BrowserRouter>
  );
}
