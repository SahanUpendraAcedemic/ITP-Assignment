import React ,{useState,useEffect} from 'react';
import {useNavigate,useParams} from 'react-router-dom';

function Item_Update(){
  const [item,setItem] = useState({
    ItemID:'',
    ItemType:'',
    ItemDiscription:'',
    NoOfUnits:'',
  });
  
  const {ItemID} = useParams();
  const navigate = useNavigate();

   const fetchItems = async () => {
    await fetch(`/api/Item/getitem/${ItemID}`,{
    method:'post',
    headers:{
      'Content-Type':'application/json'
    },body:JSON.stringify({item})
  })
  .then(res => res.json())
  .then(data => setItem(data))
  .then(err => console.log(err));
}

  useEffect(() => {
    fetchItems();

  },[ItemID]);

  const handleUpdate = (e) => {
    const {name,value} = e.target;
    setItem(prevItem => (
      {
        ...prevItem,
        [name]:value
      }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/Item/Item_update/${ItemID}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    })
    .then(res=>res.json())
    .then(() => navigate('/'))
    .catch(err => console.log(err));
  }
  console.log(item);
  console.log(ItemID);
  return (
    <div className='p-10 ml-72 justify-between'>
      <div className='bg-sky-900 flex justify-between p-8'>
      <div className='bg-slate-200 rounded-xl p-10'>
        <h1 className='font-semibold text-3xl'>Update Item</h1>

        <form className='items-start justify-normal p-3' onSubmit={handleSubmit}>

        ItemID<input className='w-full rounded-md p-3 text-center' type="text" value={item.ItemID} onChange={handleUpdate} readOnly/> 

        Item Type<input className='w-full rounded-md p-3 text-center' type="text" name='ItemType' value={item.ItemType} onChange={handleUpdate} /> 

        Item Discription<input className='w-full rounded-md p-3 text-center' type="text"  name='ItemDiscription' value={item.ItemDiscription} onChange={handleUpdate}/> 

        No. of Units<input className='w-full rounded-md p-3 text-center' type="number" name='ItemNoOfUints' value={item.ItemNoOfUints} onChange={handleUpdate}/> 

       <button className='w-full bg-red-600 rounded-md p-3 my-3 text-white' type='submit'>Update Item</button>
       <button className='w-full bg-blue-600 rounded-md p-3  text-white' type='reset'>Reset</button>
     </form>
    </div>
  </div></div>
  );
}

export default Item_Update;