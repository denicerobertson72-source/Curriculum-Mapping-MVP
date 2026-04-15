# Curriculum Mapping Tool MVP Specification

## 1. Purpose

This document outlines a minimum viable product (MVP) for a homegrown curriculum mapping tool. The tool is intentionally narrow in scope and focused on supporting curriculum review and alignment work without becoming a full assessment management platform.

The MVP is designed to support the following core functions:

- Store programs
- Store courses
- Store program student learning outcomes (SLOs)
- Optionally store course SLOs
- Map courses to program SLOs
- Assign Introduced / Reinforced / Mastered (I/R/M) designations
- Export a usable curriculum map
- Include a lightweight syllabus/topic placeholder to support a later phase focused on overlap analysis

## 2. Design Principles

The tool should be:

- Simple enough for faculty and program leads to use without heavy training
- Structured enough to produce reliable maps and reports
- Flexible enough to support a later syllabus/topic overlap phase
- Narrow enough to build and maintain internally

This is not a full assessment system. It is a mapping and review tool.

## 3. Core User Roles

### Admin
Can manage:

- Users
- Departments
- Programs
- Courses
- Institutional SLOs, if included
- Program SLOs
- Reporting and export settings

### Program Lead / Chair
Can:

- Manage courses within their program
- Review or edit mappings
- Assign I/R/M
- Review topic placeholders
- Export reports

### Faculty Editor
Can:

- View assigned courses
- Edit course SLOs
- Edit syllabus/topic placeholder fields
- Propose mappings, if allowed

### Read-Only Reviewer
Can:

- View programs
- View maps
- Run exports
- Read course/topic data

## 4. MVP Screens

### Screen 1: Login / Landing Dashboard

#### Purpose
Provide a simple landing page and quick access to assigned work.

#### Main elements

- Welcome message
- Programs I manage
- Courses assigned to me
- Recent updates
- Quick links:
  - View curriculum maps
  - Edit course records
  - Review program SLOs
  - Export reports

#### Fields shown

- User name
- Role
- Department / college
- Assigned programs
- Assigned courses
- Pending tasks count

---

### Screen 2: Programs List

#### Purpose
Browse all programs in scope.

#### Columns

- Program Code
- Program Name
- Department
- Degree Type
- Status
- Number of Courses
- Number of Program SLOs
- Last Updated

#### Actions

- View Program
- Edit Program
- Open Curriculum Map
- Export Map

#### Filters

- Department
- Degree Type
- Active / Inactive
- College

---

### Screen 3: Program Detail

#### Purpose
Central page for one program.

#### Sections

1. Program header
2. Program SLOs
3. Curriculum course list
4. Summary stats
5. Links to curriculum map and exports

#### Program header fields

- Program Code
- Program Name
- Degree Type
- Department
- College
- Catalog Year or Effective Year
- Status
- Program Coordinator
- Notes

#### Summary stats

- Total Courses in Map
- Total Program SLOs
- Courses Mapped
- Courses Unmapped
- Outcomes with no I
- Outcomes with no R
- Outcomes with no M

#### Actions

- Edit Program Info
- Manage Program SLOs
- Manage Courses in Program
- Open Curriculum Map
- Export Program Report

---

### Screen 4: Program SLO Management

#### Purpose
Create and manage program-level outcomes.

#### Table columns

- SLO Number
- Short Label
- Full SLO Statement
- Status
- Effective Date
- Last Updated
- Owner

#### Actions

- Add SLO
- Edit SLO
- Archive SLO
- Reorder SLOs

#### Fields for add/edit

- Program
- SLO Number
- Short Label
- Full Statement
- Optional Category
- Status
- Effective Date
- Notes

Optional later:
- Institutional outcome alignment field

---

### Screen 5: Courses List

#### Purpose
Browse course records used in the system.

#### Columns

- Course Code
- Course Title
- Department
- Credits
- Active / Inactive
- SLO Count
- Syllabus Placeholder Present? Yes / No
- Last Reviewed

