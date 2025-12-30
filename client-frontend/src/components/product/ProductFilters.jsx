import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { ChevronRight } from 'lucide-react'


export function ProductFilters({
  selectedCategory,
  onCategoryChange,
  selectedSubcategory,
  onSubcategoryChange,
  selectedProductType,
  onProductTypeChange,
  priceRange,
  onPriceChange,
  mobile = false,
}) {
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [productTypes, setProductTypes] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null)

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories')
        // Map to flat array of {_id, name}
        const cats = Array.isArray(res.data)
          ? res.data.map(cat => ({ _id: cat._id, name: cat.name }))
          : [];
        setCategories(cats)
      } catch (err) {
        // console.error('Failed to fetch categories:', err)
      }
    }
    fetchCategories()
  }, [])

  // Set selectedCategoryId if selectedCategory is set and categories are loaded
  useEffect(() => {
    if (selectedCategory && categories.length > 0) {
      const found = categories.find(cat => cat.name === selectedCategory)
      if (found && found._id !== selectedCategoryId) {
        setSelectedCategoryId(found._id)
      }
    }
    if (!selectedCategory) {
      setSelectedCategoryId(null)
    }
  }, [selectedCategory, categories])

  // Fetch subcategories when a category is selected
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!selectedCategoryId) {
        setSubcategories([])
        return
      }
      try {
        const res = await api.get(`/subcategory?categoryId=${selectedCategoryId}`)
        setSubcategories(Array.isArray(res.data) ? res.data : [])
      } catch (err) {
        // console.error('Failed to fetch subcategories:', err)
        setSubcategories([])
      }
    }
    fetchSubcategories()
  }, [selectedCategoryId])

  // Fetch product types when a subcategory is selected
  useEffect(() => {
    const fetchProductTypes = async () => {
      if (!selectedSubcategoryId) {
        setProductTypes([])
        return
      }
      try {
        const res = await api.get(`/product-type?subcategoryId=${selectedSubcategoryId}`)
        setProductTypes(Array.isArray(res.data) ? res.data : [])
      } catch (err) {
        // console.error('Failed to fetch product types:', err)
        setProductTypes([])
      }
    }
    fetchProductTypes()
  }, [selectedSubcategoryId])

  const handleCategoryClick = (category) => {
    setSelectedCategoryId(category._id)
    onCategoryChange(category.name)
    // Reset subcategory and product type when category changes
    setSelectedSubcategoryId(null)
    onSubcategoryChange && onSubcategoryChange(null)
    onProductTypeChange && onProductTypeChange(null)
  }

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategoryId(subcategory._id)
    onSubcategoryChange && onSubcategoryChange(subcategory.name)
    // Reset product type when subcategory changes
    onProductTypeChange && onProductTypeChange(null)
  }

  const handleProductTypeClick = (productType) => {
    onProductTypeChange && onProductTypeChange(productType.name)
  }

  const handleClearAll = () => {
    setSelectedCategoryId(null)
    setSelectedSubcategoryId(null)
    onCategoryChange(null)
    onSubcategoryChange && onSubcategoryChange(null)
    onProductTypeChange && onProductTypeChange(null)
  }

  return (
    <div className={`space-y-8 ${mobile ? 'p-4' : ''} text-text-secondary`}>
      {/* Categories */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Categories</h3>
        <ul className="space-y-3">
          <li>
            <button
              onClick={handleClearAll}
              className={`text-sm ${
                !selectedCategory
                  ? 'text-accent font-bold'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              All Categories
            </button>
          </li>
          {categories.map((category) => (
            <li key={category._id}>
              <button
                onClick={() => handleCategoryClick(category)}
                className={`text-sm flex items-center ${
                  selectedCategory === category.name
                    ? 'text-accent font-bold'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {category.name}
                {selectedCategory === category.name && subcategories.length > 0 && (
                  <ChevronRight className="h-4 w-4 ml-1" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Subcategories - shown when a category is selected */}
      {selectedCategoryId && subcategories.length > 0 && (
        <div className="pl-4 border-l-2 border-accent">
          <h3 className="text-lg font-medium text-white mb-4">Subcategories</h3>
          <ul className="space-y-3">
            {subcategories.map((subcategory) => (
              <li key={subcategory._id}>
                <button
                  onClick={() => handleSubcategoryClick(subcategory)}
                  className={`text-sm flex items-center ${
                    selectedSubcategory === subcategory.name
                      ? 'text-accent font-bold'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {subcategory.name}
                  {selectedSubcategory === subcategory.name && productTypes.length > 0 && (
                    <ChevronRight className="h-4 w-4 ml-1" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Product Types - shown when a subcategory is selected */}
      {selectedSubcategoryId && productTypes.length > 0 && (
        <div className="pl-8 border-l-2 border-accent">
          <h3 className="text-lg font-medium text-white mb-4">Product Types</h3>
          <ul className="space-y-3">
            {productTypes.map((productType) => (
              <li key={productType._id}>
                <button
                  onClick={() => handleProductTypeClick(productType)}
                  className={`text-sm ${
                    selectedProductType === productType.name
                      ? 'text-accent font-bold'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {productType.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-text-secondary">
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
            className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>
      </div>

    </div>
  )
}
