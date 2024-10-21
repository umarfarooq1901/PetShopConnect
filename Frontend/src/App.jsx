import { BrowserRouter, Routes, Route } from "react-router-dom";
import PetshopDashboard from "./components/pages/petshop/PetshopDashboard";
import Signup from "./components/sharedComponents/Signup";
import Login from "./components/sharedComponents/login";
import PetShopRegistration from "./components/pages/petshop/PetShopRegistration";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import NoPage from "./components/sharedComponents/NoPage";
import Products from "./components/pages/petshop/Products";
import Services from "./components/pages/petshop/Services";
import AdminProducts from "./components/pages/admin/AdminProducts";
import AdminServices from "./components/pages/admin/AdminServices";
import AdminCustomers from "./components/pages/admin/AdminCustomers";


function App() {
  return (
      <BrowserRouter >
      
          <Routes>
            <Route path = '*' element = {<NoPage/>}/>
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element = {<AdminDashboard/>}/>
            <Route path="/admin/products" element = {<AdminProducts/>}/>
            <Route path = '/admin/services' element = {<AdminServices/>}/>
            <Route path = '/admin/customers' element = {<AdminCustomers/>}/>


            {/* user login/signup routes */}
            <Route path="/user/signup" element= {<Signup/>}/>
            <Route path="/user/login" element= {<Login/>}/>

            {/* Petshop routes */}
            <Route path="/petshop/register" element= {<PetShopRegistration/>}/>
            <Route path="/petshop/dashboard" element = {<PetshopDashboard/>}/>
            <Route path="/petshop/products" element = {<Products/>}/>
            <Route path="/petshop/services" element = {<Services/>}/>

    
          </Routes>
      </BrowserRouter>
  );
}


export default App
