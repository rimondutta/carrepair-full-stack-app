import ContactInfoPanel from "./ContactInfoPanel";
import ContactForm from "./ContactForm";

export default function ContactMainSection() {
  return (
    <section className="bg-[#110E10] py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
          
          {/* Left Column: Info, Hours, Socials (5/12 approx) */}
          <div className="lg:w-[42%] xl:w-[40%] flex-shrink-0">
            <ContactInfoPanel />
          </div>

          {/* Right Column: Contact Form (7/12 approx) */}
          <div className="lg:flex-1">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}
