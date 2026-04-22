import React, { createContext, useContext, useReducer } from 'react';
import type {
  AppState, CurriculumMapping, ProgramSLO, CourseSLO,
  CourseTopicTag, CourseTopicPlaceholder,
} from '../types';
import sampleData from '../data';

type Action =
  | { type: 'SET_IRM';               payload: { mapping: CurriculumMapping } }
  | { type: 'DELETE_MAPPING';        payload: { curriculum_mapping_id: string } }
  | { type: 'ADD_PROGRAM_SLO';       payload: { slo: ProgramSLO } }
  | { type: 'UPDATE_PROGRAM_SLO';    payload: { slo: ProgramSLO } }
  | { type: 'DELETE_PROGRAM_SLO';    payload: { program_slo_id: string } }
  | { type: 'ADD_COURSE_SLO';        payload: { slo: CourseSLO } }
  | { type: 'UPDATE_COURSE_SLO';     payload: { slo: CourseSLO } }
  | { type: 'SAVE_TOPIC_PLACEHOLDER'; payload: { placeholder: CourseTopicPlaceholder } }
  | { type: 'ADD_TOPIC_TAG';         payload: { tag: CourseTopicTag } }
  | { type: 'REMOVE_TOPIC_TAG';      payload: { course_topic_tag_id: string } };

function reducer(state: AppState, action: Action): AppState {
  const now = new Date().toISOString();
  switch (action.type) {
    case 'SET_IRM': {
      const m = action.payload.mapping;
      const exists = state.curriculumMappings.find(
        x => x.program_id === m.program_id && x.course_id === m.course_id && x.program_slo_id === m.program_slo_id
      );
      if (exists) {
        return {
          ...state,
          curriculumMappings: state.curriculumMappings.map(x =>
            x.curriculum_mapping_id === exists.curriculum_mapping_id
              ? { ...x, irm_level: m.irm_level, updated_at: now }
              : x
          ),
        };
      }
      return { ...state, curriculumMappings: [...state.curriculumMappings, { ...m, created_at: now, updated_at: now }] };
    }
    case 'DELETE_MAPPING':
      return { ...state, curriculumMappings: state.curriculumMappings.filter(x => x.curriculum_mapping_id !== action.payload.curriculum_mapping_id) };
    case 'ADD_PROGRAM_SLO':
      return { ...state, programSLOs: [...state.programSLOs, action.payload.slo] };
    case 'UPDATE_PROGRAM_SLO':
      return { ...state, programSLOs: state.programSLOs.map(x => x.program_slo_id === action.payload.slo.program_slo_id ? action.payload.slo : x) };
    case 'DELETE_PROGRAM_SLO':
      return { ...state, programSLOs: state.programSLOs.filter(x => x.program_slo_id !== action.payload.program_slo_id) };
    case 'ADD_COURSE_SLO':
      return { ...state, courseSLOs: [...state.courseSLOs, action.payload.slo] };
    case 'UPDATE_COURSE_SLO':
      return { ...state, courseSLOs: state.courseSLOs.map(x => x.course_slo_id === action.payload.slo.course_slo_id ? action.payload.slo : x) };
    case 'SAVE_TOPIC_PLACEHOLDER': {
      const p = action.payload.placeholder;
      const exists = state.topicPlaceholders.find(x => x.course_id === p.course_id);
      if (exists) {
        return { ...state, topicPlaceholders: state.topicPlaceholders.map(x => x.course_id === p.course_id ? { ...p, updated_at: now } : x) };
      }
      return { ...state, topicPlaceholders: [...state.topicPlaceholders, { ...p, created_at: now, updated_at: now }] };
    }
    case 'ADD_TOPIC_TAG':
      return { ...state, topicTags: [...state.topicTags, action.payload.tag] };
    case 'REMOVE_TOPIC_TAG':
      return { ...state, topicTags: state.topicTags.filter(x => x.course_topic_tag_id !== action.payload.course_topic_tag_id) };
    default:
      return state;
  }
}

interface ContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<ContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, sampleData);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp(): ContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
