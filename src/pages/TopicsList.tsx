import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, BookMarked } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import { Pill } from '../components/Badge';
import type { TopicType } from '../types';

const TYPE_COLORS: Record<TopicType, string> = { topic: 'blue', skill: 'teal', concept: 'purple', method: 'amber' };

export default function TopicsList() {
  const { state } = useApp();
  const { courses, departments, topicPlaceholders, topicTags } = state;
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filterDept, setFilterDept] = useState('');

  const filtered = courses.filter(c => !filterDept || c.department_id === filterDept);

  return (
    <div>
      <PageHeader
        title="Topic Placeholders"
        subtitle="Syllabus and topic data across courses — foundation for future overlap analysis"
      />
      <div className="p-8">
        <div className="flex gap-3 mb-6">
          <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="">All Departments</option>
            {departments.map(d => <option key={d.department_id} value={d.department_id}>{d.department_name}</option>)}
          </select>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Course</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Topics</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Skills</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Has Syllabus</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Last Review</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(course => {
                const placeholder = topicPlaceholders.find(tp => tp.course_id === course.course_id);
                const tags = topicTags.filter(t => t.course_id === course.course_id);
                const topicCount = tags.filter(t => t.topic_type === 'topic' || t.topic_type === 'concept').length;
                const skillCount = tags.filter(t => t.topic_type === 'skill' || t.topic_type === 'method').length;
                const isOpen = expanded === course.course_id;

                return (
                  <>
                    <tr
                      key={course.course_id}
                      className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${isOpen ? 'bg-brand-50' : ''}`}
                      onClick={() => setExpanded(isOpen ? null : course.course_id)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {isOpen ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                          <div>
                            <div className="font-medium text-gray-900">{course.course_code}</div>
                            <div className="text-xs text-gray-500">{course.course_title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {topicCount > 0 ? <span className="font-medium text-gray-800">{topicCount}</span> : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-4 py-4">
                        {skillCount > 0 ? <span className="font-medium text-gray-800">{skillCount}</span> : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-4 py-4">
                        {placeholder?.syllabus_url
                          ? <BookMarked size={15} className="text-teal-600" />
                          : <span className="text-gray-300 text-xs">—</span>
                        }
                      </td>
                      <td className="px-4 py-4 text-gray-500 text-xs">{placeholder?.syllabus_review_date ?? '—'}</td>
                      <td className="px-4 py-4">
                        <Link
                          to={`/topics/${course.course_id}`}
                          onClick={e => e.stopPropagation()}
                          className="text-xs text-brand-600 hover:underline font-medium"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr key={`${course.course_id}-expand`} className="bg-brand-50 border-b border-gray-100">
                        <td colSpan={6} className="px-8 pb-4 pt-0">
                          {tags.length === 0 && !placeholder ? (
                            <div className="text-sm text-gray-400 py-2">No topic data. <Link to={`/topics/${course.course_id}`} className="text-brand-600 hover:underline">Add topics</Link></div>
                          ) : (
                            <div className="space-y-3">
                              {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                  {tags.map(t => <Pill key={t.course_topic_tag_id} label={t.topic_name} color={TYPE_COLORS[t.topic_type as TopicType] ?? 'gray'} />)}
                                </div>
                              )}
                              {placeholder?.major_assignments_text && (
                                <div className="text-xs text-gray-600"><span className="font-medium">Assignments: </span>{placeholder.major_assignments_text}</div>
                              )}
                              {placeholder?.delivery_notes && (
                                <div className="text-xs text-gray-600"><span className="font-medium">Notes: </span>{placeholder.delivery_notes}</div>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
