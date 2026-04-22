import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Map, FileDown, Plus, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge, IRMBadge } from '../components/Badge';
import StatCard from '../components/StatCard';
import type { IRM } from '../types';

export default function ProgramDetail() {
  const { id } = useParams<{ id: string }>();
  const { state } = useApp();
  const { programs, departments, programSLOs, programCourses, courses, curriculumMappings, users } = state;

  const program = programs.find(p => p.program_id === id);
  if (!program) return <div className="p-8 text-gray-500">Program not found.</div>;

  const dept = departments.find(d => d.department_id === program.department_id);
  const coordinator = users.find(u => u.user_id === program.coordinator_user_id);
  const slos = programSLOs.filter(s => s.program_id === id).sort((a, b) => a.slo_number - b.slo_number);
  const pcs = programCourses.filter(pc => pc.program_id === id);
  const programCourseList = pcs.map(pc => courses.find(c => c.course_id === pc.course_id)).filter(Boolean);

  const mappedCourseIds = new Set(
    curriculumMappings.filter(m => m.program_id === id && m.active_status === 'active').map(m => m.course_id)
  );
  const mappedCount = pcs.filter(pc => mappedCourseIds.has(pc.course_id)).length;
  const unmappedCount = pcs.length - mappedCount;

  const slosWithNoI = slos.filter(s => !curriculumMappings.find(m => m.program_id === id && m.program_slo_id === s.program_slo_id && m.irm_level === 'I' && m.active_status === 'active')).length;
  const slosWithNoM = slos.filter(s => !curriculumMappings.find(m => m.program_id === id && m.program_slo_id === s.program_slo_id && m.irm_level === 'M' && m.active_status === 'active')).length;

  return (
    <div>
      {/* Header */}
      <div className="px-8 pt-6 pb-0 bg-white border-b border-gray-200">
        <Link to="/programs" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft size={14} /> Back to Programs
        </Link>
        <div className="flex items-start justify-between pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{program.program_name}</h1>
              <StatusBadge status={program.status} />
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-brand-100 text-brand-800">{program.degree_type}</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {program.program_code} · {dept?.department_name} · {dept?.college_name} · {program.catalog_year}
            </div>
            {coordinator && (
              <div className="text-sm text-gray-500 mt-0.5">Coordinator: {coordinator.first_name} {coordinator.last_name}</div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors">
              <Settings size={14} /> Edit
            </button>
            <Link to={`/map?program=${id}`} className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors">
              <Map size={14} /> Open Map
            </Link>
            <button className="flex items-center gap-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors">
              <FileDown size={14} /> Export
            </button>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard label="Courses in Map"  value={pcs.length}      />
          <StatCard label="Program SLOs"    value={slos.length}     />
          <StatCard label="Courses Mapped"  value={mappedCount}     color="green" />
          <StatCard label="Unmapped"        value={unmappedCount}   color={unmappedCount > 0 ? 'amber' : 'green'} />
          <StatCard label="SLOs Missing M"  value={slosWithNoM}     color={slosWithNoM > 0 ? 'red' : 'green'} />
        </div>

        {/* Program SLOs */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Program Student Learning Outcomes</h2>
            <Link to={`/programs/${id}/slos`} className="flex items-center gap-1 text-sm text-brand-600 hover:text-brand-800 font-medium">
              <Plus size={14} /> Manage SLOs
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {slos.map(slo => {
              const mappings = curriculumMappings.filter(m => m.program_id === id && m.program_slo_id === slo.program_slo_id && m.active_status === 'active');
              const hasI = mappings.some(m => m.irm_level === 'I');
              const hasR = mappings.some(m => m.irm_level === 'R');
              const hasM = mappings.some(m => m.irm_level === 'M');
              return (
                <div key={slo.program_slo_id} className="flex items-start gap-4 px-6 py-4">
                  <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {slo.slo_number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm">{slo.short_label}</div>
                    <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">{slo.full_statement}</div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${hasI ? 'irm-I' : 'irm-empty'}`}>{hasI ? 'I' : '—'}</span>
                    <span className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${hasR ? 'irm-R' : 'irm-empty'}`}>{hasR ? 'R' : '—'}</span>
                    <span className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${hasM ? 'irm-M' : 'irm-empty'}`}>{hasM ? 'M' : '—'}</span>
                    <span className="text-xs text-gray-400 ml-1">{mappings.length} courses</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Courses */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Courses in Program</h2>
            <span className="text-sm text-gray-500">{pcs.length} courses</span>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Course</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Term</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Mapped SLOs</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pcs.map(pc => {
                const course = courses.find(c => c.course_id === pc.course_id);
                if (!course) return null;
                const mappings = curriculumMappings.filter(m => m.program_id === id && m.course_id === pc.course_id && m.active_status === 'active');
                return (
                  <tr key={pc.program_course_id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <div className="font-medium text-gray-900">{course.course_code}</div>
                      <div className="text-xs text-gray-500">{course.course_title}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${pc.required_or_elective === 'required' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                        {pc.required_or_elective}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{pc.recommended_term ?? '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {mappings.length === 0
                          ? <span className="text-xs text-red-500 font-medium">Unmapped</span>
                          : mappings.map(m => (
                            <IRMBadge key={m.curriculum_mapping_id} value={m.irm_level as IRM} size="sm" />
                          ))
                        }
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link to={`/courses/${course.course_id}`} className="text-xs text-brand-600 hover:underline">View</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {program.notes && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
            <span className="font-medium">Notes: </span>{program.notes}
          </div>
        )}
      </div>
    </div>
  );
}
