import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Product {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
  category: string
}

const categories = [
  {
    name: 'Fragrances',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    description: 'Luxury perfumes and fragrances',
    category: 'fragrances'
  },
  {
    name: 'Beauty',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    description: 'Premium beauty and skincare products',
    category: 'beauty'
  },
  {
    name: 'Furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    description: 'Modern home furniture',
    category: 'furniture'
  },
  {
    name: 'Groceries',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    description: 'Fresh and packaged groceries',
    category: 'groceries'
  }
]

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=3')
        const data = await response.json()
        setFeaturedProducts(data.products)
      } catch (error) {
        console.error('Failed to fetch featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div className="w-full overflow-x-hidden">
      
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

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-accent sm:text-3xl mb-8">
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.category}`}
                className="group relative bg-secondary rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                      <p className="text-sm text-gray-200 mt-2">{category.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
                      <span className="text-lg font-medium text-accent">₹{product.price}</span>
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          // Add to cart functionality can be implemented here
                        }}
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