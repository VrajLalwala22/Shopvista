import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-secondary border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">ShopVista</h3>
            <p className="text-gray-500 text-sm">
              Your one-stop shop for quality products at great prices.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Quick Links</h3>
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
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Categories</h3>
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
          </div> 

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Contact</h3>
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