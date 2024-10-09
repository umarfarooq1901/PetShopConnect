import { BrowserRouter, Routes, Route } from "react-router-dom";
import PetshopDashboard from "./components/pages/petshop/PetshopDashboard";
import Signup from "./components/pages/petshop/Signup";
import Login from "./components/pages/petshop/login";
import PetShopRegistration from "./components/pages/petshop/PetShopRegistration";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import NoPage from "./components/sharedComponents/NoPage";


function App() {
  return (
      <BrowserRouter >
      
          <Routes>
            <Route path = '*' element = {<NoPage/>}/>
            <Route path="/user/signup" element= {<Signup/>}/>
            <Route path="/user/login" element= {<Login/>}/>
            <Route path="/petshop/register" element= {<PetShopRegistration/>}/>
              <Route path="/petshop/dashboard" element = {<PetshopDashboard/>}/>
              <Route path="/admin/dashboard" element = {<AdminDashboard/>}/>

    
          </Routes>
      </BrowserRouter>
  );
}


export default App
