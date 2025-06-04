import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="w-full overflow-x-hidden">
      
      <section className="w-full bg-[#1e4a3b] py-16 sm:py-24">
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
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-[#1e2a3b] bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-8">
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Electronics', 'Fashion', 'Home', 'Beauty'].map((category) => (
              <div
                key={category}
                className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="aspect-w-3 aspect-h-2 bg-gray-200">
                  <div className="p-8 flex items-center justify-center h-full">
                    <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500">Explore {category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                  <div className="w-full h-full object-center object-cover"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">Product Name</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Amazing quality product
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-medium text-[#1e2a3b]">₹999</span>
                    <button className="px-4 py-2 bg-[#1e2a3b] text-white rounded-md hover:bg-[#2a3b50] transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 