import React, { useEffect, useState } from 'react'
import {Link, json} from 'react-router-dom'

export default function Item_main() {
  const [AllItems,getAllItems] = useState([]);
  const [search, setSearch] = useState(''); //a save state for search bar
  const [loading, setLoading] = useState(false); //a save state for loading status
  const [error,setError] = useState(false); //a save state for an error mostly for fetching
  const [input, setInput] = useState(''); //a save state for input data

  //fetching all the item data from api
  useEffect(() => {
  fetchItems(); //running async function to fetch data from api
}, []);

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
//deleting an item from the api
const SetItemDelete = async (id) => { 
  try {
    const res = await fetch ('api/Item/item_delete',
    {method:'DELETE',headers:{'Content-Type':'application/json'},
    body:JSON.stringify()}).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
};

const searchItems = AllItems.filter((item) => 
  item.ItemID.toLowerCase().includes(search.toLowerCase()));
  console.log(searchItems);

const handleSearch = (e) => {
  e.preventDefault();
  fetchItems(searchItems);
  renderItems(searchItems);
}

//rendering all the items from the api
const renderItems = (data) => {
    return (
      <div className='w-full '>
        <table className=' w-full border-separate border-spacing-y-5'>
          <thead className='bg-slate-700'>
          <tr className=' outline outline-2 rounded-md m-5'>
            <th className='text-center text-lg p-5'>ItemID</th>
            <th className='text-center text-lg p-5'>Item Type</th>
            <th className='text-center text-lg p-5'>Item Discription</th>
            <th className='text-center text-lg p-5'>Units(Kg/L)</th>
            <th className='text-center text-lg p-5'>Added Date</th>
            <th className='text-center text-lg p-5'>Updated Date</th>
            <th className='text-center text-lg p-5'>Action</th>
            </tr>
          </thead>
          <tbody className='border-spacing-y-5'>
        {data.map((item) => (
          <tr key={item.ItemID} className=' outline-2 rounded-md outline outline-black ' >
              <td className=' text-sm p-5'>{item.ItemID}</td>
              <td className=' text-sm p-5'>{item.ItemType }</td>
              <td className=' text-sm p-5'>{item.ItemDiscription}</td>
              <td className=' text-sm p-5'>{item.ItemNoOfUints}</td>
              <td className=' text-sm p-5'>{new Date(item.createdAt).toDateString()}</td>
              <td className=' text-sm p-5'>{new Date(item.updatedAt).toDateString()}</td>
              <td><button className='w-20 bg-blue-600 rounded-md p-3  text-white  hover:bg-slate-700' >Edit</button></td>
              <td><button className='w-20 bg-blue-600 rounded-md p-3  text-white   hover:bg-slate-700'  onClick={()=>SetItemDelete(item.ItemID)}>Delete</button> </td>
          </tr>
        ))}
        </tbody>
        </table>
      </div>
    );
    };

  return (
    
    <div className='p-10 ml-72 justify-between'>

      <div className='flex justify-between p-8'>
      <h1 className='text-3xl font-semibold'>Item Mangement</h1>
      <div className=' ml-8 flex justify-between gap-5 items-center'>
      
      <form onSubmit={handleSearch}>
      <input className='w-80 h-13 rounded-md outline outline-2 outline-black p-4 hover:outline-slate-600 focus:outline-rose-700' 
      type='string' placeholder='Search Items by ItemID' value= {input} 
      onChange={e=>
        {setInput(e.target.value);
          setSearch(e.target.value)}} />
      </form>
      
     
      <Link to='/Item_add'>
      <button className='w-20 h-100 bg-blue-600 rounded-md p-3  text-white  hover:bg-slate-700' >New+</button>
      </Link>
      </div>
      </div>
      
      <div className='flex bg-slate-300 justify-between p-8 rounded-md overflow-auto w-full h-min-2 h-screen  '>
        <div className='w-full'>
          {loading?'Loading....':renderItems(AllItems)&&renderItems(searchItems)}
          {searchItems.length === 0 && <p className='text-red-700'>No Items Found</p>}
          <p className='text-red-700'>{error && 'An Error Occured! Please try again'}</p>
          </div>
      </div>
    </div>
  )
}
