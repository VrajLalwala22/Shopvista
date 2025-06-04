import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'

interface Product {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
  images: string[]
  brand: string
  category: string
  stock: number
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await response.json()
        setProduct(data)
        setSelectedImage(data.thumbnail)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchProduct()
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 w-full">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`border-2 rounded-md overflow-hidden ${
                  selectedImage === image ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-lg text-gray-500">{product.brand}</p>
          </div>

          <div className="space-y-2">
            <p className="text-4xl font-bold text-primary">₹{product.price}</p>
            <p className="text-sm text-gray-500">
              Stock: {product.stock} units available
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-gray-700">
                Quantity:
              </label>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-3 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
            <dl className="space-y-2">
              <div className="flex">
                <dt className="w-24 text-gray-500">Category:</dt>
                <dd className="text-gray-900">{product.category}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 text-gray-500">Brand:</dt>
                <dd className="text-gray-900">{product.brand}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 