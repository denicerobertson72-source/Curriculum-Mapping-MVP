import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Map, FileDown, ChevronRight, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import { StatusBadge } from '../components/Badge';

export default function ProgramsList() {
  const { state } = useApp();
  const { programs, departments, programCourses, programSLOs } = state;

  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterDegree, setFilterDegree] = useState('');

  const filtered = programs.filter(p => {
    const dept = departments.find(d => d.department_id === p.department_id);
    const matchSearch = !search || p.program_name.toLowerCase().includes(search.toLowerCase()) || p.program_code.toLowerCase().includes(search.toLowerCase());
    const matchDept = !filterDept || p.department_id === filterDept;
    const matchDegree = !filterDegree || p.degree_type === filterDegree;
    return matchSearch && matchDept && matchDegree;
  });

  const degreeTypes = Array.from(new Set(programs.map(p => p.degree_type)));

  return (
    <div>
      <PageHeader
        title="Programs"
        subtitle="All academic programs in the curriculum mapping system"
        actions={
          <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <Plus size={16} /> Add Program
          </button>
        }
      />

      <div className="p-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search programs..."
              className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 w-60"
            />
          </div>
          <select value={filterDept} onChange={e => setFilterDept(e.target.value)} className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="">All Departments</option>
            {departments.map(d => <option key={d.department_id} value={d.department_id}>{d.department_name}</option>)}
          </select>
          <select value={filterDegree} onChange={e => setFilterDegree(e.target.value)} className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="">All Degree Types</option>
            {degreeTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Program</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Department</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Degree</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Courses</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">SLOs</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Updated</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(prog => {
                const dept = departments.find(d => d.department_id === prog.department_id);
                const courseCount = programCourses.filter(pc => pc.program_id === prog.program_id).length;
                const sloCount = programSLOs.filter(s => s.program_id === prog.program_id).length;
                return (
                  <tr key={prog.program_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{prog.program_name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{prog.program_code} · {prog.catalog_year}</div>
                    </td>
                    <td className="px-4 py-4 text-gray-600">{dept?.department_name ?? '—'}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-brand-100 text-brand-800">{prog.degree_type}</span>
                    </td>
                    <td className="px-4 py-4 text-gray-700 font-medium">{courseCount}</td>
                    <td className="px-4 py-4 text-gray-700 font-medium">{sloCount}</td>
                    <td className="px-4 py-4"><StatusBadge status={prog.status} /></td>
                    <td className="px-4 py-4 text-gray-500 text-xs">{new Date(prog.updated_at).toLocaleDateString()}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link to={`/map?program=${prog.program_id}`} className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-brand-600" title="Open Map">
                          <Map size={14} />
                        </Link>
                        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700" title="Export">
                          <FileDown size={14} />
                        </button>
                        <Link to={`/programs/${prog.program_id}`} className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-brand-600">
                          <ChevronRight size={14} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-6 py-12 text-center text-gray-400">No programs match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
