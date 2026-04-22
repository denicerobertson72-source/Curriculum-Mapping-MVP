import type {
  AppState, User, Department, Program, Course,
  ProgramSLO, CourseSLO, ProgramCourse, CurriculumMapping,
  CourseTopicPlaceholder, CourseTopicTag,
} from '../types';

const TS = '2024-01-01T00:00:00Z';
const TS2 = '2024-03-01T00:00:00Z';

export const users: User[] = [
  { user_id: 'user-1', first_name: 'Sarah', last_name: 'Chen', email: 'schen@university.edu', role: 'admin', department_id: 'dept-1', college_name: 'College of Natural Sciences', active_status: 'active', last_login: '2024-03-20T08:30:00Z', created_at: TS, updated_at: TS2 },
  { user_id: 'user-2', first_name: 'Marcus', last_name: 'Webb', email: 'mwebb@university.edu', role: 'program_lead', department_id: 'dept-1', college_name: 'College of Natural Sciences', active_status: 'active', last_login: '2024-03-19T14:15:00Z', created_at: TS, updated_at: TS2 },
  { user_id: 'user-3', first_name: 'Yolanda', last_name: 'Kim', email: 'ykim@university.edu', role: 'faculty', department_id: 'dept-2', college_name: 'College of Arts & Humanities', active_status: 'active', last_login: '2024-03-18T10:00:00Z', created_at: TS, updated_at: TS2 },
  { user_id: 'user-4', first_name: 'James', last_name: 'Okafor', email: 'jokafor@university.edu', role: 'reviewer', department_id: 'dept-2', college_name: 'College of Arts & Humanities', active_status: 'active', last_login: '2024-03-15T09:45:00Z', created_at: TS, updated_at: TS2 },
];

export const departments: Department[] = [
  { department_id: 'dept-1', department_code: 'BIOL', department_name: 'Department of Biology', college_name: 'College of Natural Sciences', active_status: 'active', created_at: TS, updated_at: TS2 },
  { department_id: 'dept-2', department_code: 'ENGL', department_name: 'Department of English', college_name: 'College of Arts & Humanities', active_status: 'active', created_at: TS, updated_at: TS2 },
];

export const programs: Program[] = [
  { program_id: 'prog-1', program_code: 'BIOL-BS', program_name: 'Bachelor of Science in Biology', degree_type: 'BS', department_id: 'dept-1', catalog_year: '2024', coordinator_user_id: 'user-2', status: 'active', notes: 'Accredited program. Next review 2026.', created_at: TS, updated_at: TS2 },
  { program_id: 'prog-2', program_code: 'ENGL-BA', program_name: 'Bachelor of Arts in English', degree_type: 'BA', department_id: 'dept-2', catalog_year: '2024', coordinator_user_id: 'user-3', status: 'active', notes: 'Includes literature and writing tracks.', created_at: TS, updated_at: TS2 },
  { program_id: 'prog-3', program_code: 'ENGL-MA', program_name: 'Master of Arts in English', degree_type: 'MA', department_id: 'dept-2', catalog_year: '2024', coordinator_user_id: 'user-3', status: 'active', notes: 'Thesis-required graduate program.', created_at: TS, updated_at: TS2 },
];

