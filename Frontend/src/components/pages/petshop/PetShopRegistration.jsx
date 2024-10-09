import React, { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import Cookies from 'js-cookie';

const PetShopRegistration = () => {
    const [shopName, setShopName] = useState('');
    const [contact, setContact] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [bankDetails, setBankDetails] = useState({ ifscCode: '', accountNumber: '', bankName: '' });
    const [aadharCard, setAadharCard] = useState(null);

    const handleFileChange = (e) => {
        setAadharCard(e.target.files[0]);
    };

    const handleBankDetailsChange = (e) => {
        setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const ownerId = Cookies.get('userId');
        if (!ownerId) {
            console.error("Owner ID is missing");
            return;
        }

        const formData = new FormData();
        formData.append('shopName', shopName);
        formData.append('ownerId', ownerId);
        formData.append('contact', contact);
        formData.append('shopAddress', shopAddress);
        formData.append('bankDetails[ifscCode]', bankDetails.ifscCode);
        formData.append('bankDetails[accountNumber]', bankDetails.accountNumber);
        formData.append('bankDetails[bankName]', bankDetails.bankName);
        formData.append('aadharCard', aadharCard);

        try {
            const res = await axiosInstance.post('/petshop/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data.message);
        } catch (error) {
            console.error('Error registering pet shop:', error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100 p-4'>
            <h1 className='text-2xl font-bold mb-6'>Register Pet Shop</h1>
            <form onSubmit={handleRegister} className='bg-white shadow-md rounded-lg p-8 w-full max-w-sm'>
                <input
                    type='text'
                    placeholder='Shop Name'
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    required
                    className='block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200'
                />
                <input
                    type='text'
                    placeholder='Contact'
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                    className='block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200'
                />
                <input
                    type='text'
                    placeholder='Shop Address'
                    value={shopAddress}
                    onChange={(e) => setShopAddress(e.target.value)}
                    required
                    className='block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200'
                />
                <input
                    type='text'
                    placeholder='IFSC Code'
                    name='ifscCode'
                    value={bankDetails.ifscCode}
                    onChange={handleBankDetailsChange}
                    required
                    className='block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200'
                />
                <input
                    type='text'
                    placeholder='Account Number'
                    name='accountNumber'
                    value={bankDetails.accountNumber}
                    onChange={handleBankDetailsChange}
                    required
                    className='block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200'
                />
                <input
                    type='text'
                    placeholder='Bank Name'
                    name='bankName'
                    value={bankDetails.bankName}
                    onChange={handleBankDetailsChange}
                    required
                    className='block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200'
                />
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    required
                    className='block w-full mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200'
                />
                <button type='submit' className='w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-300'>
                    Register
                </button>
            </form>
        </div>
    );
};

export default PetShopRegistration;
