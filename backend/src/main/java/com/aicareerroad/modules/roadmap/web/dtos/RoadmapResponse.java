package com.aicareerroad.modules.roadmap.web.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public record RoadmapResponse(
  @JsonProperty("roadmap_metadata") RoadmapMetadata roadmapMetadata,
  @JsonProperty("learning_path") LearningPath learningPath,
  @JsonProperty("pet_projects") List<Project> petProjects
) {
}