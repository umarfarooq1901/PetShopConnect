import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useState, useEffect } from "react";

const useAdminAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authorize = async () => {
      try {
        const res = await axiosInstance.get('/admin/authorize');
        if (res.status === 200 && res.data.message === 'Authorized as Admin!') {
          setIsAuthorized(true);  // Admin is authorized
        } else {
          setIsAuthorized(false);  // Admin is not authorized
          navigate('/user/login');  // Redirect to login if unauthorized
        }
      } catch (error) {
        setIsAuthorized(false);  // Set unauthorized on error
        if (error.response && error.response.status === 401) {
          navigate('/user/login');  // Redirect on unauthorized error
        } else {
          console.error("Authorization error:", error);
        }
      }
    };

    authorize();  // Call the authorization function
  }, [navigate]);

  return isAuthorized;  // Return the authorization status
};

export default useAdminAuth;
