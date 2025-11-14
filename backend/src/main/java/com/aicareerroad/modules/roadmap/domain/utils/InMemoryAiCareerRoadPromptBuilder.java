package com.aicareerroad.modules.roadmap.domain.utils;

import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.dtos.ParsedVacancyData;
import java.util.Map;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;

/**
 * Builds prompts (except of the providing requirements to the AI response). Use PromptTemplate.
 * <p>
 * How prompts would be processed?
 * 1. Создай шаблоны промптов, указывая встраиваемый текст внутри {}: "text {embedded} text".
 * 2. Используй PromptTemplate и его метод create с параметром HashMap, передавая нужный текст в эти фигурные скобки. Протестируй!
 * 3. Создай класс, который будет создавать промпты, используя PromptTemplate & properites.yml.
 */
public class InMemoryAiCareerRoadPromptBuilder implements AiCareerRoadPromptBuilder {
  final PromptTemplateStorage promptTemplateStorage = new PromptTemplateStorage(
    """
      Ты — AI-ассистент для анализа IT-вакансий. Проанализируй предоставленный текст вакансии и выдели всю ключевую информацию в структурированном JSON-формате.
      
      Инструкции по анализу:
      Внимательно прочитай весь текст вакансии.
      Извлекай информацию ТОЛЬКО напрямую из текста.
      Извлекай информацию ТОЛЬКО для вакансий из IT.
      Не добавляй и не предполагай информацию, которой нет в вакансии.
      Сохраняй оригинальные формулировки из текста там, где это возможно.
      
      Важные правила:
      Если по какому-то полю нет информации, используй пустой массив [] или пустую строку ""
      Для массивов всегда используй формат списка, даже если элемент один
      Сохраняй оригинальные названия технологий и терминов из вакансии
      Не добавляй пояснения или комментарии к выводу
      
      Текст вакансии для анализа:
      {vacancyText}
      """,
    """
      Ты — опытный карьерный консультант и технический ментор в IT. На основе требований к вакансии составь детальный roadmap обучения в строгом JSON-формате с иерархической структурой: Темы → Навыки → Поднавыки.
      
      Входные данные:
      Специализация: {specialization}
      Требуемые навыки: {skills}
      
      Требования к структуре roadmap:
      Метаданные:
      Ссылка на вакансию (если есть в исходных данных)
      Название вакансии - специализация
      Навыки (Skills) - конкретные способности:
      Располагаются в последовательности от базовых к продвинутым
      Для каждого навыка указывается причина расположения
      Подробное описание навыка
      Ресурсы для изучения (название, ссылка, тип)
      Поднавыки (Sub-Skills) - атомарные компоненты:
      Последовательность расположения от простого к сложному
      Причина расположения каждого поднавыка
      Конкретное описание
      Ресурсы для изучения
      Пет-проекты (Pet Projects):
      Уровень сложности (начальный/средний/продвинутый)
      Название и описание проекта
      Используемые навыки из roadmap
      
      Важно: убедись, что все открывающие скобки в твоем ответе имеют закрывающие.
      Важно: в learning_path не входит pet_projects, поэтому после закрытия массива skills закрывай также learning_path фигурной скобкой.  
      """
  );

  public String buildVacancyAnalysisPrompt(String vacancyTextContent) {
    // TODO: DRY!
    PromptTemplate promptTemplate = new PromptTemplate(promptTemplateStorage.vacancyAnalysis);
    Prompt prompt = promptTemplate.create(Map.of("vacancyText", vacancyTextContent));
    return prompt.getContents();
  }

  public String buildRoadmapDataGeneratorPrompt(ParsedVacancyData parsedVacancyData) {
    // TODO: DRY!
    PromptTemplate promptTemplate = new PromptTemplate(promptTemplateStorage.roadmapDataGenerator);
    String skillsInOneString = String.join(", ", parsedVacancyData.skills());
    Prompt prompt = promptTemplate.create(Map.of("specialization", parsedVacancyData.specialization(), "skills", skillsInOneString));
    return prompt.getContents();
  }

  private record PromptTemplateStorage(
    String vacancyAnalysis,
    String roadmapDataGenerator
  ) {
  }
}
