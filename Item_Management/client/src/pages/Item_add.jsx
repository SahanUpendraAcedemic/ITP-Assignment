import React from 'react'
import { useState } from 'react';

export default function Item_add() {
  //a save state for the form data
  const [addItemData, setAddItemData] = useState({});
  //fetching the data from the form via handelchange function
  const handleChange = (e) => {
    setAddItemData({ ...addItemData, [e.target.id]: e.target.value });
  };
  //handle submit function. this function should wait and fetching the data from the form,hence async
  const handleSubmit = async (e) => {
    e.preventDefault(); //preventing the default action of the form
    const res = await fetch("/api/Item", {method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify(addItemData)}) //fetching the data from the api
    const data = await res.json(); //converting the data into json format
    console.log(addItemData); //logging the data
    console.log(res.body); //logging the data
  };

  return (
    <div className='bg-sky-900' style={{width:'100%', height:'100%',position:'absolute',padding:50,alignItems:'center'}}>
      <div className='bg-slate-200 rounded-xl p-10'>
        <h1 className='font-semibold text-3xl'>Add Item</h1>
        <form onSubmit={handleSubmit} className='items-start justify-normal p-3'>

        ItemID<input className='w-full rounded-md p-3 text-center' 
        type="text" 
        placeholder='ItemID' 
        id='ItemID' onChange={handleChange}/> 

        Item Type<input className='w-full rounded-md p-3 text-center' 
        type="text" 
        placeholder='Item Type' 
        id='ItemType' onChange={handleChange}/> 

        Item Discription<input className='w-full rounded-md p-3 text-center' 
        type="text" 
        placeholder='Item Discription' 
        id='ItemDiscription' onChange={handleChange}/> 

        No. of Units<input className='w-full rounded-md p-3 text-center'
        type="text" 
        placeholder='No. of Units' 
        id='ItemNoOfUints' onChange={handleChange} /> 

        <button className='w-full bg-red-600 rounded-md p-3 my-3 text-white'>Add Item</button>
        <button className='w-full bg-blue-600 rounded-md p-3  text-white'>Reset</button>
        </form>
      </div>
    </div>

  )
}
