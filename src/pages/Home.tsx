import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { categories } from '../types/Category'

interface Product {
  id: number
  title: string
  description: string
  price: number
  rating: number
  thumbnail: string
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=3')
        const data = await response.json()
        setFeaturedProducts(data.products)
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div className="w-full overflow-x-hidden">
      <section className="relative w-full py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/80 mix-blend-multiply"></div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 animate-fade-in-up">
              Welcome to{" "}
              <span className="relative inline-block group">
                ShopVista
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-white transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
              </span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto mb-12 animate-fade-in-up animation-delay-200">
              Discover our curated collection of quality products at great prices.
            </p>
            <div className="flex justify-center space-x-4 animate-fade-in-up animation-delay-400">
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full text-primary bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
              >
                Shop Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="group bg-white rounded-lg shadow-sm overflow-hidden">
                <Link to={`/products?category=${category.id}`} className="block">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {category.description}
                    </p>
                    {category.subcategories && (
                      <div className="mt-4 space-y-2">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/products?category=${sub.id}`}
                            className="flex items-center text-sm text-gray-600 hover:text-primary"
                          >
                            <ChevronRightIcon className="h-4 w-4 mr-1" />
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-black sm:text-3xl mb-8">
            Featured Products
          </h2>
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group relative bg-secondary rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-primary">
                        ₹{Math.round(product.price)}
                      </p>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600">
                          {product.rating.toFixed(1)} ★
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home 