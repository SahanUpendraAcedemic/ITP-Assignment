import { BrowserRouter,Routes,Route } from "react-router-dom"



import Signup from './Pages/Signup';
import Signin from "./Pages/Signin";
import Lost_reports from "./Pages/Lost_reports";
export default function App() {
  return <BrowserRouter>
  <Routes>
   

    <Route path="/Signup"  element={<Signup/>}/>
    <Route path="/Signin"  element={<Signin/>}/>
    <Route path="/Lost_reports"  element={<Lost_reports/>}/>
    </Routes>
  
  
  </BrowserRouter>
   
}
