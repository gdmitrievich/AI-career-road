package com.aicareerroad.modules.roadmap.domain;

import com.aicareerroad.modules.roadmap.domain.services.RoadmapService;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapGenerateRequest;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapResponse;
import com.aicareerroad.modules.roadmap.web.requiredinterfaces.RoadmapModel;

public class RoadmapModelMock implements RoadmapModel {
  private final RoadmapService roadmapService;

  public RoadmapModelMock(RoadmapService roadmapService) {
    this.roadmapService = roadmapService;
  }

  @Override
  public RoadmapResponse generateRoadmap(RoadmapGenerateRequest roadmapGenerateRequest) {
    roadmapService.generateRoadmap(roadmapGenerateRequest.vacancyUrl());
    return null;
  }
}
