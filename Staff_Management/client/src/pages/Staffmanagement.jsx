import { Link } from "react-router-dom"

export default function Staffmanagement() {
  return (
    <div className='p-10 max-w-lg mx-auto flex flex-col gap-4 text-center'>

    <h1 className="text-3xl font-bold mb-6 text-center">Manage Staff Members</h1>
    <Link to='/Addworkers'>
      <div className="bg-slate-200 mb-4 hover:opacity-80 rounded-lg p-3">Add Workers</div>
    </Link>
    <Link to='/Workerlist'>
      <div className="bg-slate-200 mb-4 hover:opacity-80 rounded-lg p-3">Worker List</div>
    </Link>
    <Link to='/Addshift'>
      <div className="bg-slate-200 mb-4 hover:opacity-80 rounded-lg p-3">Add Shift</div>
    </Link>
    <Link to='/Shiftlist'>
      <div className="bg-slate-200 mb-4 hover:opacity-80 rounded-lg p-3">Shift List</div>
    </Link>
    <Link to='/login'>
      <div className="bg-slate-200 mb-4 hover:opacity-80 rounded-lg p-3">Login</div>
    </Link>
    </div>

  );
}
