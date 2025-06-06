interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  brand: string;
  rating: number;
  [key: string]: any; 
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

const BASE_URL = 'https://dummyjson.com'

export const api = {
  async getProducts() {
    const response = await fetch(`${BASE_URL}/products`)
    return response.json()
  },

  async getProduct(id: string) {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    return response.json()
  },

  async searchProducts(query: string) {
    const response = await fetch(`${BASE_URL}/products/search?q=${query}`)
    return response.json()
  },

  async getCategories() {
    const response = await fetch(`${BASE_URL}/products/categories`)
    return response.json()
  },

  async getProductsByCategory(category: string) {
    const response = await fetch(`${BASE_URL}/products/category/${category}`)
    return response.json()
  }
}

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