package com.aicareerroad.modules.roadmap.web.dtos;

import java.util.List;

public record SubSkill(
  String subSkillId,
  String subSkillName,
  String subSkillDescription,
  int positionInSequence,
  String positionReason,
  List<LearningResource> learningResources
) {
}