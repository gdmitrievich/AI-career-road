package com.aicareerroad.modules.roadmap.domain.services;

import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.dtos.ParsedVacancyData;

public interface PromptBuilderService {
  String buildVacancyAnalysisPrompt(String vacancyTextContent);

  String buildRoadmapDataGeneratorPrompt(String vacancyUrl, ParsedVacancyData parsedVacancyData);
}
