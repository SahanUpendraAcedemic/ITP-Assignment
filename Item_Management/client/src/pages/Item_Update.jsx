import React ,{useState,useEffect} from 'react';
import {useNavigate,useParams} from 'react-router-dom';

function Item_Update(){
  const [item,setItem] = useState({
    ItemID:'',
    ItemType:'',
    ItemDiscription:'',
    NoOfUnits:''
  });
  
  const {ItemID} = useParams();
  const history = useNavigate();

   const fetchItems = async () => {
    const res = await fetch(`/api/Item/getitem/${ItemID}`,{
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

  },[]);

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
    .then(() => history.push('/'))
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

        ItemID<input className='w-full rounded-md p-3 text-center' type="text" placeholder='ItemID' id='iid' value={item.ItemID} onChange={handleUpdate} readOnly/> 

        Item Type<input className='w-full rounded-md p-3 text-center' type="text" placeholder='Item Type' id='itype'  value={item.ItemType} onChange={handleUpdate} /> 

        Item Discription<input className='w-full rounded-md p-3 text-center' type="text" placeholder='Item Discription' id='idisc' value={item.ItemDiscription} onChange={handleUpdate}/> 

        No. of Units<input className='w-full rounded-md p-3 text-center' type="text" placeholder='No. of Units' id='noofunits' value={item.NoOfUnits} onChange={handleUpdate}/> 

       <button className='w-full bg-red-600 rounded-md p-3 my-3 text-white'>Update Item</button>
       <button className='w-full bg-blue-600 rounded-md p-3  text-white'>Reset</button>
     </form>
    </div>
  </div></div>
  );
}

export default Item_Update;