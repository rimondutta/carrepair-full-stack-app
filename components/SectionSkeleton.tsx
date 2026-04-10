export default function SectionSkeleton() {
  return (
    <div className="py-20 bg-[#110E10] animate-pulse">
      <div className="container mx-auto px-4">
        <div className="h-8 w-64 bg-white/10 rounded mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-video bg-white/5 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
