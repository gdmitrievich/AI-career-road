package com.aicareerroad.modules.roadmap.infrastructure.services;

import com.aicareerroad.modules.roadmap.domain.services.VacancyPageReaderService;

public class MockVacancyPageReaderService implements VacancyPageReaderService {
  @Override
  public String readTitle(String vacancyUrl) {
    return "TITLE";
  }

  @Override
  public String readUserContent(String vacancyUrl) {
    return "USER CONTENT";
  }

  @Override
  public String readSkills(String vacancyUrl) {
    return "SKILLS";
  }
}
