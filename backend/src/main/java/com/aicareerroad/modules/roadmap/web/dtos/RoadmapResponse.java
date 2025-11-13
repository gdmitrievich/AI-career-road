package com.aicareerroad.modules.roadmap.web.dtos;

import java.util.List;

public record RoadmapResponse(
  RoadmapMetadata roadmapMetadata,
  LearningPath learningPath,
  List<Project> petProjects
) {
}