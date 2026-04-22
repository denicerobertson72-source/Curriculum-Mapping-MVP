interface Props {
  label: string;
  value: number | string;
  sub?: string;
  color?: 'default' | 'green' | 'red' | 'amber' | 'blue';
}

export default function StatCard({ label, value, sub, color = 'default' }: Props) {
  const colors = {
    default: 'bg-white border-gray-200 text-gray-900',
    green:   'bg-green-50 border-green-200 text-green-900',
    red:     'bg-red-50 border-red-200 text-red-900',
    amber:   'bg-amber-50 border-amber-200 text-amber-900',
    blue:    'bg-blue-50 border-blue-200 text-blue-900',
  };
  return (
    <div className={`rounded-lg border p-4 ${colors[color]}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm font-medium mt-0.5">{label}</div>
      {sub && <div className="text-xs opacity-60 mt-1">{sub}</div>}
    </div>
  );
}
