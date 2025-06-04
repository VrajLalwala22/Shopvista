import React, { useState, useEffect } from 'react'
import { getProducts, searchProducts, getProductsByCategory } from '../services/api'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'

interface Product {
  id: number
  title: string
  description: string
  price: number
  category: string
  thumbnail: string
  brand: string
  rating: number
}

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [categories, setCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoryFromUrl = searchParams.get('category')
        const searchFromUrl = searchParams.get('search')

        if (searchFromUrl) {
          const result = await searchProducts(searchFromUrl)
          setProducts(result.products)
          setSearchQuery(searchFromUrl)
        } else if (categoryFromUrl) {
          const result = await getProductsByCategory(categoryFromUrl)
          setProducts(result.products)
          setSelectedCategory(categoryFromUrl)
        } else {
          const result = await getProducts()
          setProducts(result.products)
        }
        
        const allProducts = await getProducts()
        const uniqueCategories = Array.from(
          new Set(allProducts.products.map(product => product.category))
        )
        setCategories(uniqueCategories)
      } catch (err) {
        setError('Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [searchParams])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query) {
      setSearchParams({ search: query })
    } else {
      setSearchParams({})
    }
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setSearchQuery('')
    if (category) {
      setSearchParams({ category })
    } else {
      setSearchParams({})
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex-1 max-w-xl relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary-dark transition-colors rounded-md"
            >
              <FunnelIcon className="h-5 w-5" />
              Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategorySelect('')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  !selectedCategory
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-md mb-8">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
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
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-1 truncate hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-primary">
                        ₹{product.price}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          Rating: {product.rating}★
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        addToCart(product, 1)
                      }}
                      className="mt-4 w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products 