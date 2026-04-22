import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookMarked, Map } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge, IRMBadge, Pill } from '../components/Badge';
import type { IRM } from '../types';

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { state } = useApp();
  const { courses, departments, courseSLOs, curriculumMappings, programSLOs, programs, topicPlaceholders, topicTags, users } = state;

  const course = courses.find(c => c.course_id === id);
  if (!course) return <div className="p-8 text-gray-500">Course not found.</div>;

  const dept = departments.find(d => d.department_id === course.department_id);
  const owner = users.find(u => u.user_id === course.primary_owner_user_id);
  const cSLOs = courseSLOs.filter(s => s.course_id === id);
  const placeholder = topicPlaceholders.find(tp => tp.course_id === id);
  const tags = topicTags.filter(t => t.course_id === id);

  // Mappings grouped by program
  const mappings = curriculumMappings.filter(m => m.course_id === id && m.active_status === 'active');
  const programIds = Array.from(new Set(mappings.map(m => m.program_id)));

  const topicTypeColor: Record<string, string> = {
    topic: 'blue', skill: 'teal', concept: 'purple', method: 'amber',
  };

  return (
    <div>
      <div className="px-8 pt-6 pb-6 bg-white border-b border-gray-200">
        <Link to="/courses" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft size={14} /> Back to Courses
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{course.course_code}</h1>
              <StatusBadge status={course.active_status} />
            </div>
            <p className="text-lg text-gray-600 mt-0.5">{course.course_title}</p>
            <div className="text-sm text-gray-500 mt-1">
              {dept?.department_name} · {course.credits ? `${course.credits} credits` : ''} · Last reviewed: {course.last_reviewed_date ?? '—'}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/topics/${id}`} className="flex items-center gap-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg">
              <BookMarked size={14} /> Topics
            </Link>
            <Link to={`/map?course=${id}`} className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-3 py-2 rounded-lg">
              <Map size={14} /> View Mappings
            </Link>
          </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          {course.course_description && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-2">Course Description</h2>
              <p className="text-sm text-gray-600">{course.course_description}</p>
            </div>
          )}

          {/* Course SLOs */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Course SLOs</h2>
              <span className="text-sm text-gray-400">{cSLOs.length} outcomes</span>
            </div>
            {cSLOs.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-400 text-sm">No course SLOs recorded.</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {cSLOs.map(slo => (
                  <div key={slo.course_slo_id} className="flex items-start gap-4 px-6 py-4">
                    <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {slo.slo_number}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">{slo.short_label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{slo.full_statement}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Program Mappings */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Program Mappings</h2>
            </div>
            {programIds.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-400 text-sm">Not mapped to any programs.</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {programIds.map(progId => {
                  const prog = programs.find(p => p.program_id === progId);
                  const progSLOs = programSLOs.filter(s => s.program_id === progId).sort((a, b) => a.slo_number - b.slo_number);
                  const progMappings = mappings.filter(m => m.program_id === progId);
                  return (
                    <div key={progId} className="px-6 py-4">
                      <div className="font-medium text-sm text-gray-900 mb-3">
                        <Link to={`/programs/${progId}`} className="hover:text-brand-600">{prog?.program_name}</Link>
                        <span className="text-gray-400 font-normal ml-2">{prog?.program_code}</span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {progSLOs.map(slo => {
                          const m = progMappings.find(x => x.program_slo_id === slo.program_slo_id);
                          if (!m) return null;
                          return (
                            <div key={slo.program_slo_id} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                              <IRMBadge value={m.irm_level as IRM} size="sm" />
                              <span className="text-xs text-gray-700">SLO {slo.slo_number}: {slo.short_label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Meta */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Details</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Course Code</dt><dd className="font-medium">{course.course_code}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Credits</dt><dd className="font-medium">{course.credits ?? '—'}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Department</dt><dd className="font-medium">{dept?.department_code}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Status</dt><dd><StatusBadge status={course.active_status} /></dd></div>
              {owner && <div className="flex justify-between"><dt className="text-gray-500">Owner</dt><dd className="font-medium">{owner.first_name} {owner.last_name}</dd></div>}
            </dl>
            {course.notes && <p className="mt-3 text-xs text-gray-400 italic border-t border-gray-100 pt-3">{course.notes}</p>}
          </div>

          {/* Topic Placeholder Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">Topic Placeholder</h2>
              <Link to={`/topics/${id}`} className="text-xs text-brand-600 hover:underline">Edit</Link>
            </div>
            {placeholder ? (
              <div className="space-y-2 text-sm">
                {placeholder.syllabus_url && (
                  <div><span className="text-gray-500 text-xs">Syllabus: </span>
                    <a href={placeholder.syllabus_url} className="text-brand-600 hover:underline text-xs truncate block">{placeholder.syllabus_url}</a>
                  </div>
                )}
                {placeholder.syllabus_review_date && <div className="text-xs text-gray-500">Reviewed: {placeholder.syllabus_review_date}</div>}
                {tags.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs text-gray-500 mb-1.5">Topics & Skills</div>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map(t => (
                        <Pill key={t.course_topic_tag_id} label={t.topic_name} color={topicTypeColor[t.topic_type] ?? 'gray'} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-gray-400 text-center py-4">
                No topic data yet.{' '}
                <Link to={`/topics/${id}`} className="text-brand-600 hover:underline">Add topics</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
