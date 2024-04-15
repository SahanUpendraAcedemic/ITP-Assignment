import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SupplieIems from "./pages/SupplieIems";
import Profile from "./pages/Profile";
import Report from "./pages/Report";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import PrivateRouter from "./components/PrivateRouter";
import CreateSitems from "./pages/CreateSitems";
import UpdateSitems from "./pages/UpdateSitems";
import SItem from "./pages/SItem";

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Dashboard/> 
        <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/register" element = {<Register />} />
            <Route path="/login" element = {<Login />} />
            <Route path="/supplierItems" element = {<SupplieIems/>} />
            <Route  element = {<PrivateRouter/>}>
            <Route path="/profile" element = {<Profile />} />
            <Route path="/createsitems" element = {<CreateSitems/>} />
            <Route path="/updatesitems/:sitemsId" element = {<UpdateSitems/>} />
            <Route path="/sitems/:sitemsId" element = {<SItem />} />
            </Route>
            <Route path="/report" element = {<Report />} />
            
            
        </Routes>
    </BrowserRouter>
  )
}
