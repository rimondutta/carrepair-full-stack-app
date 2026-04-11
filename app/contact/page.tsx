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
  title: "Contact Us | Care Plus Auto Repairing",
  description: "Get in touch with Care Plus Auto Repairing. Call us, email us, or visit our workshop at 9 19dStreet - 3 St - Al Qouz Ind.third - Dubai - United Arab Emirates. Professional car maintenance services.",
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
