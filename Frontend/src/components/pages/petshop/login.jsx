import React, { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance'; // Adjust the path according to your project structure
import Cookies from 'js-cookie'; // Import js-cookie to manage cookies

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); // Optional: Add role selection

    const fetchLogin = async () => {
        try {
            const response = await axiosInstance.post('/user/login', { email, password, role });
            console.log(response.data.message);

            // Assuming the response contains the userId, set the cookie here
            Cookies.set('userId', response.data.userId, { expires: 7 }); // Store userId in cookie for 7 days
            console.log('User ID set in cookie:', response.data.userId);

            // You can redirect the user or perform additional actions here
        } catch (error) {
            if (error.response) {
                console.log('Error response data:', error.response.data);
                console.log('Error response status:', error.response.status);
                // Display an appropriate message to the user
                alert(error.response.data.message || 'An error occurred. Please try again.');
            } else if (error.request) {
                console.log('Error request:', error.request);
            } else {
                console.log('Error message:', error.message);
            }
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        fetchLogin();
    };

    return (
        <div className='login'>
            <h1 className='text-bold text-center'>Login</h1>
            <form className='w-4/5'>
                <input 
                    type="text" 
                    placeholder='email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="customer">Customer</option>
                    <option value="petShop">Pet Shop</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="bg-lime-600 text-white p-3" onClick={handleClick}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