export const courses: Course[] = [
  { course_id: 'course-1',  course_code: 'BIOL 101', course_title: 'Introduction to Biology',       department_id: 'dept-1', credits: 4, active_status: 'active', last_reviewed_date: '2024-01-15', course_description: 'Foundational survey of biology covering cell theory, genetics, evolution, and ecology.', created_at: TS, updated_at: TS2 },
  { course_id: 'course-2',  course_code: 'BIOL 102', course_title: 'Ecology and Evolution',          department_id: 'dept-1', credits: 4, active_status: 'active', last_reviewed_date: '2024-01-15', course_description: 'Principles of ecology and evolutionary biology with emphasis on field methods.', created_at: TS, updated_at: TS2 },
  { course_id: 'course-3',  course_code: 'BIOL 201', course_title: 'Cell Biology',                   department_id: 'dept-1', credits: 3, active_status: 'active', last_reviewed_date: '2023-11-10', course_description: 'Structure and function of eukaryotic and prokaryotic cells.', created_at: TS, updated_at: TS2 },
  { course_id: 'course-4',  course_code: 'BIOL 202', course_title: 'Genetics',                       department_id: 'dept-1', credits: 3, active_status: 'active', last_reviewed_date: '2023-11-10', course_description: 'Classical and molecular genetics with laboratory.', created_at: TS, updated_at: TS2 },
  { course_id: 'course-5',  course_code: 'BIOL 301', course_title: 'Microbiology',                   department_id: 'dept-1', credits: 3, active_status: 'active', last_reviewed_date: '2024-02-20', course_description: 'Microbial physiology, diversity, ecology, and pathogenesis.', created_at: TS, updated_at: TS2 },
  { course_id: 'course-6',  course_code: 'BIOL 302', course_title: 'Biochemistry',                   department_id: 'dept-1', credits: 3, active_status: 'active', last_reviewed_date: '2023-09-05', course_description: 'Molecular basis of biological processes including metabolism and enzyme kinetics.', created_at: TS, updated_at: TS2 },
  { course_id: 'course-7',  course_code: 'BIOL 310', course_title: 'Research Methods in Biology',    department_id: 'dept-1', credits: 3, active_status: 'active', last_reviewed_date: '2024-03-01', course_description: 'Experimental design, statistical analysis, and scientific communication.', created_at: TS, updated_at: TS2 },
  { course_id: 'course-8',  course_code: 'BIOL 401', course_title: 'Ecology and Conservation',       department_id: 'dept-1', credits: 3, active_status: 'active', last_reviewed_date: '2024-01-30', course_description: 'Applied ecology and conservation biology with fieldwork component.', created_at: TS, updated_at: TS2 },
  { course_id: 'course-9',  course_code: 'BIOL 499', course_title: 'Senior Capstone in Biology',     department_id: 'dept-1', credits: 3, active_status: 'active', last_reviewed_date: '2024-03-15', course_description: 'Independent research culminating in a written thesis and public presentation.', created_at: TS, updated_at: TS2 },
  { course_id: 'course-10', course_code: 'ENGL 101', course_title: 'Composition I',                  department_id: 'dept-2', credits: 3, active_status: 'active', last_reviewed_date: '2024-02-01', course_description: 'Introduction to academic writing, argumentation, and research.', created_at: TS, updated_at: TS2 },
  { course_id: 'course-11', course_code: 'ENGL 201', course_title: 'Introduction to Literature',     department_id: 'dept-2', credits: 3, active_status: 'active', last_reviewed_date: '2024-01-20', course_description: 'Survey of major literary genres including poetry, fiction, drama, and nonfiction.', created_at: TS, updated_at: TS2 },
  { course_id: 'course-12', course_code: 'ENGL 301', course_title: 'Literary Theory',                department_id: 'dept-2', credits: 3, active_status: 'active', last_reviewed_date: '2023-12-05', course_description: 'Major theoretical frameworks in literary and cultural studies.', created_at: TS, updated_at: TS2 },
  { course_id: 'course-13', course_code: 'ENGL 302', course_title: 'Research Methods in English',    department_id: 'dept-2', credits: 3, active_status: 'active', last_reviewed_date: '2024-02-15', course_description: 'Archival, bibliographic, and secondary research methods for literary scholars.', created_at: TS, updated_at: TS2 },
  { course_id: 'course-14', course_code: 'ENGL 499', course_title: 'Senior Seminar',                 department_id: 'dept-2', credits: 3, active_status: 'active', last_reviewed_date: '2024-03-10', course_description: 'Capstone seminar with original research paper on a focused literary topic.', created_at: TS, updated_at: TS2 },
];

