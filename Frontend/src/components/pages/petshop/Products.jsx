import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../utils/axiosInstance';
import usePetshopAuth from '../../../Authorization/usePetshopAuth';
import Sidebar from '../../sharedComponents/Sidebar';
import Card from './ProductCard';
import ProductTable from './ProductTable';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const Products = () => {
    const isAuthorized = usePetshopAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [isEditModal, setEditModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);


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
         
            setProducts((prevProducts) => [...prevProducts, res.data.product]); // Update the state with the new product
            setIsModalOpen(false);
        } catch (error) {
            console.log('Error while adding the product', error.response.data);
        }
    };

    // delete the product
    const handleDelete = async (productId)=>{
        try {
          const deleteProduct = await axiosInstance.delete(`/petshop/products/deleteProduct/${productId}`);
          if(deleteProduct.data.message ===  "Product deleted successfully!"){

              setProducts((prevProducts)=> prevProducts.filter(product => product._id !== productId));
          }
          else{
            console.error("Failed to delete the product:", deleteProduct.data.message);
          }
          
          
        } catch (error) {
          console.log(error)
        }
      }

    //   edit the product 

    const handleEditProduct = async (productData)=>{
        try {
            const res = await axiosInstance.put(`/petshop/products/updateProduct/${editProduct._id}`, productData);
            
            // Update the products state with the new product data
            setProducts((prevProducts)=>prevProducts.map(product=>product._id === editProduct._id ? res.data.updateProduct : product));
            setEditModal(false);
            setEditProduct(null); // Reset current product

        } catch (error) {
            console.log('Error while editing the product', error);
        }
    }

    const openEditModal = (product) =>{
        setEditProduct(product);
        setEditModal(true);
    }

    // if (isAuthorized === null) {
    //     return <div>Loading ...</div>;
    //   }

    // if (loading) {
    //     return <div>Loading products...</div>; // Display a loading message
    // }
    
      if (isAuthorized === false) {
        return null; // Don't render anything if unauthorized
      }

  return (
        
 
    <div className='flex'>
    <Sidebar />
    <div className="flex-1 p-6 ">
    {/* {loading && <p>Loading the products...</p>} */}
        <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>
        <button
            className='bg-teal-600 text-white rounded px-3 py-2 hover:bg-teal-400 cursor-pointer'
            onClick={() => setIsModalOpen(true)} // Open the modal
        >
            Add Product
        </button>

        <div className="list-products my-5">
            <ProductTable products={products} handleDelete = {handleDelete} handleEditProduct = {openEditModal} />
        </div>
    </div>
    <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        onSubmit={handleAddProduct} // Pass the add product function
    />

    <EditProductModal
            isOpen = {isEditModal}
            onClose = {()=> setEditModal(false)}
            product = {editProduct}
            onSubmit = {handleEditProduct}
    />
</div>
    
  )
}

export default Products
