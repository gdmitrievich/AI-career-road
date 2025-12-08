package com.aicareerroad.modules.roadmap.domain.services;

import com.aicareerroad.modules.roadmap.infrastructure.entities.Roadmap;
import com.aicareerroad.modules.roadmap.infrastructure.repositories.RoadmapRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Responsible for roadmap related operations including communication with the infrastructure layer.
 */
@Service
@Transactional
public class RoadmapService {
  private final RoadmapGeneratorService roadmapGeneratorService;
  private final RoadmapRepository roadmapRepository;

  public RoadmapService(RoadmapGeneratorService roadmapGeneratorService, com.aicareerroad.modules.roadmap.domain.repositories.RoadmapRepository roadmapRepository) {
    this.roadmapGeneratorService = roadmapGeneratorService;
    this.roadmapRepository = (RoadmapRepository) roadmapRepository;
  }

  public String generateRoadmap(String vacancyUrl) {
    String roadmap = roadmapGeneratorService.generateRoadmap(vacancyUrl);
    Roadmap roadmapEntity = new Roadmap();
    roadmapEntity.setRoadmapData(roadmap);
    roadmapEntity = roadmapRepository.save(roadmapEntity); // ERROR.
    return roadmapEntity.getRoadmapData();
  }
}
