package com.aicareerroad.modules.roadmap.web.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {
  private static final Logger logger = LoggerFactory.getLogger(HealthCheckController.class);

  @GetMapping(path = "/api/health", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> healthCheck() {
    logger.debug("Backend is healthy");
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
