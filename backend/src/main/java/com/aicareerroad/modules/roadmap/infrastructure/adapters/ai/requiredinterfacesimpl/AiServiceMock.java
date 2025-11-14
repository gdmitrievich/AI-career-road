package com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.requiredinterfacesimpl;

import com.aicareerroad.modules.roadmap.domain.requiredinterfaces.AiService;
import com.aicareerroad.modules.roadmap.domain.requiredinterfacesimpl.RoadmapModelMock;
import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.dtos.ParsedVacancyData;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapGenerateRequest;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapResponse;
import java.util.List;

public class AiServiceMock implements AiService {

  @Override
  public ParsedVacancyData parseRequiredVacancyData(String vacancyAnalysisPrompt) {
    return new ParsedVacancyData("Java Backend developer", List.of("Java", "String", "SQL"));
  }

  @Override
  public RoadmapResponse generateRoadmapData(String roadmapDataGeneratorPrompt) {
    return new RoadmapModelMock().generateRoadmap(new RoadmapGenerateRequest("          https://kazan.hh.ru/vacancy/127549312?query=Java+junior&hhtmFrom=vacancy_search_list             "));
  }
}
