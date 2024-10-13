import React, { useState } from 'react';

const AddProductModal = ({ isOpen, onClose, onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [productImages, setProductImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('productName', productName);
    formData.append('productDescription', productDescription);
    formData.append('productPrice', productPrice);
    formData.append('productQuantity', productQuantity);
    formData.append('productWeight', productWeight);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    productImages.forEach((image) => {
      formData.append('productImages', image);
    });

    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="border rounded w-full p-2"
                rows="3"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="border rounded w-full p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                  className="border rounded w-full p-2"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700">Weight</label>
                <input
                  type="text"
                  value={productWeight}
                  onChange={(e) => setProductWeight(e.target.value)}
                  className="border rounded w-full p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border rounded w-full p-2"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Sub-Category</label>
              <input
                type="text"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Product Images</label>
              <input
                type="file"
                multiple
                className="border rounded w-full p-2"
                required
                onChange={(e) => setProductImages(Array.from(e.target.files))}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-teal-600 text-white px-4 py-2 rounded"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
