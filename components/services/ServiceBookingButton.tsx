"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Send, Loader2, Calendar, Clock, Phone, Mail, User, ChevronDown } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";

interface ServiceBookingButtonProps {
  serviceTitle: string;
  variant?: "default" | "sidebar";
}

export default function ServiceBookingButton({ serviceTitle, variant = "default" }: ServiceBookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const {
    formData,
    errors,
    status,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = useContactForm({ initialValues: { service: serviceTitle }, requireDateTime: true });

  // Reset form when modal closes or service changes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Trigger Button */}
      {variant === "sidebar" ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-[#110E10] hover:bg-white text-white hover:text-[#110E10] border border-white/20 hover:border-white py-3.5 px-6 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-lg flex items-center justify-center gap-2 mt-6 cursor-pointer shadow-lg"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Service</span>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#79AD43] hover:bg-[#b00005] text-[#110E10] hover:text-white py-3.5 px-6 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#79AD43]/10 hover:shadow-[#b00005]/20"
        >
          <Calendar className="w-4 h-4" />
          <span>Book This Service</span>
        </button>
      )}

      {/* Booking Popup Modal (Teleported to Body) */}
      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop Blur */}
          <div 
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Modal Container */}
          <div className="bg-[#1B1B1B] border border-[#2e2e2e] w-full max-w-lg rounded-2xl relative z-[10000] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col my-auto max-h-[calc(100vh-2rem)]">
            
            {/* Top Indicator Strip */}
            <div className="h-1.5 w-full bg-[#79AD43]"></div>

            {/* Header */}
            <div className="p-6 border-b border-[#2e2e2e] flex items-center justify-between">
              <div>
                <span className="text-[#79AD43] text-[10px] font-black uppercase tracking-[0.2em] heading-font block mb-1">Book Appointment</span>
                <h3 className="text-white text-xl font-black uppercase heading-font tracking-wide">
                  {serviceTitle}
                </h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#999] hover:text-white p-1 hover:bg-[#222] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-8 px-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-500/15 rounded-full flex items-center justify-center mb-6">
                    <Send className="text-green-500 w-8 h-8" />
                  </div>
                  <h4 className="text-white text-2xl font-black uppercase heading-font mb-3 tracking-wider">
                    Booking Request Sent!
                  </h4>
                  <p className="text-[#999] text-sm mb-8 max-w-sm leading-relaxed">
                    Thank you! Your service booking request has been successfully submitted. Our team will contact you shortly to confirm your appointment.
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-[#79AD43] hover:bg-[#b00005] text-[#110E10] hover:text-white px-8 py-3.5 font-bold uppercase tracking-widest text-xs transition-all duration-300 rounded-lg cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#999] text-[10px] font-black uppercase tracking-widest heading-font ml-1">Your Full Name*</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        className={`w-full bg-[#110E10] border ${touched.name && errors.name ? 'border-[#79AD43]' : 'border-[#2e2e2e]'} focus:border-[#79AD43] focus:ring-1 focus:ring-[#79AD43]/30 pl-11 pr-5 py-3.5 text-white outline-none transition-all placeholder:text-[#333] font-medium tracking-wide rounded-lg text-sm`}
                      />
                    </div>
                    {touched.name && errors.name && <span className="text-[#79AD43] text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#999] text-[10px] font-black uppercase tracking-widest heading-font ml-1">E-mail Address*</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
                      <input
                        type="email"
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        className={`w-full bg-[#110E10] border ${touched.email && errors.email ? 'border-[#79AD43]' : 'border-[#2e2e2e]'} focus:border-[#79AD43] focus:ring-1 focus:ring-[#79AD43]/30 pl-11 pr-5 py-3.5 text-white outline-none transition-all placeholder:text-[#333] font-medium tracking-wide rounded-lg text-sm`}
                      />
                    </div>
                    {touched.email && errors.email && <span className="text-[#79AD43] text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.email}</span>}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#999] text-[10px] font-black uppercase tracking-widest heading-font ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
                      <input
                        type="tel"
                        placeholder="+1 (862) 279-8403"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        className={`w-full bg-[#110E10] border ${touched.phone && errors.phone ? 'border-[#79AD43]' : 'border-[#2e2e2e]'} focus:border-[#79AD43] focus:ring-1 focus:ring-[#79AD43]/30 pl-11 pr-5 py-3.5 text-white outline-none transition-all placeholder:text-[#333] font-medium tracking-wide rounded-lg text-sm`}
                      />
                    </div>
                    {touched.phone && errors.phone && <span className="text-[#79AD43] text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.phone}</span>}
                  </div>

                  {/* Service Type Selection */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#999] text-[10px] font-black uppercase tracking-widest heading-font ml-1">Service Type</label>
                    <div className="relative">
                      <select
                        value={formData.service}
                        onChange={(e) => handleChange('service', e.target.value)}
                        className="w-full bg-[#110E10] border border-[#2e2e2e] focus:border-[#79AD43] focus:ring-1 focus:ring-[#79AD43]/30 px-5 py-3.5 text-white outline-none appearance-none font-medium tracking-wide rounded-lg text-sm"
                      >
                        <option value="Select a Service" className="bg-[#1B1B1B]">Select a Service</option>
                        <option value="Engine Repair" className="bg-[#1B1B1B]">Engine Repair</option>
                        <option value="Tire Change & Repair" className="bg-[#1B1B1B]">Tire Change & Repair</option>
                        <option value="Car Denting Repair" className="bg-[#1B1B1B]">Car Denting Repair</option>
                        <option value="Battery Check" className="bg-[#1B1B1B]">Battery Check</option>
                        <option value="Ceramic Coating" className="bg-[#1B1B1B]">Ceramic Coating</option>
                        <option value="Other" className="bg-[#1B1B1B]">Other</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#79AD43] pointer-events-none" />
                    </div>
                  </div>

                  {/* Preferred Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#999] text-[10px] font-black uppercase tracking-widest heading-font ml-1">Preferred Date*</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444] pointer-events-none" />
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => handleChange('preferredDate', e.target.value)}
                          onBlur={() => handleBlur('preferredDate')}
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full bg-[#110E10] border ${touched.preferredDate && errors.preferredDate ? 'border-[#79AD43]' : 'border-[#2e2e2e]'} focus:border-[#79AD43] focus:ring-1 focus:ring-[#79AD43]/30 pl-11 pr-3 py-3.5 text-white outline-none transition-all font-medium tracking-wide rounded-lg text-sm [color-scheme:dark]`}
                        />
                      </div>
                      {touched.preferredDate && errors.preferredDate && <span className="text-[#79AD43] text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.preferredDate}</span>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#999] text-[10px] font-black uppercase tracking-widest heading-font ml-1">Preferred Time*</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444] pointer-events-none" />
                        <input
                          type="time"
                          value={formData.preferredTime}
                          onChange={(e) => handleChange('preferredTime', e.target.value)}
                          onBlur={() => handleBlur('preferredTime')}
                          className={`w-full bg-[#110E10] border ${touched.preferredTime && errors.preferredTime ? 'border-[#79AD43]' : 'border-[#2e2e2e]'} focus:border-[#79AD43] focus:ring-1 focus:ring-[#79AD43]/30 pl-11 pr-3 py-3.5 text-white outline-none transition-all font-medium tracking-wide rounded-lg text-sm [color-scheme:dark]`}
                        />
                      </div>
                      {touched.preferredTime && errors.preferredTime && <span className="text-[#79AD43] text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.preferredTime}</span>}
                    </div>
                  </div>

                  {/* Message (Optional) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#999] text-[10px] font-black uppercase tracking-widest heading-font ml-1">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Write any additional details here..."
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      className={`w-full bg-[#110E10] border ${touched.message && errors.message ? 'border-[#79AD43]' : 'border-[#2e2e2e]'} focus:border-[#79AD43] focus:ring-1 focus:ring-[#79AD43]/30 px-5 py-3.5 text-white outline-none transition-all placeholder:text-[#333] font-medium tracking-wide resize-none rounded-lg text-sm`}
                    />
                    {touched.message && errors.message && <span className="text-[#79AD43] text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-[#79AD43] hover:bg-[#b00005] text-[#110E10] hover:text-white py-4 px-8 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-xs"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Booking...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Booking</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {status === 'error' && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-[#79AD43] text-[10px] font-bold uppercase tracking-widest text-center rounded-lg mt-2">
                      Error sending booking request. Please try again.
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
