import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { MagnifyingGlassIcon, FunnelIcon, StarIcon, FireIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'
import { Product } from '../types/Product'
import { categories } from '../types/Category'

type SortOption = 'featured' | 'price-low-high' | 'price-high-low' | 'newest'

type PriceRange = {
  min: number
  max: number
}

type FilteredProducts = {
  featured: Product[];
  regular: Product[];
}

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '')
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<SortOption>('featured')
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 0 })
  const [showFilters, setShowFilters] = useState(false)
  const { addToCart } = useCart()

  // Find the current main category and its subcategories
  const currentCategory = categories.find(cat => cat.id === selectedCategory)
  const availableSubcategories = currentCategory?.subcategories || []

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=100')
        const data = await response.json()
        const formattedProducts: Product[] = data.products.map((p: any) => ({
          ...p,
          createdAt: new Date().toISOString(),
          images: p.images || [],
          stock: p.stock || 0
        }))
        setProducts(formattedProducts)
        const prices = formattedProducts.map(p => p.price)
        setPriceRange({
          min: Math.min(...prices),
          max: Math.max(...prices)
        })
      } catch (err) {
        setError('Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
      // Check if the category is a subcategory
      const parentCategory = categories.find(cat => 
        cat.subcategories?.some(sub => sub.id === categoryParam)
      )
      if (parentCategory) {
        setSelectedCategory(parentCategory.id)
        setSelectedSubcategories([categoryParam])
      }
    }
  }, [searchParams])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    updateSearchParams({ search: query || null })
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedSubcategories([])
    updateSearchParams({ category: categoryId })
  }

  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategories(prev => {
      const newSubcategories = prev.includes(subcategoryId)
        ? prev.filter(id => id !== subcategoryId)
        : [...prev, subcategoryId]
      return newSubcategories
    })
  }

  const updateSearchParams = (updates: { [key: string]: string | null }) => {
    const newParams = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key)
      } else {
        newParams.set(key, value)
      }
    })
    setSearchParams(newParams)
  }

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0
    setPriceRange(prev => ({
      ...prev,
      [type]: numValue
    }))
  }

  const filterAndSortProducts = (): FilteredProducts => {
    let filtered = products.filter(product => {
      // Search filter
      if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      
      // Category and subcategory filter
      if (selectedCategory) {
        const category = categories.find(cat => cat.id === selectedCategory)
        if (!category) return false

        if (selectedSubcategories.length > 0) {
          // Check if product category matches any selected subcategory's API categories
          return selectedSubcategories.some(subId => {
            const subcategory = category.subcategories?.find(sub => sub.id === subId)
            return subcategory?.apiCategories.includes(product.category)
          })
        }
        
        // If no subcategories selected, check if product category matches main category's API categories
        return category.apiCategories.includes(product.category)
      }
      
      // Price filter
      if (product.price < priceRange.min || product.price > priceRange.max) {
        return false
      }
      
      return true
    })

    // Sort products
    filtered = filtered.sort((a, b) => {
      switch (sortOption) {
        case 'price-low-high':
          return a.price - b.price
        case 'price-high-low':
          return b.price - a.price
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

    // Split into featured and regular products
    const featured = filtered.filter(product => 
      product.rating >= 4.5 || product.stock < 50
    )
    const regular = filtered.filter(product => 
      product.rating < 4.5 && product.stock >= 50
    )

    return { featured, regular }
  }

  const { featured, regular } = filterAndSortProducts()
  const totalProducts = featured.length + regular.length

  const renderProductCard = (product: Product) => (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative pt-[75%] bg-gray-200">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {product.rating >= 4.5 && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
              <FireIcon className="h-3 w-3 mr-1" />
              Top Rated
            </div>
          )}
          {product.stock < 50 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Limited Stock
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-primary">
              ₹{Math.round(product.price)}
            </p>
            <div className="flex items-center">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <span className="ml-1 text-sm text-gray-600">
                {product.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      {currentCategory && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentCategory.name}</h1>
          <p className="text-gray-600">{currentCategory.description}</p>
          {selectedSubcategories.length === 1 && currentCategory.subcategories && (
            <p className="text-sm text-gray-500 mt-2">
              {currentCategory.subcategories.find(sub => sub.id === selectedSubcategories[0])?.description}
            </p>
          )}
        </div>
      )}

      {/* Mobile Filters Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary"
        >
          <FunnelIcon className="h-5 w-5" />
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Section */}
        <div className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-accent mb-4">Filters</h2>
            
            {/* Search */}
            <div className="mb-6">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={selectedCategory === category.id}
                        onChange={() => handleCategoryChange(category.id)}
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-600">{category.name}</span>
                    </label>
                    {selectedCategory === category.id && category.subcategories && (
                      <div className="ml-6 space-y-3">
                        {category.subcategories.map((sub) => (
                          <div key={sub.id}>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedSubcategories.includes(sub.id)}
                                onChange={() => handleSubcategoryChange(sub.id)}
                                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                              />
                              <span className="ml-2 text-sm text-gray-600">{sub.name}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Sort Options - Mobile */}
          <div className="lg:hidden bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            >
              <option value="featured">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          {/* Sort Options - Desktop */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {totalProducts} results
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="space-y-8">
              {/* Featured Products Section */}
              {featured.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FireIcon className="h-6 w-6 text-yellow-400 mr-2" />
                    Featured Products
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {featured.map(renderProductCard)}
                  </div>
                </div>
              )}

              {/* Regular Products Section */}
              {regular.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {featured.length > 0 ? 'All Products' : 'Products'}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {regular.map(renderProductCard)}
                  </div>
                </div>
              )}

              {totalProducts === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products 