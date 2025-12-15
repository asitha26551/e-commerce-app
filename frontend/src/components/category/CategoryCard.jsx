// CategoryCard component placeholder
// CategoryCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group relative rounded-lg overflow-hidden aspect-[4/3] block"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-white text-xl font-bold mb-1">{category.name}</h3>
        <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          {category.itemCount} Products
        </p>
      </div>
    </Link>
  )
}
