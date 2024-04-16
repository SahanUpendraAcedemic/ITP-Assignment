import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreatePO from './pages/CreatePO';
import UpdatePO from './pages/UpdatePO';

import Display from './pages/Display';
import UpdateLowInventory from './pages/UpdateLowInventory';
import CreateLowInventory from './pages/CreateLowInventory';
import DisplayLowInventory from './pages/DisplayLowInventory';
import POReport from './pages/POReport';
import Dashboard from './components/Dashboard';
import CurruntPO from './pages/CurruntPO';


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Dashboard />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        
       
        
       

        <Route element={<PrivateRoute />}>  
          <Route path='/profile' element={<Profile />} />
          <Route path='/display' element={<Display />} /> 
          <Route path='/displaylowinventory' element={<DisplayLowInventory />} />
          <Route path='/create-po' element={<CreatePO />} />
          <Route path='/createlowinventoy' element={<CreateLowInventory />} />
          <Route path='/po-report' element={<POReport />} />
          <Route path='/listing/:listingId' element={<CurruntPO />} />
          
          
          <Route
            path='/update-po/:listingId'
            element={<UpdatePO />}
          />
          <Route
            path='/update-lowinventory/:updateLowInventoryId'
            element={<UpdateLowInventory />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}