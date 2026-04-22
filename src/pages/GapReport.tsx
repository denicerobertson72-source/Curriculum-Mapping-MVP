import { useState } from 'react';
import { AlertTriangle, CheckCircle, FileDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import { IRMBadge } from '../components/Badge';
import type { IRM } from '../types';

function SectionHeader({ title, count, ok }: { title: string; count: number; ok: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-5 py-4 rounded-t-xl border-b ${ok ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
      {ok
        ? <CheckCircle size={18} className="text-green-600 shrink-0" />
        : <AlertTriangle size={18} className="text-red-500 shrink-0" />
      }
      <span className={`font-semibold ${ok ? 'text-green-900' : 'text-red-900'}`}>{title}</span>
      <span className={`ml-auto text-sm font-medium px-2 py-0.5 rounded-full ${ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>
        {count} issue{count !== 1 ? 's' : ''}
      </span>
    </div>
  );
}

export default function GapReport() {
  const { state } = useApp();
  const { programs, programSLOs, programCourses, courses, curriculumMappings } = state;

  const [selectedProgram, setSelectedProgram] = useState(programs[0]?.program_id ?? '');

  const program = programs.find(p => p.program_id === selectedProgram);
  if (!program) return <div className="p-8 text-gray-500">No programs found.</div>;

  const slos = programSLOs.filter(s => s.program_id === selectedProgram).sort((a, b) => a.slo_number - b.slo_number);
  const pcs = programCourses.filter(pc => pc.program_id === selectedProgram);
  const activeMappings = curriculumMappings.filter(m => m.program_id === selectedProgram && m.active_status === 'active');

  // Gap 1: SLOs with no mapped courses at all
  const slosNoMapped = slos.filter(s => !activeMappings.some(m => m.program_slo_id === s.program_slo_id));

  // Gap 2: SLOs with no M-level coverage
  const slosNoM = slos.filter(s =>
    activeMappings.some(m => m.program_slo_id === s.program_slo_id) &&
    !activeMappings.some(m => m.program_slo_id === s.program_slo_id && m.irm_level === 'M')
  );

  // Gap 3: SLOs with no I-level coverage
  const slosNoI = slos.filter(s =>
    activeMappings.some(m => m.program_slo_id === s.program_slo_id) &&
    !activeMappings.some(m => m.program_slo_id === s.program_slo_id && m.irm_level === 'I')
  );

  // Gap 4: Courses with no mapped outcomes
  const coursesUnmapped = pcs.filter(pc => !activeMappings.some(m => m.course_id === pc.course_id));

  // Gap 5: Courses with only I-level
  const coursesOnlyI = pcs.filter(pc =>
    activeMappings.some(m => m.course_id === pc.course_id) &&
    activeMappings.filter(m => m.course_id === pc.course_id).every(m => m.irm_level === 'I')
  );

  // Gap 6: Over-concentrated M (SLOs with more than 3 M tags)
  const slosOverM = slos.filter(s =>
    activeMappings.filter(m => m.program_slo_id === s.program_slo_id && m.irm_level === 'M').length > 3
  );

  const totalIssues = slosNoMapped.length + slosNoM.length + slosNoI.length + coursesUnmapped.length + coursesOnlyI.length + slosOverM.length;

  const SLORow = ({ slo }: { slo: typeof slos[0] }) => {
    const mappings = activeMappings.filter(m => m.program_slo_id === slo.program_slo_id);
    const hasI = mappings.some(m => m.irm_level === 'I');
    const hasR = mappings.some(m => m.irm_level === 'R');
    const hasM = mappings.some(m => m.irm_level === 'M');
    return (
      <div className="flex items-start gap-3 px-5 py-3 border-b border-gray-100 last:border-0">
        <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{slo.slo_number}</div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-gray-900">{slo.short_label}</div>
          <div className="text-xs text-gray-500 mt-0.5">{slo.full_statement.slice(0, 100)}…</div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <IRMBadge value={hasI ? 'I' : null} size="sm" />
          <IRMBadge value={hasR ? 'R' : null} size="sm" />
          <IRMBadge value={hasM ? 'M' : null} size="sm" />
        </div>
      </div>
    );
  };

  const CourseRow = ({ courseId }: { courseId: string }) => {
    const course = courses.find(c => c.course_id === courseId);
    if (!course) return null;
    const mappings = activeMappings.filter(m => m.course_id === courseId);
    return (
      <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 last:border-0">
        <div className="flex-1">
          <span className="font-medium text-sm text-gray-900">{course.course_code}</span>
          <span className="text-xs text-gray-500 ml-2">{course.course_title}</span>
        </div>
        <div className="flex items-center gap-1">
          {mappings.map(m => <IRMBadge key={m.curriculum_mapping_id} value={m.irm_level as IRM} size="sm" />)}
          {mappings.length === 0 && <span className="text-xs text-red-500 font-medium">No mappings</span>}
        </div>
      </div>
    );
  };

  return (
    <div>
      <PageHeader
        title="Gap & Coverage Report"
        subtitle="Identify SLOs and courses with incomplete I/R/M coverage"
        actions={
          <>
            <select value={selectedProgram} onChange={e => setSelectedProgram(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500">
              {programs.map(p => <option key={p.program_id} value={p.program_id}>{p.program_name}</option>)}
            </select>
            <button className="flex items-center gap-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg">
              <FileDown size={14} /> Export CSV
            </button>
          </>
        }
      />

      <div className="p-8 space-y-6">
        {/* Summary banner */}
        <div className={`rounded-xl border p-5 flex items-center gap-4 ${totalIssues === 0 ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
          {totalIssues === 0
            ? <><CheckCircle size={24} className="text-green-600" /><div><div className="font-semibold text-green-900">No gaps found</div><div className="text-sm text-green-700 mt-0.5">All outcomes have I, R, and M coverage across the program.</div></div></>
            : <><AlertTriangle size={24} className="text-amber-600" /><div><div className="font-semibold text-amber-900">{totalIssues} gap{totalIssues !== 1 ? 's' : ''} found in {program.program_name}</div><div className="text-sm text-amber-700 mt-0.5">Review the issues below and update the curriculum map.</div></div></>
          }
        </div>

        {/* SLOs with no mapped courses */}
        <div className="bg-white rounded-xl border border-gray-200">
          <SectionHeader title="Outcomes with No Mapped Courses" count={slosNoMapped.length} ok={slosNoMapped.length === 0} />
          {slosNoMapped.length === 0
            ? <div className="px-5 py-4 text-sm text-green-700">All outcomes have at least one mapped course.</div>
            : slosNoMapped.map(s => <SLORow key={s.program_slo_id} slo={s} />)
          }
        </div>

        {/* SLOs with no M */}
        <div className="bg-white rounded-xl border border-gray-200">
          <SectionHeader title="Outcomes with No Mastery (M) Coverage" count={slosNoM.length} ok={slosNoM.length === 0} />
          {slosNoM.length === 0
            ? <div className="px-5 py-4 text-sm text-green-700">All mapped outcomes have at least one course providing mastery.</div>
            : slosNoM.map(s => <SLORow key={s.program_slo_id} slo={s} />)
          }
        </div>

        {/* SLOs with no I */}
        <div className="bg-white rounded-xl border border-gray-200">
          <SectionHeader title="Outcomes with No Introduction (I) Coverage" count={slosNoI.length} ok={slosNoI.length === 0} />
          {slosNoI.length === 0
            ? <div className="px-5 py-4 text-sm text-green-700">All mapped outcomes have at least one course providing introduction.</div>
            : slosNoI.map(s => <SLORow key={s.program_slo_id} slo={s} />)
          }
        </div>

        {/* Unmapped courses */}
        <div className="bg-white rounded-xl border border-gray-200">
          <SectionHeader title="Courses with No Mapped Outcomes" count={coursesUnmapped.length} ok={coursesUnmapped.length === 0} />
          {coursesUnmapped.length === 0
            ? <div className="px-5 py-4 text-sm text-green-700">All program courses are mapped to at least one outcome.</div>
            : coursesUnmapped.map(pc => <CourseRow key={pc.program_course_id} courseId={pc.course_id} />)
          }
        </div>

        {/* Courses with only I */}
        <div className="bg-white rounded-xl border border-gray-200">
          <SectionHeader title="Courses with Only Introduction-Level Coverage" count={coursesOnlyI.length} ok={coursesOnlyI.length === 0} />
          {coursesOnlyI.length === 0
            ? <div className="px-5 py-4 text-sm text-green-700">No courses are limited to I-level mappings only.</div>
            : coursesOnlyI.map(pc => <CourseRow key={pc.program_course_id} courseId={pc.course_id} />)
          }
        </div>

        {/* Over-concentrated M */}
        <div className="bg-white rounded-xl border border-gray-200">
          <SectionHeader title="Outcomes with Possible Mastery Over-Concentration (>3 M tags)" count={slosOverM.length} ok={slosOverM.length === 0} />
          {slosOverM.length === 0
            ? <div className="px-5 py-4 text-sm text-green-700">No outcomes have excessive mastery-level coverage.</div>
            : slosOverM.map(s => <SLORow key={s.program_slo_id} slo={s} />)
          }
        </div>
      </div>
    </div>
  );
}
