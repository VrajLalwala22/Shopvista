interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  [key: string]: any; // for other properties from the API
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    [key: string]: any;
  };
}

interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

const BASE_URL = 'https://dummyjson.com';

// Fetch all products
export const getProducts = async (): Promise<{ products: Product[] }> => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

// Fetch single product by ID
export const getProductById = async (id: number): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product with id ${id}`);
  return res.json();
};

// Search products
export const searchProducts = async (query: string): Promise<{ products: Product[] }> => {
  const res = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to search products');
  return res.json();
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<{ products: Product[] }> => {
  const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error(`Failed to fetch products in category ${category}`);
  return res.json();
};

// Login simulation
export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return res.json();
};

// Register new user
export const registerUser = async (userData: {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}): Promise<RegisterResponse> => {
  const res = await fetch(`${BASE_URL}/users/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Registration failed');
  }

  return res.json();
}; 