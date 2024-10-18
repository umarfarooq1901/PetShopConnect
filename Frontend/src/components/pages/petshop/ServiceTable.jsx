import React from 'react'

const ServiceTable = ({ services, handleDeleteService }) => {
  if (!services || services.length === 0) {
      return <p className="text-center text-gray-500">No services available.</p>;
  }

  return (
      <div className="overflow-x-auto shadow-lg sm:rounded-lg">
          <table className="min-w-full bg-white border-collapse">
              <thead className="bg-teal-600 text-white">
                  <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Service Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Service Type</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Edit</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Delete</th>
                  </tr>
              </thead>
              <tbody className="bg-gray-50 divide-y divide-gray-200">
                  {services.map((service, index) => (
                      // Add a check to ensure 'service' is not undefined
                      service && (
                          <tr key={service._id || index} className="hover:bg-gray-100">
                              <td className="px-4 py-2 text-sm text-gray-700">{service.serviceName}</td>
                              <td className="px-4 py-2 text-sm text-gray-700 whitespace-normal">{service.description}</td>
                              <td className="px-4 py-2 text-sm text-gray-700">{service.price}</td>
                              <td className="px-4 py-2 text-sm text-gray-700">{service.serviceType}</td>
                              <td className="px-4 py-2 text-sm"><button className='bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500'>Edit</button></td>
                              <td className="px-4 py-2 text-sm"><button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400' onClick={()=>handleDeleteService(service._id)}>Delete</button></td>
            </tr>
                      )
                  ))}
              </tbody>
          </table>
      </div>
  );
};


export default ServiceTable
