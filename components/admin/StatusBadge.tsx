interface StatusBadgeProps {
  status: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-100',
  confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  'in-progress': 'bg-blue-50 text-blue-700 border-blue-100',
  completed: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-100',
  draft: 'bg-slate-50 text-slate-700 border-slate-100',
  published: 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colorClasses = statusColors[status] || 'bg-gray-100/50 text-gray-800 border-gray-200/50';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${colorClasses}`}
    >
      <span className="w-1 h-1 rounded-full mr-1.5 bg-current" />
      {status}
    </span>
  );
}
