import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRoadmap } from '../../services/aiService'

const SkillMapGenerator = () => {
  const [vacancyUrl, setVacancyUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClear = () => {
    setVacancyUrl('');
  };

  const handleGenerate = async () => {
    if (vacancyUrl) {
      setIsLoading(true);
      try {
        // Вызов AI сервиса
        const roadmapData = await generateRoadmap(vacancyUrl);
        // Переход на страницу roadmap с данными
        navigate('/roadmap', { state: { roadmapData } });
      } catch (error) {
        console.error('Ошибка при генерации карты:', error);
        alert('Произошла ошибка при генерации карты. Пожалуйста, попробуйте еще раз.');
        // На случай ошибки переходим на страницу с mock данными
        navigate('/roadmap');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Пожалуйста, введите ссылку на вакансию');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center w-full max-w-2xl">
        <h1 className="text-[40px] font-bold text-[#000000] mb-6 leading-tight transition-all duration-500 ease-out hover:opacity-80">
          Создайте Карту Своих Навыков
        </h1>
        
        <p className="text-[16px] font-normal text-[#000000] mb-8 transition-all duration-500 ease-out hover:opacity-80">
          Вставьте ссылку на вакансию ниже, чтобы сгенерировать карту!
        </p>

        <div className="mb-8 transition-all duration-500 ease-out">
          <input
            type="text"
            value={vacancyUrl}
            onChange={(e) => setVacancyUrl(e.target.value)}
            placeholder="Вставьте ссылку на вакансию"
            className="w-full px-4 py-3 text-[14px] font-normal placeholder:opacity-50 
                     border border-gray-300 rounded-lg focus:outline-none focus:ring-2 
                     focus:ring-gray-400 focus:border-transparent transition-all duration-300 ease-in-out
                     hover:border-gray-400 hover:shadow-md transform hover:scale-[1.01]"
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleClear}
            disabled={isLoading}
            className="flex-1 max-w-[200px] py-3 px-6 text-[16px] font-medium text-[#000000] 
                     bg-white border border-[#000000] rounded-lg transition-all duration-300 ease-in-out
                     hover:bg-gray-200 hover:shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Очистить
          </button>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex-1 max-w-[280px] py-3 px-6 text-[16px] font-medium text-[#FFFFFF] 
                     bg-[#000000] border border-[#000000] rounded-lg transition-all duration-300 ease-in-out
                     hover:bg-gray-800 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Генерация...
              </>
            ) : (
              'Создать Карту'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillMapGenerator;