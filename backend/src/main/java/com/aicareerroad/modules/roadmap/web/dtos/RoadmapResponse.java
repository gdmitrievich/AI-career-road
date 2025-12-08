package com.aicareerroad.modules.roadmap.web.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public record RoadmapResponse(
  @JsonProperty("roadmap_metadata") RoadmapMetadata roadmapMetadata,
  @JsonProperty("learning_path") LearningPath learningPath,
  @JsonProperty("pet_projects") List<Project> petProjects
) {
  private static final Logger logger = LoggerFactory.getLogger(RoadmapResponse.class);

  public RoadmapResponse {
    roadmapMetadata = (roadmapMetadata == null) ? new RoadmapMetadata("", "") : roadmapMetadata;
    learningPath = (learningPath == null) ? new LearningPath(new ArrayList<>()) : learningPath;

    petProjects = (petProjects == null) ? new ArrayList<>() : petProjects;

    logger.debug("All fields initialized successfully");
  }
}