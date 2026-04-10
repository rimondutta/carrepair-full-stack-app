"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Phone, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const schedule = [
  { day: 'Monday', time: '9am â€“ 7pm' },
  { day: 'Tuesday', time: '9am â€“ 7pm' },
  { day: 'Wednesday', time: '9am â€“ 7pm' },
  { day: 'Thursday', time: '9am â€“ 7pm' },
  { day: 'Friday', time: '9am â€“ 7pm' },
  { day: 'Saturday', time: '9am â€“ 7pm' },
  { day: 'Sunday', time: 'Closed', isClosed: true },
];

export default function ContactInfoPanel() {
  const [today, setToday] = useState("");
  const { ref: refA, isVisible: isVisibleA } = useScrollAnimation({ threshold: 0.1 });
  const { ref: refB, isVisible: isVisibleB } = useScrollAnimation({ threshold: 0.1 });
  const { ref: refC, isVisible: isVisibleC } = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    // eslint-disable-next-line
    setToday(days[new Date().getDay()]);
  }, []);

  const contactRows = [
    { icon: <Phone size={18} />, label: "Phone", value: "+971 52 803 1110", href: "tel:+971 52 803 1110" },
    { icon: <Mail size={18} />, label: "Email", value: "info@careplus.com", href: "mailto:info@careplus.com" },
    { icon: <MapPin size={18} />, label: "Address", value: "9 19dStreet - 3 St - Al Qouz Ind.third - Dubai - United Arab Emirates", href: undefined },
  ];

  return (
    <div className="flex flex-col gap-16">
      
      {/* Sub-section A: Contact Info */}
      <div 
        ref={refA}
        className={`transition-all duration-700 ${isVisibleA ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex">
            <div className="w-1.5 h-3 bg-[#D70006] transform -skew-x-12"></div>
            <div className="w-1.5 h-3 bg-[#D70006] transform -skew-x-12 mx-0.5 opacity-60"></div>
            <div className="w-1.5 h-3 bg-[#D70006] transform -skew-x-12 opacity-30"></div>
          </div>
          <span className="text-[#D70006] text-xs font-bold uppercase tracking-widest heading-font flex items-center gap-4">
            CONTACT <div className="w-12 h-px bg-[#D70006]"></div>
          </span>
        </div>

        <h2 className="text-white font-black text-3xl md:text-4xl heading-font uppercase mb-6 leading-tight">
          FEEL FREE TO ASK US ANYTHING
        </h2>
        
        <p className="text-[#999] text-base leading-relaxed mb-8">
          When you bring your vehicle to Care Plus Auto Repairing, you can rest easy knowing that your vehicle is in professional hands. We take every possible step to ensure your experience is pleasant and efficient.
        </p>

        <div className="flex flex-col gap-6">
          {contactRows.map((row, idx) => (
            <div key={idx} className="flex items-center gap-5 group">
              <div className="w-12 h-12 rounded-full bg-[#D70006]/10 border border-[#D70006]/20 flex items-center justify-center text-[#D70006] transition-all duration-300 group-hover:bg-[#D70006] group-hover:text-white group-hover:scale-110">
                {row.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-white/40 text-[10px] font-black uppercase tracking-widest heading-font">{row.label}</span>
                {row.href ? (
                  <a href={row.href} className="text-white text-lg font-bold hover:text-[#D70006] transition-colors">{row.value}</a>
                ) : (
                  <span className="text-white text-lg font-bold">{row.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-section B: Opening Hours */}
      <div 
        ref={refB}
        className={`transition-all duration-700 delay-200 ${isVisibleB ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
      >
        <div className="flex items-center gap-4 mb-6">
          <h3 className="text-white text-xl font-bold uppercase heading-font tracking-wider">OPENING HOURS</h3>
          <div className="h-px flex-1 bg-[#2e2e2e]"></div>
          <div className="w-12 h-px bg-[#D70006]"></div>
        </div>

        <div className="flex flex-col border-t border-[#2e2e2e]">
          {schedule.map((row) => {
            const isToday = row.day === today;
            return (
              <div 
                key={row.day} 
                className={`flex justify-between items-center py-4 px-4 border-b border-[#2e2e2e] font-bold transition-all duration-300 ${
                  isToday ? "bg-[#D70006]/5 border-l-4 border-l-[#D70006]" : ""
                }`}
              >
                <span className={isToday ? "text-[#D70006]" : "text-white"}>{row.day}</span>
                <span className={row.isClosed ? "text-[#D70006]" : "text-[#999]"}>{row.time}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sub-section C: Socials */}
      <div 
        ref={refC}
        className={`transition-all duration-700 delay-400 ${isVisibleC ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
      >
        <div className="flex items-center gap-4 mb-6">
          <h3 className="text-white text-xl font-bold uppercase heading-font tracking-wider">STAY CONNECTED</h3>
          <div className="h-px flex-1 bg-[#2e2e2e]"></div>
          <div className="w-12 h-px bg-[#D70006]"></div>
        </div>

        <div className="flex items-center gap-4">
          {[
            { 
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47059 14.4412 5.5 15.9118 5.5H17.5V2.14015C17.5 2.14015 16.0588 1.91176 14.6471 1.91176C11.6912 1.91176 9.77941 3.70588 9.77941 6.91176V9.5H7V13.5H9.77941V22H14V13.5Z" />
                </svg>
              ), 
              href: "#" 
            },
            { 
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              ), 
              href: "#" 
            },
            { 
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              ), 
              href: "#" 
            },
            { 
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
                </svg>
              ), 
              href: "#" 
            }
          ].map((social, idx) => (
            <a 
              key={idx} 
              href={social.href} 
              className="w-12 h-12 border border-[#2e2e2e] flex items-center justify-center text-white transition-all duration-300 hover:bg-[#D70006] hover:border-[#D70006] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D70006]/20"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
