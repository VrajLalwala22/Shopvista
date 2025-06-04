import React, { useState, useEffect } from 'react'
import { getProducts, searchProducts, getProductsByCategory } from '../services/api'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'

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
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const result = await getProducts()
        setProducts(result.products)
        
        const uniqueCategories = Array.from(
          new Set(result.products.map(product => product.category))
        )
        setCategories(uniqueCategories)
      } catch (err) {
        setError('Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery) {
        try {
          setLoading(true)
          const result = await searchProducts(searchQuery)
          setProducts(result.products)
        } catch (err) {
          setError('Failed to search products')
        } finally {
          setLoading(false)
        }
      } else if (!selectedCategory) {
        
        const fetchProducts = async () => {
          try {
            setLoading(true)
            const result = await getProducts()
            setProducts(result.products)
          } catch (err) {
            setError('Failed to fetch products')
          } finally {
            setLoading(false)
          }
        }
        fetchProducts()
      }
    }, 500) 

    return () => clearTimeout(searchTimeout)
  }, [searchQuery])

  
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (selectedCategory) {
        try {
          setLoading(true)
          const result = await getProductsByCategory(selectedCategory)
          setProducts(result.products)
        } catch (err) {
          setError('Failed to fetch products for selected category')
        } finally {
          setLoading(false)
        }
      }
    }

    fetchFilteredProducts()
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex-1 max-w-xl relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-white" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary-light transition-colors rounded-md"
            >
              <FunnelIcon className="h-5 w-5" />
              Filters
            </button>
          </div>
        </div>

        
        {showFilters && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-accent mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  !selectedCategory
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } transition-colors`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
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
                <div className="aspect-w-3 aspect-h-2 bg-gray-200">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-accent mb-1 truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-accent">
                      ${product.price}
                    </span>
                    <button className="px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary-light transition-colors">
                      Add to Cart
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-gray-500">{product.brand}</span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                      {product.rating}★
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products 