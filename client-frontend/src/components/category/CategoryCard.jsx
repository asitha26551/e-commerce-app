// CategoryCard component placeholder
// CategoryCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="group block rounded-lg border border-border bg-surface hover:border-accent hover:shadow-neon-cyan transition-all duration-300 px-4 py-3 flex items-center gap-3"
    >
      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-background">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-white truncate">
          {category.name}
        </h3>
        <p className="text-xs text-text-secondary mt-0.5 truncate">
          {category.itemCount} Products
        </p>
      </div>
    </Link>
  )
}