#### Filters

- Department
- Program
- Active / Inactive
- Has Course SLOs
- Has Topic Placeholder

#### Actions

- View Course
- Edit Course
- View Mappings
- Export Course Summary

---

### Screen 6: Course Detail

#### Purpose
Hold the canonical course record used for mapping.

#### Sections

1. Course metadata
2. Course SLOs
3. Program mappings
4. Light syllabus/topic placeholder
5. Notes/history

#### Course metadata fields

- Course Code
- Course Title
- Department
- College
- Credits
- Course Description
- Active / Inactive
- Last Reviewed Date
- Primary Owner / Faculty Contact
- Notes

#### Actions

- Edit Course
- Manage Course SLOs
- Edit Topic Placeholder
- View All Program Mappings
- Export Course Summary

---

### Screen 7: Course SLO Management

#### Purpose
Store course-level SLOs if desired in phase 1.

#### Table columns

- SLO Number
- Short Label
- Full SLO Statement
- Status
- Last Updated

#### Fields for add/edit

- Course
- SLO Number
- Short Label
- Full Statement
- Status
- Effective Date
- Notes

Note: MVP can launch with course SLOs as optional.

---

### Screen 8: Curriculum Map Matrix

#### Purpose
Primary mapping interface.

#### Layout

| Course | SLO 1 | SLO 2 | SLO 3 | SLO 4 | Notes |
|---|---|---|---|---|---|
| ABC 101 | I |   | R |   | foundational writing |
| ABC 220 |   | R | R |   | methods course |
| ABC 410 |   |   | M | M | capstone emphasis |

#### Features

- Rows = program courses
- Columns = program SLOs
- Each cell can hold:
  - Blank
  - I
  - R
  - M

#### Actions

- Click cell to assign or change value
- Bulk edit row
- Bulk edit column
- Add row note
- Filter by required / elective
- Export to PDF / Excel

#### MVP cell behavior

A clicked cell opens a small modal or side panel showing:

- Selected course
- Selected program SLO
- I/R/M value
- Optional linked course SLO
- Optional note / rationale
- Updated by
- Updated date

---

### Screen 9: Mapping Detail / Side Panel

#### Purpose
Provide the structured record behind each map cell.

#### Fields

- Program
- Course
- Program SLO
- I/R/M value
- Optional linked Course SLO
- Optional rationale / note
- Optional major topic support note
- Active / Inactive
- Updated By
- Updated Date

---

### Screen 10: Gap & Coverage Report

#### Purpose
Show obvious mapping problems.

#### Sections

- Outcomes with no mapped courses
- Outcomes with no M-level coverage
- Courses with no mapped outcomes
- Courses with only I-level coverage
- Overconcentrated outcomes if too many M tags appear

#### Filters

- Program
- Department
- Degree Type

#### Export options

- PDF
- CSV
- Print-friendly view

---

### Screen 11: Course Alignment Summary Report

#### Purpose
Show one course's role across the curriculum.

#### Sections

- Course metadata
- Course SLOs
- Programs this course maps into
- Mapped program SLOs
- I/R/M tags by program
- Topic placeholder summary

---

### Screen 12: Topic Placeholder Edit Screen

#### Purpose
Prepare for future syllabus/topic overlap analysis without building full comparison logic now.

#### Fields

##### Syllabus placeholder

- Syllabus File Upload (optional)
- Syllabus URL (optional)
- Last Syllabus Review Date

##### Major Topics / Concepts
Simple repeatable list or tags:

- Topic Name
- Optional Topic Notes

Examples:
- scientific method
- cellular respiration
- APA style
- regression basics
- archival research

##### Major Skills
Repeatable list or tags:

- critical reading
- oral presentation
- lab technique
- statistical interpretation

##### Major Assignments
Free text or light list:

- literature review
- lab report
- capstone project
- case study analysis

##### Delivery / emphasis notes
Free-text field.

---

