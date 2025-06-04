import React from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

const Wishlist: React.FC = () => {
  const { items, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleMoveToCart = (item: any) => {
    addToCart(item, 1)
    removeFromWishlist(item.id)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your wishlist is empty</p>
          <Link
            to="/products"
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              </Link>
              
              <div className="p-4">
                <Link 
                  to={`/product/${item.id}`}
                  className="text-lg font-medium text-gray-900 hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
                <p className="text-primary font-bold mt-2">₹{item.price}</p>
                
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-full border border-red-500 text-red-500 py-2 px-4 rounded hover:bg-red-50 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist 