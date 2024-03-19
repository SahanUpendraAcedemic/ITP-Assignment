import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='font-bold ' >Supplier Management</h1>
            </Link>
            <ul className='flex gap-5 ml-3 '>
                <Link to='/'>
                <li>Home</li>
                </Link>
                <Link to='/Profile'>
                <li>Profile</li>
                </Link>
                <Link to='/sing-in'>
                <li>Sing In</li>
                </Link>
                <Link to='/sing-up'>
                <li>Sing Up</li>
                </Link>
            </ul>
        </div>
        
        </div>
  )
}
