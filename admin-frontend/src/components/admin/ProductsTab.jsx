import React from 'react'
import { motion } from 'framer-motion'
import { Edit, Trash2 } from 'lucide-react'

export function ProductsTab({ products = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-x-auto"
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50/50">
          <tr>
            {['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map(
              (col) => (
                <th
                  key={col}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-10 w-10 rounded-lg object-cover border border-gray-200"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 line-clamp-1 max-w-xs">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {product.id}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {product.category}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {product.stock} units
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full ${
                      product.stock > 0
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-blue-600 mr-3">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="text-center py-8 text-gray-400"
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  )
}
