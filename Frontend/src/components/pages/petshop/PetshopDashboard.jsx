import React, { useEffect, useState } from 'react';
import Sidebar from '../../sharedComponents/Sidebar';
import axiosInstance from '../../../utils/axiosInstance';
import usePetshopAuth from '../../../Authorization/usePetshopAuth';

const PetshopDashboard = () => {
    const isAuthorized = usePetshopAuth();
    const [productCount, setProductCount] = useState(0);
    const [serviceCount, setServiceCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthorized === true) {
            fetchCounts(); // Fetch both counts in one function
        }
    }, [isAuthorized]);

    const fetchCounts = async () => {
        setLoading(true);
        try {
            const [productResponse, serviceResponse] = await Promise.all([
                axiosInstance.get('/petshop/products/getAllProducts'),
                axiosInstance.get('/petshop/services/getallservices')
            ]);
              // console.log(productResponse.data)
              // console.log(serviceResponse.data)
            // Set product count
            setProductCount(productResponse.data.countProducts || 0);
            
            // Set service count
            setServiceCount(serviceResponse.data.serviceCount || 0);
        } catch (error) {
            console.log('Error while fetching the data', error);
        } finally {
            setLoading(false);
        }
    };

    // if (isAuthorized === null) {
    //     return <div>Loading ...</div>;
    // }

    if (isAuthorized === false) {
        return null; // Don't render anything if unauthorized
    }

    return (
        <div className="flex">
            {loading && <p>Loading the data...</p>}
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Petshop Dashboard</h1>
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-blue-100 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">Total Products</h2>
                        <p>{productCount}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">Total Services</h2>
                        <p>{serviceCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetshopDashboard;




// Promise.all(): Used to fetch both products and services concurrently.
// Combined useEffect: Now only one API call is made after authorization.
// Improved Loading State: Only one loading state for both API calls.
// This should improve the performance and avoid redundant state updates or API calls.