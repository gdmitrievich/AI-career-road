import type { MainSkill, SubSkill } from '../../types/roadmap';

interface RoadmapNodeProps {
  mainSkill: MainSkill;
  position: 'left' | 'right';
  isLast: boolean;
  isFirst?: boolean; // Добавим пропс для определения первого элемента
  onSkillClick: (skill: MainSkill | SubSkill) => void;
}

const RoadmapNode = ({ mainSkill, position, isLast, isFirst = false, onSkillClick }: RoadmapNodeProps) => {
  // Определяем, нужно ли соединять с вертикальной линией между поднавыками
  const shouldConnectToVerticalLine = mainSkill.sub_skills.length % 2 === 0;
  // Определяем центральный поднавык для нечетного количества
  const centralSubSkillIndex = Math.floor(mainSkill.sub_skills.length / 2);

  return (
    <div className={`relative flex justify-center ${isFirst ? 'mt-0' : 'mt-16 md:mt-20'}`}>
      {/* Центральная часть: главный навык и вертикальные линии */}
      <div className="flex flex-col items-center relative z-10">
        {/* Вертикальная линия сверху (от предыдущего навыка) - НЕ показываем для первого элемента */}
        {!isFirst && (
          <div className="w-0.5 h-12 md:h-16 bg-gray-400 mb-2"></div>
        )}
        
        {/* Блок главного навыка */}
        <button
          onClick={() => onSkillClick(mainSkill)}
          className="w-[320px] md:w-[425px] min-h-[100px] md:min-h-[120px] border-[5px] border-[#D9D9D9] rounded-lg flex flex-col items-center justify-center bg-white shadow-sm transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-gray-50 p-4"
        >
          <h3 className="text-[18px] md:text-[20px] font-medium text-black text-center mb-2">
            {mainSkill.skill_name}
          </h3>
          <p className="text-[14px] md:text-[16px] font-normal text-gray-600 text-center leading-tight">
            {mainSkill.position_reason}
          </p>
        </button>

        {/* Вертикальная линия вниз (к следующему навыку) */}
        {!isLast && (
          <div className="w-0.5 h-12 md:h-16 bg-gray-400 mt-2"></div>
        )}
      </div>

      {/* Поднавыки СЛЕВА (для нечетных навыков) */}
      {position === 'left' && mainSkill.sub_skills.length > 0 && (
        <div className="absolute right-1/2 top-1/2 transform -translate-y-1/2 mr-40 md:mr-62">
          <div className="flex flex-col items-center relative">
            {/* Центральная вертикальная линия, проходящая через все поднавыки */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 transform -translate-x-1/2"></div>
            
            {/* Горизонтальная линия от главного навыка к центральной вертикальной линии (для 2 поднавыков) */}
            {shouldConnectToVerticalLine && (
              <div className="absolute right-0 top-1/2 w-16 md:w-24 h-0.5 bg-gray-400 transform translate-x-full transition-all duration-500"></div>
            )}
            
            {mainSkill.sub_skills.map((subSkill, index) => (
              <div key={subSkill.sub_skill_id} className="relative flex justify-center w-full mb-6 md:mb-8 last:mb-0">
                {/* Горизонтальная линия от главного навыка к центральному поднавыку (для нечетного количества) */}
                {!shouldConnectToVerticalLine && index === centralSubSkillIndex && (
                  <div className="absolute right-0 top-1/2 w-16 md:w-24 h-0.5 bg-gray-400 transform translate-x-full transition-all duration-500"></div>
                )}
                
                {/* Вертикальные линии между поднавыками */}
                {index < mainSkill.sub_skills.length - 1 && (
                  <div className="absolute left-1/2 top-full w-0.5 h-6 md:h-8 bg-gray-400 transform -translate-x-1/2 -translate-y-3 md:-translate-y-4 transition-all duration-500"></div>
                )}
                
                {/* Блок поднавыка */}
                <button
                  onClick={() => onSkillClick(subSkill)}
                  className="w-[280px] md:w-[325px] min-h-[80px] md:min-h-[100px] border-[5px] border-[#D9D9D9] rounded-lg flex flex-col items-center justify-center bg-white shadow-sm relative z-10 transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-50 p-3"
                >
                  <span className="text-[16px] md:text-[18px] font-medium text-black text-center mb-1">
                    {subSkill.sub_skill_name}
                  </span>
                  <p className="text-[12px] md:text-[14px] font-normal text-gray-600 text-center leading-tight">
                    {subSkill.position_reason}
                  </p>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Поднавыки СПРАВА (для четных навыков) */}
      {position === 'right' && mainSkill.sub_skills.length > 0 && (
        <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 ml-40 md:ml-62">
          <div className="flex flex-col items-center relative">
            {/* Центральная вертикальная линия, проходящая через все поднавыки */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 transform -translate-x-1/2"></div>
            
            {/* Горизонтальная линия от главного навыка к центральной вертикальной линии (для 2 поднавыков) */}
            {shouldConnectToVerticalLine && (
              <div className="absolute left-0 top-1/2 w-16 md:w-24 h-0.5 bg-gray-400 transform -translate-x-full transition-all duration-500"></div>
            )}
            
            {mainSkill.sub_skills.map((subSkill, index) => (
              <div key={subSkill.sub_skill_id} className="relative flex justify-center w-full mb-6 md:mb-8 last:mb-0">
                {/* Горизонтальная линия от главного навыка к центральному поднавыку (для нечетного количества) */}
                {!shouldConnectToVerticalLine && index === centralSubSkillIndex && (
                  <div className="absolute left-0 top-1/2 w-16 md:w-24 h-0.5 bg-gray-400 transform -translate-x-full transition-all duration-500"></div>
                )}
                
                {/* Вертикальные линии между поднавыками */}
                {index < mainSkill.sub_skills.length - 1 && (
                  <div className="absolute left-1/2 top-full w-0.5 h-6 md:h-8 bg-gray-400 transform -translate-x-1/2 -translate-y-3 md:-translate-y-4 transition-all duration-500"></div>
                )}
                
                {/* Блок поднавыка */}
                <button
                  onClick={() => onSkillClick(subSkill)}
                  className="w-[280px] md:w-[325px] min-h-[80px] md:min-h-[100px] border-[5px] border-[#D9D9D9] rounded-lg flex flex-col items-center justify-center bg-white shadow-sm relative z-10 transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-50 p-3"
                >
                  <span className="text-[16px] md:text-[18px] font-medium text-black text-center mb-1">
                    {subSkill.sub_skill_name}
                  </span>
                  <p className="text-[12px] md:text-[14px] font-normal text-gray-600 text-center leading-tight">
                    {subSkill.position_reason}
                  </p>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapNode;