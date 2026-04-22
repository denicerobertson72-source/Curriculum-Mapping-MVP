import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, BookMarked } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import { StatusBadge } from '../components/Badge';

export default function CoursesList() {
  const { state } = useApp();
  const { courses, departments, courseSLOs, topicPlaceholders, programCourses } = state;

  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSLOs, setFilterSLOs] = useState(false);
  const [filterTopics, setFilterTopics] = useState(false);

  const filtered = courses.filter(c => {
    const matchSearch = !search || c.course_code.toLowerCase().includes(search.toLowerCase()) || c.course_title.toLowerCase().includes(search.toLowerCase());
    const matchDept = !filterDept || c.department_id === filterDept;
    const matchStatus = !filterStatus || c.active_status === filterStatus;
    const matchSLOs = !filterSLOs || courseSLOs.some(s => s.course_id === c.course_id);
    const matchTopics = !filterTopics || topicPlaceholders.some(tp => tp.course_id === c.course_id);
    return matchSearch && matchDept && matchStatus && matchSLOs && matchTopics;
  });

  return (
    <div>
      <PageHeader
        title="Courses"
        subtitle="All course records used in curriculum mapping"
      />
      <div className="p-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 w-60"
            />
          </div>
          <select value={filterDept} onChange={e => setFilterDept(e.target.value)} className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="">All Departments</option>
            {departments.map(d => <option key={d.department_id} value={d.department_id}>{d.department_name}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" checked={filterSLOs} onChange={e => setFilterSLOs(e.target.checked)} className="rounded" />
            Has Course SLOs
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" checked={filterTopics} onChange={e => setFilterTopics(e.target.checked)} className="rounded" />
            Has Topic Placeholder
          </label>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Course</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Department</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Credits</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">SLOs</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Topics</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Last Reviewed</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(course => {
                const dept = departments.find(d => d.department_id === course.department_id);
                const sloCount = courseSLOs.filter(s => s.course_id === course.course_id).length;
                const hasTopics = topicPlaceholders.some(tp => tp.course_id === course.course_id);
                return (
                  <tr key={course.course_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{course.course_code}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{course.course_title}</div>
                    </td>
                    <td className="px-4 py-4 text-gray-600">{dept?.department_code ?? '—'}</td>
                    <td className="px-4 py-4 text-gray-700">{course.credits ?? '—'}</td>
                    <td className="px-4 py-4">
                      {sloCount > 0
                        ? <span className="font-medium text-gray-800">{sloCount}</span>
                        : <span className="text-gray-400">—</span>
                      }
                    </td>
                    <td className="px-4 py-4">
                      {hasTopics
                        ? <BookMarked size={15} className="text-teal-600" />
                        : <span className="text-gray-300 text-xs">—</span>
                      }
                    </td>
                    <td className="px-4 py-4"><StatusBadge status={course.active_status} /></td>
                    <td className="px-4 py-4 text-gray-500 text-xs">{course.last_reviewed_date ?? '—'}</td>
                    <td className="px-4 py-4">
                      <Link to={`/courses/${course.course_id}`} className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-brand-600 inline-flex">
                        <ChevronRight size={14} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-6 py-12 text-center text-gray-400">No courses match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
