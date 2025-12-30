// ProductCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '../ui/Button'
import { useCart } from '../../context/CartContext'

export function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation to details page
    e.stopPropagation(); // Prevent event bubbling to Link
    // console.log('handleAddToCart fired for product:', product.id);
    addToCart(product);
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block bg-surface rounded-lg shadow-sm hover:shadow-neon-purple transition-all duration-300 overflow-hidden border border-border hover:scale-[1.02]"
    >
      <div className="relative aspect-square overflow-hidden bg-background">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-error text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-success text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </div>
        )}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          <Button
            size="sm"
            variant="cta"
            className="rounded-full shadow-lg"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-sm text-text-secondary mb-1">{product.category}</div>
        <h3 className="text-lg font-medium text-white mb-2 line-clamp-1 group-hover:text-accent transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-border'}`}
              />
            ))}
          </div>
          <span className="text-xs text-text-secondary ml-2">
            ({product.reviewCount || 0})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-text-secondary line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
