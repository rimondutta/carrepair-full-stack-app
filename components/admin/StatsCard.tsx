interface StatsCardProps {
  title: string;
  value: number | string;
  description?: string;
  color: 'red' | 'yellow' | 'blue' | 'green';
  icon?: React.ReactNode;
}

const colorMap = {
  red: 'bg-[#1D4884] border-transparent text-white',
  yellow: 'from-amber-50 to-amber-100/50 border-amber-200',
  blue: 'from-blue-50 to-blue-100/50 border-blue-200',
  green: 'from-[#FFF0F0] to-[#FFF0F0] border-[#1D4884]/20',
};

const iconBgMap = {
  red: 'bg-white text-[#1D4884]',
  yellow: 'bg-amber-500 text-white',
  blue: 'bg-blue-500 text-white',
  green: 'bg-[#1D4884] text-white',
};

const textColorMap = {
  red: 'text-white',
  yellow: 'text-amber-600',
  blue: 'text-blue-600',
  green: 'text-[#1D4884]',
};

export default function StatsCard({ title, value, description, color, icon }: StatsCardProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${colorMap[color]} rounded-2xl border border-white/50 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
    >
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${color === 'red' ? 'text-white/80' : 'text-slate-500'}`}>{title}</p>
          <div className="mt-4 flex items-baseline gap-2">
            <p className={`text-4xl font-black tracking-tight ${textColorMap[color]}`}>{value}</p>
          </div>
          {description && (
            <p className={`text-xs mt-2 font-semibold flex items-center gap-1.5 whitespace-nowrap ${color === 'red' ? 'text-white/90' : 'text-slate-500'}`}>
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
