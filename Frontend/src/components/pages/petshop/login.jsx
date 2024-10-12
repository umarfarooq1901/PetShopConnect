import React, { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance'; // Adjust the path according to your project structure
import Cookies from 'js-cookie'; // Import js-cookie to manage cookies
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const fetchLogin = async () => {
        setIsLoading(true); // Set loading to true
        try {
            const response = await axiosInstance.post('/user/login', { email, password });
            console.log(response.data.message);

            if (response.data.message === "Login Successfully!") {
                setMessage("Login Successfully!");
                setIsSuccess(true);
                
                Cookies.set('userId', response.data.userId, { expires: 7 });
                const token = response.data.createToken;
                
                if (response.data.role === 'petshop') {
                    Cookies.set('petshopToken', token, { expires: 7 });
                    navigate('/petshop/dashboard');
                } else {
                    Cookies.set('authToken', token, { expires: 7 });
                    if (response.data.role === 'admin') {
                        navigate('/admin/dashboard');
                    } else {
                        navigate('/');
                    }
                }
            } else {
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
        } finally {
            setIsLoading(false); // Set loading to false regardless of success or failure
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
                    <button 
                        type="submit" 
                        className={`w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading} // Disable button when loading
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
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
