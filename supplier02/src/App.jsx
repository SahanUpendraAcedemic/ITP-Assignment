import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SingIn from './pages/SingIn'
import SingUp from './pages/SingUp'
import Header from './components/Header'

export default function App() {
  return (
    <BrowserRouter>
    {/* Header */}
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/sing-in' element={<SingIn/>}/>
        <Route path='/sing-up' element={<SingUp/>}/>
      </Routes>
    </BrowserRouter>
  );
}
