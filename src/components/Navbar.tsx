import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBagIcon, UserIcon, MagnifyingGlassIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const { getItemCount } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileSearchQuery, setMobileSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  
  const handleSearch = (query: string, isMobile: boolean = false) => {
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`)
      if (isMobile) {
        setMobileSearchQuery('')
      } else {
        setSearchQuery('')
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, isMobile: boolean = false) => {
    if (e.key === 'Enter') {
      handleSearch(isMobile ? mobileSearchQuery : searchQuery, isMobile)
    }
  }

  const handleLogout = () => {
    setShowDropdown(false)
    
    setTimeout(() => {
      logout()
      navigate('/login')
    }, 200)
  }

  return (
    <nav className="w-full bg-secondary shadow-sm sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-accent hover:text-accent-light transition-colors">
              ShopVista
            </span>
          </Link>

          <div className="flex-1 max-w-xl px-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center bg-primary text-white rounded-r-md hover:bg-primary-dark transition-colors"
                >
                  Search
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/products"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Products
            </Link>
            
            <Link
              to="/wishlist"
              className="text-gray-600 hover:text-primary transition-colors relative"
            >
              <HeartIcon className="h-6 w-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="text-gray-600 hover:text-primary transition-colors relative"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-gray-100"
                >
                  <span className="font-medium">{user.firstName}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showDropdown && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 transform opacity-100 scale-100 transition-all duration-200 origin-top-right"
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors group"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-gray-400 group-hover:text-primary transition-colors" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search (visible on small screens) */}
      <div className="sm:hidden border-t border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-3 w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, true)}
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
            />
            {mobileSearchQuery && (
              <button
                onClick={() => handleSearch(mobileSearchQuery, true)}
                className="absolute inset-y-0 right-0 px-3 flex items-center bg-primary text-white rounded-r-md hover:bg-primary-dark transition-colors"
              >
                Search
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 