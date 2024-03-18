import React from 'react'

export default function Header() {
  return (
    <div style={{display:'flex',position:'fixed', alignItems:'center',flexDirection:'column',overflowX:'hidden', 
    height:'100%',width:'25%' , paddingTop:20, borderTopRightRadius:20}} 
    className='bg-slate-900'>
        <div className="relative ">
            <h1 className='font-bold , text-white'>WMS</h1>
        </div>
    </div>
  )
}
