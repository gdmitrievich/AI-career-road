package com.aicareerroad.modules.roadmap.web.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public record Project(
  @JsonProperty("project_id") String projectId,
  @JsonProperty("project_name") String projectName,
  @JsonProperty("project_description") String projectDescription,
  @JsonProperty("difficulty_level") RoadmapProjectDifficultyLevel difficultyLevel,
  @JsonProperty("required_skills") List<String> requiredSkills,
  @JsonProperty("success_criteria") List<String> successCriteria
) {
}