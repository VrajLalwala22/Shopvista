import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { MagnifyingGlassIcon, FunnelIcon, StarIcon, FireIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'
import { Product } from '../types/Product'
import { categories } from '../types/Category'
import { PriceRangeSlider } from '../components/PriceRangeSlider'

type SortOption = 'featured' | 'price-low-high' | 'price-high-low' | 'newest' | 'rating'

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
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  
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

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const handleRatingChange = (rating: number) => {
    setSelectedRatings(prev => {
      if (prev.includes(rating)) {
        return prev.filter(r => r !== rating)
      }
      return [...prev, rating]
    })
  }

  const filterAndSortProducts = (): FilteredProducts => {
    let filtered = products.filter(product => {
      
      if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      
      
      if (selectedCategory) {
        const category = categories.find(cat => cat.id === selectedCategory)
        if (!category) return false

        if (selectedSubcategories.length > 0) {
         
          return selectedSubcategories.some(subId => {
            const subcategory = category.subcategories?.find(sub => sub.id === subId)
            return subcategory?.apiCategories.includes(product.category)
          })
        }
        
        
        return category.apiCategories.includes(product.category)
      }
      
      
      if (product.price < priceRange.min || product.price > priceRange.max) {
        return false
      }
      
      return true
    })

    
    filtered = filtered.sort((a, b) => {
      switch (sortOption) {
        case 'price-low-high':
          return a.price - b.price
        case 'price-high-low':
          return b.price - a.price
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

    
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
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Products</h1>
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="text-gray-500 hover:text-gray-600 lg:hidden"
        >
          <span className="sr-only">Filters</span>
          <FunnelIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            {categories.map((category) => (
              <div key={category.id} className="mb-4">
                <button
                  onClick={() => handleCategoryChange(category.id)}
                  className={`w-full text-left p-2 rounded ${
                    selectedCategory?.id === category.id
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="px-2">
              <PriceRangeSlider
                value={priceRange}
                onChange={setPriceRange}
                min={0}
                max={2000}
                step={10}
                className="mt-4"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>${priceRange.min}</span>
                <span>${priceRange.max}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                    className="mr-2"
                  />
                  <span className="flex items-center">
                    {[...Array(rating)].map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                    <span className="ml-1">& Up</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Sort By</h3>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="w-full p-2 border rounded"
            >
              <option value="featured">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {featured.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
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
        ))}
        {regular.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
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
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <nav className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  )
}

export default Products 