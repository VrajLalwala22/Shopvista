import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBagIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          

          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-[#1e2a3b] hover:text-[#2a3b50] transition-colors">
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
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#1e2a3b] focus:border-[#1e2a3b]"
              />
            </div>
          </div>

          
          
          <div className="flex items-center space-x-6">
            <Link
              to="/cart"
              className="text-gray-600 hover:text-[#1e2a3b] transition-colors relative group"
            >
              <ShoppingBagIcon className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-[#1e2a3b] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link
              to="/login"
              className="text-gray-600 hover:text-[#1e2a3b] transition-colors"
            >
              <UserIcon className="h-6 w-6" />
            </Link>
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
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary text-sm"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 