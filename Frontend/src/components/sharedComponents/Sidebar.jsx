import React from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
      
    const handleLogout = async ()=>{
        try {
            const res = await axiosInstance.get('petshop/logout');
            if (res.data.message === 'Logout Successfully!') {
                navigate('/user/login');  // Redirect to login page after logout
              }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
  return (
    <div className='w-1/4 bg-teal-600 text-white h-screen p-4'>
      <h2 className='text-lg font-bold mb-6'>
        Petshop Menu
      </h2>
      <nav className='flex flex-col space y-4'>
        <Link to = '/petshop/dashboard' className='hover:bg-orange-300 p-2 rounded'>Dashboard</Link>
        <Link to = '/petshop/products' className='hover:bg-orange-300 p-2 rounded'>Products</Link>
        <Link to = '/petshop/services' className='hover:bg-orange-300 p-2 rounded'>Services</Link>

      </nav>

      <div className="logout-container">
            <button className='hover:bg-orange-300 p-2 rounded' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar
