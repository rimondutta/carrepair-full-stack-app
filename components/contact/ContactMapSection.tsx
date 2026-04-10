import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";

export default function ContactMapSection() {
  const address = "9 19dStreet - 3 St - Al Qouz Ind.third - Dubai - United Arab Emirates";
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2698.1!2d-122.19!3d47.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDI4JzM3LjQiTiAxMjLCsDExJzI0LjAiVw!5e0!3m2!1sen!2sus!4v1234567890`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <section className="relative w-full h-[300px] md:h-[450px] bg-[#110E10] overflow-hidden">
      
      {/* Top Gradient Overlay for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#110E10] to-transparent z-10 pointer-events-none"></div>

      {/* Google Map Iframe with Dark Filter */}
      <div className="w-full h-full grayscale-[0.5] contrast-[1.2] brightness-[0.8] transition-all duration-700">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Care Plus Auto Repairing Location"
          className="w-full h-full"
        />
      </div>

      {/* Floating Info Card (Desktop Only) */}
      <div className="hidden lg:block absolute bottom-10 left-10 z-20 w-80">
        <div className="bg-[#1B1B1B] border border-[#2e2e2e] p-8 shadow-2xl relative animate-in slide-in-from-left duration-700">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D70006]"></div>
          
          <h3 className="text-white text-xl font-bold uppercase heading-font mb-4 tracking-wider">Care Plus Auto Repairing</h3>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <MapPin className="text-[#D70006] w-5 h-5 flex-shrink-0 mt-1" />
              <p className="text-[#999] text-sm leading-snug">{address}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Phone className="text-[#D70006] w-5 h-5" />
              <p className="text-[#999] text-sm">+971 52 803 1110</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Clock className="text-[#D70006] w-5 h-5" />
              <p className="text-[#999] text-sm">Monâ€“Sat: 9am â€“ 7pm</p>
            </div>

            <div className="h-px bg-[#2e2e2e] my-2"></div>

            <a 
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#D70006] font-bold uppercase text-xs tracking-widest hover:translate-x-1 transition-transform"
            >
              Get Directions <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Location Badge (Optional/Simplified) */}
      <div className="lg:hidden absolute bottom-4 left-4 right-4 z-20">
         <div className="bg-[#1B1B1B] p-4 border border-[#2e2e2e] flex items-center justify-between">
           <div className="flex items-center gap-3">
             <MapPin className="text-[#D70006] w-5 h-5" />
             <span className="text-white text-xs font-bold uppercase tracking-widest">{address.split(',')[0]}</span>
           </div>
           <a href={directionsUrl} className="text-[#D70006]"><ArrowUpRight size={18} /></a>
         </div>
      </div>

    </section>
  );
}
