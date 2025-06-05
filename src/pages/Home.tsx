import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Product } from '../types/Product'
import { categories } from '../types/Category'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=3')
        const data = await response.json()
        const formattedProducts: Product[] = data.products.map((p: any) => ({
          ...p,
          createdAt: new Date().toISOString(),
          images: p.images || [],
          stock: p.stock || 0
        }))
        setFeaturedProducts(formattedProducts)
      } catch (error) {
        console.error('Failed to fetch featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault() 
    addToCart(product, 1)
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full bg-primary py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Welcome to ShopVista
            </h1>
            <p className="mt-6 text-xl text-gray-100 max-w-2xl mx-auto">
              Discover our curated collection of quality products at great prices.
            </p>
            <div className="mt-10">
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-accent sm:text-3xl mb-8">
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

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-accent sm:text-3xl mb-8">
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
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-accent group-hover:text-primary transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-medium text-accent">₹{Math.round(product.price)}</span>
                      <button 
                        onClick={(e) => handleAddToCart(e, product)}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors"
                      >
                        Add to Cart
                      </button>
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