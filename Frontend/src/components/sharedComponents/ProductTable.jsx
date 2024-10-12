import React from 'react';

const ProductTable = ({ products }) => {
    if (!products || products.length === 0) {
        return <p>No products available.</p>;
      }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategory</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.productName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.productDescription}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.productPrice}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.productQuantity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.productWeight}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.subCategory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
