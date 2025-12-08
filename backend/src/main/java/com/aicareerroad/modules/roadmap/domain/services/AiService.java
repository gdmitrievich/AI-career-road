package com.aicareerroad.modules.roadmap.domain.services;

import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.dtos.ParsedVacancyData;

public interface AiService {
  ParsedVacancyData parseRequiredVacancyData(String vacancyAnalysisPrompt);

  String generateRoadmap(String roadmapDataGeneratorPrompt);
}

