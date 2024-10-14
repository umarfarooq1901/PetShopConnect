import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import usePetshopAuth from '../../../Authorization/usePetshopAuth';
import Sidebar from '../../sharedComponents/Sidebar';
import ServiceTable from './ServiceTable';

const Services = () => {
  const isAuthorized = usePetshopAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    if (isAuthorized === true) {
      fetchServices();
    }
  }, [isAuthorized]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const serviceResponse = await axiosInstance.get('/petshop/services/getallservices');
      console.log(serviceResponse.data);
      setServices(serviceResponse.data.services);
    } catch (error) {
      console.log('Error while fetching the services', error);
    } finally {
      setLoading(false);
    }
  };

  // if (isAuthorized === null) {
  //   return <div>Loading ...</div>;
  // }

  if (isAuthorized === false) {
    return null; // Don't render anything if unauthorized
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 lg:ml-64"> {/* Ensuring main content is pushed when sidebar is open */}
        {/* {loading && <p>Loading the services...</p>} */}
        
        <h1 className="text-2xl font-bold mb-4 text-center">Services</h1>
        
        <button
          className='bg-teal-600 text-white rounded px-3 py-2 mb-4 hover:bg-teal-400 cursor-pointer'
          onClick={() => setIsModalOpen(true)} // Open the modal
        >
          Add Service
        </button>

        <div className="list-services">
          <ServiceTable services={services} />
        </div>
      </div>
    </div>
  );
};

export default Services;


{/* <AddProductModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)} // Close the modal
    onSubmit={handleAddProduct} // Pass the add product function
/> */}