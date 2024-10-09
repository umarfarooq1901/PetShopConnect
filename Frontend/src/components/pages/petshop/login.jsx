import React, { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance'; // Adjust the path according to your project structure
import Cookies from 'js-cookie'; // Import js-cookie to manage cookies
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(null);
    const navigate = useNavigate();

    const fetchLogin = async () => {
        try {
            const response = await axiosInstance.post('/user/login', { email, password });
            console.log(response.data.message);

            // Check if login is successful
            if (response.data.message === "Login Successfully!") {
                setMessage("Login Successfully!");
                setIsSuccess(true);

                // Set the userId and authToken in cookies
                Cookies.set('userId', response.data.userId, { expires: 7 }); // Store userId in cookie for 7 days
                Cookies.set('authToken', response.data.authToken, { expires: 7 }); // Store authToken in cookie for 7 days
                // console.log('User ID and Auth Token set in cookies:', response.data.userId, response.data.authToken);

                // Role-based navigation
                if (response.data.role === 'admin') {
                    navigate('/admin/dashboard'); // Navigate to admin dashboard
                } else if (response.data.role === 'petshop') {
                    navigate('/petshop/dashboard'); // Navigate to pet shop dashboard
                } else if (response.data.role === 'customer') {
                    navigate('/'); // Navigate to home page
                }
            } else {
                // Handle other messages from the server
                setMessage(response.data.message);
                setIsSuccess(false);
            }
        } catch (error) {
            setIsSuccess(false);
            if (error.response) {
                setMessage(error.response.data.message || 'An error occurred. Please try again.');
            } else if (error.request) {
                setMessage('No response from the server. Please try again.');
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        fetchLogin();
    };

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100 p-4'>
            <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-sm'>
                <h1 className='text-2xl font-bold text-center mb-6'>Login</h1>
                <form className='space-y-4' onSubmit={handleClick}>
                    <input 
                        type="text" 
                        placeholder='Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                        className='block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200'
                    />
                    <input 
                        type="password" 
                        placeholder='Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                        className='block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200'
                    />
                    <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-300">
                        Login
                    </button>
                </form>

                {message && (
                    <p className={`mt-3 p-4 font-bold text-white rounded-md ${isSuccess ? 'bg-green-600' : 'bg-red-600'}`}>{message}</p>
                )}
            </div>
        </div>
    );
};

export default Login;
