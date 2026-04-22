import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { X, FileDown, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import { IRMBadge } from '../components/Badge';
import type { IRM, CurriculumMapping } from '../types';

type CellModalData = {
  programId: string;
  courseId: string;
  sloId: string;
  existing: CurriculumMapping | undefined;
};

function CellModal({ data, onClose }: { data: CellModalData; onClose: () => void }) {
  const { state, dispatch } = useApp();
  const { programs, courses, programSLOs, users } = state;

  const program = programs.find(p => p.program_id === data.programId);
  const course = courses.find(c => c.course_id === data.courseId);
  const slo = programSLOs.find(s => s.program_slo_id === data.sloId);
  const updater = data.existing ? users.find(u => u.user_id === data.existing!.updated_by_user_id) : null;

  const [selected, setSelected] = useState<IRM | ''>(data.existing?.irm_level ?? '');
  const [note, setNote] = useState(data.existing?.rationale_note ?? '');

  const handleSave = () => {
    if (selected) {
      const now = new Date().toISOString();
      dispatch({
        type: 'SET_IRM',
        payload: {
          mapping: {
            curriculum_mapping_id: data.existing?.curriculum_mapping_id ?? `cm-${Date.now()}`,
            program_id: data.programId,
            course_id: data.courseId,
            program_slo_id: data.sloId,
            irm_level: selected,
            rationale_note: note || undefined,
            active_status: 'active',
            updated_by_user_id: state.currentUser.user_id,
            created_at: data.existing?.created_at ?? now,
            updated_at: now,
          },
        },
      });
    } else if (data.existing) {
      dispatch({ type: 'DELETE_MAPPING', payload: { curriculum_mapping_id: data.existing.curriculum_mapping_id } });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Edit Mapping Cell</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X size={16} /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-sm">
            <div><span className="text-gray-500">Course: </span><span className="font-medium">{course?.course_code} — {course?.course_title}</span></div>
            <div><span className="text-gray-500">Program: </span><span className="font-medium">{program?.program_code}</span></div>
            <div><span className="text-gray-500">SLO {slo?.slo_number}: </span><span className="font-medium">{slo?.short_label}</span></div>
            <div className="text-xs text-gray-400 pt-1">{slo?.full_statement}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">I/R/M Value</label>
            <div className="flex gap-3">
              {(['I', 'R', 'M'] as IRM[]).map(v => (
                <button
                  key={v}
                  onClick={() => setSelected(selected === v ? '' : v)}
                  className={`flex-1 py-3 rounded-lg text-lg font-bold border-2 transition-all ${
                    selected === v
                      ? v === 'I' ? 'border-blue-400 bg-blue-100 text-blue-800'
                        : v === 'R' ? 'border-amber-400 bg-amber-100 text-amber-800'
                        : 'border-green-400 bg-green-100 text-green-800'
                      : 'border-gray-200 bg-gray-50 text-gray-400 hover:border-gray-300'
                  }`}
                >
                  {v}
                </button>
              ))}
              <button
                onClick={() => setSelected('')}
                className={`flex-1 py-3 rounded-lg text-sm border-2 transition-all ${selected === '' ? 'border-red-300 bg-red-50 text-red-600' : 'border-gray-200 bg-gray-50 text-gray-400 hover:border-gray-300'}`}
              >
                Clear
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-400 flex gap-4">
              <span><strong>I</strong> = Introduced</span>
              <span><strong>R</strong> = Reinforced</span>
              <span><strong>M</strong> = Mastered</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rationale / Note (optional)</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
              placeholder="Why does this course address this outcome at this level?"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          {updater && data.existing && (
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Info size={12} /> Last updated by {updater.first_name} {updater.last_name} · {new Date(data.existing.updated_at).toLocaleDateString()}
            </div>
          )}
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium">Save</button>
        </div>
      </div>
    </div>
  );
}

export default function CurriculumMap() {
  const { state } = useApp();
  const { programs, programSLOs, programCourses, courses, curriculumMappings } = state;
  const [searchParams] = useSearchParams();

  const defaultProg = searchParams.get('program') ?? programs[0]?.program_id ?? '';
  const [selectedProgram, setSelectedProgram] = useState(defaultProg);
  const [cellModal, setCellModal] = useState<CellModalData | null>(null);

  const program = programs.find(p => p.program_id === selectedProgram);
  const slos = programSLOs.filter(s => s.program_id === selectedProgram).sort((a, b) => a.slo_number - b.slo_number);
  const pcs = programCourses.filter(pc => pc.program_id === selectedProgram);
  const programCourseList = pcs.map(pc => ({
    pc,
    course: courses.find(c => c.course_id === pc.course_id)!,
  })).filter(x => x.course);

  const getMapping = (courseId: string, sloId: string) =>
    curriculumMappings.find(m =>
      m.program_id === selectedProgram &&
      m.course_id === courseId &&
      m.program_slo_id === sloId &&
      m.active_status === 'active'
    );

  const openCell = (courseId: string, sloId: string) => {
    setCellModal({
      programId: selectedProgram,
      courseId,
      sloId,
      existing: getMapping(courseId, sloId),
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <PageHeader
        title="Curriculum Map"
        subtitle="Assign Introduced / Reinforced / Mastered values by course and SLO"
        actions={
          <>
            <select
              value={selectedProgram}
              onChange={e => setSelectedProgram(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {programs.map(p => <option key={p.program_id} value={p.program_id}>{p.program_name}</option>)}
            </select>
            <button className="flex items-center gap-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg">
              <FileDown size={14} /> Export
            </button>
          </>
        }
      />

      {!program && <div className="p-8 text-gray-500">Select a program to view its map.</div>}

      {program && (
        <div className="flex-1 overflow-auto p-6">
          {/* Legend */}
          <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
            <span className="font-medium text-gray-700">Legend:</span>
            <span className="irm-I px-2 py-0.5 rounded">I = Introduced</span>
            <span className="irm-R px-2 py-0.5 rounded">R = Reinforced</span>
            <span className="irm-M px-2 py-0.5 rounded">M = Mastered</span>
            <span className="text-gray-400">Click any cell to edit</span>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-auto">
            <table className="text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600 border-b border-r border-gray-200 sticky left-0 bg-gray-50 min-w-[200px] z-10">
                    Course
                  </th>
                  {slos.map(slo => (
                    <th key={slo.program_slo_id} className="px-3 py-3 font-medium text-gray-600 border-b border-r border-gray-200 text-center min-w-[80px]">
                      <div className="text-xs text-gray-500 font-normal">SLO {slo.slo_number}</div>
                      <div className="text-xs leading-tight mt-0.5 max-w-[72px] truncate" title={slo.short_label}>{slo.short_label}</div>
                    </th>
                  ))}
                  <th className="px-3 py-3 text-left font-medium text-gray-600 border-b border-gray-200 min-w-[160px] text-xs">Notes</th>
                </tr>
              </thead>
              <tbody>
                {programCourseList.map(({ pc, course }) => {
                  const rowMappings = slos.map(slo => getMapping(course.course_id, slo.program_slo_id));
                  const hasAny = rowMappings.some(Boolean);
                  return (
                    <tr key={pc.program_course_id} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="px-4 py-3 border-r border-gray-200 sticky left-0 bg-white hover:bg-gray-50 z-10">
                        <div className="font-medium text-gray-900">
                          <Link to={`/courses/${course.course_id}`} className="hover:text-brand-600">{course.course_code}</Link>
                        </div>
                        <div className="text-xs text-gray-500 truncate max-w-[180px]">{course.course_title}</div>
                        {!hasAny && <div className="text-xs text-red-400 font-medium mt-0.5">Unmapped</div>}
                      </td>
                      {slos.map(slo => {
                        const m = getMapping(course.course_id, slo.program_slo_id);
                        return (
                          <td key={slo.program_slo_id} className="border-r border-gray-100 text-center p-2">
                            <button
                              onClick={() => openCell(course.course_id, slo.program_slo_id)}
                              className="w-full flex items-center justify-center hover:opacity-80 transition-opacity rounded"
                              title={`${course.course_code} × SLO ${slo.slo_number}`}
                            >
                              <IRMBadge value={m ? (m.irm_level as IRM) : null} size="md" />
                            </button>
                          </td>
                        );
                      })}
                      <td className="px-3 py-3 text-xs text-gray-400 italic">
                        {rowMappings.find(m => m?.rationale_note)?.rationale_note ?? ''}
                      </td>
                    </tr>
                  );
                })}
                {programCourseList.length === 0 && (
                  <tr><td colSpan={slos.length + 2} className="px-6 py-12 text-center text-gray-400">No courses in this program.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* SLO key below matrix */}
          <div className="mt-4 bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs font-medium text-gray-600 mb-2">SLO Reference</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {slos.map(slo => (
                <div key={slo.program_slo_id} className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold shrink-0">{slo.slo_number}</span>
                  <span><strong>{slo.short_label}:</strong> {slo.full_statement.slice(0, 80)}{slo.full_statement.length > 80 ? '…' : ''}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {cellModal && <CellModal data={cellModal} onClose={() => setCellModal(null)} />}
    </div>
  );
}
