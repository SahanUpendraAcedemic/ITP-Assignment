import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Report from './pages/Report';
import Header from './component/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
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
