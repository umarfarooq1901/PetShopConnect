import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import usePetshopAuth from '../../../Authorization/usePetshopAuth';
import Sidebar from '../../sharedComponents/Sidebar';
import ServiceTable from './ServiceTable';
import AddServiceModal from './AddServiceModal';
import EditServiceModal from './EditServiceModal';

const Services = () => {
  const isAuthorized = usePetshopAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [editService, setEditService] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthorized === true) {
      fetchServices();
    }
  }, [isAuthorized]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const serviceResponse = await axiosInstance.get('/petshop/services/getallservices');
      setServices(serviceResponse.data.services);
    } catch (error) {
      console.log('Error while fetching the services', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (serviceData) => {
    setLoading(true); // Set loading state while adding the service
    try {
      const response = await axiosInstance.post('/petshop/services/addService', serviceData);
      const newService = response.data.services; // Ensure the response structure is correct

      // Add the new service to the existing state
      setServices((prevServices) => [...prevServices, newService]);
      setIsModalOpen(false); // Close the modal after adding the service
    } catch (error) {
      console.log('Error while adding the service', error.response.data);
    } finally {
      setLoading(false); // Reset loading state after operation
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const deleteService = await axiosInstance.delete(`/petshop/services/deleteService/${serviceId}`);
      if (deleteService.data.message === "Service deleted successfully!") {
        setServices((prevServices) => prevServices.filter(service => service._id !== serviceId));
      } else {
        console.log('Failed to delete the service:', deleteService.data.message);
      }
    } catch (error) {
      console.log('Error while deleting the service', error.response.data);
    }
  };


  const handleEditService = async(serviceData)=>{

    try {
      const response = await axiosInstance.put(`/petshop/services/updateService/${editService._id}`, serviceData);
      setServices((prevServices)=>prevServices.map(service=> service._id === editService._id ? response.data.updateService : service));
      setEditModalOpen(false);
      setEditService(null); // Reset current product
      
    } catch (error) {
      console.log('Error while editing the service', error);
    }
  }

  const openEditModal = (service)=>{
    setEditService(service);
    setEditModalOpen(true);
  }

  // if (isAuthorized === null) {
  //   return <div>Loading ...</div>;
  // }

  if (isAuthorized === false) {
    return null; // Don't render anything if unauthorized
  }

  return (
    <div className="flex lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6"> {/* Ensuring main content is pushed when sidebar is open */}
        {/* {loading && <p>Loading the services...</p>} */}
        <h1 className="text-2xl font-bold mb-4 text-center">Services</h1>
        
        <button
          className='bg-teal-600 text-white rounded px-3 py-2 mb-4 hover:bg-teal-400 cursor-pointer'
          onClick={() => setIsModalOpen(true)} // Open the modal
        >
          Add Service
        </button>

        <div className="list-services">
          <ServiceTable services={services} handleDeleteService={handleDeleteService} handleEditService = {openEditModal} />
        </div>
      </div>
      <AddServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddService}
      />

      <EditServiceModal
          isOpen = {editModalOpen}
          onClose = {()=>setEditModalOpen(false)}
          service = {editService}
          onSubmit = {handleEditService}
      />
    </div>
  );
};

export default Services;
