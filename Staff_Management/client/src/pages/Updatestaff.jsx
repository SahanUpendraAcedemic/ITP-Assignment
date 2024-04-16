import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom"
import Dashboard from './Dashboard';
import Header from './Header';

export default function Updatestaff() {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    type: '',
    number: '',
    email: '',
    address: '',
    joindate: '',
    shift: '',
    license: '',
    password: ''
  });

  const { staffId } = useParams();
  const { loading, error } = useSelector((state) => state.staff);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await axios.get(`/api/staff/get/${staffId}`);
        if (response.data) {
          setFormData(response.data.staff); // Update formData with staff details
          console.log(response.data);
        } else {
          console.error('Empty response data');
        }
      } catch (error) {
        console.error('Error fetching staff details:', error);
      }
    };
  
    fetchStaffDetails();
  }, [staffId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/staff/${staffId}`, formData);
      const data = res.data;
      toast.success(data.message);
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };

  return (

    <div className='flex'>

      <Header/>
      <Dashboard/>




<div className='p-3 max-w-lg mx-auto w-4/5 mr-96'>
      <h1 className='text-3xl text-center font-semibold my-7 mt-10'>Update Worker</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* Input fields to update staff details */}
        <input type="text" placeholder='Name' id='name' className={`bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 ${formData.name ? 'cursor-not-allowed opacity-50' : ''}`} value={formData.name || ''} onChange={handleChange} required disabled />
        <input type="number" placeholder='Registration ID' id='id' className={`bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 ${formData.id ? 'cursor-not-allowed opacity-50' : ''}`} value={formData.id || ''} onChange={handleChange} required disabled />
        <select name="type" id="type" value={formData.type || ''} className={`bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 ${formData.type ? 'cursor-not-allowed opacity-50' : ''}`} onChange={handleChange} required disabled>
          <option value="" disabled>Type</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Driver">Driver</option>
          <option value="Labor">Labor</option>
        </select>
        {/* Additional input fields */}
        <input type="number" placeholder='Contact Number' id='number' className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400' value={formData.number || ''} onChange={handleChange} required />
        <input type="email" placeholder='Email' id='email' className={`bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 ${formData.email ? 'cursor-not-allowed opacity-50' : ''}`} value={formData.email || ''} onChange={handleChange} required disabled />
        <input type="text" placeholder='Address' id='address' className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400' value={formData.address || ''} onChange={handleChange} required />
        <input type="date" placeholder='Join Date' id='joindate' className={`bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 ${formData.joindate ? 'cursor-not-allowed opacity-50' : ''}`} value={formData.joindate || ''} onChange={handleChange} required disabled />
        <input type="text" placeholder='Shift' id='shift' className={`bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 ${formData.shift ? 'cursor-not-allowed opacity-50' : ''}`} value={formData.shift || ''} onChange={handleChange} required disabled />
        <input type="number" placeholder='License (Driver Only)' id='license' className={`bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 ${formData.license ? 'cursor-not-allowed opacity-50' : ''}`} value={formData.license || ''} onChange={handleChange} disabled />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      {error && <p className="text-red-700 mt-5">{error}</p>}
    </div>
    </div>
  );
}
