// Static credentials for login
const STATIC_USER = {
  id: 1,
  username: 'admin',
  password: 'admin123',
  email: 'admin@example.com',
  firstName: 'Admin',
  lastName: 'User'
};

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const validateCredentials = (username: string, password: string): User | null => {
  if (username === STATIC_USER.username && password === STATIC_USER.password) {
    const { password: _, ...userWithoutPassword } = STATIC_USER;
    return userWithoutPassword;
  }
  return null;
}; 