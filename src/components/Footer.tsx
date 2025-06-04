import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#1e2a3b]">ShopVista</h3>
            <p className="text-gray-500 text-sm">
              Your one-stop shop for quality products at great prices.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-[#1e2a3b] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-500 hover:text-[#1e2a3b] transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-500 hover:text-[#1e2a3b] transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/electronics" className="text-gray-500 hover:text-[#1e2a3b] transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/fashion" className="text-gray-500 hover:text-[#1e2a3b] transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/category/home" className="text-gray-500 hover:text-[#1e2a3b] transition-colors">
                  Home & Living
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>Email: abc@shopvista.com</li>
              <li>Phone: - </li>
              <li>Address: Adajan,surat</li>
            </ul>
          </div>
        </div>

       
      </div>
    </footer>
  )
}

export default Footer 