import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { RoadmapData, MainSkill, SubSkill, Project } from '../../types/roadmap';
import RoadmapNode from './RoadmapNode';
import SkillModal from './SkillModal';
import ProjectModal from './ProjectModal';

const RoadmapPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSkill, setSelectedSkill] = useState<MainSkill | SubSkill | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const roadmapDataFromAI = location.state?.roadmapData;
  

  // Mock данные от ИИ
  const mockRoadmapData: RoadmapData = {
    roadmap_metadata: {
      job_title: "Fullstack Developer",
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
        },
        {
          skill_id: "skill_4",
          skill_name: "Testing & QA",
          skill_description: "Обеспечение качества и тестирование",
          position_in_sequence: 4,
          position_reason: "Неотъемлемая часть профессиональной разработки. Изучается параллельно с основными технологиями для формирования привычки писать тесты.",
          learning_resources: [],
          sub_skills: [
            { 
              sub_skill_id: "sub_skill_7", 
              sub_skill_name: "Unit Testing", 
              sub_skill_description: "Модульное тестирование", 
              position_in_sequence: 1,
              position_reason: "Базовый уровень тестирования. Проверяет отдельные компоненты приложения изолированно от остальной системы.",
              learning_resources: [] 
            },
            { 
              sub_skill_id: "sub_skill_8", 
              sub_skill_name: "Integration Testing", 
              sub_skill_description: "Интеграционное тестирование", 
              position_in_sequence: 2,
              position_reason: "Проверяет взаимодействие между различными модулями приложения. Следует за модульным тестированием.",
              learning_resources: [] 
            },
            { 
              sub_skill_id: "sub_skill_9", 
              sub_skill_name: "E2E Testing", 
              sub_skill_description: "End-to-end тестирование", 
              position_in_sequence: 3,
              position_reason: "Тестирование полного потока приложения от начала до конца. Имитирует поведение реального пользователя.",
              learning_resources: [] 
            },
            { 
              sub_skill_id: "sub_skill_10", 
              sub_skill_name: "Test Automation", 
              sub_skill_description: "Автоматизация тестирования", 
              position_in_sequence: 4,
              position_reason: "Автоматизация процессов тестирования для повышения эффективности и покрытия тестами.",
              learning_resources: [] 
            }
          ]
        },
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

  // Используем данные от AI или mock данные
  const roadmapData = roadmapDataFromAI || mockRoadmapData;

  // Функция для преобразования difficulty_level в старый формат
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
          bg: '#96FFA9',
          text: '#1E8130',
          label: 'Легкий'
        };
      case 'medium':
        return {
          bg: '#FED783',
          text: '#9F7823',
          label: 'Средний'
        };
      case 'hard':
        return {
          bg: '#F77A7A',
          text: '#8D0303',
          label: 'Сложный'
        };
      default:
        return {
          bg: '#ECECEC',
          text: '#656565',
          label: 'Неизвестно'
        };
    }
  };

  // Функция для получения названия навыка по ID
  const getSkillNameById = (skillId: string): string => {
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
    if (!selectedSkill) return [];
    
    // Если выбран главный навык, возвращаем все его поднавыки
    if ('sub_skills' in selectedSkill) {
      return selectedSkill.sub_skills;
    }
    
    // Если выбран поднавык, находим родительский навык и возвращаем все связанные навыки
    const parentSkill = roadmapData.learning_path.skills.find((mainSkill: MainSkill) =>
      mainSkill.sub_skills.some((subSkill: SubSkill) => subSkill.sub_skill_id === (selectedSkill as SubSkill).sub_skill_id)
    );
    
    if (!parentSkill) return [];

    // Для поднавыка возвращаем: родительский навык + все поднавыки того же родителя
    return [
      parentSkill,
      ...parentSkill.sub_skills.filter((subSkill: SubSkill) => subSkill.sub_skill_id !== (selectedSkill as SubSkill).sub_skill_id)
    ];
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      {/* Кнопка возврата */}
      <button
        onClick={handleBackToGenerator}
        className="w-full max-w-[240px] h-12 bg-white border border-black rounded-lg flex items-center justify-center gap-2 mb-6 md:mb-8 hover:bg-gray-50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md mx-auto md:mx-0"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[16px] md:text-[18px] font-medium">Создать новую карту</span>
      </button>

      {/* Заголовок */}
      <div className="text-center mb-8">
        <h1 className="text-[24px] md:text-[32px] font-medium text-black mb-6 md:mb-8">
          Основываясь на анализе вакансии, <br/> вот рекомендуемый план
        </h1>
        
        {/* Блок с темой */}
        <div className="w-full max-w-[500px] h-[110px] md:h-[130px] border-[6px] border-black rounded-xl mx-auto mb-8 md:mb-16 flex items-center justify-center bg-gradient-to-br from-white to-gray-50 shadow-2xl relative">
          <h2 className="text-[28px] md:text-[32px] font-bold text-black text-center px-6">
            {roadmapData.roadmap_metadata.job_specialization}
          </h2>
        </div>
      </div>

      {/* Дорожная карта навыков */}
      <div className="max-w-7xl mx-auto relative">
        {/* Непрерывная центральная вертикальная линия */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 transform -translate-x-1/2 z-0"></div>
        
        {/* Контейнер для всех главных навыков */}
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

      {/* Раздел Рекомендуемые проекты */}
      <div className="max-w-7xl mx-auto mt-48 md:mt-64 lg:mt-80">
        {/* Заголовок раздела */}
        <div className="w-[389px] h-[96px] border-[4px] border-black rounded-[6px] mx-auto mb-12 flex flex-col items-center justify-center transition-all duration-500 ease-out">
          <h2 className="text-[24px] font-medium text-black mb-1">
            Рекомендуемые проекты
          </h2>
          <p className="text-[20px] font-normal text-black">
            Пет-проекты для освоения профессии
          </p>
        </div>

        {/* Сетка проектов */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[95px] gap-y-[50px] max-w-[1077px] mx-auto">
          {roadmapData.pet_projects.map((project: Project) => {
            const difficulty = getDifficulty(project.difficulty_level);
            const difficultyStyles = getDifficultyStyles(difficulty);
            
            return (
              <div 
                key={project.project_id}
                onClick={() => handleProjectClick(project)}
                className="w-full md:w-[491px] h-[221px] border-[6px] border-[#D9D9D9] rounded-lg p-6 cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-[1.02] hover:shadow-2xl hover:border-gray-400"
              >
                {/* Заголовок проекта и сложность */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-[24px] font-medium text-black flex-1 pr-4">
                    {project.project_name}
                  </h3>
                  <div 
                    className="w-[57px] h-6 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110"
                    style={{ 
                      backgroundColor: difficultyStyles.bg,
                      color: difficultyStyles.text
                    }}
                  >
                    <span className="text-[12px] font-normal">
                      {difficultyStyles.label}
                    </span>
                  </div>
                </div>

                {/* Описание проекта */}
                <p className="text-[16px] font-normal text-[#656565] mb-6 line-clamp-2">
                  {project.project_description}
                </p>

                {/* Список требуемых навыков */}
                <div className="flex flex-wrap gap-2">
                  {project.required_skills.map((skillId: string, index: number) => {
                    // Находим название навыка по ID
                    const skill = roadmapData.learning_path.skills.find((s: MainSkill) => s.skill_id === skillId);
                    const skillName = skill ? skill.skill_name : skillId;
                    
                    return (
                      <div 
                        key={index}
                        className="h-6 bg-[#ECECEC] rounded-[10px] px-3 flex items-center justify-center transition-all duration-300 hover:bg-gray-300 hover:scale-105"
                      >
                        <span className="text-[13px] font-normal text-black">
                          {skillName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Модальное окно навыка */}
      {selectedSkill && (
        <SkillModal
          skill={selectedSkill}
          relatedSkills={getRelatedSkills()}
          onClose={handleCloseModal}
          onSkillClick={handleSkillClick}
        />
      )}

      {/* Модальное окно проекта */}
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