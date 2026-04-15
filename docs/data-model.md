# Data Model

## Core Entities
- Users
- Departments
- Programs
- Courses
- Program SLOs
- Course SLOs
- Program Courses
- Curriculum Mappings
- Course Topic Placeholder
- Course Topic Tags

## Key Relationships
- One department has many programs
- One department has many courses
- One program has many program SLOs
- One course has many course SLOs
- One program has many courses through program_courses
- One course can appear in multiple programs
- One curriculum mapping links a program, course, and program SLO

## Notes
- MVP matrix is based on Course -> Program SLO
- Course SLO linkage is optional in phase 1
- Topic placeholder supports a future overlap-analysis phase
