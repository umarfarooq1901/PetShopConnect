    import React, { useEffect, useState } from 'react'

    const EditProductModal = ({isOpen, onClose, product, onSubmit}) => {


        const [formData, setFormData] = useState({
            productName: '',
            productDescription: '',
            productPrice: '',
            productQuantity: '',
            productWeight: '',
            category: '',
            subCategory: '',
        })

        useEffect(()=>{
                    if(product){
                        setFormData({
                            productName: product.productName || '',
                            productDescription: product.productDescription || '',
                            productPrice: product.productPrice || '',
                            productQuantity: product.productQuantity || '',
                            productWeight: product.productWeight || '',
                            category: product.category || '',
                            subCategory: product.subCategory || '',
                        });
                    }
        }, [product])


            const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            };


        const handleSubmit = (e)=>{
                e.preventDefault();
                onSubmit(formData)  // Pass the updated product data to the parent component
        }

        if (!isOpen) return null;
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='bg-white p-5 rounded shadow-lg'>
                    <h2 className='text-xl font-bold mb-4'>Edit Product</h2>
                    <form onSubmit={handleSubmit}>
                    <label className="block text-gray-700">Product Name</label>
                <input
                    type="text"
                    value={formData.productName}
                    name='productName'
                    onChange={handleChange}
                    className="border rounded w-full p-2"
                
                />
            
                <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                    value={formData.productDescription}
                    name='productDescription'
                    onChange={handleChange}
                    className="border rounded w-full p-2"
                    rows="3"
                
                />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700">Price</label>
                    <input
                    type="number"
                    value={formData.productPrice}
                        name='productPrice'
                    onChange={handleChange}
                    className="border rounded w-full p-2"
                    
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Quantity</label>
                    <input
                    type="number"
                    value={formData.productQuantity}
                        name='productQuantity'
                    onChange={handleChange}
                    className="border rounded w-full p-2"
                    
                    />
                </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700">Weight</label>
                    <input
                    type="text"
                    value={formData.productWeight}
                        name='productWeight'
                    onChange={handleChange}
                    className="border rounded w-full p-2"
                    
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Category</label>
                    <input
                    type="text"
                    value={formData.category}
                        name='category'
                    onChange={handleChange}
                    className="border rounded w-full p-2"
                
                    />
                </div>
                </div>
                <div className="mb-4">
                <label className="block text-gray-700">Sub-Category</label>
                <input
                    type="text"
                    value={formData.subCategory}
                    name='subCategory'
                    onChange={handleChange}
                    className="border rounded w-full p-2"
                
                />
                </div>
                <button type="submit" className="bg-teal-600 text-white rounded px-3 py-2 mt-4">
                            Update Product
                        </button>
                    </form>
                    <button onClick={onClose} className="text-red-600 mt-4">Cancel</button>
            </div>
        
        </div>
    )
    }

    export default EditProductModal
