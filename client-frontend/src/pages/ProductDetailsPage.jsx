import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Star, Truck, RefreshCw, Heart } from 'lucide-react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { ProductImageGallery } from '../components/product/ProductImageGallery'
import { ProductReviews } from '../components/product/ProductReviews'
import { RelatedProducts } from '../components/product/RelatedProducts'
import { Button } from '../components/ui/Button'
import { useCart } from '../context/CartContext'

import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || '/api',
})

export function ProductDetailsPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/api/product/${id}`)
        const p = res.data.product

        const productData = {
          id: p._id,
          name: p.name,
          price: p.price,
          stock: p.stock,
          category: p.categoryId && p.categoryId.name ? p.categoryId.name : '',
          categoryId: p.categoryId && p.categoryId._id ? p.categoryId._id : '',
          images: p.images && p.images.length ? p.images.map(img => img.imageUrl) : [],
          rating: 4.5,
          reviewCount: 0,
          description: p.description || '',
          sizes: p.variants ? [...new Set(p.variants.map(v => v.size).filter(Boolean))] : [],
          colors: p.variants ? [...new Set(p.variants.map(v => v.color).filter(Boolean))] : []
        }

        setProduct(productData)

        // Set default selections
        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0])
        }
        if (productData.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0])
        }

        // Fetch related products (same category)
        if (productData.categoryId) {
          const allProductsRes = await api.get('/api/product')
          const allProducts = Array.isArray(allProductsRes.data.products) ? allProductsRes.data.products : []
          const related = allProducts
            .filter(prod =>
              prod.categoryId && prod.categoryId._id === productData.categoryId &&
              prod._id !== productData.id
            )
            .slice(0, 4)
            .map(p => ({
              id: p._id,
              name: p.name,
              price: p.price,
              stock: p.stock,
              category: p.categoryId && p.categoryId.name ? p.categoryId.name : '',
              images: p.images && p.images.length ? p.images.map(img => img.imageUrl) : [],
              rating: 4.5,
              description: p.description || ''
            }))
          setRelatedProducts(related)
        }
      } catch (err) {
        console.error('Failed to fetch product:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedSize, selectedColor)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-gray-500 text-lg">Loading product...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-gray-500 text-lg">Product not found</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-8">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="hover:text-primary">Home</a>
            </li>
            <li>/</li>
            <li>
              <a href="/products" className="hover:text-primary">Products</a>
            </li>
            <li>/</li>
            <li>
              <a href={`/products?category=${product.category}`} className="hover:text-primary">
                {product.category}
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium truncate max-w-[200px]">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Images */}
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 hover:text-primary cursor-pointer">
                {product.reviewCount} reviews
              </span>
            </div>

            {/* Price and Stock */}
            <div className="flex items-baseline mb-6 gap-6">
              <span className="text-4xl font-bold text-gray-900 mr-4">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.discount && (
                <span className="ml-4 bg-error/10 text-error px-2 py-1 rounded text-sm font-bold">
                  Save {product.discount}%
                </span>
              )}
              <span className="text-sm text-gray-500 ml-4">Stock: <span className="font-semibold text-gray-700">{product.stock}</span></span>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-md w-32">
                <button
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 border-r border-gray-300"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-full text-center text-gray-900 font-medium focus:outline-none"
                />
                <button
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 border-l border-gray-300"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">{product.stock} items available</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="cta" size="lg" className="flex-1" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="secondary" size="lg" className="flex-1">
                Buy Now
              </Button>
              <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600">
                <Heart className="h-6 w-6" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-gray-100">
              <div className="flex items-start space-x-3">
                <Truck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Free Delivery</h4>
                  <p className="text-sm text-gray-500">Enter your postal code for delivery availability</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Return Delivery</h4>
                  <p className="text-sm text-gray-500">Free 30 days delivery returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products (same category) */}
        <RelatedProducts products={relatedProducts} />
      </main>

      <Footer />
    </div>
  )
}
