import {BrowserRouter, routes, route}from 'react-router-dom';
import Home from './pages/home';
import Profile from './pages/profile';
import SingIn from './pages/singin';
import SingUp from './pages/singup';


export default function App () {

    return <BrowserRouter>
        <Routes>
            <Route path="/" element= {<Home />}/>
            <Route path="/profile" element= {<Profile />}/>
            <Route path="/singin" element= {<SingIn />}/>
            <Route path="/singup" element= {<SingUp />}/>

        </Routes>
    </BrowserRouter>
}