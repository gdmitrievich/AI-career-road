import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRoadmap } from '../../services/aiService';

const SkillMapGenerator = () => {
  const [vacancyUrl, setVacancyUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClear = () => {
    setVacancyUrl('');
    setError(null);
  };

  const handleGenerate = async () => {
    if (!vacancyUrl.trim()) {
      setError('Пожалуйста, введите ссылку на вакансию');
      return;
    }

    // Базовая валидация URL
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(vacancyUrl)) {
      setError('Пожалуйста, введите корректную ссылку');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const roadmapData = await generateRoadmap(vacancyUrl);

      // Сохраняем карту в localStorage
      const roadmapWithTimestamp = {
        ...roadmapData,
        generatedAt: new Date().toISOString()
      };
      localStorage.setItem('lastRoadmap', JSON.stringify(roadmapWithTimestamp));

      navigate('/roadmap', { state: { roadmapData } });
    } catch (error) {
      console.error('Ошибка при генерации карты:', error);
      setError('Произошла ошибка при генерации карты. Пожалуйста, проверьте ссылку и попробуйте еще раз.');
      // НЕ переходим на страницу с mock данными при ошибке
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для перехода к Mock данным
  const handleViewMockData = () => {
    navigate('/roadmap', { state: { useMockData: true } });
  };

 return (
    <div className="min-h-screen bg-white">
      {/* Основной контент */}
      <div className="container mx-auto px-4 py-12">
        {/* Заголовок и описание */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Создайте карьерную карту <span className="text-red-600">за 2 минуты</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            AI-ассистент проанализирует вакансию и создаст персонализированный план развития 
            с навыками, ресурсами и проектами для практики
          </p>
        </div>

        {/* Основная форма */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <label htmlFor="vacancy-url" className="block text-lg font-medium text-gray-900 mb-3">
                Ссылка на вакансию
              </label>
              <input
                id="vacancy-url"
                type="text"
                value={vacancyUrl}
                onChange={(e) => {
                  setVacancyUrl(e.target.value);
                  setError(null); // Сбрасываем ошибку при изменении
                }}
                placeholder="https://hh.ru/vacancy/..."
                className={`w-full px-6 py-4 text-base border rounded-xl 
                         focus:outline-none focus:ring-4 focus:border-red-500
                         transition-all duration-300 placeholder-gray-400
                         hover:border-gray-400
                         ${error ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:ring-red-100'}`}
                disabled={isLoading}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleClear}
                disabled={isLoading}
                className="flex-1 py-4 px-6 text-base font-medium text-gray-700 
                         bg-white border-2 border-gray-300 rounded-xl transition-all duration-300
                         hover:bg-gray-50 hover:border-gray-400 hover:shadow-md
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Очистить
              </button>

              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="flex-1 py-4 px-6 text-base font-medium text-white 
                         bg-linear-to-r from-red-600 to-red-700 rounded-xl 
                         transition-all duration-300 hover:from-red-700 hover:to-red-800
                         hover:shadow-lg transform hover:scale-[1.02]
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Анализируем вакансию...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Создать карту навыков</span>
                  </>
                )}
              </button>
            </div>

            {/* Техническая кнопка для Mock данных */}
            <div className="mt-6 text-center">
              <button
                onClick={handleViewMockData}
                className="text-red-600 hover:text-red-700 font-medium underline transition-colors text-sm"
              >
                Mock карта
              </button>
            </div>
          </div>
        </div>

        {/* Преимущества */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Как это работает?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Анализ вакансии</h3>
              <p className="text-gray-600">
                AI изучает требования и выделяет ключевые навыки, необходимые для позиции
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Структурированный план</h3>
              <p className="text-gray-600">
                Преобразуем хаотичные требования в четкую последовательность изучения
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Практические проекты</h3>
              <p className="text-gray-600">
                Получите реальные проекты для закрепления навыков и портфолио
              </p>
            </div>
          </div>
        </div>

        {/* Пример результата */}
        <div className="max-w-4xl mx-auto bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Что вы получите?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Дорожная карта навыков
              </h4>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Пошаговый план изучения</li>
                <li>• Приоритизация навыков</li>
                <li>• Логические связи между темами</li>
                <li>• Рекомендуемые ресурсы</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Практические проекты
              </h4>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Реальные кейсы для портфолио</li>
                <li>• Разные уровни сложности</li>
                <li>• Конкретные требования</li>
                <li>• Привязка к изучаемым навыкам</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillMapGenerator;