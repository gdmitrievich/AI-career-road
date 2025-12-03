import type { RoadmapData, SavedRoadmap, User } from '../types/roadmap';

// Импортируем локальные функции аутентификации
import {
  localRegister,
  localLogin,
  localLogout,
  localGetCurrentUser
} from './localAuthService';

// Будет использоваться прокси, настроенный в vite.config.ts
const API_BASE_URL = '/api';

// Функция для обработки ошибок API
const handleApiError = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Не удалось распарсить JSON
    }
    throw new Error(errorMessage);
  }
  return response;
};

// Проверка доступности бэкенда
const isBackendAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Добавляем таймаут, чтобы быстро определить, что бэкенд недоступен
      signal: AbortSignal.timeout(3000)
    });
    return response.ok;
  } catch (error) {
    console.log('Бэкенд недоступен, используем локальные данные');
    return false;
  }
};

export const generateRoadmap = async (vacancyUrl: string): Promise<RoadmapData> => {
  try {
    const backendAvailable = await isBackendAvailable();
    
    if (!backendAvailable) {
      // Если бэкенд недоступен, пробрасываем ошибку, чтобы показать кнопку Mock
      throw new Error('Бэкенд недоступен');
    }
    
    const response = await fetch(`${API_BASE_URL}/roadmaps/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vacancy_url: vacancyUrl }),
    });

    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error('Ошибка при генерации дорожной карты:', error);
    throw error;
  }
};

// Функция для сохранения карты
export const saveRoadmap = async (roadmap: RoadmapData): Promise<SavedRoadmap> => {
  try {
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/roadmaps/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(roadmap),
      });

      await handleApiError(response);
      return await response.json();
    } else {
      // Локальное сохранение
      throw new Error('Используем локальное сохранение');
    }
  } catch (error) {
    // Локальное сохранение в localStorage
    const savedRoadmapsStr = localStorage.getItem('savedRoadmaps');
    const savedRoadmaps: SavedRoadmap[] = savedRoadmapsStr ? JSON.parse(savedRoadmapsStr) : [];
    
    const savedRoadmap: SavedRoadmap = {
      ...roadmap,
      id: `roadmap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      savedAt: new Date().toISOString(),
    };
    
    savedRoadmaps.unshift(savedRoadmap);
    localStorage.setItem('savedRoadmaps', JSON.stringify(savedRoadmaps));
    
    return savedRoadmap;
  }
};

// Функция для получения сохраненных карт пользователя
export const getSavedRoadmaps = async (): Promise<SavedRoadmap[]> => {
  try {
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/roadmaps/saved`, {
        method: 'GET',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      await handleApiError(response);
      return await response.json();
    } else {
      // Локальная загрузка
      throw new Error('Используем локальные данные');
    }
  } catch (error) {
    // Локальная загрузка из localStorage
    const savedRoadmapsStr = localStorage.getItem('savedRoadmaps');
    return savedRoadmapsStr ? JSON.parse(savedRoadmapsStr) : [];
  }
};

// Функция для удаления сохраненной карты
export const deleteRoadmap = async (roadmapId: string): Promise<void> => {
  try {
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/roadmaps/${roadmapId}`, {
        method: 'DELETE',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      await handleApiError(response);
    } else {
      // Локальное удаление
      throw new Error('Используем локальное удаление');
    }
  } catch (error) {
    // Локальное удаление из localStorage
    const savedRoadmapsStr = localStorage.getItem('savedRoadmaps');
    if (savedRoadmapsStr) {
      const savedRoadmaps: SavedRoadmap[] = JSON.parse(savedRoadmapsStr);
      const updatedRoadmaps = savedRoadmaps.filter(roadmap => roadmap.id !== roadmapId);
      localStorage.setItem('savedRoadmaps', JSON.stringify(updatedRoadmaps));
    }
  }
};

// Функция для регистрации пользователя
export const registerUser = async (userData: { name: string; email: string; password: string }): Promise<{ token: string; user: User }> => {
  try {
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      await handleApiError(response);
      return await response.json();
    } else {
      // Локальная регистрация
      throw new Error('Используем локальную регистрацию');
    }
  } catch (error) {
    // Используем локальную регистрацию
    return await localRegister(userData);
  }
};

// Функция для входа пользователя
export const loginUser = async (credentials: { email: string; password: string }): Promise<{ token: string; user: User }> => {
  try {
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      await handleApiError(response);
      return await response.json();
    } else {
      // Локальный вход
      throw new Error('Используем локальный вход');
    }
  } catch (error) {
    // Используем локальный вход
    return await localLogin(credentials);
  }
};

// Функция для выхода пользователя
export const logoutUser = async (): Promise<void> => {
  try {
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      const token = localStorage.getItem('token');
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });
    }
  } catch (error) {
    console.log('Бэкенд недоступен, выполняем локальный выход');
  } finally {
    // Всегда выполняем локальный выход
    await localLogout();
  }
};

// Функция для получения данных текущего пользователя
export const getCurrentUser = async (): Promise<User> => {
  try {
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      await handleApiError(response);
      return await response.json();
    } else {
      // Локальное получение пользователя
      throw new Error('Используем локальные данные');
    }
  } catch (error) {
    // Локальное получение пользователя
    const user = await localGetCurrentUser();
    if (!user) {
      throw new Error('Пользователь не авторизован');
    }
    return user;
  }
};

// Функция для проверки доступности API
export const checkApiHealth = async (): Promise<boolean> => {
  return await isBackendAvailable();
};