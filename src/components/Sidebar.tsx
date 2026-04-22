import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, GraduationCap, Map, BarChart2,
  BookMarked, Settings, ChevronRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import clsx from 'clsx';

const nav = [
  { to: '/',            label: 'Dashboard',        icon: LayoutDashboard },
  { to: '/programs',    label: 'Programs',          icon: GraduationCap },
  { to: '/courses',     label: 'Courses',           icon: BookOpen },
  { to: '/map',         label: 'Curriculum Maps',   icon: Map },
  { to: '/reports',     label: 'Gap & Coverage',    icon: BarChart2 },
  { to: '/topics',      label: 'Topic Placeholders', icon: BookMarked },
];

export default function Sidebar() {
  const { state } = useApp();
  const u = state.currentUser;

  return (
    <aside className="w-60 shrink-0 bg-brand-800 text-white flex flex-col min-h-screen">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-brand-700">
        <div className="w-8 h-8 rounded bg-brand-500 flex items-center justify-center font-bold text-white text-sm">CM</div>
        <div>
          <div className="font-semibold text-sm leading-tight">Curriculum</div>
          <div className="text-xs text-brand-300 leading-tight">Mapping Tool</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 px-2">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                isActive
                  ? 'bg-brand-600 text-white'
                  : 'text-brand-200 hover:bg-brand-700 hover:text-white'
              )
            }
          >
            <Icon size={16} />
            {label}
            <ChevronRight size={12} className="ml-auto opacity-40" />
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-brand-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-xs font-bold">
            {u.first_name[0]}{u.last_name[0]}
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-medium truncate">{u.first_name} {u.last_name}</div>
            <div className="text-xs text-brand-300 capitalize">{u.role.replace('_', ' ')}</div>
          </div>
          <Settings size={14} className="ml-auto text-brand-400 shrink-0" />
        </div>
      </div>
    </aside>
  );
}
