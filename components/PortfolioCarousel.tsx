"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const portfolioItems = [
  { id: 1, title: "Brake Repairing", bg: "bg-[url('/assets/asset%2066.jpeg')]" },
  { id: 2, title: "Body Repairing", bg: "bg-[url('/assets/asset%2064.jpeg')]" },
  { id: 3, title: "Car Wash & Polish", bg: "bg-[url('/assets/asset%2064.jpeg')]" },
  { id: 4, title: "Automotive Filters", bg: "bg-[url('/assets/asset%2022.jpeg')]" },
  { id: 5, title: "Engine Diagnostics", bg: "bg-[url('/assets/asset%2038.jpeg')]" },
];

export default function PortfolioCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  // Drag-to-scroll functionality
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    if (carouselRef.current) {
      carouselRef.current.classList.add('cursor-grabbing');
      startX.current = e.pageX - carouselRef.current.offsetLeft;
      scrollLeft.current = carouselRef.current.scrollLeft;
    }
  };

  const onMouseLeave = () => {
    isDown.current = false;
    if (carouselRef.current) {
      carouselRef.current.classList.remove('cursor-grabbing');
    }
  };

  const onMouseUp = () => {
    isDown.current = false;
    if (carouselRef.current) {
      carouselRef.current.classList.remove('cursor-grabbing');
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;
    e.preventDefault();
    if (carouselRef.current) {
      const x = e.pageX - carouselRef.current.offsetLeft;
      const walk = (x - startX.current) * 2;
      carouselRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  return (
    <section className="bg-[var(--color-bgDark)] pt-20 pb-0 w-full overflow-hidden">

      {/* Header */}
      <div className="container mx-auto px-4 md:px-8 mb-12">
        <span className="text-[var(--color-primary)] font-bold tracking-widest text-sm uppercase mb-4 block text-center">
          OUR LATEST WORKS
        </span>
        <h2 className="text-white heading-font text-4xl md:text-5xl font-bold uppercase leading-tight text-center">
          Checkout Our <span className="text-[var(--color-primary)] italic">Portfolio</span>
        </h2>
      </div>

      {/* Full-width Carousel */}
      <div
        ref={carouselRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory cursor-grab"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setIsHovered(item.id)}
            onMouseLeave={() => setIsHovered(null)}
            className={`min-w-full md:min-w-[50vw] lg:min-w-[33.333vw] 2xl:min-w-[25vw] aspect-[3/4] bg-cover bg-center ${item.bg} relative snap-center group overflow-hidden border-r-[1px] border-black`}
          >
            {/* Dark texture overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Red Gradient Hover Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/90 to-transparent transition-transform duration-700 ease-in-out ${isHovered === item.id ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
            ></div>

            {/* Hover Content */}
            <div className={`absolute top-6 right-6 transition-all duration-500 delay-100 ${isHovered === item.id ? "opacity-100 translate-x-0 translate-y-0 scale-100" : "opacity-0 translate-x-4 -translate-y-4 scale-50"}`}>
              <Link
                href="#"
                className="w-16 h-16 rounded-full bg-white flex justify-center items-center hover:bg-[var(--color-bgDark)] group/btn transition-colors duration-300"
              >
                <ArrowUpRight className="w-6 h-6 text-[var(--color-primary)] group-hover/btn:text-white" />
              </Link>
            </div>

            <div className={`absolute bottom-8 left-8 right-8 transition-all duration-500 delay-200 ${isHovered === item.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="text-white/80 font-bold tracking-widest text-xs uppercase block mb-2">Automotive Detail</span>
              <h3 className="heading-font text-3xl font-bold uppercase text-white">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