### Screen 13: Topic Placeholder Summary View

#### Purpose
Let reviewers see topic placeholders across a program.

#### Table columns

- Course Code
- Course Title
- Topic Count
- Skill Count
- Has Syllabus File
- Last Review Date

Expanding a row shows:

- Major topics
- Major skills
- Major assignments
- Notes

---

### Screen 14: Admin Data Import Screen

#### Purpose
Load initial data quickly.

#### Imports

- Programs CSV
- Courses CSV
- Program SLOs CSV
- Optional Course SLOs CSV
- Users CSV
- Program-course membership CSV
- Optional Topic Placeholder CSV

#### Required validations

- Duplicate course code checks
- Duplicate SLO number checks within program
- Missing program/course references
- Invalid I/R/M values where imported

## 5. Exact Field List by Entity

### A. Users

- `user_id`
- `first_name`
- `last_name`
- `email`
- `role`
- `department_id`
- `college_name` (optional)
- `active_status`
- `last_login`
- `created_at`
- `updated_at`

### B. Departments

- `department_id`
- `department_code`
- `department_name`
- `college_name`
- `active_status`
- `created_at`
- `updated_at`

### C. Programs

- `program_id`
- `program_code`
- `program_name`
- `degree_type`
- `department_id`
- `catalog_year` (optional)
- `coordinator_user_id` (optional)
- `status`
- `notes`
- `created_at`
- `updated_at`

### D. Courses

- `course_id`
- `course_code`
- `course_number` (optional separate field if desired)
- `course_title`
- `department_id`
- `credits` (optional)
- `course_description` (optional)
- `active_status`
- `primary_owner_user_id` (optional)
- `last_reviewed_date` (optional)
- `notes`
- `created_at`
- `updated_at`

### E. Program SLOs

- `program_slo_id`
- `program_id`
- `slo_number`
- `short_label`
- `full_statement`
- `category` (optional)
- `status`
- `effective_date` (optional)
- `notes`
- `created_at`
- `updated_at`

### F. Course SLOs

- `course_slo_id`
- `course_id`
- `slo_number`
- `short_label`
- `full_statement`
- `status`
- `effective_date` (optional)
- `notes`
- `created_at`
- `updated_at`

### G. Program Courses

Defines which courses belong in the program map.

- `program_course_id`
- `program_id`
- `course_id`
- `sequence_group` (optional)
- `required_or_elective`
- `recommended_term` (optional)
- `notes`
- `active_status`
- `created_at`
- `updated_at`

### H. Curriculum Mappings

Primary mapping table.

- `curriculum_mapping_id`
- `program_id`
- `course_id`
- `program_slo_id`
- `irm_level`
- `linked_course_slo_id` (optional)
- `rationale_note` (optional)
- `topic_support_note` (optional)
- `active_status`
- `updated_by_user_id`
- `created_at`
- `updated_at`

#### Allowed values for `irm_level`

- `I`
- `R`
- `M`

#### Suggested rule
One active record per:

- `program_id`
- `course_id`
- `program_slo_id`

### I. Course Topic Placeholder

Phase-two foundation table.

- `topic_placeholder_id`
- `course_id`
- `syllabus_file_path` or file reference (optional)
- `syllabus_url` (optional)
- `syllabus_review_date` (optional)
- `major_assignments_text` (optional)
- `delivery_notes` (optional)
- `created_at`
- `updated_at`

### J. Course Topic Tags

Repeatable structured topics.

- `course_topic_tag_id`
- `course_id`
- `topic_name`
- `topic_type`
- `notes` (optional)
- `created_at`
- `updated_at`

#### Suggested `topic_type` values

- `topic`
- `skill`
- `concept`
- `method`

### K. Files table (optional)

- `file_id`
- `entity_type`
- `entity_id`
- `file_name`
- `file_path`
- `uploaded_by_user_id`
- `uploaded_at`

## 6. Recommended Data Relationships

