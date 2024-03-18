import { BrowserRouter , Routes , Route } from "react-router-dom"
import home from "./pages/home"
import profile from "./pages/profile"
import singin from "./pages/singin"
import singup from "./pages/singup"


export default function App() {
  return <BrowserRouter>

      <Routes>
         <Route path="/" element= {<home/> } />
         <Route path="/profile" element= {<profile/> } />
         <Route path="/singin" element= {<singin/> } />
         <Route path="/singup" element= {<singup/> } />
      </Routes>
  </BrowserRouter>
  
}
