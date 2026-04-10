"use client";

import { useContactForm } from "@/hooks/useContactForm";
import { Send, CheckCircle, Loader2, ChevronDown } from "lucide-react";

export default function ContactForm() {
  const { 
    formData, 
    errors, 
    status, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit, 
    resetForm 
  } = useContactForm();

  if (status === 'success') {
    return (
      <div className="bg-[#1B1B1B] p-10 md:p-16 border border-[#2e2e2e] relative overflow-hidden flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D70006]"></div>
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="text-green-500 w-12 h-12" />
        </div>
        <h2 className="text-white text-3xl font-black uppercase heading-font mb-4 tracking-wider">
          Message Sent Successfully!
        </h2>
        <p className="text-[#999] text-base mb-10 max-w-sm">
          Thank you for reaching out to Care Plus Auto Repairing. Our team will review your message and get back to you within 24 hours.
        </p>
        <button 
          onClick={resetForm}
          className="border border-[#D70006] text-[#D70006] hover:bg-[#D70006] hover:text-white px-8 py-3 font-bold uppercase tracking-widest text-xs transition-all duration-300"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#1B1B1B] p-8 md:p-10 border border-[#2e2e2e] relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D70006]"></div>
      
      <div className="flex flex-col mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#D70006]"></div>
          <span className="text-[#D70006] text-xs font-bold uppercase tracking-widest heading-font">
            GET IN TOUCH
          </span>
          <div className="w-8 h-px bg-[#D70006]"></div>
        </div>
        <h2 className="text-white text-3xl font-black uppercase heading-font tracking-wider">
          SEND US MAIL
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Name & Email Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-[#999] text-[10px] font-black uppercase tracking-widest heading-font ml-1">Your Full Name*</label>
            <input 
              type="text" 
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              className={`bg-[#110E10] border ${touched.name && errors.name ? 'border-[#D70006]' : 'border-[#2e2e2e]'} focus:border-[#D70006] focus:ring-1 focus:ring-[#D70006]/30 px-5 py-4 text-white outline-none transition-all placeholder:text-[#333] font-medium tracking-wide`}
            />
            {touched.name && errors.name && <span className="text-[#D70006] text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.name}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#999] text-[10px] font-black uppercase tracking-widest heading-font ml-1">E-mail Address*</label>
            <input 
              type="email" 
              placeholder="example@mail.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={`bg-[#110E10] border ${touched.email && errors.email ? 'border-[#D70006]' : 'border-[#2e2e2e]'} focus:border-[#D70006] focus:ring-1 focus:ring-[#D70006]/30 px-5 py-4 text-white outline-none transition-all placeholder:text-[#333] font-medium tracking-wide`}
            />
            {touched.email && errors.email && <span className="text-[#D70006] text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.email}</span>}
          </div>
        </div>

        {/* Phone & Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-[#999] text-[10px] font-black uppercase tracking-widest heading-font ml-1">Phone Number</label>
            <input 
              type="tel" 
              placeholder="+1 234 567 890"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              className={`bg-[#110E10] border ${touched.phone && errors.phone ? 'border-[#D70006]' : 'border-[#2e2e2e]'} focus:border-[#D70006] focus:ring-1 focus:ring-[#D70006]/30 px-5 py-4 text-white outline-none transition-all placeholder:text-[#333] font-medium tracking-wide`}
            />
            {touched.phone && errors.phone && <span className="text-[#D70006] text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.phone}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#999] text-[10px] font-black uppercase tracking-widest heading-font ml-1">Subject*</label>
            <input 
              type="text" 
              placeholder="Service Inquiry"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              onBlur={() => handleBlur('subject')}
              className={`bg-[#110E10] border ${touched.subject && errors.subject ? 'border-[#D70006]' : 'border-[#2e2e2e]'} focus:border-[#D70006] focus:ring-1 focus:ring-[#D70006]/30 px-5 py-4 text-white outline-none transition-all placeholder:text-[#333] font-medium tracking-wide`}
            />
            {touched.subject && errors.subject && <span className="text-[#D70006] text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.subject}</span>}
          </div>
        </div>

        {/* Service & Date Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5 relative">
            <label className="text-[#999] text-[10px] font-black uppercase tracking-widest heading-font ml-1">Service Type</label>
            <div className="relative group">
              <select 
                value={formData.service}
                onChange={(e) => handleChange('service', e.target.value)}
                className="w-full bg-[#110E10] border border-[#2e2e2e] focus:border-[#D70006] focus:ring-1 focus:ring-[#D70006]/30 px-5 py-4 text-white outline-none appearance-none font-medium tracking-wide"
              >
                <option value="Select a Service" className="bg-[#1B1B1B]">Select a Service</option>
                <option value="Engine Repair" className="bg-[#1B1B1B]">Engine Repair</option>
                <option value="Tire Change & Repair" className="bg-[#1B1B1B]">Tire Change & Repair</option>
                <option value="Car Denting Repair" className="bg-[#1B1B1B]">Car Denting Repair</option>
                <option value="Battery Check" className="bg-[#1B1B1B]">Battery Check</option>
                <option value="Ceramic Coating" className="bg-[#1B1B1B]">Ceramic Coating</option>
                <option value="Other" className="bg-[#1B1B1B]">Other</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#D70006] pointer-events-none group-focus-within:rotate-180 transition-transform duration-300" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#999] text-[10px] font-black uppercase tracking-widest heading-font ml-1">Preferred Date*</label>
            <input 
              type="date" 
              value={formData.preferredDate}
              onChange={(e) => handleChange('preferredDate', e.target.value)}
              onBlur={() => handleBlur('preferredDate')}
              min={new Date().toISOString().split('T')[0]}
              className={`bg-[#110E10] border border-[#2e2e2e] focus:border-[#D70006] focus:ring-1 focus:ring-[#D70006]/30 px-5 py-4 text-white outline-none transition-all font-medium tracking-wide [color-scheme:dark]`}
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[#999] text-[10px] font-black uppercase tracking-widest heading-font ml-1">Message*</label>
          <textarea 
            rows={5}
            placeholder="Write your message here..."
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            className={`bg-[#110E10] border ${touched.message && errors.message ? 'border-[#D70006]' : 'border-[#2e2e2e]'} focus:border-[#D70006] focus:ring-1 focus:ring-[#D70006]/30 px-5 py-4 text-white outline-none transition-all placeholder:text-[#333] font-medium tracking-wide resize-none`}
          />
          {touched.message && errors.message && <span className="text-[#D70006] text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.message}</span>}
        </div>

        {/* Submit */}
        <button 
          type="submit"
          disabled={status === 'submitting'}
          className="bg-[#D70006] hover:bg-[#b00005] text-white py-4 px-8 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>SENDING...</span>
            </>
          ) : (
            <>
              <span>SEND EMAIL</span>
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>

        {status === 'error' && <div className="p-4 bg-red-500/10 border border-red-500/20 text-[#D70006] text-xs font-bold uppercase tracking-widest text-center mt-2">Error sending message. Please try again.</div>}

      </form>
    </div>
  );
}
