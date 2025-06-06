import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBagIcon, UserIcon, MagnifyingGlassIcon, ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const handleSearch = (query: string, isMobile: boolean = false) => {
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`)
      if (isMobile) {
        setMobileSearchQuery('')
        setIsMobileMenuOpen(false)
      } else {
        setSearchQuery('')
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent, isMobile: boolean = false) => {
    if (e.key === 'Enter') {
      handleSearch(isMobile ? mobileSearchQuery : searchQuery, isMobile)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
    setShowDropdown(false)
    setIsMobileMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="w-full bg-secondary shadow-sm sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100"
              onClick={toggleMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
            <Link to="/" className="flex items-center ml-2 md:ml-0" aria-label="ShopVista Home">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:scale-105 transform transition-transform duration-200">
                ShopVista
              </span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl px-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                aria-label="Search products"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center bg-primary text-white rounded-r-md hover:bg-primary-dark transition-colors"
                  aria-label="Submit search"
                >
                  Search
                </button>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
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
                  aria-expanded={showDropdown}
                  aria-haspopup="true"
                  aria-controls="user-menu"
                >
                  <span className="font-medium">{user.firstName}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDropdown && (
                  <div 
                    id="user-menu"
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 transform opacity-100 scale-100 transition-all duration-200 origin-top-right"
                    onMouseLeave={() => setShowDropdown(false)}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors group"
                      onClick={() => setShowDropdown(false)}
                      role="menuitem"
                    >
                      <UserIcon className="h-5 w-5 mr-2 text-gray-400 group-hover:text-primary transition-colors" aria-hidden="true" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors group"
                      role="menuitem"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-gray-400 group-hover:text-primary transition-colors" aria-hidden="true" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-200"
                aria-label="Login"
              >
                Login
              </Link>
            )}
          </div>

          <div className="flex md:hidden items-center space-x-4">
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
          </div>
        </div>
      </div>

      
      <div 
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="px-4 py-3 border-t border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="search"
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, true)}
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              aria-label="Search products"
            />
            {mobileSearchQuery && (
              <button
                onClick={() => handleSearch(mobileSearchQuery, true)}
                className="absolute inset-y-0 right-0 px-3 flex items-center bg-primary text-white rounded-r-md hover:bg-primary-dark transition-colors"
                aria-label="Submit search"
              >
                Search
              </button>
            )}
          </div>
        </div>

        <div className="px-4 space-y-3">
          <Link
            to="/products"
            className="block text-gray-600 hover:text-primary transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/wishlist"
            className="block text-gray-600 hover:text-primary transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Wishlist
            {wishlistItems.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1" aria-label={`${wishlistItems.length} items in wishlist`}>
                {wishlistItems.length}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className="block text-gray-600 hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-gray-600 hover:text-primary transition-colors py-2"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block text-gray-600 hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar 