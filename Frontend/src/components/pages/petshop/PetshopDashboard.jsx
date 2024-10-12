import React, { useEffect, useState } from 'react';
import Sidebar from '../../sharedComponents/Sidebar';
import axiosInstance from '../../../utils/axiosInstance';
import usePetshopAuth from '../../../Authorization/usePetshopAuth';

const PetshopDashboard = () => {
    const isAuthorized = usePetshopAuth();
    const [productCount, setProductCount] = useState(0);
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        // Call the authorization function when the component mounts
     if(isAuthorized === true){
        fetchProductCount();
     }      // After authorization, fetch the product count
    
   }, [isAuthorized])

    const fetchProductCount = async()=>{
        setLoading(true)
        try {
            const response = await axiosInstance.get('/petshop/products/getAllProducts');

            if (response.data.message === 'No products available!') {
                setProductCount(response.data.countProducts);
                
              } else {
                setProductCount(response.data.countProducts);
                console.log(response.data);  // Set the product count or other data
              }
          } catch (error) {
                console.log('Error while fetching the data', error)
            }
            finally{
                setLoading(false)
            }

       
    }


    if(isAuthorized === null){
        return <div>Loading ...</div>
    }

    if(isAuthorized === false){
        return null;   // Don't render anything if unauthorized
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
            <p>5 {/* Replace with actual service count */}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetshopDashboard;



// <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//   <div class="bg-blue-100 p-4">Item 1</div>
//   <div class="bg-green-100 p-4">Item 2</div>
//   <div class="bg-red-100 p-4">Item 3</div>
//   <div class="bg-yellow-100 p-4">Item 4</div>
// </div>
