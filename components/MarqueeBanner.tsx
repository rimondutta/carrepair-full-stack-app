"use client";

export default function MarqueeBanner() {
  const marqueeText = "ENGINE REPAIR \u2726 OIL CHANGE \u2726 CAR AC REPAIR \u2726 CAR BATTERY REPLACEMENT \u2726 RADIATOR REPAIR SERVICE \u2726 CAR BRAKE REPAIR SERVICE \u2726 ";

  // Duplicate for seamless infinite loop
  const textArray = Array(4).fill(marqueeText).join("");

  return (
    <div className="relative w-full overflow-hidden bg-[var(--color-bgDark2)] py-12 md:py-20 flex items-center justify-center min-h-[250px] md:min-h-[400px]">

      {/* Container slightly rotated */}
      <div className="w-[120%] md:w-[110%] absolute flex flex-col gap-2 md:gap-4 transform -rotate-3 md:-rotate-6 scale-110">

        {/* Row 1: Left to Right Marquee */}
        <div className="relative flex overflow-x-hidden group whitespace-nowrap bg-[var(--color-primary)] py-4">
          <div className="animate-marquee group-hover:pause-animation inline-flex font-bold uppercase text-4xl md:text-6xl text-white heading-font tracking-wide" style={{ animationDirection: 'reverse' }}>
            {textArray}
          </div>
        </div>

        {/* Row 2: Right to Left Marquee */}
        <div className="relative flex overflow-x-hidden group whitespace-nowrap bg-black py-4 border-y-2 border-neutral-800">
          <div className="animate-marquee group-hover:pause-animation inline-flex font-bold uppercase text-4xl md:text-6xl text-white heading-font tracking-wide opacity-50 text-stroke">
            <span className="" style={{
              WebkitTextFillColor: 'transparent',
              WebkitTextStrokeWidth: '2px',
              WebkitTextStrokeColor: 'white'
            }}>{textArray}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
