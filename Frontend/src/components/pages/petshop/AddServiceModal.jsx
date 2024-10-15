import React, { useState } from 'react'

const AddServiceModal = ({isOpen, onClose, onSubmit}) => {
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [serviceType, setServiceType] = useState('');


    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData();

        formData.append('serviceName', serviceName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('serviceType', serviceType);

        onSubmit(formData);
        onClose();
    };
    if(!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Service</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Service Name</label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded w-full p-2"
              rows="3"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div>
            <label className="block text-gray-700">Type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="border rounded w-full p-2"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="home">Home</option>
                  <option value="petshop">Shop</option>
                </select>
            </div>
          </div>
      
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default AddServiceModal
