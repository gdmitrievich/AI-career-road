import type { MainSkill, SubSkill } from '../../types/roadmap';

interface SkillModalProps {
  skill: MainSkill | SubSkill;
  relatedSkills?: (MainSkill | SubSkill)[];
  onClose: () => void;
  onSkillClick: (skill: MainSkill | SubSkill) => void;
}

const SkillModal = ({ skill, relatedSkills = [], onClose, onSkillClick }: SkillModalProps) => {
  // Определяем, является ли навык главным
  const isMainSkill = 'skill_id' in skill;

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
        {/* Внутренний контейнер без границы */}
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

          {/* Название навыка */}
          <h2 className="text-[48px] font-normal text-center mb-8 transition-all duration-500 ease-out">
            {isMainSkill ? skill.skill_name : skill.sub_skill_name}
          </h2>

          {/* Форма с описанием */}
          <div className="border-[5px] border-[#D9D9D9] rounded-lg p-6 mb-8 transition-all duration-500 ease-out">
            <p className="text-lg">
              {isMainSkill ? skill.skill_description : skill.sub_skill_description}
            </p>
          </div>



          {/* Подборка ресурсов */}
          <h3 className="text-[24px] font-normal mb-6 transition-all duration-500 ease-out">
            Подборка ресурсов для изучения
          </h3>

          <div className="space-y-4 mb-8">
            {skill.learning_resources && skill.learning_resources.map((resource, index) => (
              <div 
                key={resource.id}
                className="border-[5px] border-[#D9D9D9] rounded-lg p-4 flex justify-between items-start transition-all duration-500 ease-in-out hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="flex-1">
                  <h4 className="text-[24px] font-normal mb-2">
                    {resource.name}
                  </h4>
                  <p className="text-[20px] text-[#656565] mb-2">
                    Тип: {resource.type}
                  </p>
                </div>
                <button 
                  onClick={() => window.open(resource.url, '_blank')}
                  className="ml-4 px-6 py-2 border border-black rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-100 hover:scale-105 whitespace-nowrap"
                >
                  открыть
                </button>
              </div>
            ))}
            
            {/* Заглушка если нет ресурсов */}
            {(!skill.learning_resources || skill.learning_resources.length === 0) && (
              <div className="border-[5px] border-[#D9D9D9] rounded-lg p-4 flex justify-between items-start transition-all duration-500 ease-in-out hover:shadow-lg hover:scale-[1.02]">
                <div className="flex-1">
                  <h4 className="text-[24px] font-normal mb-2">
                    Ресурсы появятся после анализа ИИ
                  </h4>
                  <p className="text-[20px] text-[#656565]">
                    AI подберет лучшие материалы для изучения
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Связанные поднавыки (только для главных навыков) */}
          {relatedSkills.length > 0 && (
            <>
              <h3 className="text-[24px] font-normal mb-6 transition-all duration-500 ease-out">
                Связанные навыки
              </h3>
              
              <div className="space-y-4">
                {relatedSkills.map((relatedSkill) => (
                  <button
                    key={'sub_skill_id' in relatedSkill ? relatedSkill.sub_skill_id : relatedSkill.skill_id}
                    onClick={() => onSkillClick(relatedSkill)}
                    className="w-full border-[5px] border-[#D9D9D9] rounded-lg p-4 text-left transition-all duration-500 ease-in-out hover:bg-gray-50 hover:shadow-lg hover:scale-[1.02]"
                  >
                    <h4 className="text-[24px] font-normal">
                      {'sub_skill_id' in relatedSkill ? relatedSkill.sub_skill_name : relatedSkill.skill_name}
                    </h4>
                    <p className="text-[20px] text-[#656565] mt-2">
                      {relatedSkill.position_reason}
                    </p>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SkillModal;