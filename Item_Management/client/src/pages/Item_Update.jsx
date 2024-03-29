import React from 'react'

export default function Item_Update() {
  return (
    <div>
      <div className='bg-sky-900' style={{width:'100%', height:'100%',position:'absolute',padding:50,alignItems:'center'}}>
      <div className='bg-slate-200 rounded-xl p-10'>
        <h1 className='font-semibold text-3xl'>Update Item</h1>
        <form className='items-start justify-normal p-3'>
        ItemID<input className='w-full rounded-md p-3 text-center' type="text" placeholder='ItemID' id='iid'/> 
        Item Type<input className='w-full rounded-md p-3 text-center' type="text" placeholder='Item Type' id='itype'/> 
        Item Discription<input className='w-full rounded-md p-3 text-center' type="text" placeholder='Item Discription' id='idisc'/> 
        No. of Units<input className='w-full rounded-md p-3 text-center' type="text" placeholder='No. of Units' id='noofunits'/> 
       <button className='w-full bg-red-600 rounded-md p-3 my-3 text-white'>Update Item</button>
       <button className='w-full bg-blue-600 rounded-md p-3  text-white'>Reset</button>
     </form>
    </div>
  </div></div>
  )
}
