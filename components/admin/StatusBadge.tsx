interface StatusBadgeProps {
  status: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-100',
  confirmed: 'bg-[#FFF0F0] text-[#EB0005] border-[#EB0005]/20',
  'in-progress': 'bg-[#EB0005]/10 text-[#A80003] border-[#EB0005]/20',
  completed: 'bg-[#EB0005] text-white border-transparent',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-100',
  draft: 'bg-slate-50 text-slate-700 border-slate-100',
  published: 'bg-[#EB0005] text-white border-transparent',
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
