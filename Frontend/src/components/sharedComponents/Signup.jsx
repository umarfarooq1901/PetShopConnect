import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [contact, setContact] = useState();
    const [address, setAddress] = useState();
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(null); // To manage success or error

    const navigate = useNavigate();


    const fetchSignup = async () => {
        try {
            const response = await axiosInstance.post('/user/signup', { username, email, password, contact, address });
            console.log(response.data.message);
            if (response.data.message === 'User Created Successfully!') {
                setMessage('User Created Successfully!');
                setIsSuccess(true); // Set success state
                // Optionally, redirect after a short delay
                setTimeout(() => {
                    navigate('/user/login');
                }, 3000);
                
            }     
            
            else if (response.data.message === 'All Data Fields Are Required!') {
                setMessage('All Data Fields Are Required!');
                setIsSuccess(false); // Set error state
            }
            
            
            else if (response.data.message === 'User Already Registered!') {
                setMessage('User Already Registered!');
                setIsSuccess(false); // Set error state
            }
            else if (response.data.message === 'Admin registration not allowed!') {
                setMessage('Admin registration not allowed!');
                setIsSuccess(false); // Set error state
            }

        
        } catch (error) {
            setIsSuccess(false);
            setMessage('An error occurred. Please try again.');
            if (error.response) {
                console.log('Error response data:', error.response.data);
          
            } else if (error.request) {
                console.log('Error request:', error.request);
            } else {
                console.log('Error message:', error.message);
            }
        }
    };
    

  const handleClick = (e) => {
    e.preventDefault();
    fetchSignup();
};


 
  return (
<div className='flex items-center justify-center h-screen bg-gray-100 p-4'>
    <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-2xl font-bold text-center mb-6'>Signup</h1>
        <div className="form-main">
            <form className='space-y-4'>
                <input 
                    type="text" 
                    placeholder='Username' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className='block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200'
                    required 
                />
                <input 
                    type="text" 
                    placeholder='Email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className='block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200'
                    required 
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className='block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200'
                    required 
                />
                <input 
                    type="text" 
                    placeholder='Contact' 
                    value={contact} 
                    onChange={(e) => setContact(e.target.value)} 
                    className='block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200'
                    required 
                />
                <input 
                    type="text" 
                    placeholder='Address' 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    className='block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200'
                    required 
                />
            </form>
            <div className="mt-6">
                <button 
                    type="submit" 
                    className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-300"
                    onClick={handleClick}
                >
                    Signup
                </button>
                {message && (
                     <p className={`mt-3 p-4 font-bold text-white rounded-md ${isSuccess ? 'bg-green-600' : 'bg-red-600' }`}>
                     {message}
                 </p>
                )}
                        
            
            </div>
        </div>
    </div>
</div>

  )
}

export default Signup
