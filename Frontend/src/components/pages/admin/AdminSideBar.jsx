import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdMiscellaneousServices } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";

const AdminSideBar = () => {
  const [isOpen, setIsOpen] = useState(true); // State to control sidebar
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      const logOutRes = await axiosInstance.get('user/logout');
      if (logOutRes.data.message === 'Logout Successfully!') {
        navigate('/user/login'); // Redirect to login page after logout
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="fixed right-4 top-4">
      {/* Toggle Button */}
      <button
        className="bg-orange-600 text-white p-2 text-2xl rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoClose /> : <RxHamburgerMenu />}
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 h-full fixed left-0 top-0 bg-slate-300 p-5 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <aside>
          <h2 className="font-bold text-2xl text-center">Welcome to Pet Connect</h2>

          <nav className="flex flex-col mt-8 space-y-4 border-2 border-black p-12">
            <Link className='flex items-center' to="/admin/products"><MdOutlineProductionQuantityLimits /><span className='ml-1'>Products</span></Link>
            <Link className='flex items-center' to="/admin/services"><MdMiscellaneousServices /><span className='ml-1'>Services</span></Link>
            <Link className='flex items-center' to="/admin/customers"><FaPerson /><span className='ml-1'>Customers</span></Link>
          </nav>
        </aside>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 w-full border-t-2 p-4 border-gray-400">
          <button
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
