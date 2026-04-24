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
  title: "Contact Us | Arjun Car MOT Station",
  description: "Get in touch with Arjun Car MOT Station. Call us, email us, or visit our workshop at UNIT 29 , ABBEY INDUSTRIAL ESTATE, Woodside End, Mount Pleasant, London HA0 1ZD, United Kingdom. Professional car maintenance services.",
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
