interface RegisteredUser {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

const REGISTERED_USERS_KEY = 'registered_users';

export const getRegisteredUsers = (): RegisteredUser[] => {
  const users = localStorage.getItem(REGISTERED_USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const addRegisteredUser = (user: RegisteredUser): void => {
  const users = getRegisteredUsers();
  users.push(user);
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
};

export const findRegisteredUser = (username: string, password: string): RegisteredUser | undefined => {
  const users = getRegisteredUsers();
  return users.find(user => user.username === username && user.password === password);
};

export const isUsernameTaken = (username: string): boolean => {
  const users = getRegisteredUsers();
  return users.some(user => user.username === username);
}; 