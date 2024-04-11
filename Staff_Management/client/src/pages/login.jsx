import { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";

export default function login() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value});

  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault ();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/login', {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
    
      navigate('/');
      
      
    } catch (error) {
      setLoading(false);
      setError(true);
    }

    
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type="text" placeholder='Email' id='email' 
        className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400'
        onChange={handleChange}
        />

        <input type="password" placeholder='Password' id='password' 
        className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400'
        onChange={handleChange}
        />

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg 
        uppercase hover:opacity-95'>
          {loading ? 'Loading...' : 'login'}
        </button>

      </form>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
    </div>
  );
}
