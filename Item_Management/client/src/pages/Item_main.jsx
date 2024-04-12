import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

export default function Item_main() {
  const [AllItems,getAllItems] = useState([]);

  const [loading, setLoading] = useState(false); //a save state for loading status
  const [error,setError] = useState(false); //a save state for an error mostly for fetching

  //fetching all the item data from api
  useEffect(() => {
    const fetchItems = async () => {
    try{
    setError(false);  //trying unless error occurs, set the error status to false
    setLoading(true); //loding while fetching data form api

    const response = await fetch('/api/Item/getitem',{method:'post',headers:{'Content-Type':'application/json'}, //a workaround for api and client loading into two different ports by a proxy
    body:JSON.stringify(AllItems)});

    const itemData = await response.json();//turns fetched data to json
    getAllItems(itemData); // assing json data to a state
    setLoading(false);   //ends loading state onece the fetching done
  }catch(error){
    setError(true); //if an error occurs set error true
  }};
  fetchItems(); //running async function to fetch data from api

}, [setLoading, setError, getAllItems]);

const SetItemDelete = async (id) => {
  
  try {
    const res = await fetch ('api/Item/item_delete',
    {method:'DELETE',headers:{'Content-Type':'application/json'},
    body:JSON.stringify()});

  console.log(id);
  const data = await res.json();
  console.log(data);
  getAllItems(AllItems.filter((item) => item.ItemID !== data.ItemID));
  } catch (error) {
    console.error(error);
  }
};


//rendering all the items from the api
const renderItems = (data) => {
  console.log(data);
  
    return (
      <div className='w-full '>
        {data.map((item) => (
          <div key={item.ItemID} className='my-3 justify-between w-full flex-row outline-2 rounded-md outline outline-black outline-offset-2 '>
            <div className=' bg-slate-200 flex justify-between content-start p-5 rounded-md'>
              <p className='text-center text-lg p-5'>ItemID:{item.ItemID}</p>
              <p className='text-center text-lg p-5'>Item Type:{item.ItemType }</p>
              <p className='text-center text-lg p-5'>Item Discription:{item.ItemDiscription}</p>
              <p className='text-center text-lg p-5'>Units(Kg/L): {item.ItemNoOfUints}</p>
            <div className='flex gap-4 justify-between p-5'>

              <button className='w-20 bg-blue-600 rounded-md p-3  text-white' >Edit</button>
              
              <button className='w-20 bg-blue-600 rounded-md p-3  text-white' onClick={()=>SetItemDelete(item.ItemID)}>Delete</button>
              
            </div>
            </div>
          </div>
        ))}
      </div>
    );
    };

  return (
    
    <div className='p-10 ml-72 justify-between'>
      <div className='flex justify-between p-8'>
      <h1 className='text-3xl font-semibold'>Item Mangement</h1>
      <div className=' ml-8 flex justify-between gap-5 items-center'>
      <input className='w-80 h-13 rounded-md outline outline-2 outline-black p-4' type='text' placeholder='Search Items'></input>
      <Link to=''>
      <button className='w-20 h-100 bg-blue-600 rounded-md p-3  text-white' >Search</button></Link>
      
      <Link to='/Item_add'>
      <button className='w-20 h-100 bg-blue-600 rounded-md p-3  text-white' >New+</button>
      </Link>
      </div>
      </div>
      
      <div className='flex bg-slate-300 justify-between p-8 rounded-md overflow-auto w-full h-min-2 h-screen  '>
        <div className='w-full'>
          {loading?'Loading....':renderItems(AllItems)}
          </div>
      </div>
    </div>
  )
}
