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
import { products } from '../utils/mockData'

export function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category')
  )
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [sortBy, setSortBy] = useState('newest')

  // Update URL when category changes
  useEffect(() => {
    const params = {}
    if (selectedCategory) params.category = selectedCategory
    setSearchParams(params)
  }, [selectedCategory, setSearchParams])

  // Filter products
  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory && product.category !== selectedCategory) return false
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
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedCategory || 'All Products'}
            </h1>
            <p className="text-gray-500 mt-1">
              Showing {filteredProducts.length} results
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
              priceRange={priceRange}
              onPriceChange={setPriceRange}
            />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500 text-lg">
                  No products found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory(null)
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
          <div className="relative ml-auto w-80 max-w-full bg-white h-full shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={() => setIsMobileFiltersOpen(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ProductFilters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
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
