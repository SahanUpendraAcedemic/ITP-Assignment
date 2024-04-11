import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <h1 className='font-bold'>STAFF-MANAGEMENT</h1>
            <ul className='flex gap-14 font-light'>

            <Link to='/'>
                    <li>Staff Main</li>
                </Link>
                
                <Link to='/Addworkers'>
                    <li>Add Workers</li>
                </Link>

                <Link to='/Workerlist'>
                    <li>Worker List</li>
                </Link>

                <Link to='/Addshift'>
                    <li>Add Shift</li>
                </Link>

                <Link to='/Shiftlist'>
                    <li>Shift List</li>
                </Link>

            </ul>
        </div>
    </div>
  )
}
