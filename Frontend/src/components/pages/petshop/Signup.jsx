import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../utils/axiosInstance'

const Signup = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [contact, setContact] = useState();
    const [address, setAddress] = useState();


    const fetchSignup = async () => {
        try {
            const response = await axiosInstance.post('/user/signup', { username, email, password, contact, address });
            console.log(response.data.message);
        } catch (error) {
            if (error.response) {
                // Log the server response details
                console.log('Error response data:', error.response.data);
                console.log('Error response status:', error.response.status);
                console.log('Error response headers:', error.response.headers);
            } else if (error.request) {
                // Log the request details
                console.log('Error request:', error.request);
            } else {
                // Log any other error messages
                console.log('Error message:', error.message);
            }
        }
    };
    

  const handleClick = (e) => {
    e.preventDefault();
    console.log({ username, email, password, contact, address }); // Log the values
    fetchSignup();
};


 
  return (
    <div className='signup'>
      <h1 className='text-bold text-center'>Signup</h1>
      <div className="form-main">
        <form className='w-4/5'>
            <input type="text" placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='password'value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <input type="text" placeholder='contact' value={contact} onChange={(e)=>setContact(e.target.value)} />
            <input type="text" placeholder='address'value={address} onChange={(e)=>setAddress(e.target.value)}/>
        </form>
        <div className="button">
        <button type="submit" className="bg-lime-600 text-white p-3" onClick={handleClick}>
                  Signup
                </button>
        </div>
      </div>
    </div>
  )
}

export default Signup
