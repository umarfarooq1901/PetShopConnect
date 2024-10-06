import React from 'react';
import Sidebar from '../../sharedComponents/Sidebar';

const PetshopDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Petshop Dashboard</h1>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Total Products</h2>
            <p>10 {/* Replace with actual product count */}</p>
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
