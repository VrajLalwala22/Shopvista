export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  apiCategories: string[]; // Categories from the API that map to this category
  subcategories?: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  parentId: string;
  apiCategories: string[]; // Categories from the API that map to this subcategory
  description?: string; // Optional description for subcategories
}

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661',
    apiCategories: ['smartphones', 'laptops', 'automotive'], // API categories that belong to electronics
    subcategories: [
      { 
        id: 'smartphones', 
        name: 'Smartphones', 
        parentId: 'electronics',
        apiCategories: ['smartphones']
      },
      { 
        id: 'laptops', 
        name: 'Laptops', 
        parentId: 'electronics',
        apiCategories: ['laptops']
      },
      { 
        id: 'automotive', 
        name: 'Automotive Electronics', 
        parentId: 'electronics',
        apiCategories: ['automotive']
      }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Trendy clothing and accessories',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
    apiCategories: ['mens-shirts', 'mens-shoes', 'mens-watches', 'womens-dresses', 'womens-shoes', 'womens-watches', 'womens-bags', 'womens-jewellery', 'sunglasses'],
    subcategories: [
      { 
        id: 'mens-fashion', 
        name: "Men's Fashion", 
        parentId: 'fashion',
        apiCategories: ['mens-shirts', 'mens-shoes', 'mens-watches']
      },
      { 
        id: 'womens-fashion', 
        name: "Women's Fashion", 
        parentId: 'fashion',
        apiCategories: ['womens-dresses', 'womens-shoes', 'womens-watches', 'womens-bags']
      },
      { 
        id: 'jewelry', 
        name: 'Jewelry & Accessories', 
        parentId: 'fashion',
        apiCategories: ['womens-jewellery', 'sunglasses']
      }
    ]
  },
  {
    id: 'home-living',
    name: 'Home & Living',
    description: 'Furniture and home decor',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
    apiCategories: ['furniture', 'home-decoration'],
    subcategories: [
      { 
        id: 'furniture', 
        name: 'Furniture', 
        parentId: 'home-living',
        apiCategories: ['furniture'],
        description: 'Modern and classic furniture for your home'
      },
      { 
        id: 'home-decor', 
        name: 'Home Decor', 
        parentId: 'home-living',
        apiCategories: ['home-decoration'],
        description: 'Decorative items and accessories for your home'
      }
    ]
  },
  {
    id: 'beauty',
    name: 'Beauty',
    description: 'Skincare, makeup, and fragrances',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
    apiCategories: ['fragrances', 'skincare'],
    subcategories: [
      { 
        id: 'skincare', 
        name: 'Skincare', 
        parentId: 'beauty',
        apiCategories: ['skincare'],
        description: 'Skincare products for all skin types'
      },
      { 
        id: 'fragrances', 
        name: 'Fragrances', 
        parentId: 'beauty',
        apiCategories: ['fragrances'],
        description: 'Luxury and designer fragrances'
      }
    ]
  },
  {
    id: 'groceries',
    name: 'Groceries',
    description: 'Food and household items',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
    apiCategories: ['groceries'],
    subcategories: [
      { 
        id: 'food', 
        name: 'Food & Beverages', 
        parentId: 'groceries',
        apiCategories: ['groceries'],
        description: 'Fresh and packaged food items'
      }
    ]
  }
]; 