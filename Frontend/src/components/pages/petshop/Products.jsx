import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../utils/axiosInstance';
import usePetshopAuth from '../../../Authorization/usePetshopAuth';
import Sidebar from '../../sharedComponents/Sidebar';
import Card from '../../sharedComponents/ProductCard';
import ProductTable from '../../sharedComponents/ProductTable';
import AddProductModal from './AddProductModal';

const Products = () => {
    const isAuthorized = usePetshopAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility


        useEffect(()=>{
            if(isAuthorized === true){

                fetchProducts();
            }
        }, [isAuthorized])

        const fetchProducts = async()=>{
        setLoading(true)
        try {
            const response = await axiosInstance.get('/petshop/products/getAllProducts');
            setProducts(response.data.products);
        } catch (error) {
            setLoading(false)
            console.log('Error while fetching the products', error);
            
        }
        finally{
            setLoading(false)
        }
    }

    const handleAddProduct = async (productData) => {
        try {
            const res = await axiosInstance.post('/petshop/products/addProduct', productData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Product added successfully:', res.data);
            setProducts((prevProducts) => [...prevProducts, res.data.product]); // Update the state with the new product
        } catch (error) {
            console.log('Error while adding the product', error.response.data);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading ...</div>;
      }
    
      if (isAuthorized === false) {
        return null; // Don't render anything if unauthorized
      }

  return (
        
 
    <div className='flex'>
    {loading && <p>Loading the products...</p>}
    <Sidebar />
    <div className="flex-1 p-6 ">
        <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>
        <button
            className='bg-teal-600 text-white rounded px-3 py-2 hover:bg-teal-400 cursor-pointer'
            onClick={() => setIsModalOpen(true)} // Open the modal
        >
            Add Product
        </button>

        <div className="list-products my-5">
            <ProductTable products={products} />
        </div>
    </div>
    <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        onSubmit={handleAddProduct} // Pass the add product function
    />
</div>
    
  )
}

export default Products
