import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function CreateLowInventory() {
    const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
  
     
     itemCode: '',
     itemName: '',
     curruntlevel: 0,
     newlevel: 0,
     
   
  });
 
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      if (+formData.newlevel == +formData.curruntlevel)
        return setError('Discount price must be lower than regular price');
        // console.log("New Level and Current Level cannot be same");

      setLoading(true);
      setError(false);
      const res = await fetch('/api/lowinventory/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/displaylowinventory`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto  w-2/4 px-4 me-64">
      <div className="text-gray-700 font-roboto text-4xl mb-8 pt-24 pb-5">
        Create Low Inventory Level    </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        
        
        <div className="flex items-center mb-6">
          <label htmlFor="itemCode" className="text-red-500 w-48">Item Code</label>
          <input   type="text" id="itemCode" name="itemCode" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
          required
          
          onChange={handleChange}
          value={formData.itemCode}
          />
        </div>

        <div className="flex items-center mb-6">
          <label htmlFor="itemname" className="text-red-500 w-48">Item Name</label>
          <input  type="text" id="itemName" name="itemName" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
          required
          
          onChange={handleChange}
          value={formData.itemName}
          />
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="curruntlevel" className="text-red-500 w-48">Currunt Level</label>
          <input  type="Number" id="curruntlevel" name="curruntlevel" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
          required
          
          onChange={handleChange}
          value={formData.curruntlevel? formData.curruntlevel : '0'}
          />
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="newlevel" className="text-red-500 w-48">New Level</label>
          <input  type="Number" id="newlevel" name="newlevel" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
          required
          min = "0"
          onChange={handleChange}
          value={formData.newlevel}
          />
        </div>
        
       

        <div className="flex justify-between  mt-4">
          <button className="w-48 h-12 rounded-md bg-green-600 text-white font-roboto font-semibold text-lg cursor-pointer hover:bg-green-700 focus:outline-none"> {loading ? 'Creating...' : 'Save'}</button>
        </div>
      </form>

      {/* Check Current Stock Section */}
     
    </div>
  );
}

