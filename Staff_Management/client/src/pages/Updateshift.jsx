import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom"
import Dashboard from './Dashboard';
import Header from './Header';

export default function Updateshift() {
  const [formData, setFormData] = useState({
    shiftname: '',
    starttime: '',
    endtime: '',
    days: [],
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { shiftId } = useParams();

  useEffect(() => {
    const fetchShiftDetails = async () => {
      try {
        const response = await axios.get(`/api/shift/${shiftId}`);
        if (response.data) {
          setFormData(response.data.shift); // Update formData with shift details
          console.log(response.data);
        } else {
          console.error('Empty response data');
        }
      } catch (error) {
        console.error('Error fetching shift details:', error);
        setError(error.message || 'Error fetching shift details');
      }
    };
  
    fetchShiftDetails();
  }, [shiftId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`/api/shift/${shiftId}`, formData);
      const data = res.data;
      toast.success(data.message);
    } catch (error) {
      console.error('Error updating shift:', error);
      setError(error.message || 'Error updating shift');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };

  // Handle checkbox change for days
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData(prevFormData => ({
        ...prevFormData,
        days: [...prevFormData.days, value]
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        days: prevFormData.days.filter(day => day !== value)
      }));
    }
  };

  // Array of days
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (

<div className='flex'>

  <Header/>
  <Dashboard />





    <div className='p-3 max-w-lg mx-auto mt-10 mr-96'>
      <h1 className='text-3xl text-center font-semibold my-7 mb-11'>Update Shift</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-8 mt-5'>
        {/* Input fields to update shift details */}
        <input  type="text" placeholder='Shift Name' id='shiftname' className={`bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 ${formData.shiftname ? 'cursor-not-allowed opacity-50' : ''}`} value={formData.shiftname || ''} onChange={handleChange} required disabled={formData.shiftname} />
        <input type="text" placeholder='Start Time' id='starttime' className={`bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 ${formData.starttime ? 'cursor-not-allowed opacity-50' : ''}`} value={formData.starttime || ''} onChange={handleChange} required disabled={formData.starttime} />
        <input type="text" placeholder='End Time' id='endtime' className={`bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 ${formData.endtime ? 'cursor-not-allowed opacity-50' : ''}`} value={formData.endtime || ''} onChange={handleChange} required disabled={formData.endtime} />
        {/* Checkboxes for selecting days */}
        <div>
          {daysOfWeek.map((day, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={day}
                checked={formData.days.includes(day)}
                onChange={handleCheckboxChange}
              />
              {day}
            </label>
          ))}
        </div>
        <input type="text" placeholder='Description' id='description' className={`bg-slate-100 p-3 rounded-lg border-2 border-zinc-400`} value={formData.description || ''} onChange={handleChange} required />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      {error && <p className="text-red-700 mt-5">{error}</p>}
    </div>

    </div>
  );
}
