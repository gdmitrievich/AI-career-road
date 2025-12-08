package com.aicareerroad.modules.roadmap.web.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public record MainSkill(
  @JsonProperty("skill_id") String skillId,
  @JsonProperty("skill_name") String skillName,
  @JsonProperty("skill_description") String skillDescription,
  @JsonProperty("position_in_sequence") int positionInSequence,
  @JsonProperty("position_reason") String positionReason,
  @JsonProperty("learning_resources") List<LearningResource> learningResources,
  @JsonProperty("sub_skills") List<SubSkill> subSkills
) {
  private static final Logger logger = LoggerFactory.getLogger(MainSkill.class);

  public MainSkill {
    skillId = (skillId == null) ? UUID.randomUUID().toString() : skillId;
    skillName = (skillName == null) ? "" : skillName;
    skillDescription = (skillDescription == null) ? "" : skillDescription;
    positionReason = (positionReason == null) ? "" : positionReason;

    learningResources = (learningResources == null) ? new ArrayList<>() : learningResources;
    subSkills = (subSkills == null) ? new ArrayList<>() : subSkills;

    logger.debug("All fields initialized successfully");
  }
}