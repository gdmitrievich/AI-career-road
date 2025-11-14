package com.aicareerroad.modules.roadmap.domain.requiredinterfacesimpl;

import com.aicareerroad.modules.roadmap.domain.entities.RoadmapGenerator;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapGenerateRequest;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapResponse;
import com.aicareerroad.modules.roadmap.web.requiredinterfaces.RoadmapModel;

public class RoadmapModelFacade implements RoadmapModel {
  private final RoadmapGenerator roadmapGenerator;

  public RoadmapModelFacade(RoadmapGenerator roadmapGenerator) {
    this.roadmapGenerator = roadmapGenerator;
  }

  /**
   * Invokes RoadmapEntity & filters Entities data in order to build DTOs.
   * Knows only about Domain Services & AggregateRoot repositories.
   */
  // It's incorrect: RoadmapModelFacade should invoke Domain Service &
  // use EntityRepositories to map Entity data to DTO.
  @Override
  public RoadmapResponse generateRoadmap(RoadmapGenerateRequest roadmapGenerateRequest) {
    return roadmapGenerator.generateRoadmap(roadmapGenerateRequest.vacancyUrl());
  }
}