import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx auto p-3'>
        <Link to= '/'>
        <h1 className='font-bold text sm sm:text-xl  flex flex-wrap' >
            <span className='text-slate-500'>Supplier</span>
            <span className='text-slate-700'>Management</span>
        </h1>
        </Link>
        <ul className='flex gap-8 '>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Login</li>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Supplier Items</li>
            <li className=' text-slate-700 hover:underline'>Profile</li>

        </ul>
        </div>
    </header>
  )
}

