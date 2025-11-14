package com.aicareerroad.modules.roadmap.domain.requiredinterfaces;

import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.dtos.ParsedVacancyData;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapResponse;

public interface AiService {
  ParsedVacancyData parseRequiredVacancyData(String vacancyAnalysisPrompt);

  RoadmapResponse generateRoadmapData(String roadmapDataGeneratorPrompt);
}

