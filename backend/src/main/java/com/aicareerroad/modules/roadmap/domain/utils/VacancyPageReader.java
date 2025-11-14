package com.aicareerroad.modules.roadmap.domain.utils;

public interface VacancyPageReader {
  String readBodyContent(String vacancyUrl);

  String readTitle(String vacancyUrl);

  String readUserContent(String vacancyUrl);

  String readSkills(String vacancyUrl);
}
