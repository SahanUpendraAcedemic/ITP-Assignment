import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginFailure, loginSuccess } from '../redux/supplier/supplierSlice';

export default function Login() {
  const [formData, setFormData] = useState({});
  const{loading, error} = useSelector((state) => state.supplier);
  const navigate = useNavigate ();
  const dispatch = useDispatch ();
  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.id]: e.target.value,
    });

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      dispatch( loginStart ());
      const res =await fetch ('/api/auth/login', {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData),
      }); 
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        dispatch( loginFailure (data.message));
        return;
      }
      dispatch( loginSuccess (data));
      navigate ('/');

    }catch (error){
      dispatch( loginFailure (error.message));

    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-14 font-serif'>

        Supplier Login
        
      </h1>

      <form onSubmit={ handleSubmit }className='flex flex-col gap-4'>
        <input type='text' placeholder='Supplier Name' className='border p-3 rounded-lg' id='supplierName' onChange={handleChange}/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password'onChange={handleChange} />
        <button disabled= { loading }className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80'>{loading ? 'loading ...' : 'Login'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an Account ? </p>
          <Link to = {"/register"}>
            <span className='text-blue-700'>Register</span>
          </Link>
        
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
  
}
