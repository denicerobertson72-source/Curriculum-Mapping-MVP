# Curriculum Mapping Tool GitHub Structure Guide

## Recommended Repository Purpose

Use the repository as the source of truth for:

- MVP requirements
- Data model decisions
- Wireframes
- Roadmap
- Build notes
- API / schema notes later, if development begins

This repository does not need to start as a software repository. It can begin as a planning and design repository.

## Recommended Repository Name

Choose something simple and clear, such as:

- `curriculum-mapping-tool`
- `curriculum-mapping-mvp`
- `nku-curriculum-mapping`
- `academic-curriculum-mapping-tool`

## Recommended Folder Structure

```text
curriculum-mapping-tool/
├── README.md
├── docs/
│   ├── curriculum-mapping-mvp-spec.md
│   ├── roadmap.md
│   ├── data-model.md
│   ├── user-roles-and-workflows.md
│   └── demo-scenarios.md
├── wireframes/
│   ├── dashboard.md
│   ├── program-detail.md
│   ├── curriculum-map-matrix.md
│   └── topic-placeholder.md
├── data/
│   ├── sample-programs.csv
│   ├── sample-courses.csv
│   ├── sample-program-slos.csv
│   ├── sample-course-slos.csv
│   ├── sample-program-courses.csv
│   └── sample-topic-tags.csv
└── notes/
    ├── meeting-notes.md
    ├── vendor-comparison-notes.md
    └── open-questions.md
