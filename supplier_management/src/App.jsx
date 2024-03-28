import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Report from './pages/Report';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element= {<Home/>}/>
            <Route path='/login' element= {<Login/>}/>
            <Route path='/register' element= {<Register/>}/>
            <Route path='/profile' element= {<Profile/>}/>
            <Route path='/report' element = {<Report/>}/>
        </Routes>
    </BrowserRouter>
  )
}
