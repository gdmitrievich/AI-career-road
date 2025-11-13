package com.aicareerroad.modules.roadmap.web.requiredinterfaces;

import com.aicareerroad.modules.roadmap.web.dtos.RoadmapGenerateRequest;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapResponse;

public interface RoadmapModel {
  RoadmapResponse generateRoadmap(RoadmapGenerateRequest roadmapGenerateRequest);
}