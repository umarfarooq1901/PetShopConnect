import React from 'react';

const ProductTable = ({ products }) => {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products available.</p>;
  }

  return (
    <div className="overflow-x-auto shadow-lg sm:rounded-lg">
      <table className="min-w-full bg-white border-collapse">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Product Name</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Description</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Price</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Quantity</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Weight</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Category</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Subcategory</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50 divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td className="px-4 py-2 text-sm text-gray-700">{product.productName}</td>
              <td className="px-4 py-2 text-sm text-gray-700 whitespace-normal">{product.productDescription}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{product.productPrice}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{product.productQuantity}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{product.productWeight}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{product.category}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{product.subCategory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
