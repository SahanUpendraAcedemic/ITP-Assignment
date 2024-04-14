import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignupForm() {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => { 
   
    setFormData({...formData,[e.target.id]:e.target.value})
     
  }
  console.log(formData)

  // Function to handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
   const res=await fetch('api/Auth/signup',{
   method:'POST',
  headers:{
    'Content-Type':'application/json',
  },
  body:JSON.stringify(formData),
});
const data=await res.json();
    console.log(data);{massage: 'User created successfully'}
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',  }}>
      {/* Apply inline styles */}
      <div style={{ border: '2px solid blue', padding: '20px', borderRadius: '10px' }}>
        {/* Apply inline styles */}
        <h1 className='text-3xl text-center font-semibold my-7'>Signup</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label><br />
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required /><br /><br />

          <label htmlFor="email">Email:</label><br />
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br /><br />

          <label htmlFor="password">Password:</label><br />
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br /><br />

          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </div>
  );
}
