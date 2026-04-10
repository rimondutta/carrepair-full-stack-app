export default function PartnerLogos() {
  const logos = [
    { title: "BMW", icon: "https://cdn.simpleicons.org/bmw/white" },
    { title: "Porsche", icon: "https://cdn.simpleicons.org/porsche/white" },
    { title: "Audi", icon: "https://cdn.simpleicons.org/audi/white" },
    { title: "Toyota", icon: "https://cdn.simpleicons.org/toyota/white" },
    { title: "Tesla", icon: "https://cdn.simpleicons.org/tesla/white" },
    { title: "Ford", icon: "https://cdn.simpleicons.org/ford/white" },
    { title: "Honda", icon: "https://cdn.simpleicons.org/honda/white" },
  ];

  return (
    <section className="bg-[#0A0809] border-y border-neutral-900 py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Responsive Scrolling Container for logos */}
        <div className="flex xl:justify-between items-center gap-12 md:gap-16 lg:gap-20 overflow-x-auto pb-6 md:pb-0 scrollbar-hide snap-x">
          {logos.map((logo) => (
            <div 
              key={logo.title} 
              title={logo.title}
              className="flex-shrink-0 flex items-center justify-center group opacity-40 hover:opacity-100 transition-opacity duration-300 snap-center min-w-[80px] md:min-w-[100px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={logo.icon} 
                alt={`${logo.title} Logo`} 
                className="w-auto h-12 md:h-14 lg:h-16 object-contain" 
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
