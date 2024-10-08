import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";



const Petshopauth = ()=>{
        const navigate = useNavigate();

        const petshopAuthorization = async ()=>{
            try {

                const res = await axiosInstance.get('/petshop/authorize');
                 // If authorized, you can access user info here
                console.log(res.data.petshop)
                
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error("Unauthorized access, redirecting to login...");
                    navigate('/user/login'); // Redirect to login page if not authorized
                } else {
                    console.error("Error during authorization:", error);
                }
                
            }
        }

        return petshopAuthorization
}

export default Petshopauth