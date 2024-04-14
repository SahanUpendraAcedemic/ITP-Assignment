import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignupForm() {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/lostItem/add_lost_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        // If item is successfully added
        setMessage(data.message); // Set success message
        alert(data.message); // Display alert
        window.location.href = '/lost_item_list'; // Redirect to lost_item_list page
      } else {
        // If an error occurs (e.g., item with the same itemId already exists)
        setMessage(data.message); // Set error message
        alert(data.message); // Display alert
      }
    } catch (error) {
      console.error('Error adding lost item:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen mt-10">
    <div className="border border-blue-500 p-8 rounded-lg">
      <h1 className="text-3xl text-center font-semibold my-7">Add Lost Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="itemId" className="block">Item ID:</label>
        <input type="text" id="itemId" value={formData.itemId || ''} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />

        <label htmlFor="itemName" className="block">Item Name:</label>
        <input type="text" id="itemName" value={formData.itemName || ''} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />

        <label htmlFor="itemType" className="block">Item Type:</label>
        <input type="text" id="itemType" value={formData.itemType || ''} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />

        <label htmlFor="physicalQuantity" className="block">Physical Quantity:</label>
        <input type="number" id="physicalQuantity" value={formData.physicalQuantity || ''} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />

        <label htmlFor="description" className="block">Description:</label>
        <textarea id="description" value={formData.description || ''} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"></textarea>

        <input type="submit" value="Add Item" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700" />
      </form>
    </div>
  </div>
  );
}
