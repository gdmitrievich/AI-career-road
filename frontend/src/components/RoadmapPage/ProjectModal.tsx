import type { Project } from '../../types/roadmap';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  getDifficulty: (level: 'beginner' | 'intermediate' | 'advanced') => 'easy' | 'medium' | 'hard';
  getDifficultyStyles: (difficulty: 'easy' | 'medium' | 'hard') => { bg: string; text: string; label: string };
  getSkillName: (skillId: string) => string;
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
            <h2 className="text-[32px] font-bold flex-1 pr-4 transition-all duration-500 ease-out">
              {project.project_name}
            </h2>
            <div 
              className="px-4 py-2 rounded-full flex items-center justify-center shrink-0 mt-2 transition-all duration-300 ease-in-out hover:scale-105 min-w-[100px]"
              style={{ 
                backgroundColor: difficultyStyles.bg,
                color: difficultyStyles.text
              }}
            >
              <span className="text-[14px] font-medium whitespace-nowrap">
                {difficultyStyles.label}
              </span>
            </div>
          </div>

          {/* Описание проекта */}
          <div className="mb-8 transition-all duration-500 ease-out">
            <p className="text-[18px] font-normal text-gray-600 leading-relaxed">
              {project.project_description}
            </p>
          </div>

          {/* Критерии успеха */}
          <div className="mb-8 transition-all duration-500 ease-out">
            <h3 className="text-[24px] font-bold mb-4">
              Требования к проекту
            </h3>
            <ul className="space-y-3">
              {project.success_criteria.map((criterion, index) => (
                <li key={index} className="flex items-start transition-all duration-300 ease-in-out hover:bg-gray-50 hover:rounded-lg hover:px-3 hover:py-2">
                  <span className="text-[18px] font-normal text-gray-600 mr-3 mt-1">•</span>
                  <span className="text-[18px] font-normal text-gray-600 flex-1 leading-relaxed">
                    {criterion}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Требуемые навыки */}
          <div className="transition-all duration-500 ease-out">
            <h3 className="text-[24px] font-bold mb-4">
              Необходимые навыки
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.required_skills.map((skillId, index) => (
                <div 
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-200 hover:scale-105"
                >
                  <span className="text-[14px] font-medium">
                    {getSkillName(skillId)}
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