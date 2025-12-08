package com.aicareerroad.modules.roadmap.domain.services;

/**
 * Responsible for roadmap related operations including communication with the infrastructure layer.
 */
public class RoadmapService {
  private final RoadmapGeneratorService roadmapGeneratorService;

  public RoadmapService(RoadmapGeneratorService roadmapGeneratorService) {
    this.roadmapGeneratorService = roadmapGeneratorService;
  }

  public String generateRoadmap(String vacancyUrl) {
    return roadmapGeneratorService.generateRoadmap(vacancyUrl);
//    Roadmap roadmapEntity = new Roadmap();
//    roadmapEntity.setRoadmapData(roadmap);
//    roadmapEntity = roadmapRepository.save(roadmapEntity); // ERROR.
//    return roadmapEntity.getRoadmapData();
  }
}
