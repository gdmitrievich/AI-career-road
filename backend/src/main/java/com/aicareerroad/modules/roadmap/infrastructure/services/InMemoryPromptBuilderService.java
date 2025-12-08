package com.aicareerroad.modules.roadmap.infrastructure.services;

import com.aicareerroad.modules.roadmap.domain.services.PromptBuilderService;
import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.dtos.ParsedVacancyData;
import java.util.Map;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;

public class InMemoryPromptBuilderService implements PromptBuilderService {
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
      skills: названия навыков, в идеале состоящие из 1-2 слов.
      Если по какому-то полю нет информации, используй пустой массив [] или пустую строку ""
      Для массивов всегда используй формат списка, даже если элемент один
      Сохраняй оригинальные названия технологий и терминов из вакансии
      Не добавляй пояснения или комментарии к выводу
      
      Текст вакансии для анализа:
      {vacancyText}
      """,
    """
      Ты — опытный карьерный консультант и технический ментор в IT. На основе данных, взятых из вакансии, составь детальный roadmap обучения.
      
      Данные вакансии:
      - Специализация: {specialization}
      - Требуемые навыки: {skills}
      
      Требования:
      * Навыки располагаются в последовательности от базовых к продвинутым. Каждый следующий навык должен дополнять предыдущий.
      * Укажи минимум 2 пет-проекта.
      * Укажи минимум 3 поднавыка в subskills. Поднавык - это отдельная тема/навык, которую можно логически выделить, разделив основной навык на более мелкие части.
      * Для каждого навыка и поднавыка:
          * name: лаконичный, в идеале 1-2 слова.
          * description: лаконично в 2-3 предложениях одним текстом укажи назначение и ключевые идеи.
          * positionReason: в 1 предложении укажи причину расположения навыка или поднавыка   именно на этой позиции.
          * learningResources: укажи от 2 до 4 ресурсов.
      * Для каждого ресурса для изучения:
          * url: используй актуальные/реальные ресурсы, вместо неактивных шаблонов по типу "http://example.com/docs".
      * Для каждого пет-проекта:
          * projectName: лаконичный.
          * projectDescription: лаконично в 2-3 предложениях одним текстом укажи цель проекта и описание задач, которые нужно выполнить.
          * requiredSkills: укажи требуемые навыки из roadmap; только названия навыков - не поднавыков.
          * successCriteria: укажи списком требования к проекту.
      * В roadmapMetadata для vacancyUrl вставь ссылку: {vacancyUrl}
      * Важно:
          * Указывай id для всех объектов, в которых имеется похожее свойство.
          * Если для какого-то поля нет информации, используй пустой массив [] или пустую строку "" вместо null. Указывай все properties и objects из "JSON Schema instance" (особенно subSkills и id).
          * Убедись, что все открывающие скобки в твоем ответе имеют закрывающие.
          * В learning_path не входит pet_projects, поэтому после закрытия массива skills закрывай также learning_path фигурной скобкой. 
      """
  );

  @Override
  public String buildVacancyAnalysisPrompt(String vacancyTextContent) {
    return buildPromptWithPromptTemplate(
      promptTemplateStorage.vacancyAnalysis,
      Map.of("vacancyText", vacancyTextContent)
    );
  }

  @Override
  public String buildRoadmapDataGeneratorPrompt(String vacancyUrl, ParsedVacancyData parsedVacancyData) {
    String skillsInOneString = String.join(", ", parsedVacancyData.skills());
    return buildPromptWithPromptTemplate(
      promptTemplateStorage.roadmapDataGenerator,
      Map.of("vacancyUrl", vacancyUrl, "specialization", parsedVacancyData.specialization(), "skills", skillsInOneString)
    );
  }

  private String buildPromptWithPromptTemplate(String sourcePrompt, Map<String, Object> model) {
    PromptTemplate promptTemplate = new PromptTemplate(sourcePrompt);
    Prompt prompt = promptTemplate.create(model);
    return prompt.getContents();
  }

  private record PromptTemplateStorage(
    String vacancyAnalysis,
    String roadmapDataGenerator
  ) {
  }
}
