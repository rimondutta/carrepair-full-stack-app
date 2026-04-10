"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How long does a typical service take?",
    answer: "Most standard maintenance services like oil changes, tire rotations, or brake pad replacements take between 45 minutes to 2 hours. Major mechanical repairs or maintenance services can take 1 to 3 days depending on the scope of work."
  },
  {
    id: 2,
    question: "Do you offer a service guarantee?",
    answer: "Absolutely. We stand strictly behind our workmanship with a 6-month or 6,000-mile warranty on all labor and installed parts. If the exact same issue reoccurs within that window, we fix it free of charge."
  },
  {
    id: 3,
    question: "Can I get a quote before the service?",
    answer: "Yes, we provide full transparent estimates before any work begins. You will always authorize the repair plan and pricing before we put a wrench on your vehicle."
  },
  {
    id: 4,
    question: "What car brands do you service?",
    answer: "Our certified technicians are trained in handling all major domestic and imported vehicle brands, including premium European models (Audi, BMW, Mercedes) and specialized JDM tuners."
  },
  {
    id: 5,
    question: "Do I need an appointment or can I walk in?",
    answer: "While we do accept emergency walk-ins for flat tires or blown batteries, we highly recommend booking an appointment to guarantee bay space and minimize your wait time."
  },
  {
    id: 6,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, Amex), cash, and verified digital wallets. For larger motor rebuilds, we also offer custom financing plans."
  }
];

export default function ServiceFAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 md:py-28 bg-[#110E10]">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-10 border-t-2 border-[var(--color-primary)]"></span>
            <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] text-sm md:text-xs uppercase">
              HAVE ANY QUERIES?
            </span>
            <span className="w-10 border-t-2 border-[var(--color-primary)]"></span>
          </div>
          <h2 className="text-white heading-font text-3xl md:text-5xl font-bold uppercase tracking-wide">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            
            return (
              <div 
                key={faq.id} 
                className={`border border-[#2e2e2e] transition-all duration-300 overflow-hidden
                  ${isOpen ? 'bg-[#1B1B1B] border-l-4 border-l-[var(--color-primary)]' : 'bg-[#110E10] hover:border-[#666]'}`}
              >
                
                {/* Question Row (Trigger) */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left py-5 px-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h4 className={`heading-font font-bold text-base md:text-lg transition-colors ${isOpen ? 'text-white' : 'text-[#DEDEDE]'}`}>
                    {faq.question}
                  </h4>
                  
                  <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded bg-[#110E10] border transition-colors
                    ${isOpen ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-[#2e2e2e] text-[#999]'}`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Answer Content Panel */}
                <div 
                  className={`px-6 transition-all duration-500 ease-in-out origin-top border-[#2e2e2e]
                    ${isOpen ? 'max-h-[500px] py-5 opacity-100 border-t' : 'max-h-0 py-0 opacity-0 border-t-0'}`}
                >
                  <p className="text-[var(--color-textMuted)] text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
