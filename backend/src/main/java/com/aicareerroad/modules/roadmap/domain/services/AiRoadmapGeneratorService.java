package com.aicareerroad.modules.roadmap.domain.services;

import com.aicareerroad.modules.roadmap.domain.valueobjects.VacancyUrl;
import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.dtos.ParsedVacancyData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AiRoadmapGeneratorService implements RoadmapGeneratorService {
  private final static Logger logger = LoggerFactory.getLogger(AiRoadmapGeneratorService.class);
  private final AiService aiService;
  private final PromptBuilderService promptBuilderService;
  private final VacancyPageReaderService vacancyPageReaderService;

  public AiRoadmapGeneratorService(AiService aiService,
                                   PromptBuilderService promptBuilderService,
                                   VacancyPageReaderService vacancyPageReaderService) {
    this.aiService = aiService;
    this.promptBuilderService = promptBuilderService;
    this.vacancyPageReaderService = vacancyPageReaderService;
  }

  public String generateRoadmap(String rawVacancyUrl) {
    VacancyUrl vacancyUrl = new VacancyUrl(rawVacancyUrl);
    logger.debug("Vacancy url: {}", vacancyUrl.url());
    String vacancyTextContent =
      "Специализация: " + vacancyPageReaderService.readTitle(vacancyUrl.url())
        + "\nКонтент пользователя: " + vacancyPageReaderService.readUserContent(vacancyUrl.url())
        + "\nКлючевые навыки вакансии:  " + vacancyPageReaderService.readSkills(vacancyUrl.url());
    logger.debug("Extracted vacancy text content: \n{}", vacancyTextContent);

    String vacancyAnalysisPrompt = promptBuilderService.buildVacancyAnalysisPrompt(vacancyTextContent);
    logger.debug("Built vacancyAnalysisPrompt: {}", vacancyAnalysisPrompt);
    ParsedVacancyData parsedVacancyData = aiService.parseRequiredVacancyData(vacancyAnalysisPrompt);
    logger.debug(parsedVacancyData.toString());
    String roadmapDataGeneratorPrompt = promptBuilderService.buildRoadmapDataGeneratorPrompt(vacancyUrl.url(), parsedVacancyData);
    logger.debug("Built roadmapDataGeneratorPrompt: {}", roadmapDataGeneratorPrompt);
    return aiService.generateRoadmap(roadmapDataGeneratorPrompt);
  }
}