export const programSLOs: ProgramSLO[] = [
  // BIOL-BS
  { program_slo_id: 'pslo-1', program_id: 'prog-1', slo_number: 1, short_label: 'Scientific Knowledge',   full_statement: 'Demonstrate comprehensive knowledge of biological concepts across core subdisciplines including cell biology, genetics, ecology, and evolution.',                                            status: 'active', effective_date: '2024-01-01', created_at: TS, updated_at: TS2 },
  { program_slo_id: 'pslo-2', program_id: 'prog-1', slo_number: 2, short_label: 'Critical Analysis',      full_statement: 'Critically analyze biological literature, experimental design, and scientific evidence to evaluate claims and draw well-supported conclusions.',                                        status: 'active', effective_date: '2024-01-01', created_at: TS, updated_at: TS2 },
  { program_slo_id: 'pslo-3', program_id: 'prog-1', slo_number: 3, short_label: 'Research Skills',        full_statement: 'Design, conduct, and interpret original biological research using appropriate methodologies and statistical approaches.',                                                             status: 'active', effective_date: '2024-01-01', created_at: TS, updated_at: TS2 },
  { program_slo_id: 'pslo-4', program_id: 'prog-1', slo_number: 4, short_label: 'Scientific Communication', full_statement: 'Effectively communicate scientific findings and concepts in both written and oral forms appropriate to diverse audiences.',                                                       status: 'active', effective_date: '2024-01-01', created_at: TS, updated_at: TS2 },
  { program_slo_id: 'pslo-5', program_id: 'prog-1', slo_number: 5, short_label: 'Professional Ethics',    full_statement: 'Apply ethical principles and professional standards in biological research and practice, including responsible conduct of research.',                                                status: 'active', effective_date: '2024-01-01', created_at: TS, updated_at: TS2 },
  // ENGL-BA
  { program_slo_id: 'pslo-6', program_id: 'prog-2', slo_number: 1, short_label: 'Close Reading',          full_statement: 'Demonstrate advanced close reading skills across literary genres and historical periods, identifying form, style, and rhetorical strategies.',                                      status: 'active', effective_date: '2024-01-01', created_at: TS, updated_at: TS2 },
  { program_slo_id: 'pslo-7', program_id: 'prog-2', slo_number: 2, short_label: 'Critical Writing',       full_statement: 'Produce clear, well-argued critical writing that develops original interpretations supported by textual evidence and secondary sources.',                                           status: 'active', effective_date: '2024-01-01', created_at: TS, updated_at: TS2 },
  { program_slo_id: 'pslo-8', program_id: 'prog-2', slo_number: 3, short_label: 'Literary History',       full_statement: 'Demonstrate broad knowledge of literary history, major movements, and canonical and non-canonical texts across multiple traditions.',                                              status: 'active', effective_date: '2024-01-01', created_at: TS, updated_at: TS2 },
  { program_slo_id: 'pslo-9', program_id: 'prog-2', slo_number: 4, short_label: 'Cultural Context',       full_statement: 'Analyze literature within its historical, cultural, social, and theoretical contexts, connecting texts to broader intellectual traditions.',                                      status: 'active', effective_date: '2024-01-01', created_at: TS, updated_at: TS2 },
  { program_slo_id: 'pslo-10', program_id: 'prog-2', slo_number: 5, short_label: 'Research Skills',       full_statement: 'Conduct independent literary research using primary and secondary sources, archives, and scholarly databases with proper attribution.',                                            status: 'active', effective_date: '2024-01-01', created_at: TS, updated_at: TS2 },
  // ENGL-MA
  { program_slo_id: 'pslo-11', program_id: 'prog-3', slo_number: 1, short_label: 'Advanced Scholarship',  full_statement: 'Produce original scholarly work that makes a substantive contribution to existing conversations in literary and cultural studies.',                                                status: 'active', effective_date: '2024-01-01', created_at: TS, updated_at: TS2 },
  { program_slo_id: 'pslo-12', program_id: 'prog-3', slo_number: 2, short_label: 'Theoretical Frameworks', full_statement: 'Apply, synthesize, and critique major theoretical frameworks in literary studies including postcolonial, feminist, psychoanalytic, and new historicist approaches.',             status: 'active', effective_date: '2024-01-01', created_at: TS, updated_at: TS2 },
  { program_slo_id: 'pslo-13', program_id: 'prog-3', slo_number: 3, short_label: 'Research Expertise',    full_statement: 'Demonstrate expertise in archival, bibliographic, and secondary research methods appropriate to advanced literary scholarship.',                                                  status: 'active', effective_date: '2024-01-01', created_at: TS, updated_at: TS2 },
  { program_slo_id: 'pslo-14', program_id: 'prog-3', slo_number: 4, short_label: 'Professional Communication', full_statement: 'Present scholarly arguments effectively in academic venues including conference presentations, seminar discussions, and peer-reviewed writing.',                             status: 'active', effective_date: '2024-01-01', created_at: TS, updated_at: TS2 },
];

