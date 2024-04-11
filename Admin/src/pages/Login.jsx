import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/admin/aminSlice';

export default function Login() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.admin);
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value,});
};
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(loginStart());
            const res = await fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(loginFailure(data.message));
        return;
      }
      dispatch(loginSuccess(data));
      navigate('/');
    } catch (error) {
        dispatch(loginFailure(error.message));
      }
    };
    return (
        <div className="bg-gray-900 min-h-screen flex  flex-row items-center">
            <div className="header bg-indigo-900 w-2/4 h-16 flex items-center justify-center mr-0 ">
                <h1 className="text-white text-lg ml-96">Chaminda WMS</h1>
                <img src="https://storage.googleapis.com/figment-image-store/careful-adult-q0vs_138:756.png" alt="store image" className="w-12 h-12 ml-10" />
            </div>
            <div className="login-form p-8 w-96 mt-20 mr-8">
                <h1 className="text-2xl font-bold mb-8 text-white">Admin Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Admin Name" id="name" className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md" onChange={handleChange} />
                    <input type="password" placeholder="Password" id="password" className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md" onChange={handleChange} />
                    <button disabled={loading} type="submit" className="w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-indigo-800 transition duration-300">{loading ? 'Loading...' : 'Login'}</button>
                </form>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    );
};


