import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { updateSupplierStart, updateSupplierSuccess, updateSupplierFailure, deleteSupplierFailure, deleteSupplierStart, deleteSupplierSuccess, logOutSupplierStart, logOutSupplierFailure, logOutSupplierSuccess } from '../redux/supplier/supplierSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { currentSupplier, loading, error } = useSelector((state) => state.supplier);
  const [formData, setFormData] = useState({});
  const [updateSuccess, steUpdateSuccess] = useState(false);
  const [showSitemsError, setShowSitemsError] = useState (false);
  const [supplierSitems, setSupplierSitems] = useState ({});
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  
  useEffect(() => {
    handleShowListings();
    handleSearch();
  },[],[searchTerm]);


  const handleSearch = () => {
    try {
      if (searchTerm.trim() === '') {
        setSupplierSitems(supplierSitems); 
      } else {
        console.log("Searching for:", searchTerm);
        const filteredListings = supplierSitems.filter((sitem) =>
          sitem.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log("Filtered Listings:", filteredListings);
        setSupplierSitems(filteredListings);
      }
    } catch (error) {
      console.error("Error occurred while filtering:", error);

    }
  };
  const handleShowListings = async () => {
    try {
      const res = await fetch(`/api/user/sitem/${currentSupplier._id}`);
      const data = await res.json();
      if (!res.ok) { 
        throw new Error(data.message || 'Failed to fetch data');
      }
      setSupplierSitems(data);
    } catch (error) {
      console.log(error.message);
      setSupplierSitems([]);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };
  const handleSubmit =  async(e) => {
    e.preventDefault();
    try{
      dispatch(updateSupplierStart());
      const res =await fetch (`/api/supplier/update/${currentSupplier._id}`,{

         method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateSupplierFailure(data.message));
        return;
      }
      dispatch(updateSupplierSuccess(data));
      steUpdateSuccess(true);
    }catch (error){
      dispatch(updateSupplierFailure(error.message));
    }
  };

  const handleDeleteSupplier = async () => {
    try {
      dispatch(deleteSupplierStart());
      const res = await fetch(`/api/supplier/delete/${currentSupplier._id}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteSupplierFailure(data.message));
        return;
      }
      dispatch(deleteSupplierSuccess(data));
      
    } catch (error) {
        dispatch (deleteSupplierFailure(error.message));
    };
  };
  const handleLogOut = async () => {

    try {
      dispatch(logOutSupplierStart());
      const res = await fetch ('/api/auth/logout');
      const data = await res.json();
      if (data.success === false) {
        dispatch (logOutSupplierFailure(data.message));
        return;
      }
      dispatch(logOutSupplierSuccess(data));
    } catch (error) {
      dispatch(logOutSupplierFailure(error.message))
    }
  };
  const handleShowSitems = async () => {
    try {
      setShowSitemsError(false);
      const res = await fetch (`/api/supplier/sitems/${currentSupplier._id}`);
      const data = await res.json();
      if(data.success === false) {
        setShowSitemsError(true);
        return;
      }
      setSupplierSitems(data);
    } catch (error) {
      setShowSitemsError(true);
    }
  };
  const handleSitemsDelete = async (sitemsId) => {
    try {
      const res = await fetch(`/api/sitems/delete/${sitemsId}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false){
        console.log(data.message);
        return;
      }

      setSupplierSitems((prev) => 
      prev.filter ((sitems) => sitems._id !== sitemsId));
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleBothClicks = () => {
    handleShowSitems();
    handleSearch();
  };
  return (
    <div className='p-3 max-w-lg  mx-auto '>
      <h1 className='text-3xl text-center font-semibold my-14 font-serif'> Profile </h1>

   
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
      <img src="https://img.icons8.com/ios/50/000000/user" alt="User" className="supplier-image h-20 w-20 rounded-full p-2 bg-gray-300 ml-52" />
        <input type='text' placeholder='Supplier Name'  className='border p-3 rounded-lg' defaultValue = {currentSupplier.supplierName} id='supplierName'  onChange={handleChange}/>
        <input type='email' placeholder='Email' className='border p-3 rounded-lg' defaultValue={currentSupplier.email} id='email' onChange={handleChange}/>
        <input type='number' placeholder='Phone Number' className='border p-3 rounded-lg' defaultValue={currentSupplier.phoneNumber} id='phoneNumber'  onChange={handleChange}/>
        <input type='text' placeholder='Company Name' className='border p-3 rounded-lg' defaultValue={currentSupplier.companyName} id='companyName' onChange={handleChange}/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled = {loading} className='bg-slate-700 text-white p-3 rounded-lg  hover:opacity-85 disabled:opacity-80'>{loading ? 'Loading ... ' : 'Update'}</button>
        <Link className='bg-blue-900 text-white p-3 rounded-lg  hover:opacity-85 disabled:opacity-80 text-center' to={"/createsitems"}> Create Supplier Items</Link>
        

      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteSupplier} className='text-red-700 cursor-pointer'> Delete Account</span>
        <span onClick={handleLogOut} className='text-red-700 cursor-pointer'> Logout </span>
      </div>
      <p className='text-red-700 mt-5'>{ error ? error : ''}</p>
      <p className='text-green-700 mt-5'>{ updateSuccess ? 'Supplier is update Successdully !!' : ''}</p>
      <button onClick={ handleBothClicks } className='text-green-700 w-full'>show supplier list </button>
      <p>{showSitemsError ? 'Error showing supplier items ' : ''}</p>
      {supplierSitems && supplierSitems.length > 0 && <div className='flex flex-col gap-4'>  
      <h1 className='text-center mt-7 text-3xl font-semibold'>Your Item List</h1>
      <div className='p-3 max-w-lg  mx-auto'>
      </div>

<input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-400 py-2 px-4 rounded-md"
            />
            <button onClick={handleSearch} className="text-white uppercase bg-blue-500 px-2 rounded-md">
              Search By Name
            </button>
           

           
            <table className="border-collapse border border-gray-400 w-full">
  <thead>
    <tr className="bg-gray-200">
      <th className="border border-gray-400 px-4 py-2">Item Name</th>
      <th className="border border-gray-400 px-4 py-2">Actions</th>
      <th className="border border-gray-400 px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    
    {supplierSitems.map((sitems) => (
      <tr key={sitems._id} className="border border-gray-400">
        <td className="border border-gray-400 px-4 py-2">
          <Link to={`/sitems/${sitems._id}`} className="text-slate-900 font-semibold hover:underline truncate">{sitems.itemName}</Link>
        </td>
        <td className="border border-gray-400 px-4 py-2">
          <button onClick={() => handleSitemsDelete(sitems._id)} className="text-red-600">Delete</button>
        </td>
        <td className="border border-gray-400 px-4 py-2">
          <Link to={`/updatesitems/${sitems._id}`}>
            <button className="text-green-700">Update</button>
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>



    
      </div>}
      </div>
  );
}
