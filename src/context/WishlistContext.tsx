import React, { createContext, useContext, useEffect, useState } from 'react'

interface WishlistItem {
  id: number
  title: string
  price: number
  thumbnail: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addToWishlist: (product: any) => void
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
  const [items, setItems] = useState<WishlistItem[]>(() => {
    // Load wishlist from localStorage on initial render
    const savedWishlist = localStorage.getItem('wishlist')
    return savedWishlist ? JSON.parse(savedWishlist) : []
  })

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items))
  }, [items])

  const addToWishlist = (product: any) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id)
      if (existingItem) {
        return currentItems
      }
      return [...currentItems, {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail
      }]
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