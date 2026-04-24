interface StatusBadgeProps {
  status: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-green-100 text-green-800 border-green-200',
  'in-progress': 'bg-[#1D4884]/10 text-[#A80003] border-[#1D4884]/20',
  completed: 'bg-[#1D4884] text-white border-transparent',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
  draft: 'bg-slate-50 text-slate-700 border-slate-100',
  published: 'bg-[#1D4884] text-white border-transparent',
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
