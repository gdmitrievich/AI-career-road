package com.aicareerroad.modules.roadmap.domain.services;

public interface VacancyPageReaderService {
  String readTitle(String vacancyUrl);

  String readUserContent(String vacancyUrl);

  String readSkills(String vacancyUrl);
}
