import type { User } from '../types/roadmap';

// Ключи для localStorage
const USERS_STORAGE_KEY = 'aspirepath_users';
const TOKEN_STORAGE_KEY = 'aspirepath_token';
const CURRENT_USER_KEY = 'currentUser';

// Имитация задержки сети
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Генерация токена
const generateToken = () => `local_token_${Date.now()}_${Math.random().toString(36).substr(2)}`;

// Получение списка пользователей из localStorage
const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Сохранение пользователей в localStorage
const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Регистрация пользователя (локальная)
export const localRegister = async (userData: { name: string; email: string; password: string }) => {
  await delay(500); // Имитация задержки сети
  
  const users = getUsers();
  
  // Проверка на существующего пользователя
  const existingUser = users.find(user => user.email === userData.email);
  if (existingUser) {
    throw new Error('Пользователь с таким email уже существует');
  }
  
  // Создание нового пользователя
  const newUser: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: userData.name,
    email: userData.email,
    createdAt: new Date().toISOString(),
  };
  
  // Сохраняем пользователя
  users.push(newUser);
  saveUsers(users);
  
  // Генерируем токен
  const token = generateToken();
  
  return {
    token,
    user: newUser
  };
};

// Вход пользователя (локальный)
export const localLogin = async (credentials: { email: string; password: string }) => {
  await delay(500); // Имитация задержки сети
  
  const users = getUsers();
  const user = users.find(u => u.email === credentials.email);
  
  if (!user) {
    throw new Error('Пользователь не найден');
  }
  
  // В локальной версии проверяем только email
  // В реальной версии здесь будет проверка пароля
  
  // Генерируем токен
  const token = generateToken();
  
  return {
    token,
    user
  };
};

// Выход пользователя (локальный)
export const localLogout = async () => {
  await delay(200);
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Получение текущего пользователя
export const localGetCurrentUser = async (): Promise<User | null> => {
  await delay(200);
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

// Проверка, зарегистрирован ли пользователь
export const localIsAuthenticated = (): boolean => {
  return !!localStorage.getItem(TOKEN_STORAGE_KEY);
};