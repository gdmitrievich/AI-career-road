export interface LearningResource {
  id: string;
  name: string;
  url: string;
  type: 'documentation' | 'video_course' | 'book' | 'interactive_platform' | 'video' | 'exercises';
}

export interface SubSkill {
  sub_skill_id: string;
  sub_skill_name: string;
  sub_skill_description: string;
  position_in_sequence: number;
  position_reason: string;
  learning_resources: LearningResource[];
}

export interface MainSkill {
  skill_id: string;
  skill_name: string;
  skill_description: string;
  position_in_sequence: number;
  position_reason: string;
  learning_resources: LearningResource[];
  sub_skills: SubSkill[];
}

export interface Project {
  project_id: string;
  project_name: string;
  project_description: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  required_skills: string[];
  success_criteria: string[];
}

export interface RoadmapMetadata {
  job_specialization: string;
  vacancy_url?: string;
}

export interface LearningPath {
  skills: MainSkill[];
}

export interface RoadmapData {
  roadmap_metadata: RoadmapMetadata;
  learning_path: LearningPath;
  pet_projects: Project[];
}