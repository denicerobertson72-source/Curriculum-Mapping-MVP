import { Link } from 'react-router-dom';
import { Map, BookOpen, GraduationCap, BarChart2, ArrowRight, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RoleBadge } from '../components/Badge';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  const { state } = useApp();
  const { currentUser, programs, courses, curriculumMappings, programCourses, programSLOs } = state;

  const myPrograms = programs.filter(p =>
    p.coordinator_user_id === currentUser.user_id || currentUser.role === 'admin'
  );
  const dept = state.departments.find(d => d.department_id === currentUser.department_id);

  const totalMappings = curriculumMappings.filter(m => m.active_status === 'active').length;
  const totalPossible = programCourses.length * 1; // rough proxy
  const unmapped = programCourses.filter(pc => {
    const slos = programSLOs.filter(s => s.program_id === pc.program_id);
    return slos.every(s => !curriculumMappings.find(m =>
      m.program_id === pc.program_id && m.course_id === pc.course_id && m.program_slo_id === s.program_slo_id
    ));
  }).length;

  const quickLinks = [
    { to: '/map',     label: 'View Curriculum Maps',  icon: Map,          color: 'bg-brand-50 text-brand-700 hover:bg-brand-100' },
    { to: '/courses', label: 'Edit Course Records',    icon: BookOpen,     color: 'bg-teal-50 text-teal-700 hover:bg-teal-100' },
    { to: '/programs',label: 'Review Program SLOs',    icon: GraduationCap,color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
    { to: '/reports', label: 'Export Reports',         icon: BarChart2,    color: 'bg-amber-50 text-amber-700 hover:bg-amber-100' },
  ];

  const recentUpdates = [
    { text: 'BIOL 499 mappings updated',        time: '2 days ago' },
    { text: 'ENGL-MA SLOs revised',             time: '4 days ago' },
    { text: 'BIOL 310 topic placeholder added', time: '1 week ago' },
    { text: 'ENGL-BA program reviewed',         time: '2 weeks ago' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Welcome */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {currentUser.first_name}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <RoleBadge role={currentUser.role} />
              {dept && <span className="text-sm text-gray-500">{dept.department_name} · {dept.college_name}</span>}
            </div>
          </div>
          <div className="text-right text-sm text-gray-400">
            <div>Last login</div>
            <div className="font-medium text-gray-600">
              {currentUser.last_login ? new Date(currentUser.last_login).toLocaleDateString() : '—'}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Programs"      value={programs.length}        sub="total active" />
        <StatCard label="Courses"       value={courses.length}         sub="in system" />
        <StatCard label="Mappings"      value={totalMappings}          sub="I/R/M cells set" color="blue" />
        <StatCard label="Unmapped"      value={unmapped}               sub="courses with no mapping" color={unmapped > 0 ? 'amber' : 'green'} />
      </div>

      {/* Two columns: my programs + quick links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Programs I manage */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Programs I Manage</h2>
          <div className="space-y-3">
            {myPrograms.map(prog => {
              const sloCount = programSLOs.filter(s => s.program_id === prog.program_id).length;
              const courseCount = programCourses.filter(pc => pc.program_id === prog.program_id).length;
              return (
                <div key={prog.program_id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div>
                    <div className="font-medium text-sm text-gray-900">{prog.program_name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{prog.program_code} · {sloCount} SLOs · {courseCount} courses</div>
                  </div>
                  <Link to={`/programs/${prog.program_id}`} className="text-brand-600 hover:text-brand-800">
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
          <Link to="/programs" className="mt-4 flex items-center gap-1 text-sm text-brand-600 hover:text-brand-800 font-medium">
            View all programs <ArrowRight size={14} />
          </Link>
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map(({ to, label, icon: Icon, color }) => (
              <Link key={to} to={to} className={`flex flex-col items-center gap-2 p-4 rounded-lg text-center text-sm font-medium transition-colors ${color}`}>
                <Icon size={20} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent updates */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Recent Updates</h2>
        <div className="space-y-3">
          {recentUpdates.map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <Clock size={14} className="text-gray-400 shrink-0" />
              <span className="text-gray-700">{item.text}</span>
              <span className="ml-auto text-gray-400 text-xs whitespace-nowrap">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
