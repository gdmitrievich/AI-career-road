package com.aicareerroad.modules.roadmap.web.dtos;

import java.util.List;

public record MainSkill(
  String skillId,
  String skillName,
  String skillDescription,
  int positionInSequence,
  String positionReason,
  List<LearningResource> learningResources,
  List<SubSkill> subSkills
) {
}