// RelatedProducts.jsx
import React from 'react'
import { ProductCard } from './ProductCard'

export function RelatedProducts({ products }) {
  if (products.length === 0) return null

  return (
    <div className="mt-16 border-t border-gray-100 pt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
