package com.aicareerroad.modules.roadmap.web.dtos;

import java.util.List;

public record Project(
  String projectId,
  String projectName,
  String projectDescription,
  String difficultyLevel,
  List<String> requiredSkills,
  List<String> successCriteria
) {
}