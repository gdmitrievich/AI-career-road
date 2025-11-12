import type { Project } from '../../types/roadmap';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  getDifficulty: (level: 'beginner' | 'intermediate' | 'advanced') => 'easy' | 'medium' | 'hard';
  getDifficultyStyles: (difficulty: 'easy' | 'medium' | 'hard') => { bg: string; text: string; label: string };
  getSkillName: (skillId: string) => string; // Добавляем новую пропсу
}

const ProjectModal = ({ project, onClose, getDifficulty, getDifficultyStyles, getSkillName }: ProjectModalProps) => {
  const difficulty = getDifficulty(project.difficulty_level);
  const difficultyStyles = getDifficultyStyles(difficulty);

  return (
    <>
      {/* Затемнение фона с анимацией */}
      <div 
        className="fixed inset-0 bg-black z-40 transition-all duration-500 ease-in-out"
        style={{ opacity: 0.3 }}
        onClick={onClose}
      />
      
      {/* Модальное окно с анимацией */}
      <div className="fixed right-0 top-0 h-full w-1/3 bg-white z-50 overflow-y-auto border-[5px] border-[#D9D9D9] transform transition-all duration-500 ease-in-out animate-slide-in-right">
        {/* Внутренний контейнер */}
        <div className="p-6">
          
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 mb-8 transition-all duration-300 ease-in-out hover:opacity-70 hover:scale-105"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-lg">Назад</span>
          </button>

          {/* Название проекта и сложность */}
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-[48px] font-normal flex-1 pr-4 transition-all duration-500 ease-out">
              {project.project_name}
            </h2>
            <div 
              className="w-[57px] h-[24px] rounded-[10px] flex items-center justify-center flex-shrink-0 mt-2 transition-all duration-300 ease-in-out hover:scale-110"
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
          <div className="mb-8 transition-all duration-500 ease-out">
            <p className="text-[20px] font-normal text-[#656565]">
              {project.project_description}
            </p>
          </div>

          {/* Критерии успеха */}
          <div className="mb-8 transition-all duration-500 ease-out">
            <h3 className="text-[24px] font-normal mb-4">
              Требования к проекту
            </h3>
            <ul className="space-y-2">
              {project.success_criteria.map((criterion, index) => (
                <li key={index} className="flex items-start transition-all duration-300 ease-in-out hover:bg-gray-50 hover:rounded-lg hover:px-2 hover:py-1">
                  <span className="text-[20px] font-normal text-[#656565] mr-2">•</span>
                  <span className="text-[20px] font-normal text-[#656565] flex-1">
                    {criterion}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Требуемые навыки */}
          <div className="transition-all duration-500 ease-out">
            <h3 className="text-[24px] font-normal mb-4">
              Навыки
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.required_skills.map((skillId, index) => (
                <div 
                  key={index}
                  className="h-[24px] bg-[#ECECEC] rounded-[10px] px-3 flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-gray-300 hover:scale-105"
                >
                  <span className="text-[13px] font-normal text-black">
                    {getSkillName(skillId)} {/* Используем переданную функцию */}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;