export const courseSLOs: CourseSLO[] = [
  { course_slo_id: 'cslo-1', course_id: 'course-1', slo_number: 1, short_label: 'Basic Concepts',    full_statement: 'Identify and explain fundamental biological concepts including cell theory, evolution, genetics, and ecology.', status: 'active', created_at: TS, updated_at: TS2 },
  { course_slo_id: 'cslo-2', course_id: 'course-1', slo_number: 2, short_label: 'Scientific Method', full_statement: 'Apply the scientific method to design simple experiments and interpret results.',                              status: 'active', created_at: TS, updated_at: TS2 },
  { course_slo_id: 'cslo-3', course_id: 'course-1', slo_number: 3, short_label: 'Lab Skills',        full_statement: 'Demonstrate basic laboratory safety and technique in a biological laboratory setting.',                         status: 'active', created_at: TS, updated_at: TS2 },
  { course_slo_id: 'cslo-4', course_id: 'course-11', slo_number: 1, short_label: 'Genre Recognition', full_statement: 'Identify and analyze major literary genres including poetry, fiction, drama, and nonfiction.',               status: 'active', created_at: TS, updated_at: TS2 },
  { course_slo_id: 'cslo-5', course_id: 'course-11', slo_number: 2, short_label: 'Close Reading',    full_statement: 'Apply close reading strategies to analyze form, structure, and language in literary texts.',                   status: 'active', created_at: TS, updated_at: TS2 },
];

