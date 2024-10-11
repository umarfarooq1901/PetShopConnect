import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [allPetshops, setAllPetshops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionOccurred, setActionOccurred] = useState(false); // Track action
  const navigate = useNavigate();

  // get all petshops
  useEffect(() => {
    getAllPetshops();
  }, [actionOccurred]); // Re-fetch pet shops when action occurs

  const getAllPetshops = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/getAllpetshops");
      console.log(res.data); // Log the full response for debugging
      setAllPetshops(res.data.petshops || []); // Use an empty array as a fallback
    } catch (error) {
      console.log(error);
      setError("Error fetching pet shop details");
    } finally {
      setLoading(false);
    }
  };

  const acceptVerification = async (petshopId) => {
    try {
      const res = await axiosInstance.put(`admin/verify-petshop/${petshopId}`);
      console.log(res.data);
      setActionOccurred((prev) => !prev); // Toggle actionOccurred to trigger re-fetch
    } catch (error) {
      console.log(error);
    }
  };

  const rejectVerification = async (petshopId) => {
    try {
      const res = await axiosInstance.delete(`admin/reject-petshop/${petshopId}`);
      console.log(res.data);
      setActionOccurred((prev) => !prev); // Toggle actionOccurred to trigger re-fetch
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = (petshopId) => {
    acceptVerification(petshopId);
  };

  const handleReject = (petshopId) => {
    rejectVerification(petshopId);
  };

  const handleRefresh = () => {
    getAllPetshops();
  };

  const handleLogout = async () => {
    const logOutRes = await axiosInstance.get('user/logout');

    if(logOutRes.data.message === 'Logout Successfully!'){

        navigate('/user/login')
    }



  
 
    // window.location.href = '/user/login'; // Redirect to login page
  };

  return (
    <div className="dashboard-main border">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>


      <button
        onClick={handleRefresh}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Refresh Pet Shops
      </button>
      <div className="logout-main">
        <button className="bg-emerald-700 text-white px-4 rounded py-2 hover:bg-emerald-600 " onClick={handleLogout}>Logout</button>
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
                      onClick={() => handleAccept(petshop._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded"
                      onClick={() => handleReject(petshop._id)}
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
  );
};

export default AdminDashboard;
