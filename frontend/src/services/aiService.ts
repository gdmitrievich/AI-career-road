import type { RoadmapData, SavedRoadmap, User } from '../types/roadmap';
import {
  localRegister,
  localLogin,
  localLogout,
  localGetCurrentUser
} from './localAuthService';

const API_BASE_URL = '/api';

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

// НОВАЯ ФУНКЦИЯ: проверка доступности бэкенда только для генерации
const isBackendAvailableForGeneration = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Уменьшаем таймаут для более быстрой проверки
      signal: AbortSignal.timeout(2000)
    });
    return response.ok;
  } catch (error) {
    console.log('Бэкенд недоступен для генерации роадмапа');
    return false;
  }
};

// ФУНКЦИЯ GENERATE ТОЛЬКО С БЭКЕНДОМ
export const generateRoadmap = async (vacancyUrl: string): Promise<RoadmapData> => {
  try {
    const backendAvailable = await isBackendAvailableForGeneration();

    if (!backendAvailable) {
      throw new Error('Бэкенд недоступен для генерации роадмапа');
    }

    const response = await fetch(`${API_BASE_URL}/roadmaps`, {
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
    throw error; // Пробрасываем ошибку дальше
  }
};

// ВСЕ ОСТАЛЬНЫЕ ФУНКЦИИ - ТОЛЬКО ЛОКАЛЬНЫЕ

// Функция для сохранения карты (ТОЛЬКО ЛОКАЛЬНО)
export const saveRoadmap = async (roadmap: RoadmapData): Promise<SavedRoadmap> => {
  try {
    // Всегда используем локальное сохранение
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
  } catch (error) {
    console.error('Ошибка при локальном сохранении роадмапа:', error);
    throw error;
  }
};

// Функция для получения сохраненных карт (ТОЛЬКО ЛОКАЛЬНО)
export const getSavedRoadmaps = async (): Promise<SavedRoadmap[]> => {
  try {
    const savedRoadmapsStr = localStorage.getItem('savedRoadmaps');
    return savedRoadmapsStr ? JSON.parse(savedRoadmapsStr) : [];
  } catch (error) {
    console.error('Ошибка при получении локальных роадмапов:', error);
    return [];
  }
};

// Функция для удаления сохраненной карты (ТОЛЬКО ЛОКАЛЬНО)
export const deleteRoadmap = async (roadmapId: string): Promise<void> => {
  try {
    const savedRoadmapsStr = localStorage.getItem('savedRoadmaps');
    if (savedRoadmapsStr) {
      const savedRoadmaps: SavedRoadmap[] = JSON.parse(savedRoadmapsStr);
      const updatedRoadmaps = savedRoadmaps.filter(roadmap => roadmap.id !== roadmapId);
      localStorage.setItem('savedRoadmaps', JSON.stringify(updatedRoadmaps));
    }
  } catch (error) {
    console.error('Ошибка при локальном удалении роадмапа:', error);
    throw error;
  }
};

// Функция для регистрации пользователя (ТОЛЬКО ЛОКАЛЬНО)
export const registerUser = async (userData: { name: string; email: string; password: string }): Promise<{ token: string; user: User }> => {
  try {
    return await localRegister(userData);
  } catch (error) {
    console.error('Ошибка при локальной регистрации:', error);
    throw error;
  }
};

// Функция для входа пользователя (ТОЛЬКО ЛОКАЛЬНО)
export const loginUser = async (credentials: { email: string; password: string }): Promise<{ token: string; user: User }> => {
  try {
    return await localLogin(credentials);
  } catch (error) {
    console.error('Ошибка при локальном входе:', error);
    throw error;
  }
};

// Функция для выхода пользователя (ТОЛЬКО ЛОКАЛЬНО)
export const logoutUser = async (): Promise<void> => {
  try {
    await localLogout();
  } catch (error) {
    console.error('Ошибка при локальном выходе:', error);
    throw error;
  }
};

// Функция для получения данных текущего пользователя (ТОЛЬКО ЛОКАЛЬНО)
export const getCurrentUser = async (): Promise<User> => {
  try {
    const user = await localGetCurrentUser();
    if (!user) {
      throw new Error('Пользователь не авторизован');
    }
    return user;
  } catch (error) {
    console.error('Ошибка при получении текущего пользователя:', error);
    throw error;
  }
};

// Опционально: функция для проверки доступности API для генерации
export const canGenerateRoadmap = async (): Promise<boolean> => {
  return await isBackendAvailableForGeneration();
};