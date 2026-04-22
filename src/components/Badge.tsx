import clsx from 'clsx';
import type { IRM } from '../types';

// IRM badge
export function IRMBadge({ value, size = 'md' }: { value: IRM | null; size?: 'sm' | 'md' }) {
  if (!value) return <span className={clsx('inline-flex items-center justify-center rounded', size === 'sm' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm', 'irm-empty')}>—</span>;
  return (
    <span className={clsx('inline-flex items-center justify-center rounded', size === 'sm' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm', `irm-${value}`)}>
      {value}
    </span>
  );
}

// Status badge
export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={clsx('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
      status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
    )}>
      {status}
    </span>
  );
}

// Role badge
export function RoleBadge({ role }: { role: string }) {
  const colors: Record<string, string> = {
    admin: 'bg-purple-100 text-purple-800',
    program_lead: 'bg-blue-100 text-blue-800',
    faculty: 'bg-teal-100 text-teal-800',
    reviewer: 'bg-gray-100 text-gray-700',
  };
  return (
    <span className={clsx('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', colors[role] ?? 'bg-gray-100 text-gray-700')}>
      {role.replace('_', ' ')}
    </span>
  );
}

// Generic colored pill
export function Pill({ label, color = 'gray' }: { label: string; color?: string }) {
  const colors: Record<string, string> = {
    blue:   'bg-blue-100 text-blue-800',
    green:  'bg-green-100 text-green-800',
    amber:  'bg-amber-100 text-amber-800',
    red:    'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
    gray:   'bg-gray-100 text-gray-700',
    teal:   'bg-teal-100 text-teal-800',
  };
  return (
    <span className={clsx('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', colors[color] ?? colors.gray)}>
      {label}
    </span>
  );
}
