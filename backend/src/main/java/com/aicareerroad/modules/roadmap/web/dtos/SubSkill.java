package com.aicareerroad.modules.roadmap.web.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public record SubSkill(
  @JsonProperty("sub_skill_id") String subSkillId,
  @JsonProperty("sub_skill_name") String subSkillName,
  @JsonProperty("sub_skill_description") String subSkillDescription,
  @JsonProperty("position_in_sequence") int positionInSequence,
  @JsonProperty("position_reason") String positionReason,
  @JsonProperty("learning_resources") List<LearningResource> learningResources
) {
}