package com.aicareerroad.modules.roadmap.web.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public record MainSkill(
  @JsonProperty("skill_id") String skillId,
  @JsonProperty("skill_name") String skillName,
  @JsonProperty("skill_description") String skillDescription,
  @JsonProperty("position_in_sequence") int positionInSequence,
  @JsonProperty("position_reason") String positionReason,
  @JsonProperty("learning_resources") List<LearningResource> learningResources,
  @JsonProperty("sub_skills") List<SubSkill> subSkills
) {
}