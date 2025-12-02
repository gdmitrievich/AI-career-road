import type { RoadmapData, SavedRoadmap, User } from '../types/roadmap';

// Будет использоваться прокси, настроенный в vite.config.ts
const API_BASE_URL = '/api';

export const generateRoadmap = async (vacancyUrl: string): Promise<RoadmapData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/roadmaps/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vacancy_url: vacancyUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при генерации дорожной карты:', error);
    throw error;
  }
};

// Функция для сохранения карты на сервере
export const saveRoadmap = async (roadmap: RoadmapData): Promise<SavedRoadmap> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/roadmaps/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(roadmap),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при сохранении карты:', error);
    throw error;
  }
};

// Функция для получения сохраненных карт пользователя
export const getSavedRoadmaps = async (): Promise<SavedRoadmap[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/roadmaps/saved`, {
      method: 'GET',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при получении сохраненных карт:', error);
    throw error;
  }
};

// Функция для удаления сохраненной карты
export const deleteRoadmap = async (roadmapId: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/roadmaps/${roadmapId}`, {
      method: 'DELETE',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Ошибка при удалении карты:', error);
    throw error;
  }
};

// Функция для регистрации пользователя
export const registerUser = async (userData: { name: string; email: string; password: string }): Promise<{ token: string; user: User }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    throw error;
  }
};

// Функция для входа пользователя
export const loginUser = async (credentials: { email: string; password: string }): Promise<{ token: string; user: User }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при входе:', error);
    throw error;
  }
};

// Функция для выхода пользователя
export const logoutUser = async (): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });
  } catch (error) {
    console.error('Ошибка при выходе:', error);
    // Даже если сервер недоступен, очищаем локальное хранилище
  }
};

// Функция для получения данных текущего пользователя
export const getCurrentUser = async (): Promise<User> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    throw error;
  }
};

// Функция для проверки доступности API
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('API недоступен:', error);
    return false;
  }
};