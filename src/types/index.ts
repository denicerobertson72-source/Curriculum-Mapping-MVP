// ─── Core entity types ───────────────────────────────────────────────────────

export type Role = 'admin' | 'program_lead' | 'faculty' | 'reviewer';
export type Status = 'active' | 'inactive';
export type DegreeType = 'BA' | 'BS' | 'MA' | 'MS' | 'PhD' | 'Certificate';
export type IRM = 'I' | 'R' | 'M';
export type RequiredOrElective = 'required' | 'elective';
export type TopicType = 'topic' | 'skill' | 'concept' | 'method';

export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  department_id: string;
  college_name?: string;
  active_status: Status;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface Department {
  department_id: string;
  department_code: string;
  department_name: string;
  college_name: string;
  active_status: Status;
  created_at: string;
  updated_at: string;
}

export interface Program {
  program_id: string;
  program_code: string;
  program_name: string;
  degree_type: DegreeType;
  department_id: string;
  catalog_year?: string;
  coordinator_user_id?: string;
  status: Status;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  course_id: string;
  course_code: string;
  course_title: string;
  department_id: string;
  credits?: number;
  course_description?: string;
  active_status: Status;
  primary_owner_user_id?: string;
  last_reviewed_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ProgramSLO {
  program_slo_id: string;
  program_id: string;
  slo_number: number;
  short_label: string;
  full_statement: string;
  category?: string;
  status: Status;
  effective_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CourseSLO {
  course_slo_id: string;
  course_id: string;
  slo_number: number;
  short_label: string;
  full_statement: string;
  status: Status;
  effective_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ProgramCourse {
  program_course_id: string;
  program_id: string;
  course_id: string;
  sequence_group?: string;
  required_or_elective: RequiredOrElective;
  recommended_term?: string;
  notes?: string;
  active_status: Status;
  created_at: string;
  updated_at: string;
}

export interface CurriculumMapping {
  curriculum_mapping_id: string;
  program_id: string;
  course_id: string;
  program_slo_id: string;
  irm_level: IRM;
  linked_course_slo_id?: string;
  rationale_note?: string;
  topic_support_note?: string;
  active_status: Status;
  updated_by_user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CourseTopicPlaceholder {
  topic_placeholder_id: string;
  course_id: string;
  syllabus_url?: string;
  syllabus_review_date?: string;
  major_assignments_text?: string;
  delivery_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CourseTopicTag {
  course_topic_tag_id: string;
  course_id: string;
  topic_name: string;
  topic_type: TopicType;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// ─── App state ────────────────────────────────────────────────────────────────

export interface AppState {
  currentUser: User;
  users: User[];
  departments: Department[];
  programs: Program[];
  courses: Course[];
  programSLOs: ProgramSLO[];
  courseSLOs: CourseSLO[];
  programCourses: ProgramCourse[];
  curriculumMappings: CurriculumMapping[];
  topicPlaceholders: CourseTopicPlaceholder[];
  topicTags: CourseTopicTag[];
}
