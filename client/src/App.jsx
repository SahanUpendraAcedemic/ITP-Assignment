import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddLostItem from './Pages/add_lost_item';
import LostReports from './Pages/Lost_reports';
import Signup from './Pages/signup';
import Lostitemlist from './Pages/lost_item_list';
import EditItemPage from './Pages/edit_lost_item';
import Lostitemreport from './Pages/Lost_reports';
import Addmaintance from './Pages/add_maintance_task';
import MaintenanceList from './Pages/MaintenanceListPage';
export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/Lost_reports" element={<LostReports />} />
        <Route path="/add_lost_item" element={<AddLostItem />} />
        <Route path="/signup"element={<Signup />} />
        <Route path="/lost_item_list" element={<Lostitemlist/>}/>
        <Route path='/edit_lost_item/:id'  element={<EditItemPage/>}/>
        <Route path='/Lost_reports'  element={<Lostitemreport/>}/>
        <Route path='/add_maintance_task'  element={<Addmaintance/>}/>
        <Route path='/MaintenanceListPage'  element={<MaintenanceList/>}/>

      </Routes>
    </BrowserRouter>
  );
}
