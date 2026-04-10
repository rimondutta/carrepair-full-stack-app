import { Suspense } from "react";
import HeroSlider from "@/components/HeroSlider";
import ServicesCarouselWrapper from "@/components/ServicesCarouselWrapper";
import StatsCounter from "@/components/StatsCounter";
import AboutSection from "@/components/AboutSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import WhyChooseUs from "@/components/WhyChooseUs";
import PricingSection from "@/components/PricingSection";
import PartnerLogos from "@/components/PartnerLogos";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import BlogSectionWrapper from "@/components/BlogSectionWrapper";
import FooterCTA from "@/components/FooterCTA";
import SectionSkeleton from "@/components/SectionSkeleton";

export const revalidate = 3600; // revalidate at most every hour

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col pt-0 bg-[var(--color-bgDark)] overflow-x-hidden">
      
      {/* 1. Instant Static Content */}
      <HeroSlider />
      
      {/* 2. Streamed Dynamic Content (Services) */}
      <Suspense fallback={<SectionSkeleton />}>
        <ServicesCarouselWrapper />
      </Suspense>

      {/* 3. Static Content */}
      <AboutSection />
      <StatsCounter />
      <WhyChooseUs />
      <MarqueeBanner />
      
      {/* 4. More Static/Client sections */}
      <PricingSection />
      <PortfolioCarousel />
      <TestimonialsSlider />
      <PartnerLogos />
      
      {/* 5. Streamed Dynamic Content (Blog) */}
      <Suspense fallback={<SectionSkeleton />}>
        <BlogSectionWrapper />
      </Suspense>
      
      <FooterCTA />
    </main>
  );
}
