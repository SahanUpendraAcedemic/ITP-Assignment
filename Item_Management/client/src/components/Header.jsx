import React from 'react'

export default function Header() {
  return (
    <div className='bg-slate-900'>
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <h1 className='font-bold , text-white'>WMS</h1>
            <ul className='flex gap-4 '>
            <li><button className='bg-cyan-700 flex-gap-4 rounded-3xl p-5'>Item Management</button></li>
            <li><button className='bg-cyan-700 flex-gap-4 rounded-3xl p-5'>Item Management</button></li>
            <li><button className='bg-cyan-700 flex-gap-4 rounded-3xl p-5'>Item Management</button></li>
            <li><button className='bg-cyan-700 flex-gap-4 rounded-3xl p-5'>Item Management</button></li>   
            </ul>
        </div>
    </div>
  )
}
