import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate ();
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const res =await fetch ('/api/auth/register', {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData),
      }); 
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate ('/login');
      ;

    }catch (error){
      setLoading(false);
      setError(error.message);

    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-14 font-serif'>

        Supplier Register
        
      </h1>

      <form onSubmit={ handleSubmit }className='flex flex-col gap-4'>
        <input type='text' placeholder='Supplier Name' className='border p-3 rounded-lg' id='supplierName' onChange={handleChange}/>
        <input type='email' placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type='number' placeholder='Phone Number' className='border p-3 rounded-lg' id='phoneNumber' onChange={handleChange}/>
        <input type='text' placeholder='Company Name' className='border p-3 rounded-lg' id='companyName' onChange={handleChange}/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password'onChange={handleChange} />
        <button disabled= { loading }className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80'>{loading ? 'loading ...' : 'Register'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an Account ? </p>
          <Link to = {"/login"}>
            <span className='text-blue-700'>Login</span>
          </Link>
        
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
  
}
