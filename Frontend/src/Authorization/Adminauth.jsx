import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Adminauth = ()=>{
    const navigate = useNavigate();


    const Adminauthorization = async ()=>{
            try {

                const res = await axiosInstance.get('/petshop/authorize');
                 // If authorized, you can access user info here
                console.log(res.data.petshop)
                
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error("Unauthorized access, redirecting to login...");
                    navigate('/login'); // Redirect to login page if not authorized
                } else {
                    console.error("Error during authorization:", error);
                }
                
            }
    }

    return Adminauthorization
}


export default Adminauth