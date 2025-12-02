import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { RoadmapData, MainSkill, SubSkill, Project, SavedRoadmap } from '../../types/roadmap';
import RoadmapNode from './RoadmapNode';
import SkillModal from './SkillModal';
import ProjectModal from './ProjectModal';
import { saveRoadmap } from '../../services/aiService';


const RoadmapPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSkill, setSelectedSkill] = useState<MainSkill | SubSkill | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const roadmapDataFromAI = location.state?.roadmapData;
  const useMockData = location.state?.useMockData;

  // Mock данные от ИИ
  const mockRoadmapData: RoadmapData = {
    roadmap_metadata: {
      job_specialization: "Fullstack Web Development",
      vacancy_url: "https://hh.ru/vacancy/123456"
    },
    learning_path: {
      skills: [
        {
          skill_id: "skill_1",
          skill_name: "Frontend Development",
          skill_description: "Разработка пользовательского интерфейса с использованием современных технологий",
          position_in_sequence: 1,
          position_reason: "Основная часть веб-приложения, с которой взаимодействует пользователь. Изучается первой, так как формирует базовое понимание веб-разработки.",
          learning_resources: [
            {
              id: "resource_1",
              name: "React Official Documentation",
              url: "https://reactjs.org",
              type: "documentation"
            },
            {
              id: "resource_2",
              name: "MDN Web Docs",
              url: "https://developer.mozilla.org",
              type: "documentation"
            }
          ],
          sub_skills: [
            { 
              sub_skill_id: "sub_skill_1", 
              sub_skill_name: "React & TypeScript", 
              sub_skill_description: "Создание компонентов с TypeScript", 
              position_in_sequence: 1,
              position_reason: "Современный стандарт фронтенд-разработки. TypeScript добавляет типизацию к JavaScript, что повышает надежность кода.",
              learning_resources: [
                {
                  id: "resource_3",
                  name: "TypeScript Handbook",
                  url: "https://www.typescriptlang.org/docs",
                  type: "documentation"
                }
              ]
            },
          ]
        },
        {
          skill_id: "skill_2", 
          skill_name: "Backend Development",
          skill_description: "Создание серверной части приложения и API",
          position_in_sequence: 2,
          position_reason: "Логика приложения и работа с данными. Изучается после фронтенда, так как требует понимания того, как клиентская часть взаимодействует с сервером.",
          learning_resources: [],
          sub_skills: [
            { 
              sub_skill_id: "sub_skill_2", 
              sub_skill_name: "Node.js & Express", 
              sub_skill_description: "Создание REST API", 
              position_in_sequence: 1,
              position_reason: "Node.js позволяет использовать JavaScript на сервере, что упрощает переход с фронтенда. Express - самый популярный фреймворк для Node.js.",
              learning_resources: [] 
            },
            { 
              sub_skill_id: "sub_skill_3", 
              sub_skill_name: "Database Design", 
              sub_skill_description: "Проектирование баз данных", 
              position_in_sequence: 2,
              position_reason: "Фундаментальный навык для работы с данными. Понимание баз данных необходимо для создания масштабируемых приложений.",
              learning_resources: [] 
            },
          ]
        },
        {
          skill_id: "skill_3",
          skill_name: "DevOps & Deployment",
          skill_description: "Развертывание и мониторинг приложений",
          position_in_sequence: 3,
          position_reason: "Завершающий этап разработки. Изучается после освоения фронтенда и бэкенда, так как требует понимания всего приложения целиком.",
          learning_resources: [],
          sub_skills: [
            { 
              sub_skill_id: "sub_skill_4", 
              sub_skill_name: "Containerization", 
              sub_skill_description: "Docker и контейнеризация", 
              position_in_sequence: 1,
              position_reason: "Стандарт для развертывания приложений. Позволяет создавать изолированные среды для надежного деплоя.",
              learning_resources: [] 
            },
            { 
              sub_skill_id: "sub_skill_5", 
              sub_skill_name: "CI/CD Pipelines", 
              sub_skill_description: "Настройка автоматических pipelines", 
              position_in_sequence: 2,
              position_reason: "Автоматизация процессов разработки и деплоя. Экономит время и снижает количество ошибок при выпуске новых версий.",
              learning_resources: [] 
            },
            { 
              sub_skill_id: "sub_skill_6", 
              sub_skill_name: "Monitoring", 
              sub_skill_description: "Мониторинг приложений", 
              position_in_sequence: 3,
              position_reason: "Критически важный навык для поддержки работающего приложения. Позволяет быстро обнаруживать и исправлять проблемы.",
              learning_resources: [] 
            }
          ]
        }
      ]
    },
    pet_projects: [
      {
        project_id: "project_1",
        project_name: "Персональный блог",
        project_description: "Создайте современный блог с системой комментариев и админ-панелью",
        difficulty_level: "beginner",
        required_skills: ["skill_1", "skill_2"],
        success_criteria: [
          "Реализация CRUD операций для статей",
          "Система комментариев с модерацией",
          "Админ-панель для управления контентом",
          "Аутентификация пользователей",
          "Адаптивный дизайн"
        ]
      },
      {
        project_id: "project_2",
        project_name: "Интернет-магазин",
        project_description: "Разработка полнофункционального интернет-магазина с корзиной и оплатой",
        difficulty_level: "intermediate",
        required_skills: ["skill_1", "skill_2"],
        success_criteria: [
          "Каталог товаров с фильтрацией и поиском",
          "Корзина покупок и оформление заказа",
          "Интеграция платежной системы",
          "Личный кабинет пользователя",
          "Система оценки и отзывов",
          "Панель управления для администратора"
        ]
      },
      {
        project_id: "project_3",
        project_name: "Приложение для учета финансов",
        project_description: "Финансовый трекер с аналитикой и визуализацией расходов",
        difficulty_level: "intermediate",
        required_skills: ["skill_1", "skill_2"],
        success_criteria: [
          "Учет доходов и расходов по категориям",
          "Визуализация данных с помощью графиков",
          "Система бюджетов и целей",
          "Экспорт данных в CSV/PDF",
          "Уведомления о перерасходе",
          "Мультивалютная поддержка"
        ]
      },
      {
        project_id: "project_4",
        project_name: "Платформа для онлайн-курсов",
        project_description: "Комплексная система для создания и продажи онлайн-курсов",
        difficulty_level: "advanced",
        required_skills: ["skill_1", "skill_2", "skill_3"],
        success_criteria: [
          "Система видеохостинга для лекций",
          "Интерактивные задания и тесты",
          "Прогресс студентов и аналитика",
          "Система сертификатов",
          "Интеграция с платежными системами",
          "Чат и форум для студентов",
          "Панель инструктора для управления курсами"
        ]
      }
    ]
  };

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    let data;
    
    // Если явно запрошены Mock данные или нет данных от AI, используем Mock
    if (useMockData || !roadmapDataFromAI) {
      data = mockRoadmapData;
    } else {
      data = roadmapDataFromAI;
      
      // Сохраняем в localStorage для кнопки возврата только реальные данные от AI
      const roadmapWithTimestamp = {
        ...data,
        generatedAt: new Date().toISOString()
      };
      localStorage.setItem('lastRoadmap', JSON.stringify(roadmapWithTimestamp));
    }
    
    setRoadmapData(data);
  }, [roadmapDataFromAI, useMockData]);

  // Функция для сохранения карты
