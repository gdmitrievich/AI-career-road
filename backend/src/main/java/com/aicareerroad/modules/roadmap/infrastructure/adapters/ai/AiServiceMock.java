package com.aicareerroad.modules.roadmap.infrastructure.adapters.ai;

public class AiServiceMock implements AiServiceAdaptee {
  private static int invocationCount = 0;

  @Override
  public String process(String prompt) {
    if (invocationCount == 0) {
      invocationCount++;
      return """
        {
          "skills": ["Java", "Spring Framework", "Hibernate"],
          "specialization": "Backend Development"
        } 
        """;
    }
    return """
      {
        "learning_path": {
          "skills": [
            {
              "skill_id": "skill_001",
              "skill_name": "Programming Fundamentals",
              "skill_description": "Core concepts of programming and problem-solving.",
              "position_in_sequence": 1,
              "position_reason": "Foundational knowledge required for all subsequent skills.",
              "learning_resources": [
                {
                  "id": "lr_001a",
                  "name": "Intro to Programming",
                  "type": "interactive course",
                  "url": "https://example.com/intro"
                },
                {
                  "id": "lr_001b",
                  "name": "Problem-Solving Drills",
                  "type": "practice set",
                  "url": "https://example.com/drills"
                }
              ],
              "sub_skills": [
                {
                  "sub_skill_id": "sub_001a",
                  "sub_skill_name": "Variables & Data Types",
                  "sub_skill_description": "Understanding how to store and manipulate data.",
                  "position_in_sequence": 1,
                  "position_reason": "Most basic building block.",
                  "learning_resources": [
                    {
                      "id": "lr_sub_001a1",
                      "name": "Data Types Tutorial",
                      "type": "video",
                      "url": "https://example.com/datatypes"
                    }
                  ]
                }
              ]
            },
            {
              "skill_id": "skill_002",
              "skill_name": "Web Development Basics",
              "skill_description": "Creating basic structures and styles for the web.",
              "position_in_sequence": 2,
              "position_reason": "Builds on programming logic to create visual interfaces.",
              "learning_resources": [
                {
                  "id": "lr_002a",
                  "name": "HTML & CSS Crash Course",
                  "type": "video course",
                  "url": "https://example.com/htmlcss"
                },
                {
                  "id": "lr_002b",
                  "name": "Responsive Design Guide",
                  "type": "ebook",
                  "url": "https://example.com/responsive"
                },
                {
                  "id": "lr_002c",
                  "name": "Browser DevTools Tutorial",
                  "type": "article",
                  "url": "https://example.com/devtools"
                }
              ],
              "sub_skills": []
            }
          ]
        },
        "pet_projects": [
          {
            "project_id": "proj_01",
            "project_name": "Personal Portfolio Website",
            "project_description": "A responsive website to showcase projects and skills.",
            "difficulty_level": "Beginner",
            "required_skills": ["skill_001", "skill_002"],
            "success_criteria": [
              "Site loads without errors.",
              "Layout adapts to mobile and desktop screens.",
              "All links and contact form are functional."
            ]
          },
          {
            "project_id": "proj_02",
            "project_name": "Task Manager CLI Tool",
            "project_description": "A command-line application to manage a to-do list.",
            "difficulty_level": "Intermediate",
            "required_skills": ["skill_001"],
            "success_criteria": [
              "Can add, list, and delete tasks via commands.",
              "Data persists between sessions in a file.",
              "Includes clear help documentation."
            ]
          }
        ],
        "roadmap_metadata": {
          "job_specialization": "Frontend Developer",
          "vacancy_url": "https://example.jobs/frontend-dev-123"
        }
      } 
      """;
  }
}
