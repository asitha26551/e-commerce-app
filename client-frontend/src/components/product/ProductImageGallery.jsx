// ProductImageGallery.jsx
import React, { useState } from 'react'

export function ProductImageGallery({ images, productName }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleImageClick = (index) => {
    if (index === selectedImageIndex) return
    setIsAnimating(true)
    setTimeout(() => {
      setSelectedImageIndex(index)
      setIsAnimating(false)
    }, 150) // Half of the transition duration
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails - Bottom on mobile, Left on desktop */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 w-full md:w-24 flex-shrink-0">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(index)}
            className={`
              relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden border-2 transition-all duration-200
              ${
                selectedImageIndex === index
                  ? 'border-accent ring-2 ring-accent ring-opacity-50'
                  : 'border-transparent hover:border-gray-300'
              }
            `}
            aria-label={`View image ${index + 1} of ${productName}`}
          >
            <img
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative bg-white rounded-lg overflow-hidden border border-gray-100 aspect-square md:aspect-auto md:h-[600px]">
        <img
          src={images[selectedImageIndex]}
          alt={productName}
          className={`
            w-full h-full object-contain object-center transition-opacity duration-300
            ${isAnimating ? 'opacity-50' : 'opacity-100'}
          `}
        />
      </div>
    </div>
  )
}
