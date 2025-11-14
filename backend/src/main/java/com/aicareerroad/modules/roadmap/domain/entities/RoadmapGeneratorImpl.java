package com.aicareerroad.modules.roadmap.domain.entities;

import com.aicareerroad.commons.validators.UrlValidator;
import com.aicareerroad.modules.roadmap.domain.requiredinterfaces.AiService;
import com.aicareerroad.modules.roadmap.domain.utils.AiCareerRoadPromptBuilder;
import com.aicareerroad.modules.roadmap.domain.utils.VacancyPageReader;
import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.dtos.ParsedVacancyData;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapResponse;

// Task: кинуть запрос (промпт) ИИ и получить от нее готовые данные (DTO).
public class RoadmapGeneratorImpl implements RoadmapGenerator {
  private final UrlValidator urlValidator;
  private final AiService aiService;
  private final AiCareerRoadPromptBuilder promptBuilder;
  private final VacancyPageReader vacancyPageReader;

  public RoadmapGeneratorImpl(UrlValidator urlValidator, AiService aiService, AiCareerRoadPromptBuilder promptBuilder, VacancyPageReader vacancyPageReader) {
    this.urlValidator = urlValidator;
    this.aiService = aiService;
    this.promptBuilder = promptBuilder;
    this.vacancyPageReader = vacancyPageReader;
  }

  /**
   * Plan: it should work today!
   * <p>
   * 1. RequiredInterface. AiService.
   * 2. Adaptee. GigaChatService that uses GigaChatClient.
   * 3. Adapter. GigaChatServiceAdapter.
   *
   * @param vacancyUrl
   * @return
   */
  @Override
  public RoadmapResponse generateRoadmap(String vacancyUrl) {
    p("vacancyUrl before: '" + vacancyUrl + "'");
    vacancyUrl = vacancyUrl.trim();
    p("vacancyUrl after: '" + vacancyUrl + "'");
    if (!urlValidator.isValid(vacancyUrl)) {
      p("vacancyUrl is invalid");
      throw new IllegalArgumentException("The provided vacancy URL is invalid");
    }
    p("vacancyUrl is valid");

    String vacancyTextContent = "Специализация: " + vacancyPageReader.readTitle(vacancyUrl) + "\nКонтент пользователя: " + vacancyPageReader.readUserContent(vacancyUrl); //+ "\nКлючевые навыки вакансии:  " + vacancyPageReader.readSkills(vacancyUrl);
    p("vacancy text content: " + vacancyTextContent);
    // TODO: Test which response Bean Output Converter provides. Test.
    String vacancyAnalysisPrompt = promptBuilder.buildVacancyAnalysisPrompt(vacancyTextContent);
    p("built vacancyAnalysisPrompt: " + vacancyAnalysisPrompt);
    ParsedVacancyData parsedVacancyData = aiService.parseRequiredVacancyData(vacancyAnalysisPrompt);
    p("parsedVacancyData: specialization: " + parsedVacancyData.specialization() + "; skills: " + String.join(", ", parsedVacancyData.skills()));
    String roadmapDataGeneratorPrompt = promptBuilder.buildRoadmapDataGeneratorPrompt(parsedVacancyData);
    p("built roadmapDataGeneratorPrompt: " + roadmapDataGeneratorPrompt);
    return aiService.generateRoadmapData(roadmapDataGeneratorPrompt);
  }

  private void p(String message) {
    System.out.println("aicareerroad: " + message);
  }
}
