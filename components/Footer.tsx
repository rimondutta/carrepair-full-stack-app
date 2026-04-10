"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Car, MapPin, ArrowRight, Phone } from "lucide-react";

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);
const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.045 6.406-3.723 7.636-7.234C20.407 10.165 21 8.583 21 7c0-.28-.02-.56-.06-.83A7.72 7.72 0 0022 4.01z" />
  </svg>
);
const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#0A0809] pt-20 pb-8 border-t border-neutral-900 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: About / Contact */}
          <div>
            <Link href="/" className="mb-6 group inline-flex h-12 md:h-16 lg:h-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/logo/care-plus-logo.png" 
                alt="Care Plus Logo" 
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>
            <p className="text-[var(--color-textMuted)] mb-6 leading-relaxed text-sm">
              We are a premium automotive repair & maintenance workshop dedicated to top-tier care and maintenance of your vehicle.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-[var(--color-primary)] w-5 h-5 shrink-0 mt-1" />
                <p className="text-[var(--color-textLight)] text-sm">
                  <strong className="block text-white mb-1">VISIT OUR LOCATION</strong>
                  9 19dStreet - 3 St - Al Qouz Ind.third - Dubai - United Arab Emirates
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div>
            <h3 className="text-white text-xl font-bold heading-font uppercase mb-6 flex items-center gap-2">
              <span className="w-4 h-4 bg-[var(--color-primary)] inline-block"></span>
              Our Services
            </h3>
            <ul className="flex flex-col gap-3">
              {['Engine Diagnostics & Repair', 'Advanced Auto Maintenance', 'Tire Change & Balancing', 'Paint & Body Work', 'Transmission Services'].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-[var(--color-textMuted)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-2 text-sm group">
                    <ArrowRight className="w-4 h-4 text-[var(--color-primary)] opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h3 className="text-white text-xl font-bold heading-font uppercase mb-6 flex items-center gap-2">
              <span className="w-4 h-4 bg-[var(--color-primary)] inline-block"></span>
              Useful Links
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'About Workshop', href: '#' },
                { name: 'Latest Blog', href: '/blog' },
                { name: 'Membership Plans', href: '#' },
                { name: 'Opening Hours', href: '#' },
                { name: 'Meet Our Mechanics', href: '#' },
                { name: 'Contact Support', href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[var(--color-textMuted)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-2 text-sm group">
                    <ArrowRight className="w-4 h-4 text-[var(--color-primary)] opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white text-xl font-bold heading-font uppercase mb-6 flex items-center gap-2">
              <span className="w-4 h-4 bg-[var(--color-primary)] inline-block"></span>
              Newsletter
            </h3>
            <p className="text-[var(--color-textMuted)] mb-6 text-sm">
              Subscribe to get the latest news and special offers directly to your inbox.
            </p>
            <form className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="bg-[var(--color-bgDark2)] border border-neutral-800 text-white px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors w-full"
                required
              />
              <button 
                type="submit" 
                className="bg-[var(--color-primary)] text-white font-bold py-3 px-6 hover:bg-white hover:text-[var(--color-primary)] transition-colors uppercase text-sm tracking-wider"
              >
                Subscribe Now
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          <p 
            className="text-[var(--color-textMuted)] text-sm text-center md:text-left"
            suppressHydrationWarning
          >
            &copy; {currentYear || '2026'} Care Plus Auto Repairing. All Rights Reserved. | Developed by <a href="https://rimondutta.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--color-primary)] transition-colors underline underline-offset-4 decoration-[var(--color-primary)]/30">Rimon Dutta</a>
          </p>
          
          <div className="flex items-center gap-4">
            <Link href="#" className="w-10 h-10 bg-[var(--color-bgDark2)] rounded-full flex items-center justify-center text-white hover:bg-[var(--color-primary)] transition-colors">
              <Facebook className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-10 h-10 bg-[var(--color-bgDark2)] rounded-full flex items-center justify-center text-white hover:bg-[var(--color-primary)] transition-colors">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-10 h-10 bg-[var(--color-bgDark2)] rounded-full flex items-center justify-center text-white hover:bg-[var(--color-primary)] transition-colors">
              <Instagram className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-10 h-10 bg-[var(--color-bgDark2)] rounded-full flex items-center justify-center text-white hover:bg-[var(--color-primary)] transition-colors">
              <Linkedin className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-6 text-sm text-[var(--color-textMuted)] text-center md:text-right">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-4 md:left-6 z-[100]">
        <a 
          href="https://wa.me/971528031110" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center bg-white/10 backdrop-blur-xl border border-white/20 p-1.5 md:p-2 pr-5 md:pr-6 rounded-[2rem] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),_0_8px_32px_rgba(0,0,0,0.6)] hover:bg-white/20 hover:shadow-[0_8px_40px_rgba(37,211,102,0.4)] hover:-translate-y-1 transition-all duration-500 overflow-hidden relative"
          aria-label="Contact us on WhatsApp"
        >
          {/* Liquid Glass Glare Component */}
          <div className="absolute top-0 left-0 w-full h-[45%] bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-[2rem]"></div>

          <div className="w-11 h-11 md:w-12 md:h-12 bg-gradient-to-tr from-[#128C7E]/80 to-[#25D366]/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),_0_4px_10px_rgba(0,0,0,0.2)] border border-white/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-400 relative z-10">
            <svg className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <div className="ml-3 md:ml-4 flex flex-col justify-center relative z-10">
            <span className="text-[10px] md:text-[11px] text-white/70 font-bold uppercase tracking-wider leading-none mb-1 group-hover:text-white transition-colors">Quick Help</span>
            <span className="text-white font-extrabold text-sm md:text-[15px] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Chat Now</span>
          </div>
        </a>
      </div>

      <div className="fixed bottom-6 right-4 md:right-6 z-[100]">
        <a 
          href="tel:+971528031110" 
          className="group flex items-center flex-row-reverse bg-white/10 backdrop-blur-xl border border-white/20 p-1.5 md:p-2 pl-5 md:pl-6 rounded-[2rem] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),_0_8px_32px_rgba(0,0,0,0.6)] hover:bg-white/20 hover:shadow-[0_8px_40px_rgba(215,0,6,0.4)] hover:-translate-y-1 transition-all duration-500 overflow-hidden relative"
          aria-label="Call Us Now"
        >
          {/* Liquid Glass Glare Component */}
          <div className="absolute top-0 left-0 w-full h-[45%] bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-[2rem]"></div>

          <div className="w-11 h-11 md:w-12 md:h-12 bg-gradient-to-tr from-[#9b0004]/80 to-[#ff1a20]/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),_0_4px_10px_rgba(0,0,0,0.2)] border border-white/20 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-400 relative z-10">
            <div className="absolute inset-0 bg-white/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay"></div>
            <Phone className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] fill-current relative z-10" />
          </div>
          <div className="mr-3 md:mr-4 flex flex-col items-end justify-center relative z-10">
            <span className="text-[10px] md:text-[11px] text-white/70 font-bold uppercase tracking-wider leading-none mb-1 group-hover:text-white transition-colors">24/7 Support</span>
            <span className="text-white font-extrabold text-sm md:text-[15px] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Call Now</span>
          </div>
        </a>
      </div>

    </footer>
  );
}
