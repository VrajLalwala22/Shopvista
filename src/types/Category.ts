export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  apiCategories: string[];
  subcategories?: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  parentId: string;
  apiCategories: string[]; 
  description?: string; 
}

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661',
    apiCategories: ['smartphones', 'laptops', 'automotive'], 
    subcategories: [
      {
        id: 'phones',
        name: 'Phones & Tablets',
        parentId: 'electronics',
        apiCategories: ['smartphones'],
        description: 'Mobile phones and tablets'
      },
      {
        id: 'computers',
        name: 'Computers & Laptops',
        parentId: 'electronics',
        apiCategories: ['laptops'],
        description: 'Desktop computers and laptops'
      }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Trendy clothing and accessories',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
    apiCategories: ['mens-shirts', 'mens-shoes', 'mens-watches', 'womens-dresses', 'womens-shoes', 'womens-watches', 'womens-bags', 'womens-jewellery'],
    subcategories: [
      {
        id: 'mens',
        name: 'Men\'s Fashion',
        parentId: 'fashion',
        apiCategories: ['mens-shirts', 'mens-shoes', 'mens-watches'],
        description: 'Men\'s clothing and accessories'
      },
      {
        id: 'womens',
        name: 'Women\'s Fashion',
        parentId: 'fashion',
        apiCategories: ['womens-dresses', 'womens-shoes', 'womens-watches', 'womens-bags', 'womens-jewellery'],
        description: 'Women\'s clothing and accessories'
      }
    ]
  },
  {
    id: 'home',
    name: 'Home & Living',
    description: 'Furniture and home decor',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
    apiCategories: ['furniture', 'home-decoration', 'lighting'],
    subcategories: [
      {
        id: 'furniture',
        name: 'Furniture',
        parentId: 'home',
        apiCategories: ['furniture'],
        description: 'Modern and classic furniture'
      },
      {
        id: 'decor',
        name: 'Home Decor',
        parentId: 'home',
        apiCategories: ['home-decoration', 'lighting'],
        description: 'Decorative items and lighting'
      }
    ]
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    description: 'Skincare, makeup, and fragrances',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
    apiCategories: ['fragrances', 'skincare'],
    subcategories: [
      {
        id: 'skincare',
        name: 'Skincare',
        parentId: 'beauty',
        apiCategories: ['skincare'],
        description: 'Skincare products'
      },
      {
        id: 'fragrances',
        name: 'Fragrances',
        parentId: 'beauty',
        apiCategories: ['fragrances'],
        description: 'Perfumes and fragrances'
      }
    ]
  },
  {
    id: 'groceries',
    name: 'Groceries',
    description: 'Fresh food and household essentials',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
    apiCategories: ['groceries'],
    subcategories: [
      {
        id: 'food',
        name: 'Food & Beverages',
        parentId: 'groceries',
        apiCategories: ['groceries'],
        description: 'Food and beverage items'
      }
    ]
  }
]; 