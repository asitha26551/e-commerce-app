// ProductListingPage.jsx
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, X } from 'lucide-react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { ProductCard } from '../components/product/ProductCard'
import { ProductFilters } from '../components/product/ProductFilters'
import { Button } from '../components/ui/Button'
import { Select } from '../components/ui/Select'

import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || '/api',
})

export function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category')
  )
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    searchParams.get('subcategory')
  )
  const [selectedProductType, setSelectedProductType] = useState(
    searchParams.get('productType')
  )
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [sortBy, setSortBy] = useState('newest')

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await api.get('/api/product')
        const arr = Array.isArray(res.data.products) ? res.data.products : []
        setProducts(arr.map(p => ({
          id: p._id,
          name: p.name,
          price: p.price,
          stock: p.stock,
          category: p.categoryId && p.categoryId.name ? p.categoryId.name : '',
          subcategory: p.subcategoryId && p.subcategoryId.name ? p.subcategoryId.name : '',
          productType: p.productTypeId && p.productTypeId.name ? p.productTypeId.name : '',
          images: p.images && p.images.length ? p.images.map(img => img.imageUrl) : [],
          rating: 4.5,
          description: p.description || ''
        })))
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Update URL when filters change
  useEffect(() => {
    const params = {}
    if (selectedCategory) params.category = selectedCategory
    if (selectedSubcategory) params.subcategory = selectedSubcategory
    if (selectedProductType) params.productType = selectedProductType
    setSearchParams(params)
  }, [selectedCategory, selectedSubcategory, selectedProductType, setSearchParams])

  // Debug: log products and filter states
  console.log('Products:', products)
  console.log('Filters:', { selectedCategory, selectedSubcategory, selectedProductType, priceRange })

  // Relaxed filter logic: only filter if product field exists
  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory && product.category && product.category !== selectedCategory) return false
      if (selectedSubcategory && product.subcategory && product.subcategory !== selectedSubcategory) return false
      if (selectedProductType && product.productType && product.productType !== selectedProductType) return false
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false
      const searchQuery = searchParams.get('search')?.toLowerCase()
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery)) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {selectedCategory || 'All Products'}
            </h1>
            <p className="text-text-secondary mt-1">
              {loading ? 'Loading...' : `Showing ${filteredProducts.length} results`}
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button
              variant="outline"
              className="md:hidden flex-1"
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              <Filter className="h-4 w-4 mr-2" /> Filters
            </Button>

            <div className="w-48">
              <Select
                options={[
                  { value: 'newest', label: 'Newest Arrivals' },
                  { value: 'price-low', label: 'Price: Low to High' },
                  { value: 'price-high', label: 'Price: High to Low' },
                  { value: 'rating', label: 'Best Rating' },
                ]}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mb-0"
                fullWidth
              />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <ProductFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedSubcategory={selectedSubcategory}
              onSubcategoryChange={setSelectedSubcategory}
              selectedProductType={selectedProductType}
              onProductTypeChange={setSelectedProductType}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
            />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-16">
                <p className="text-text-secondary text-lg">Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-surface rounded-lg border border-border">
                <p className="text-text-secondary text-lg">
                  No products found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory(null)
                    setSelectedSubcategory(null)
                    setSelectedProductType(null)
                    setPriceRange([0, 2000])
                    setSearchParams({})
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filters Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto w-80 max-w-full bg-surface h-full shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-white">Filters</h2>
              <button onClick={() => setIsMobileFiltersOpen(false)}>
                <X className="h-6 w-6 text-text-secondary" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ProductFilters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedSubcategory={selectedSubcategory}
                onSubcategoryChange={setSelectedSubcategory}
                selectedProductType={selectedProductType}
                onProductTypeChange={setSelectedProductType}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                mobile
              />
            </div>
            <div className="p-4 border-t">
              <Button fullWidth onClick={() => setIsMobileFiltersOpen(false)}>
                Show Results
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
