import { BrowserRouter, Routes, Route } from "react-router-dom";
import PetshopDashboard from "./components/pages/petshop/PetshopDashboard";


function App() {
  return (
      <BrowserRouter >
      
          <Routes>
              <Route path="/petshop/dashboard" element = {<PetshopDashboard/>}/>
    
          </Routes>
      </BrowserRouter>
  );
}


export default App
