import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';


import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
export default function DisplayLowInventory() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showLowInventoryError, setShowLowInventoryError] = useState(false);
  const [userLowInventories, setUserLowInventorys] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    handleShowLowInventory(); // Automatically calls the function when component mounts
  }, []);

  const formatDate = (date) => {
    // Convert the date string to a Date object
    const createdAtDate = new Date(date);
  
    // Format the date to display only the date portion
    const formattedDate = createdAtDate.toLocaleDateString();
  
    return formattedDate;
  };
 
  const handleShowLowInventory = async () => {
    try {
      setShowLowInventoryError(false);
      const res = await fetch(`/api/user/lowinventory/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowLowInventoryError(true); // Fix variable name here
        return;
      }
  
      setUserLowInventorys(data); // Fix variable name here
    } catch (error) {
      setShowLowInventoryError(true);
    }
  };


  const handleLowInventoryDelete = async (lowinventoryId) => {
    try {
      const res = await fetch(`/api/lowinventory/delete/${lowinventoryId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserLowInventorys((prev) =>
        prev.filter((lowinventory) => lowinventory._id !== lowinventoryId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='p-3 w-2/4  mx-auto me-64'>
     

      

      {userLowInventories && userLowInventories.length >= 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-gray-700 font-roboto text-4xl mb-8 mt-20'>
            Low Inventory Items
          </h1>
          
          <table className="w-full border-collapse">
  <thead>
    <tr className="bg-gray-200 text-gray-700">
      
      <th className="border border-gray-400 py-2 px-4">Item Code</th>
      <th className="border border-gray-400 py-2 px-4">Item Name</th>
      <th className="border border-gray-400 py-2 px-4">Currunt Level</th>
      <th className="border border-gray-400 py-2 px-4">New Level</th>
      <th className="border border-gray-400 py-2 px-4">Created At</th>
      <th className="border border-gray-400 py-2 px-4">Updated At</th>
      <th className="border border-gray-400 py-2 px-4"></th>
      <th className="border border-gray-400 py-2 px-4"></th>
     

    </tr>
  </thead>
  <tbody>
    {userLowInventories.map((lowinventory) => (
      <tr key={lowinventory._id} className="border-b">
       
        <td className="py-2 px-4 border">
          <Link
            className="text-blue-500 font-semibold hover:underline truncate flex-1 text-blue-500 underline"
            to={`/listing/${lowinventory._id}`}
          >
            {lowinventory.itemCode}
          </Link>
        </td>
        <td className="py-2 px-4 border">
          <Link
            className="text-blue-500 font-semibold hover:underline truncate flex-1 text-blue-500 underline"
            to={`/listing/${lowinventory._id}`}
          >
            {lowinventory.itemName}
          </Link>
        </td>
        <td className="py-2 px-4 border">
          <Link
            className="text-blue-500 font-semibold hover:underline truncate flex-1 text-blue-500 underline"
            to={`/listing/${lowinventory._id}`}
          >
            {lowinventory.curruntlevel}
          </Link>
        </td>
        <td className="py-2 px-4 border">
          <Link
            className="text-blue-500 font-semibold hover:underline truncate flex-1 text-blue-500 underline"
            to={`/listing/${lowinventory._id}`}
          >
            {lowinventory.newlevel}
          </Link>
        </td>
        <td className="py-2 px-4 border">
          <Link
            className="text-slate-700 font-semibold hover:underline truncate flex-1"
            to={`/listing/${lowinventory._id}`}
          >
            {formatDate(lowinventory.createdAt)}
          </Link>
        </td>
        <td className="py-2 px-4 border">
          <Link
            className="text-slate-700 font-semibold hover:underline truncate flex-1"
            to={`/listing/${lowinventory._id}`}
          >
            {formatDate(lowinventory.updatedAt)}
          </Link>
        </td>
        <td className="py-2 px-4 border">
        <div className="flex flex-col item-center">
            
            <button className="text-red-4 00 uppercase">Pending</button>
         
        </div>
        </td>
          
        <td className="py-2 px-4 border">
          <div className="flex flex-col item-center">
            <button
              onClick={() => handleLowInventoryDelete(lowinventory._id)}
              className="text-red-700 uppercase"
            >
              Delete
            </button>
            
          </div>
        </td>
        <td className="py-2 px-4 border">
          <div className="flex flex-col item-center">
            <Link to={`/update-lowinventory/${lowinventory._id}`}>
              <button className="text-green-700 uppercase">Edit</button>
            </Link>
          </div>
        </td>
        
      </tr>
    ))}
  </tbody>
</table>
<p className='text-red-700 mt-5'>{error ? error : ''}</p>
      
      
      <p className='text-red-700 mt-5'>
        {showLowInventoryError ? 'Error showing listings' : ''}
      </p>

        </div>
      )}
    </div>
  );
}

