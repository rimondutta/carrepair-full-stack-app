interface StatsCardProps {
  title: string;
  value: number | string;
  description?: string;
  color: 'red' | 'yellow' | 'blue' | 'green';
  icon?: React.ReactNode;
}

const colorMap = {
  red: 'from-rose-50 to-rose-100/50 border-rose-200',
  yellow: 'from-amber-50 to-amber-100/50 border-amber-200',
  blue: 'from-blue-50 to-blue-100/50 border-blue-200',
  green: 'from-emerald-50 to-emerald-100/50 border-emerald-200',
};

const iconBgMap = {
  red: 'bg-rose-500 text-white',
  yellow: 'bg-amber-500 text-white',
  blue: 'bg-blue-500 text-white',
  green: 'bg-emerald-500 text-white',
};

const textColorMap = {
  red: 'text-rose-600',
  yellow: 'text-amber-600',
  blue: 'text-blue-600',
  green: 'text-emerald-600',
};

export default function StatsCard({ title, value, description, color, icon }: StatsCardProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${colorMap[color]} rounded-2xl border border-white/50 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
    >
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{title}</p>
          <div className="mt-4 flex items-baseline gap-2">
            <p className={`text-4xl font-black tracking-tight ${textColorMap[color]}`}>{value}</p>
          </div>
          {description && (
            <p className="text-xs text-slate-500 mt-2 font-semibold flex items-center gap-1.5 whitespace-nowrap">
              <span className={`w-1 h-1 rounded-full ${iconBgMap[color]}`} />
              {description}
            </p>
          )}
        </div>
        {icon && (
          <div className={`w-14 h-14 ${iconBgMap[color]} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}>
            {icon}
          </div>
        )}
      </div>
      
      {/* Abstract background shape for "Modern" look */}
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${iconBgMap[color]} opacity-[0.03] transform scale-150`} />
    </div>
  );
}
