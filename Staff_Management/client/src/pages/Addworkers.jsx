import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { registerStart, registerSuccess, registerFailure } from '../redux/staff/staffSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Addworkers() {
  const [formData, setFormData] = useState({
    type: '', // Initialize type in formData
  });
  const { loading, error } = useSelector((state) => state.staff);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Update form data
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(registerStart());
      const res = await axios.post('/api/auth/register', formData);
      const data = res.data;
      if (data.success === false) {
        dispatch(registerFailure(data.message));
        return;
      }
      dispatch(registerSuccess(data));
      setFormData({});
      toast.success(data.message);
    } catch (error) {
      console.error('Error occurred:', error);
      dispatch(registerFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-bold mb-6 text-center">Add Workers</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Name' id='name'
          className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400'
          value={formData.name || ''}
          onChange={handleChange}
          autoComplete="current-name"
          required
        />

        <input type="number" placeholder='Registration ID' id='id'
          className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400'
          value={formData.id || ''}
          onChange={handleChange}
          autoComplete="current-id"
          required
        />

        <select
          name="type"
          id="type"
          value={formData.type} // Update value without || ''
          className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400'
          onChange={handleChange}
          autoComplete="current-type"
          required
        >
          <option value="" disabled>Type</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Driver">Driver</option>
          <option value="Labor">Labor</option>
        </select>

        <input type="number" placeholder='Contact Number' id='number'
          className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400'
          value={formData.number || ''}
          onChange={handleChange}
          autoComplete="current-number"
          required
        />

        <input type="text" placeholder='Address' id='address'
          className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400'
          value={formData.address || ''}
          onChange={handleChange}
          autoComplete="current-address"
          required
        />

        <input type="date" placeholder='Join Date' id='joindate'
          className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400'
          value={formData.joindate || ''}
          onChange={handleChange}
          autoComplete="current-joindate"
          required
        />

        <input type="number" placeholder='License (Driver Only)' id='license'
          className={`bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 ${formData.type === 'Supervisor' || formData.type === 'Labor' ? 'opacity-50 cursor-not-allowed' : ''}`}
          value={formData.license || ''}
          onChange={handleChange}
          autoComplete="current-license"
          disabled={formData.type === 'Supervisor' || formData.type === 'Labor'}
        />

        <input type="email" placeholder='Email' id='email'
          className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400'
          value={formData.email || ''}
          onChange={handleChange}
          autoComplete="current-email"
          required
        />

        <input
          type="password"
          placeholder="Password (Supervisor Only)"
          id="password"
          className={`bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 ${formData.type === 'Driver' || formData.type === 'Labor' ? 'opacity-50 cursor-not-allowed' : ''}`}
          value={formData.password || ''}
          onChange={handleChange}
          autoComplete="current-password"
          disabled={formData.type === 'Driver' || formData.type === 'Labor'}
        />

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
      {error && <p className="text-red-700 mt-5">{error}</p>}
    </div>
  );
}
