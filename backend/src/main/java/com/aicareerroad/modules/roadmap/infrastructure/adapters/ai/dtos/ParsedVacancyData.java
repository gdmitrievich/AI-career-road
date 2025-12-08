package com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.dtos;

import java.util.List;

public record ParsedVacancyData(
  String specialization,
  List<String> skills
) {
}
