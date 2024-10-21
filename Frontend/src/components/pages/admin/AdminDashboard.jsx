import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import useAdminAuth from "../../../Authorization/useAdminAuth";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";




const AdminDashboard = () => {
  const isAuthorized = useAdminAuth();  // Get the authorization status
  const [allPetshops, setAllPetshops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionOccurred, setActionOccurred] = useState(false);  // Track action
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized === true) {  // Only fetch pet shops if authorized
      getAllPetshops();
    }
  }, [isAuthorized, actionOccurred]);  // Re-fetch when action occurs

  const getAllPetshops = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/getAllpetshops");
      setAllPetshops(res.data.petshops || []);  // Use fallback to avoid null
    } catch (error) {
      console.error(error);
      setError("Error fetching pet shop details");
    } finally {
      setLoading(false);
    }
  };

  const acceptVerification = async (petshopId) => {
    try {
      await axiosInstance.put(`admin/verify-petshop/${petshopId}`);
      setActionOccurred((prev) => !prev);  // Toggle actionOccurred to trigger re-fetch
    } catch (error) {
      console.error(error);
    }
  };

  const rejectVerification = async (petshopId) => {
    try {
      await axiosInstance.delete(`admin/reject-petshop/${petshopId}`);
      setActionOccurred((prev) => !prev);  // Toggle actionOccurred to trigger re-fetch
    } catch (error) {
      console.error(error);
    }
  };



  // While checking for authorization, display a loading screen or message
  if (isAuthorized === null) {
    return <div>Loading...</div>;  // Show loading while authorization is being checked
  }

  // If not authorized, nothing will render since they are redirected in the hook
  if (isAuthorized === false) {
    return null;  // Don't render anything if unauthorized
  }

  return (
    <div className="flex">
    <AdminSideBar/>
    <div className="flex-1 p-8 ml-64 mt-20">    {/* md:ml-72 */}
 
  
      <h1 className="text-xl font-bold mb-4 text-center">Admin Dashboard</h1>

      <button
        onClick={getAllPetshops}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Refresh Pet Shops
      </button>
      <div className="logout-main">
    
      </div>

      {loading && <p>Loading pet shops...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <h2 className="text-lg font-semibold mb-2">All Pet Shops</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Shop Name</th>
              <th className="py-2 px-4 border-b">Bank Details</th>
              <th className="py-2 px-4 border-b">Contact</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Verified</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(allPetshops) && allPetshops.length > 0 ? (
              allPetshops.map((petshop) => (
                <tr key={petshop._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{petshop.shopName}</td>
                  <td className="py-2 px-4 border-b">
                    {petshop.bankDetails.accountNumber} <br />
                    {petshop.bankDetails.bankName} <br />
                    {petshop.bankDetails.ifscCode}
                  </td>
                  <td className="py-2 px-4 border-b">{petshop.contact}</td>
                  <td className="py-2 px-4 border-b">{petshop.shopAddress}</td>
                  <td className="py-2 px-4 border-b">
                    {petshop.isVerified ? "True" : "False"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                      onClick={() => acceptVerification(petshop._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded"
                      onClick={() => rejectVerification(petshop._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-2 px-4 text-center">
                  No pet shops available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
