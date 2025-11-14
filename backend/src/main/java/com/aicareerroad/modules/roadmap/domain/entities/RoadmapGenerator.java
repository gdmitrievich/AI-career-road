package com.aicareerroad.modules.roadmap.domain.entities;

import com.aicareerroad.modules.roadmap.web.dtos.RoadmapResponse;

public interface RoadmapGenerator {
  // It's incorrect: RoadmapGenerator must not know about the web layer implementation details
  // (in this context - about DTO (RoadmapResponse)).
  public RoadmapResponse generateRoadmap(String vacancyUrl);
}
