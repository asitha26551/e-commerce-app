// ProductFilters component placeholder
// ProductFilters.jsx
import React from 'react'
import { categories } from '../../utils/mockData'

export function ProductFilters({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  mobile = false,
}) {
  return (
    <div className={`space-y-8 ${mobile ? 'p-4' : ''}`}>
      {/* Categories */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => onCategoryChange(null)}
              className={`text-sm ${
                !selectedCategory
                  ? 'text-accent font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Categories
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onCategoryChange(category.name)}
                className={`text-sm ${
                  selectedCategory === category.name
                    ? 'text-accent font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="2000"
            step="10"
            value={priceRange[1]}
            onChange={(e) =>
              onPriceChange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {['Black', 'White', 'Blue', 'Red', 'Green', 'Silver', 'Gold'].map(
            (color) => (
              <button
                key={color}
                className="w-8 h-8 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                style={{
                  backgroundColor: color.toLowerCase(),
                }}
                title={color}
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}
