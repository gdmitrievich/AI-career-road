package com.aicareerroad.modules.roadmap.domain.requiredinterfacesimpl;

import com.aicareerroad.modules.roadmap.web.dtos.LearningPath;
import com.aicareerroad.modules.roadmap.web.dtos.LearningResource;
import com.aicareerroad.modules.roadmap.web.dtos.MainSkill;
import com.aicareerroad.modules.roadmap.web.dtos.Project;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapGenerateRequest;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapMetadata;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapResponse;
import com.aicareerroad.modules.roadmap.web.dtos.SubSkill;
import com.aicareerroad.modules.roadmap.web.requiredinterfaces.RoadmapModel;
import java.util.Arrays;
import java.util.List;

/**
 * To check in Browser:
 * fetch('http://localhost:8080/api/roadmaps', {
 * method: 'POST',
 * headers: {
 * 'Content-Type': 'application/json'
 * },
 * body: JSON.stringify({ vacancyUrl: 'http://localhost:8080/api/roadmaps' })
 * })
 * .then(response => response.json())
 * .then(data => console.log(data));
 */

public class RoadmapModelMock implements RoadmapModel {
  @Override
  public RoadmapResponse generateRoadmap(RoadmapGenerateRequest roadmapGenerateRequest) {
    // Создаем учебные ресурсы
    List<LearningResource> javaResources = Arrays.asList(
      new LearningResource(
        "res1",
        "Java Documentation",
        "https://docs.oracle.com/javase/",
        "documentation"
      ),
      new LearningResource(
        "res2",
        "JavaRush",
        "https://javarush.com",
        "interactive_platform"
      )
    );

    // Создаем поднавыки
    List<SubSkill> coreJavaSubSkills = Arrays.asList(
      new SubSkill(
        "sub1",
        "OOP Basics",
        "Основы объектно-ориентированного программирования",
        1,
        "Фундаментальный навык для начала обучения",
        Arrays.asList(
          new LearningResource("res3", "Head First OOP", "https://example.com/headfirst", "book")
        )
      ),
      new SubSkill(
        "sub2",
        "Collections Framework",
        "Работа с коллекциями в Java",
        2,
        "Необходимый навык после освоения основ",
        Arrays.asList(
          new LearningResource("res4", "Java Collections", "https://example.com/collections", "video_course")
        )
      )
    );

    // Создаем основной навык
    MainSkill coreJavaSkill = new MainSkill(
      "skill1",
      "Core Java",
      "Основы языка программирования Java",
      1,
      "Базовый навык для любого Java-разработчика",
      javaResources,
      coreJavaSubSkills
    );

    // Создаем учебный путь
    LearningPath learningPath = new LearningPath(
      Arrays.asList(coreJavaSkill)
    );

    // Создаем проекты
    List<Project> projects = Arrays.asList(
      new Project(
        "proj1",
        "Todo List App",
        "Приложение для управления задачами",
        "beginner",
        Arrays.asList("Core Java"),
        Arrays.asList("Добавить задачи", "Редактировать задачи", "Удалять задачи")
      )
    );

    // Создаем метаданные
    RoadmapMetadata metadata = new RoadmapMetadata(
      "Java Developer",
      roadmapGenerateRequest.vacancyUrl()
    );

    // Создаем итоговый объект RoadmapData
    RoadmapResponse roadmap = new RoadmapResponse(
      metadata,
      learningPath,
      projects
    );

    return roadmap;
  }
}