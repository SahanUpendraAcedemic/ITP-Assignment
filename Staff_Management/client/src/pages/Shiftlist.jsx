import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Dashboard';
import Header from './Header';

export default function Shiftlist() {
  const [shiftList, setShiftList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchShifts();
  }, []);

  useEffect(() => {
    setSearchResults(shiftList); // Initialize searchResults with all shiftList data
  }, [shiftList]);

  const fetchShifts = async () => {
    try {
      const response = await axios.get('/api/shift/');
      setShiftList(response.data);
    } catch (error) {
      console.error('Error fetching shift list:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this shift?');
      if (confirmed) {
        await axios.delete(`/api/shift/${id}`);
        setShiftList(shiftList.filter((shift) => shift._id !== id));
        toast.success('Shift deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting shift:', error);
    }
  };

  const handleSearch = () => {
    const results = shiftList.filter((shift) => {
      // Check if the shift name contains the search term
      return shift.shiftname.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults(shiftList); // Reset searchResults to all shiftList data
  };

  return (

    <div className='flex'>

      <Header/>
      <Dashboard/>







<div className="p-8 w-4/5 ml-72">
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center mt-4">Shift List</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search by shift Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 rounded-lg border-2 border-gray-300 mr-2 focus:outline-none focus:border-blue-500"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Search</button>
        <button onClick={clearSearch} className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Clear</button>
      </div>
      <table className="w-full border-collapse">
        {/* Table header */}
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Shift Name</th>
            <th className="py-2 px-4 border">Start Time</th>
            <th className="py-2 px-4 border">End Time</th>
            <th className="py-2 px-4 border">Days</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {searchResults.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">No data available</td>
            </tr>
          ) : (
            searchResults.map((shift, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-2 px-4 border">{shift.shiftname}</td>
                <td className="py-2 px-4 border">{shift.starttime}</td>
                <td className="py-2 px-4 border">{shift.endtime}</td>
                <td className="py-2 px-4 border">{shift.days.join(', ')}</td>
                <td className="py-2 px-4 border">{shift.description}</td>
                <td className="py-2 px-4 border">
                  <div className="flex justify-between">
                    <Link to={`/updateshift/${shift._id}`}>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update</button>
                    </Link>
                    <button className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600 focus:outline-none focus:bg-red-600" onClick={() => handleDelete(shift._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
}