export const programCourses: ProgramCourse[] = [
  // BIOL-BS
  { program_course_id: 'pc-1',  program_id: 'prog-1', course_id: 'course-1',  required_or_elective: 'required', recommended_term: 'Year 1 Fall',   active_status: 'active', created_at: TS, updated_at: TS2 },
  { program_course_id: 'pc-2',  program_id: 'prog-1', course_id: 'course-2',  required_or_elective: 'required', recommended_term: 'Year 1 Spring',  active_status: 'active', created_at: TS, updated_at: TS2 },
  { program_course_id: 'pc-3',  program_id: 'prog-1', course_id: 'course-3',  required_or_elective: 'required', recommended_term: 'Year 2 Fall',   active_status: 'active', created_at: TS, updated_at: TS2 },
  { program_course_id: 'pc-4',  program_id: 'prog-1', course_id: 'course-4',  required_or_elective: 'required', recommended_term: 'Year 2 Spring',  active_status: 'active', created_at: TS, updated_at: TS2 },
  { program_course_id: 'pc-5',  program_id: 'prog-1', course_id: 'course-5',  required_or_elective: 'required', recommended_term: 'Year 3 Fall',   active_status: 'active', created_at: TS, updated_at: TS2 },
  { program_course_id: 'pc-6',  program_id: 'prog-1', course_id: 'course-6',  required_or_elective: 'required', recommended_term: 'Year 3 Fall',   active_status: 'active', created_at: TS, updated_at: TS2 },
  { program_course_id: 'pc-7',  program_id: 'prog-1', course_id: 'course-7',  required_or_elective: 'required', recommended_term: 'Year 3 Spring',  active_status: 'active', created_at: TS, updated_at: TS2 },
  { program_course_id: 'pc-8',  program_id: 'prog-1', course_id: 'course-8',  required_or_elective: 'elective', recommended_term: 'Year 3 Spring',  active_status: 'active', created_at: TS, updated_at: TS2 },
  { program_course_id: 'pc-9',  program_id: 'prog-1', course_id: 'course-9',  required_or_elective: 'required', recommended_term: 'Year 4 Spring',  active_status: 'active', created_at: TS, updated_at: TS2 },
  // ENGL-BA
  { program_course_id: 'pc-10', program_id: 'prog-2', course_id: 'course-10', required_or_elective: 'required', recommended_term: 'Year 1 Fall',   active_status: 'active', created_at: TS, updated_at: TS2 },
  { program_course_id: 'pc-11', program_id: 'prog-2', course_id: 'course-11', required_or_elective: 'required', recommended_term: 'Year 2 Fall',   active_status: 'active', created_at: TS, updated_at: TS2 },
  { program_course_id: 'pc-12', program_id: 'prog-2', course_id: 'course-12', required_or_elective: 'required', recommended_term: 'Year 3 Fall',   active_status: 'active', created_at: TS, updated_at: TS2 },
  { program_course_id: 'pc-13', program_id: 'prog-2', course_id: 'course-13', required_or_elective: 'required', recommended_term: 'Year 3 Spring',  active_status: 'active', created_at: TS, updated_at: TS2 },
  { program_course_id: 'pc-14', program_id: 'prog-2', course_id: 'course-14', required_or_elective: 'required', recommended_term: 'Year 4 Spring',  active_status: 'active', created_at: TS, updated_at: TS2 },
  // ENGL-MA
  { program_course_id: 'pc-15', program_id: 'prog-3', course_id: 'course-11', required_or_elective: 'required', recommended_term: 'Semester 1',    active_status: 'active', created_at: TS, updated_at: TS2 },
  { program_course_id: 'pc-16', program_id: 'prog-3', course_id: 'course-12', required_or_elective: 'required', recommended_term: 'Semester 1',    active_status: 'active', created_at: TS, updated_at: TS2 },
  { program_course_id: 'pc-17', program_id: 'prog-3', course_id: 'course-13', required_or_elective: 'required', recommended_term: 'Semester 2',    active_status: 'active', created_at: TS, updated_at: TS2 },
  { program_course_id: 'pc-18', program_id: 'prog-3', course_id: 'course-14', required_or_elective: 'required', recommended_term: 'Semester 3',    active_status: 'active', created_at: TS, updated_at: TS2 },
];

// Helper to create a mapping record
let cmIdx = 1;
function cm(program_id: string, course_id: string, program_slo_id: string, irm_level: 'I'|'R'|'M'): CurriculumMapping {
  return { curriculum_mapping_id: `cm-${cmIdx++}`, program_id, course_id, program_slo_id, irm_level, active_status: 'active', updated_by_user_id: 'user-2', created_at: TS, updated_at: TS2 };
}

