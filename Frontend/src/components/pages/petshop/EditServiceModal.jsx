import React, { useEffect, useState } from 'react'

const EditServiceModal = ({isOpen, onClose, service, onSubmit}) => {

        const [formData, setFormData] = useState({
            serviceName: '',
            description: '',
            price: '',
            serviceType: '',
        })

        useEffect(()=>{
                if(service){
                    setFormData({
                        serviceName: service.serviceName || '',
                        description: service.description || '',
                        price: service.price || '',
                        serviceType: service.serviceType || '',


                    });
                }
        }, [service])


        const handleChange = (e)=>{
           const {name, value} = e.target;
           setFormData((prevData)=> ({...prevData, [name]: value,}));
        }


        const handleSubmit = (e)=>{
            e.preventDefault();
            onSubmit(formData)
        }

        if(!isOpen) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4">
                <h2 className="text-xl font-bold mb-4">Edit Service</h2>
                <form onSubmit={handleSubmit}>
                    <label className='block text-gray-700'>Service Name</label>
                    <input type="text" className='border rounded w-full p-2' value={formData.serviceName} name='serviceName' onChange={handleChange} />
                    <div className="mb-4">
                        <label className='block text-gray-700'>Description</label>
                        <textarea rows='3' className='border rounded w-full p-2' name="description" value={formData.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700">Price</label>
                            <input type="text" value={formData.price} name='price' onChange={handleChange} className='border rounded w-full p-2' />
                        </div>

                        <div>
                            <label className="block text-gray-700">Type</label>
                            <select
                             value={formData.serviceType}
                             onChange={handleChange}
                             className="border rounded w-full p-2"
                             name='serviceType'>
                  <option value="">Select Type</option>
                  <option value="home">Home</option>
                  <option value="petshop">Shop</option>
                </select>
                        </div>
                    </div>
                    <button type="submit" className="bg-teal-600 text-white rounded px-3 py-2 mt-4">
                            Update Service
                        </button>
                    </form>
                    <button onClick={onClose} className="text-red-600 mt-4">Cancel</button>

      </div>
        </div>
      
    </div>
  )
}

export default EditServiceModal
