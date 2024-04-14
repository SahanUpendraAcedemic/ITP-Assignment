import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const EditItemPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/lostItem/lost_item_list/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch item');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/lostItem/update_lost_item/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update item');
      }
      const updatedItem = await response.json();

      alert('Item updated successfully');
      window.location.href = '/lost_item_list';
    } catch (error) {
      console.error('Error updating item:', error);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 bg-gray-100 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="itemId" className="block text-gray-700 font-bold mb-2">Item ID</label>
            <input type="text" name="itemId" id="itemId" value={formData.itemId || ''} readOnly className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none" />
          </div>
          <div className="mb-4">
            <label htmlFor="itemName" className="block text-gray-700 font-bold mb-2">Item Name</label>
            <input type="text" name="itemName" id="itemName" value={formData.itemName || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="itemType" className="block text-gray-700 font-bold mb-2">Item Type</label>
            <input type="text" name="itemType" id="itemType" value={formData.itemType || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="physicalQuantity" className="block text-gray-700 font-bold mb-2">Physical Quantity</label>
            <input type="number" name="physicalQuantity" id="physicalQuantity" value={formData.physicalQuantity || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea name="description" id="description" value={formData.description || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditItemPage;
