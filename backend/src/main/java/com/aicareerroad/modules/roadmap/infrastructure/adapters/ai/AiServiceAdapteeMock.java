package com.aicareerroad.modules.roadmap.infrastructure.adapters.ai;

public class AiServiceAdapteeMock implements AiServiceAdaptee {
  @Override
  public String process(String prompt) {
    return """
      {
        "specialization": "Тестировщик (auto Java)",
        "skills": [
          "теория тестирования (виды и модели тестирования, планирование тестирования)",
          "опыт работы в тестировании от 2х лет",
          "опыт работы с багтрекинговыми системами",
          "знание типов дефектов, их жизненного цикла и приоритетов",
          "опыт составления сложных SQL запросов по работе с СУБД",
          "опыт написания автотестов (Java/Selenium, JUnit/TestNG)",
          "основы программирования (java junior уровень)",
          "опыт работы с Git в команде",
          "опыт работы с фреймворком сборки Maven",
          "консультация пользователей по вопросам работы ПО",
          "опыт работы и знание команд ОС Linux",
          "опыт работы со структурами данных XML, JSON",
          "высшее техническое образование"
        ]
      }
      """;
  }
}
