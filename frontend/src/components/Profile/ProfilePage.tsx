import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User, SavedRoadmap } from '../../types/roadmap';
import { getSavedRoadmaps } from '../../services/aiService';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [savedRoadmaps, setSavedRoadmaps] = useState<SavedRoadmap[]>([]);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
      
      // Загружаем сохраненные карты из localStorage
      loadSavedRoadmaps();
    } else {
      navigate('/login');
    }
  }, [navigate]);

const loadSavedRoadmaps = async () => {
  try {
    // Попытка загрузить из API
    const token = localStorage.getItem('token');
    if (token) {
      const saved = await getSavedRoadmaps();
      setSavedRoadmaps(saved);
      return;
    }
  } catch (apiError) {
    console.log('API недоступен, загружаем локально:', apiError);
  }
  
  // Fallback: загрузка из localStorage
  const saved = localStorage.getItem('savedRoadmaps');
  if (saved) {
    try {
      const roadmaps = JSON.parse(saved);
      setSavedRoadmaps(roadmaps);
    } catch (error) {
      console.error('Ошибка при загрузке сохраненных карт:', error);
      setSavedRoadmaps([]);
    }
  }
};

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleCreateNewRoadmap = () => {
    navigate('/');
  };

  const handleOpenRoadmap = (roadmap: SavedRoadmap) => {
    navigate('/roadmap', { state: { roadmapData: roadmap } });
  };

  const handleDeleteRoadmap = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (window.confirm('Вы уверены, что хотите удалить эту карту?')) {
      const updatedRoadmaps = savedRoadmaps.filter(roadmap => roadmap.id !== id);
      setSavedRoadmaps(updatedRoadmaps);
      localStorage.setItem('savedRoadmaps', JSON.stringify(updatedRoadmaps));
    }
  };

  const handleClearAllRoadmaps = () => {
    if (savedRoadmaps.length === 0) return;
    
    if (window.confirm('Вы уверены, что хотите удалить все сохраненные карты?')) {
      setSavedRoadmaps([]);
      localStorage.removeItem('savedRoadmaps');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
        </div>

        {/* Основной контент */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          {/* Информация о пользователе */}
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-red-600">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                
                <div className="mt-4 flex flex-wrap gap-4">
                  <button
                    onClick={handleCreateNewRoadmap}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Создать новую карту
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Сохраненные карты */}
          <div className="px-6 py-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Мои карты навыков</h3>
                <p className="text-gray-600 mt-1">
                  {savedRoadmaps.length > 0 
                    ? `У вас сохранено ${savedRoadmaps.length} карт`
                    : 'Начните создавать и сохранять карты навыков'
                  }
                </p>
              </div>
              
              {savedRoadmaps.length > 0 && (
                <button
                  onClick={handleClearAllRoadmaps}
                  className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-sm"
                >
                  Удалить все
                </button>
              )}
            </div>
            
            {savedRoadmaps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedRoadmaps.map((roadmap) => (
                  <div 
                    key={roadmap.id}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-red-200 cursor-pointer group relative"
                    onClick={() => handleOpenRoadmap(roadmap)}
                  >
                    {/* Кнопка удаления */}
                    <button
                      onClick={(e) => handleDeleteRoadmap(roadmap.id, e)}
                      className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50 hover:text-red-600 z-10"
                      title="Удалить карту"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    
                    {/* Заголовок и дата */}
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {roadmap.roadmap_metadata.job_specialization}
                      </h4>
                      {roadmap.savedAt && (
                        <p className="text-sm text-gray-500">
                          Сохранено: {new Date(roadmap.savedAt).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                    
                    {/* Статистика */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">
                          {roadmap.learning_path.skills.length} навыков
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">
                          {roadmap.pet_projects.length} проектов
                        </span>
                      </div>
                    </div>
                    
                    {/* Вакансия (если есть) */}
                    {roadmap.roadmap_metadata.vacancy_url && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500 truncate" title={roadmap.roadmap_metadata.vacancy_url}>
                          📄 {roadmap.roadmap_metadata.vacancy_url}
                        </p>
                      </div>
                    )}
                    
                    {/* Кнопка открытия */}
                    <div className="mt-4">
                      <button
                        onClick={() => handleOpenRoadmap(roadmap)}
                        className="w-full py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium group-hover:bg-red-100"
                      >
                        Открыть карту
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Нет сохраненных карт</h4>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Создайте свою первую карту навыков на основе вакансии
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleCreateNewRoadmap}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Создать первую карту
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;