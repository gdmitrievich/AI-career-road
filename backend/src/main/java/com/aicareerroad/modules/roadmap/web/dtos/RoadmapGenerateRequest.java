package com.aicareerroad.modules.roadmap.web.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RoadmapGenerateRequest(
  @JsonProperty("vacancy_url") String vacancyUrl
) {
}