package com.aicareerroad.modules.roadmap.infrastructure;

import com.aicareerroad.modules.roadmap.domain.repositories.RoadmapRepository;

public class RoadmapRepositoryMock implements RoadmapRepository {
  @Override
  public String save(String roadmap) {
    return roadmap;
  }
}
