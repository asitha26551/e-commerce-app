// RelatedProducts.jsx
import React from 'react'
import { ProductCard } from './ProductCard'

export function RelatedProducts({ products }) {
  if (products.length === 0) return null

  return (
    <div className="mt-16 border-t border-border pt-16">
      <h2 className="text-2xl font-display font-bold text-primary mb-8 drop-shadow-neon-purple">
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
