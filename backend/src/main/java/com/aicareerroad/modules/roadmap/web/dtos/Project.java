package com.aicareerroad.modules.roadmap.web.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public record Project(
  @JsonProperty("project_id") String projectId,
  @JsonProperty("project_name") String projectName,
  @JsonProperty("project_description") String projectDescription,
  @JsonProperty("difficulty_level") RoadmapProjectDifficultyLevel difficultyLevel,
  @JsonProperty("required_skills") List<String> requiredSkills,
  @JsonProperty("success_criteria") List<String> successCriteria
) {
  private static final Logger logger = LoggerFactory.getLogger(Project.class);

  public Project {
    projectId = (projectId == null) ? UUID.randomUUID().toString() : projectId;
    projectName = (projectName == null) ? "" : projectName;
    projectDescription = (projectDescription == null) ? "" : projectDescription;
    difficultyLevel = (difficultyLevel == null) ? RoadmapProjectDifficultyLevel.intermediate : difficultyLevel;

    requiredSkills = (requiredSkills == null) ? new ArrayList<>() : requiredSkills;
    successCriteria = (successCriteria == null) ? new ArrayList<>() : successCriteria;

    logger.debug("All fields initialized successfully");
  }
}