package com.aicareerroad.modules.roadmap.domain.utils;

import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.dtos.ParsedVacancyData;

public interface AiCareerRoadPromptBuilder {
  String buildVacancyAnalysisPrompt(String vacancyTextContent);

  String buildRoadmapDataGeneratorPrompt(ParsedVacancyData parsedVacancyData);
}
