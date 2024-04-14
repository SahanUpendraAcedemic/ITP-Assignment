import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Item_add() {
  //a save state for the form data
  const [addItemData, setAddItemData] = useState({});
  const [error,setError] = useState(false); //a save state for an error mostly for fetching
  const [loading, setLoading] = useState(false); //a save state for loading status
  const [success, setSuccess] = useState(false); //a save state for errorless status

  //fetching the data from the form via handelchange function
  const handleChange = (e) => {
    setAddItemData({ ...addItemData, [e.target.id]: e.target.value });
  };
  //handle submit function. this function should wait and fetching the data from the form,hence async
  const handleSubmit = async (e) => {
    e.preventDefault(); //preventing the default action of the form
    
    try{
      setLoading(true);
      setError(false); //setting the error status to null afther sending the data
      const res = await fetch("/api/Item", 
      {method:'post',headers:{'Content-Type':'application/json'}, //a workaround for api and client loading into two different ports by a proxy
      body:JSON.stringify(addItemData)}) //fetching the data from the api
    
      const data = await res.json(); //converting the data into json format
      setLoading(false); //setting the loading status to false after sending the data
      setSuccess(true); //setting the success status to true after sending the data
      //sometimes try catch is ignored by the browser, so we need to check if the data is sent or not for further actions
      if(data.success==false) {
        setError(true);
        return;} //setting the error status to true if the data is not sent 
      
  } catch(error){
    setLoading(false); //setting the loading status to false after error
    setError(true); //setting the error status to error after error
  }};

  return (
    <div className='bg-sky-900 ml-72' style={{padding:50,alignItems:'center'}}>
      <div className='bg-slate-200 rounded-xl p-10 mt-10'>
        <h1 className='font-semibold text-3xl'><Link to={'/'} >Item Management</Link>/Add Item</h1>
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

        <button className='w-full bg-red-600 rounded-md p-3 my-3 text-white'>{loading?'Adding Item...':'Add Item'}</button>
        <button type='reset' className='w-full bg-blue-600 rounded-md p-3  text-white'>Reset</button>
        </form>
        <p className='text-red-700 mt-5 font-semibold align-middle'>{error && 'An Error Occured! Please try again'}{success && 'The Item added Successfully'}</p>
      </div>
      
    </div>

  )
}