export const curriculumMappings: CurriculumMapping[] = [
  // BIOL-BS — course-1 BIOL 101
  cm('prog-1','course-1','pslo-1','I'), cm('prog-1','course-1','pslo-2','I'), cm('prog-1','course-1','pslo-3','I'), cm('prog-1','course-1','pslo-4','I'), cm('prog-1','course-1','pslo-5','I'),
  // BIOL 102
  cm('prog-1','course-2','pslo-1','I'), cm('prog-1','course-2','pslo-2','R'), cm('prog-1','course-2','pslo-3','R'), cm('prog-1','course-2','pslo-5','I'),
  // BIOL 201
  cm('prog-1','course-3','pslo-1','R'), cm('prog-1','course-3','pslo-2','R'), cm('prog-1','course-3','pslo-4','R'),
  // BIOL 202
  cm('prog-1','course-4','pslo-1','R'), cm('prog-1','course-4','pslo-2','R'), cm('prog-1','course-4','pslo-3','R'),
  // BIOL 301
  cm('prog-1','course-5','pslo-1','R'), cm('prog-1','course-5','pslo-2','R'), cm('prog-1','course-5','pslo-3','R'), cm('prog-1','course-5','pslo-4','R'),
  // BIOL 302
  cm('prog-1','course-6','pslo-1','R'), cm('prog-1','course-6','pslo-2','R'),
  // BIOL 310
  cm('prog-1','course-7','pslo-2','R'), cm('prog-1','course-7','pslo-3','R'), cm('prog-1','course-7','pslo-4','R'), cm('prog-1','course-7','pslo-5','R'),
  // BIOL 401
  cm('prog-1','course-8','pslo-1','R'), cm('prog-1','course-8','pslo-2','M'), cm('prog-1','course-8','pslo-3','M'), cm('prog-1','course-8','pslo-4','R'), cm('prog-1','course-8','pslo-5','R'),
  // BIOL 499
  cm('prog-1','course-9','pslo-1','M'), cm('prog-1','course-9','pslo-2','M'), cm('prog-1','course-9','pslo-3','M'), cm('prog-1','course-9','pslo-4','M'), cm('prog-1','course-9','pslo-5','M'),

  // ENGL-BA — ENGL 101
  cm('prog-2','course-10','pslo-6','I'), cm('prog-2','course-10','pslo-7','I'), cm('prog-2','course-10','pslo-10','I'),
  // ENGL 201
  cm('prog-2','course-11','pslo-6','I'), cm('prog-2','course-11','pslo-7','R'), cm('prog-2','course-11','pslo-8','I'), cm('prog-2','course-11','pslo-9','I'),
  // ENGL 301
  cm('prog-2','course-12','pslo-6','R'), cm('prog-2','course-12','pslo-7','R'), cm('prog-2','course-12','pslo-8','R'), cm('prog-2','course-12','pslo-9','R'), cm('prog-2','course-12','pslo-10','R'),
  // ENGL 302
  cm('prog-2','course-13','pslo-6','R'), cm('prog-2','course-13','pslo-7','R'), cm('prog-2','course-13','pslo-9','R'), cm('prog-2','course-13','pslo-10','R'),
  // ENGL 499
  cm('prog-2','course-14','pslo-6','M'), cm('prog-2','course-14','pslo-7','M'), cm('prog-2','course-14','pslo-8','M'), cm('prog-2','course-14','pslo-9','M'), cm('prog-2','course-14','pslo-10','M'),

  // ENGL-MA — ENGL 201
  cm('prog-3','course-11','pslo-11','I'), cm('prog-3','course-11','pslo-12','I'), cm('prog-3','course-11','pslo-14','I'),
  // ENGL 301
  cm('prog-3','course-12','pslo-11','R'), cm('prog-3','course-12','pslo-12','R'), cm('prog-3','course-12','pslo-13','R'), cm('prog-3','course-12','pslo-14','R'),
  // ENGL 302
  cm('prog-3','course-13','pslo-11','R'), cm('prog-3','course-13','pslo-12','R'), cm('prog-3','course-13','pslo-13','R'),
  // ENGL 499
  cm('prog-3','course-14','pslo-11','M'), cm('prog-3','course-14','pslo-12','M'), cm('prog-3','course-14','pslo-13','M'), cm('prog-3','course-14','pslo-14','M'),
];