- One department has many programs
- One department has many courses
- One program has many program SLOs
- One course has many course SLOs
- One program has many courses through `program_courses`
- One course can appear in multiple programs
- One curriculum mapping links:
  - one program
  - one course
  - one program SLO
  - one optional course SLO
  - one I/R/M value
- One course can have:
  - one topic placeholder record
  - many topic tags

## 7. Suggested MVP Reports

### Report 1: Curriculum Map
Matrix for one program:
- Rows = courses
- Columns = program SLOs
- Cell = I/R/M

### Report 2: Outcome Coverage
For each program SLO:
- Number of mapped courses
- Whether I exists
- Whether R exists
- Whether M exists

### Report 3: Unmapped Courses
Courses in a program with no curriculum mappings.

### Report 4: Course Summary
For one course:
- Metadata
- Course SLOs
- Mapped program SLOs
- I/R/M tags
- Topic placeholder summary

### Report 5: Topic Placeholder Completion
For a program or department:
- Which courses have syllabus/topic placeholders
- Which courses are missing them

## 8. Minimal Workflow

### Admin setup
- Import departments, programs, courses
- Import program-course relationships
- Import program SLOs
- Optional import course SLOs
- Assign users

### Faculty or leads
- Review course SLOs
- Add topic placeholder info if desired

### Program leads
- Open matrix
- Assign I/R/M
- Optionally link course SLOs
- Add rationale notes where useful

### Reviewers
- Run gap reports
- Export maps
- Check topic-placeholder completeness

## 9. Scope Recommendation

For launch, keep these optional:

- Course SLO linkage in the mapping cell
- Rationale notes
- Topic placeholder fields

The required MVP should only be:

- Program
- Program SLO
- Course
- Program-course relationship
- Mapping cell with I/R/M

## 10. Suggested CSV Import Templates

### Programs CSV
- `program_code`
- `program_name`
- `degree_type`
- `department_code`
- `catalog_year`
- `status`

### Courses CSV
- `course_code`
- `course_title`
- `department_code`
- `credits`
- `active_status`
- `course_description`

### Program SLOs CSV
- `program_code`
- `slo_number`
- `short_label`
- `full_statement`
- `status`

### Course SLOs CSV (optional)
- `course_code`
- `slo_number`
- `short_label`
- `full_statement`
- `status`

### Program Courses CSV
- `program_code`
- `course_code`
- `required_or_elective`
- `recommended_term`
- `notes`

### Topic Placeholder CSV (optional)
- `course_code`
- `topic_type`
- `topic_name`
- `notes`

## 11. Phase Two Direction

Because the MVP includes a topic placeholder layer, a future phase can add:

- Side-by-side topic comparison between courses
- Topic overlap flags
- Missing-topic detection
- Sequencing review
- AI-assisted syllabus/topic extraction
- Reports on redundant or insufficient topic coverage

This future work would rely on:

- `course_topic_placeholder`
- `course_topic_tags`
- syllabi uploads / links
- possibly controlled vocabularies later

## 12. Recommended First Build Version

Launch these screens first:

1. Dashboard
2. Programs List
3. Program Detail
4. Program SLO Management
5. Courses List
6. Course Detail
7. Curriculum Map Matrix
8. Mapping Detail Panel
9. Gap & Coverage Report
10. Topic Placeholder Edit Screen

## 13. Important Implementation Choice

Decide early whether the matrix is built around:

- Course -> Program SLO
or
- Course SLO -> Program SLO

Recommendation for MVP:
Use **Course -> Program SLO** with optional linked Course SLO.

This gives:

- Simpler data entry
- Easier faculty adoption
- Cleaner matrix behavior
- Enough structure to deepen later

## 14. Final Recommendation

Build the first version as:

- A structured curriculum map tool
- With clean course and program records
- A matrix UI for I/R/M mapping
- A lightweight syllabus/topic placeholder attached to each course

This provides a realistic MVP and a clean runway for the overlap-analysis phase.
