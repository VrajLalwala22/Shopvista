import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-secondary border-t border-gray-200" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">ShopVista</h3>
            <p className="text-gray-500 text-sm">
              Your one-stop shop for quality products at great prices.
            </p>
            
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-accent mb-4">Quick Links</h3>
            <nav aria-label="Quick links">
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-500 hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-500 hover:text-primary transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-gray-500 hover:text-primary transition-colors">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="text-gray-500 hover:text-primary transition-colors">
                    Wishlist
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-accent mb-4">Categories</h3>
            <nav aria-label="Product categories">
              <ul className="space-y-2">
                <li>
                  <Link to="/products?category=fragrances" className="text-gray-500 hover:text-primary transition-colors">
                    Fragrances
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=beauty" className="text-gray-500 hover:text-primary transition-colors">
                    Beauty
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=furniture" className="text-gray-500 hover:text-primary transition-colors">
                    Furniture
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=groceries" className="text-gray-500 hover:text-primary transition-colors">
                    Groceries
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-accent mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li className="flex items-center space-x-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>abc@shopvista.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>-</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Adajan, Surat</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} ShopVista. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 