export const topicPlaceholders: CourseTopicPlaceholder[] = [
  { topic_placeholder_id: 'tp-1', course_id: 'course-1',  syllabus_url: 'https://bio.university.edu/syllabi/biol101.pdf', syllabus_review_date: '2024-01-15', major_assignments_text: 'Lab reports (4), Midterm exam, Final exam, Scientific method essay', delivery_notes: 'Lecture 3×/week + lab 1×/week. Emphasizes hands-on discovery learning.', created_at: TS, updated_at: TS2 },
  { topic_placeholder_id: 'tp-2', course_id: 'course-7',  syllabus_url: 'https://bio.university.edu/syllabi/biol310.pdf', syllabus_review_date: '2024-03-01', major_assignments_text: 'Research proposal, Data collection project, Statistical analysis report, Poster presentation', delivery_notes: 'Flipped classroom. Students work with real datasets from ongoing departmental research.', created_at: TS, updated_at: TS2 },
  { topic_placeholder_id: 'tp-3', course_id: 'course-12', syllabus_url: 'https://english.university.edu/syllabi/engl301.pdf', syllabus_review_date: '2023-12-05', major_assignments_text: 'Theory application papers (3), Seminar participation, Final theoretical analysis essay (20 pp)', delivery_notes: 'Discussion-based seminar. Students read primary theoretical texts and apply frameworks to works of their choosing.', created_at: TS, updated_at: TS2 },
];

export const topicTags: CourseTopicTag[] = [
  // BIOL 101
  { course_topic_tag_id: 'tag-1',  course_id: 'course-1',  topic_name: 'Cell Theory',              topic_type: 'topic',   created_at: TS, updated_at: TS2 },
  { course_topic_tag_id: 'tag-2',  course_id: 'course-1',  topic_name: 'Evolutionary Principles',  topic_type: 'topic',   created_at: TS, updated_at: TS2 },
  { course_topic_tag_id: 'tag-3',  course_id: 'course-1',  topic_name: 'Scientific Method',        topic_type: 'skill',   created_at: TS, updated_at: TS2 },
  { course_topic_tag_id: 'tag-4',  course_id: 'course-1',  topic_name: 'Lab Safety',               topic_type: 'skill',   created_at: TS, updated_at: TS2 },
  { course_topic_tag_id: 'tag-5',  course_id: 'course-1',  topic_name: 'Mendelian Genetics',       topic_type: 'concept', created_at: TS, updated_at: TS2 },
  // BIOL 310
  { course_topic_tag_id: 'tag-6',  course_id: 'course-7',  topic_name: 'Experimental Design',      topic_type: 'method',  created_at: TS, updated_at: TS2 },
  { course_topic_tag_id: 'tag-7',  course_id: 'course-7',  topic_name: 'Statistical Analysis',     topic_type: 'skill',   created_at: TS, updated_at: TS2 },
  { course_topic_tag_id: 'tag-8',  course_id: 'course-7',  topic_name: 'Hypothesis Testing',       topic_type: 'method',  created_at: TS, updated_at: TS2 },
  { course_topic_tag_id: 'tag-9',  course_id: 'course-7',  topic_name: 'Data Visualization',       topic_type: 'skill',   created_at: TS, updated_at: TS2 },
  { course_topic_tag_id: 'tag-10', course_id: 'course-7',  topic_name: 'Literature Review',        topic_type: 'skill',   created_at: TS, updated_at: TS2 },
  // ENGL 301
  { course_topic_tag_id: 'tag-11', course_id: 'course-12', topic_name: 'Marxist Criticism',        topic_type: 'concept', created_at: TS, updated_at: TS2 },
  { course_topic_tag_id: 'tag-12', course_id: 'course-12', topic_name: 'Feminist Theory',          topic_type: 'concept', created_at: TS, updated_at: TS2 },
  { course_topic_tag_id: 'tag-13', course_id: 'course-12', topic_name: 'Poststructuralism',        topic_type: 'concept', created_at: TS, updated_at: TS2 },
  { course_topic_tag_id: 'tag-14', course_id: 'course-12', topic_name: 'Close Reading',            topic_type: 'skill',   created_at: TS, updated_at: TS2 },
  { course_topic_tag_id: 'tag-15', course_id: 'course-12', topic_name: 'Theoretical Application', topic_type: 'method',  created_at: TS, updated_at: TS2 },
];

const sampleData: AppState = {
  currentUser: users[0],
  users,
  departments,
  programs,
  courses,
  programSLOs,
  courseSLOs,
  programCourses,
  curriculumMappings,
  topicPlaceholders,
  topicTags,
};

export default sampleData;
