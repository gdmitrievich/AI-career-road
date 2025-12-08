package com.aicareerroad.modules.roadmap.domain;

import com.aicareerroad.modules.roadmap.domain.services.JsonDtoConverterService;
import com.aicareerroad.modules.roadmap.domain.services.RoadmapService;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapGenerateRequest;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapResponse;
import com.aicareerroad.modules.roadmap.web.requiredinterfaces.RoadmapModel;

public class RoadmapModelFacade implements RoadmapModel {
  private final RoadmapService roadmapService;
  private final JsonDtoConverterService<RoadmapResponse> jsonDtoConverterService;

  public RoadmapModelFacade(RoadmapService roadmapService, JsonDtoConverterService<RoadmapResponse> jsonDtoConverterService) {
    this.roadmapService = roadmapService;
    this.jsonDtoConverterService = jsonDtoConverterService;
  }

  @Override
  public RoadmapResponse generateRoadmap(RoadmapGenerateRequest roadmapGenerateRequest) {
    String roadmap = roadmapService.generateRoadmap(roadmapGenerateRequest.vacancyUrl());
    RoadmapResponse roadmapResponse = jsonDtoConverterService.convert(roadmap);
    return roadmapResponse;
  }
}
