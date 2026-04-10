import HeroSlider from "@/components/HeroSlider";
import ServicesCarousel from "@/components/ServicesCarousel";
import StatsCounter from "@/components/StatsCounter";
import AboutSection from "@/components/AboutSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import WhyChooseUs from "@/components/WhyChooseUs";
import PricingSection from "@/components/PricingSection";
import PartnerLogos from "@/components/PartnerLogos";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import BlogSection from "@/components/BlogSection";
import FooterCTA from "@/components/FooterCTA";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import Post from "@/models/Post";

export default async function Home() {
  await connectDB();
  
  // Fetch data for homepage sections
  const services = await Service.find({ isActive: true }).limit(8).lean();
  const posts = await Post.find({ status: "published" }).sort({ publishedAt: -1 }).limit(6).lean();

  const serializedServices = JSON.parse(JSON.stringify(services));
  const serializedPosts = JSON.parse(JSON.stringify(posts));

  return (
    <main className="min-h-screen flex flex-col pt-0 bg-[var(--color-bgDark)] overflow-x-hidden">
      
      {/* Sections stacked logically */}
      <HeroSlider />
      <ServicesCarousel services={serializedServices} />
      <AboutSection />
      <StatsCounter />
      <WhyChooseUs />
      <MarqueeBanner />
      <PricingSection />
      <PortfolioCarousel />
      <TestimonialsSlider />
      <PartnerLogos />
      <BlogSection posts={serializedPosts} />
      
      {/* Footer Area */}
      <FooterCTA />
    </main>
  );
}
