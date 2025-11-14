package com.aicareerroad.modules.roadmap.web.controllers;

import com.aicareerroad.modules.roadmap.web.dtos.RoadmapGenerateRequest;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapResponse;
import com.aicareerroad.modules.roadmap.web.requiredinterfaces.RoadmapModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Handles Roadmap related JSON/HTTP requests and returns JSON/HTTP responses.
 */
@RestController
public class RoadmapController {
  private final RoadmapModel roadmapModel;

  public RoadmapController(RoadmapModel roadmapModel) {
    this.roadmapModel = roadmapModel;
  }

  @PostMapping(path = "/api/roadmaps", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> generateRoadmap(@RequestBody RoadmapGenerateRequest roadmapGenerateRequest) {
    try {
      RoadmapResponse roadmap = roadmapModel.generateRoadmap(roadmapGenerateRequest);
      return new ResponseEntity<>(roadmap, HttpStatus.OK);
    } catch (Exception | Error e) {
      System.out.println("aicareerroad [RoadmapController] Error: " + e.getMessage());
      return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
  }
}