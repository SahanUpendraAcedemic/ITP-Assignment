import React, { useState } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Dashboard';



export default function AddShift() {
  const [formData, setFormData] = useState({
    shiftname: '',
    starttime: '',
    endtime: '',
    days: [],
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const updatedDays = checked
        ? [...formData.days, value]
        : formData.days.filter((day) => day !== value);

      setFormData({ ...formData, [id]: updatedDays });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/shift/create', formData);
      const data = res.data;
      toast.success(data.message);
      setFormData({
        shiftname: '',
        starttime: '',
        endtime: '',
        days: [],
        description: ''
      });
      setLoading(false);
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error(error.message);
      setError(error.message);
      setLoading(false);
    }
  };

    return (
    <div className='flex'>
    
    <Dashboard />
                
                
    <div className='p-3 max-w-lg mx-auto mt-16 mr-96'>
    <h1 className="text-3xl font-bold mb-10 text-center">Add Shift</h1>
    
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        type="text"
        placeholder='Shift Name'
        id='shiftname'
        className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 mb-3'
        value={formData.shiftname}
        onChange={handleChange}
        autoComplete="current-shiftname"
        required
      />

      <input
        type="time"
        placeholder='Start Time'
        id='starttime'
        className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 mb-3'
        value={formData.starttime}
        onChange={handleChange}
        autoComplete="current-starttime"
        required
      />

      <input
        type="time"
        placeholder='End Time'
        id='endtime'
        className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 mb-3'
        value={formData.endtime}
        onChange={handleChange}
        autoComplete="current-endtime"
        required
      />

      <div className='flex flex-wrap gap-2 mb-3'>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <label key={day} className='flex items-center gap-1'>
            <input
              type='checkbox'
              id='days'
              value={day}
              checked={formData.days.includes(day)}
              onChange={handleChange}
            />
            {day}
          </label>
        ))}
      </div>

      <textarea
        placeholder='Description'
        id='description'
        className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 mb-3'
        value={formData.description}
        onChange={handleChange}
        autoComplete="current-description"
        required
      />

      <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
        {loading ? 'Loading...' : 'Add Shift'}
      </button>
    </form>
    {error && <p className="text-red-700 mt-5">{error}</p>}
  </div>
                </div>
        
    );
}