import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi'; // Menu icon for mobile toggle
import axiosInstance from '../../utils/axiosInstance';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar in mobile
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axiosInstance.get('petshop/logout');
            if (res.data.message === 'Logout Successfully!') {
                navigate('/user/login'); // Redirect to login page after logout
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='relative'>
            {/* Mobile menu button */}
            <button className="lg:hidden p-2 m-2 text-white bg-teal-600 rounded-md focus:outline-none" onClick={toggleSidebar}>
                <FiMenu size={24} />
            </button>

            {/* Overlay for mobile when sidebar is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 lg:hidden"
                    onClick={toggleSidebar} // Clicking outside closes the sidebar
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed lg:static top-0 left-0 h-screen w-64 bg-teal-600 text-white p-6 transform lg:translate-x-0 transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <h2 className='text-xl font-bold mb-8 text-center lg:text-left'>
                    Petshop Menu
                </h2>
                <nav className='flex flex-col space-y-4'>
                    <Link to='/petshop/dashboard' className='hover:bg-orange-400 p-3 rounded-md transition-colors duration-200'>
                        Dashboard
                    </Link>
                    <Link to='/petshop/products' className='hover:bg-orange-400 p-3 rounded-md transition-colors duration-200'>
                        Products
                    </Link>
                    <Link to='/petshop/services' className='hover:bg-orange-400 p-3 rounded-md transition-colors duration-200'>
                        Services
                    </Link>
                </nav>

                <div className="mt-8 border-t border-white pt-4">
                    <button className='hover:bg-orange-400 p-3 w-full rounded-md transition-colors duration-200' onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