const handleSaveRoadmap = async () => {
  if (!roadmapData) return;
  
  const user = localStorage.getItem('currentUser');
  if (!user) {
    alert('Для сохранения карты необходимо войти в аккаунт');
    navigate('/login');
    return;
  }
  
  setSaveStatus('saving');
  
  try {
    // Попытка сохранить через API (если бэкенд доступен)
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const savedRoadmap = await saveRoadmap(roadmapData);
        
        setSaveStatus('saved');
        setTimeout(() => {
          setSaveStatus('idle');
        }, 3000);
        return;
      }
    } catch (apiError) {
      console.log('API недоступен, сохраняем локально:', apiError);
      // Если API недоступен, продолжаем с localStorage
    }
    
    // Fallback: сохранение в localStorage
    const savedRoadmapsStr = localStorage.getItem('savedRoadmaps');
    const savedRoadmaps: SavedRoadmap[] = savedRoadmapsStr ? JSON.parse(savedRoadmapsStr) : [];
    
    const savedRoadmap: SavedRoadmap = {
      ...roadmapData,
      id: `roadmap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      savedAt: new Date().toISOString(),
    };
    
    const alreadyExists = savedRoadmaps.some(
      (item: SavedRoadmap) => 
        item.roadmap_metadata.vacancy_url === savedRoadmap.roadmap_metadata.vacancy_url &&
        item.roadmap_metadata.job_specialization === savedRoadmap.roadmap_metadata.job_specialization
    );
    
    if (alreadyExists) {
      alert('Эта карта уже сохранена в вашем профиле');
      setSaveStatus('idle');
      return;
    }
    
    savedRoadmaps.unshift(savedRoadmap);
    localStorage.setItem('savedRoadmaps', JSON.stringify(savedRoadmaps));
    
    setSaveStatus('saved');
    setTimeout(() => {
      setSaveStatus('idle');
    }, 3000);
    
  } catch (error) {
    console.error('Ошибка при сохранении карты:', error);
    setSaveStatus('error');
    setTimeout(() => {
      setSaveStatus('idle');
    }, 3000);
  }
};

  // Безопасные проверки на наличие данных
  const hasSkills = roadmapData?.learning_path?.skills && roadmapData.learning_path.skills.length > 0;
  const hasProjects = roadmapData?.pet_projects && roadmapData.pet_projects.length > 0;
  const hasMetadata = roadmapData?.roadmap_metadata?.job_specialization;

  // Функция для преобразования difficulty_level
  const getDifficulty = (level: 'beginner' | 'intermediate' | 'advanced'): 'easy' | 'medium' | 'hard' => {
    switch (level) {
      case 'beginner': return 'easy';
      case 'intermediate': return 'medium';
      case 'advanced': return 'hard';
      default: return 'medium';
    }
  };

  // Функция для получения стилей сложности
  const getDifficultyStyles = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy':
        return {
          bg: '#dcfce7',
          text: '#166534',
          label: 'Начинающий'
        };
      case 'medium':
        return {
          bg: '#fef3c7',
          text: '#92400e',
          label: 'Средний'
        };
      case 'hard':
        return {
          bg: '#fee2e2',
          text: '#991b1b',
          label: 'Продвинутый'
        };
      default:
        return {
          bg: '#f3f4f6',
          text: '#6b7280',
          label: 'Неизвестно'
        };
    }
  };

  // Функция для получения названия навыка по ID
  const getSkillNameById = (skillId: string): string => {
    if (!roadmapData?.learning_path?.skills) return skillId;
    const skill = roadmapData.learning_path.skills.find((s: MainSkill) => s.skill_id === skillId);
    return skill ? skill.skill_name : skillId;
  };

  const handleBackToGenerator = () => {
    navigate('/');
  };

  const handleSkillClick = (skill: MainSkill | SubSkill) => {
    setSelectedSkill(skill);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedSkill(null);
  };

  const handleCloseProjectModal = () => {
    setSelectedProject(null);
  };

  const getRelatedSkills = (): (MainSkill | SubSkill)[] => {
    if (!selectedSkill || !roadmapData?.learning_path?.skills) return [];
    
    // Если выбран главный навык, возвращаем все его поднавыки
    if ('sub_skills' in selectedSkill) {
      return selectedSkill.sub_skills || [];
    }
    
    // Если выбран поднавык, находим родительский навык и возвращаем все связанные навыки
    const parentSkill = roadmapData.learning_path.skills.find((mainSkill: MainSkill) =>
      mainSkill.sub_skills?.some((subSkill: SubSkill) => subSkill.sub_skill_id === (selectedSkill as SubSkill).sub_skill_id)
    );
    
    if (!parentSkill) return [];

    return [
      parentSkill,
      ...(parentSkill.sub_skills || []).filter((subSkill: SubSkill) => subSkill.sub_skill_id !== (selectedSkill as SubSkill).sub_skill_id)
    ];
  };

  // Если данных нет, показываем минималистичную страницу
  if (!roadmapData) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={handleBackToGenerator}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-lg font-medium">Создать новую карту</span>
          </button>
          
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Не удалось загрузить данные карты
            </h1>
            <p className="text-gray-600 mb-8">
              Пожалуйста, попробуйте создать новую карту навыков
            </p>
            <button
              onClick={handleBackToGenerator}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Создать новую карту
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Верхняя панель с кнопками */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        {/* Кнопка возврата */}
        <button
          onClick={handleBackToGenerator}
          className="w-full max-w-60 h-12 bg-white border border-black rounded-lg flex items-center justify-center gap-2 mb-6 md:mb-8 hover:bg-gray-50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md mx-auto md:mx-0"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-lg font-medium">Создать новую карту</span>
        </button>

          {/* Кнопка сохранения */}
          <div className="relative">
            <button
              onClick={handleSaveRoadmap}
              disabled={saveStatus === 'saving'}
              className="w-full md:w-auto h-12 px-6 bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saveStatus === 'saving' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Сохранение...</span>
                </>
              ) : saveStatus === 'saved' ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Сохранено!</span>
                </>
              ) : saveStatus === 'error' ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Ошибка</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>Сохранить карту</span>
                </>
              )}
            </button>
            
            {/* Уведомление о сохранении */}
            {saveStatus === 'saved' && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-green-50 text-green-800 text-sm px-3 py-2 rounded-lg shadow-md animate-fade-in">
                Карта успешно сохранена в вашем профиле
              </div>
            )}
            {saveStatus === 'error' && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-red-50 text-red-800 text-sm px-3 py-2 rounded-lg shadow-md animate-fade-in">
                Не удалось сохранить карту. Попробуйте снова.
              </div>
            )}
          </div>
        </div>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ваш персональный план развития
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Основываясь на анализе вакансии, мы подготовили рекомендации по изучению навыков и практические проекты
          </p>
        </div>
        
        {/* Блок с темой */}
        {hasMetadata && (
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-linear-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-8 text-center shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {roadmapData.roadmap_metadata.job_specialization}
              </h2>
              {roadmapData.roadmap_metadata.vacancy_url && (
                <p className="text-red-600 mt-2">
                  {roadmapData.roadmap_metadata.vacancy_url}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Дорожная карта навыков */}
        {hasSkills && (
          <div className="mb-20 md:mb-32 lg:mb-48">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                План навыков
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Пошаговый план изучения необходимых технологий и инструментов
              </p>
            </div>

            <div className="max-w-7xl mx-auto relative">
              {/* Центральная линия */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 transform -translate-x-1/2 z-0"></div>
              
              {/* Контейнер для навыков */}
              <div className="relative z-10">
                {roadmapData.learning_path.skills.map((mainSkill: MainSkill, index: number) => (
                  <RoadmapNode 
                    key={mainSkill.skill_id}
                    mainSkill={mainSkill}
                    position={index % 2 === 0 ? 'left' : 'right'}
                    isFirst={index === 0}
                    isLast={index === roadmapData.learning_path.skills.length - 1}
                    onSkillClick={handleSkillClick}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Раздел проектов */}
        {hasProjects && (
          <div className="max-w-7xl mx-auto mt-32 md:mt-40 lg:mt-48" >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Рекомендуемые проекты
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Реальные кейсы для закрепления навыков и пополнения портфолио
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {roadmapData.pet_projects.map((project: Project) => {
                const difficulty = getDifficulty(project.difficulty_level);
                const difficultyStyles = getDifficultyStyles(difficulty);
                
                return (
                  <div 
                    key={project.project_id}
                    onClick={() => handleProjectClick(project)}
                    className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-gray-300 group"
                  >
                    {/* Заголовок и сложность */}
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors flex-1 pr-4">
                        {project.project_name}
                      </h3>
                      <div 
                        className="px-3 py-1 rounded-full text-sm font-medium transition-transform group-hover:scale-105"
                        style={{ 
                          backgroundColor: difficultyStyles.bg,
                          color: difficultyStyles.text
                        }}
                      >
                        {difficultyStyles.label}
                      </div>
                    </div>

                    {/* Описание проекта */}
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {project.project_description}
                    </p>

                    {/* Требуемые навыки */}
                    <div className="flex flex-wrap gap-2">
                      {project.required_skills?.map((skillId: string, index: number) => {
                        const skillName = getSkillNameById(skillId);
                        return (
                          <div 
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm transition-colors group-hover:bg-gray-200"
                          >
                            {skillName}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Сообщение если совсем нет данных */}
        {!hasSkills && !hasProjects && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Данные не найдены
              </h3>
              <p className="text-gray-600 mb-6">
                Не удалось сгенерировать карту навыков для данной вакансии
              </p>
              <button
                onClick={handleBackToGenerator}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Попробовать снова
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Модальные окна */}
      {selectedSkill && (
        <SkillModal
          skill={selectedSkill}
          relatedSkills={getRelatedSkills()}
          onClose={handleCloseModal}
          onSkillClick={handleSkillClick}
        />
      )}

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseProjectModal}
          getDifficulty={getDifficulty}
          getDifficultyStyles={getDifficultyStyles}
          getSkillName={getSkillNameById}
        />
      )}
    </div>
  );
};

export default RoadmapPage;