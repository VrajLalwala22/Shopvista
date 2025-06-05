import React, { createContext, useContext, useEffect, useState } from 'react'
import { Product } from '../types/Product'

interface WishlistContextType {
  items: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    return savedWishlist ? JSON.parse(savedWishlist) : []
  })

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items))
  }, [items])

  const addToWishlist = (product: Product) => {
    setItems(currentItems => {
      if (currentItems.some(item => item.id === product.id)) {
        return currentItems
      }
      return [...currentItems, product]
    })
  }

  const removeFromWishlist = (productId: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId))
  }

  const isInWishlist = (productId: number) => {
    return items.some(item => item.id === productId)
  }

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
} 