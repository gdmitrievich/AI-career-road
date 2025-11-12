import type { RoadmapData } from '../types/roadmap';

export const generateRoadmap = async (vacancyUrl: string): Promise<RoadmapData> => {
  // Здесь будет вызов к бэкенду/ИИ
  const response = await fetch('/api/generate-roadmap', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: vacancyUrl }),
  });

  if (!response.ok) {
    throw new Error('Ошибка при генерации дорожной карты');
  }

  const data = await response.json();
  return data as RoadmapData;
};