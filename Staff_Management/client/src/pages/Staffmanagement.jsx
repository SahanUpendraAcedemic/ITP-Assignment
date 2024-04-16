import { Link } from "react-router-dom"
import Dashboard from "./Dashboard";
import Header from './Header';

export default function Staffmanagement() {
  return (

    <div className="flex">

      <Header/>
      <Dashboard />




    <div className='p-10 max-w-lg mx-auto w-4/5 flex flex-col gap-4 text-center mt-10 mr-96' >

    <h1 className="text-3xl font-bold mb-10 text-center">Manage Staff Members</h1>
    <Link to='/Addworkers'>
      <div className="bg-slate-200 mb-4 hover:opacity-80 rounded-lg p-4">Add Workers</div>
    </Link>
    <Link to='/Workerlist'>
      <div className="bg-slate-200 mb-4 hover:opacity-80 rounded-lg p-4">Worker List</div>
    </Link>
    <Link to='/Addshift'>
      <div className="bg-slate-200 mb-4 hover:opacity-80 rounded-lg p-4">Add Shift</div>
    </Link>
    <Link to='/Shiftlist'>
      <div className="bg-slate-200 mb-4 hover:opacity-80 rounded-lg p-4">Shift List</div>
    </Link>
    <Link to='/AssignWorkerToShift'>
      <div className="bg-slate-200 mb-4 hover:opacity-80 rounded-lg p-4">Assign Workers To Shifts</div>
    </Link>
    {/*<Link to='/WorkersAssignList'>
      <div className="bg-slate-200 mb-4 hover:opacity-80 rounded-lg p-3">Workers  Shift Schedule</div>
  </Link>*/}
    </div>

    </div>

  );
}
