import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";



const usePetshopAuth = ()=>{
    const [isAuthorized, setIsAuthorized] = useState(null)
        const navigate = useNavigate();

        useEffect(()=>{
            const petshopAuthorization = async ()=>{
                try {
    
                    const res = await axiosInstance.get('/petshop/authorize');
                    if(res.status === 200 && res.data.message === 'Authorized petshop'){
                        setIsAuthorized(true);
                       
                    }
                    else{
                        setIsAuthorized(false);
                        navigate('/user/login')
                    }
                 
                    
                } catch (error) {
                    setIsAuthorized(false)
                    if (error.response && error.response.status === 401) {
                        console.error("Unauthorized access, redirecting to login...");
                        navigate('/user/login'); // Redirect to login page if not authorized
                    } else {
                        console.error("Error during authorization:", error);
                    }
                    
                }
            };
             petshopAuthorization();
        }, [navigate])

        return isAuthorized;
}

export default usePetshopAuth;