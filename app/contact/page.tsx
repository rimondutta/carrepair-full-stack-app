import { Metadata } from "next";
import dynamic from "next/dynamic";
import ContactHeroBanner from "@/components/contact/ContactHeroBanner";
import ContactInfoStrip from "@/components/contact/ContactInfoStrip";
import ContactCTABanner from "@/components/contact/ContactCTABanner";

const ContactMainSection = dynamic(() => import("@/components/contact/ContactMainSection"), {
  loading: () => <div className="h-96 animate-pulse bg-white/5 rounded-3xl" />,
});
const ContactMapSection = dynamic(() => import("@/components/contact/ContactMapSection"), {
  loading: () => <div className="h-[450px] animate-pulse bg-white/5" />,
});

export const metadata: Metadata = {
  title: "Contact Us | Tyreman24",
  description: "Get in touch with Tyreman24. Call us, email us, or visit our workshop at 14 Brick Ln, London E1 6RF, United Kingdom. Professional car maintenance services.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#110E10] min-h-screen font-sans text-white">
      
      {/* 1. Hero Banner */}
      <ContactHeroBanner 
        title="Contact" 
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" }
        ]} 
      />

      {/* 2. Info Strip (Phone, Mail, Map) */}
      <ContactInfoStrip />

      {/* 3. Main Section (Info Panel + Form) */}
      <ContactMainSection />

      {/* 4. Map Section */}
      <ContactMapSection />

      {/* 5. CTA Banner */}
      <ContactCTABanner />

    </div>
  );
}
