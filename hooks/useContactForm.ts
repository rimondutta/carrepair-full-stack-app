"use client";

import { useState } from 'react';
import { ContactFormData, ContactFormErrors, FormStatus } from '@/types/contact';

interface UseContactFormOptions {
  initialValues?: Partial<ContactFormData>;
  requireDateTime?: boolean;
}

export function useContactForm(options?: UseContactFormOptions) {
  const { initialValues, requireDateTime = false } = options || {};
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    service: initialValues?.service || 'Select a Service',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (data: ContactFormData): ContactFormErrors => {
    const newErrors: ContactFormErrors = {};

    if (!data.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (data.phone && !/^\+?[0-9\s-]{7,15}$/.test(data.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (requireDateTime) {
      if (!data.preferredDate.trim()) {
        newErrors.preferredDate = 'Preferred date is required';
      }

      if (!data.preferredTime.trim()) {
        newErrors.preferredTime = 'Preferred time is required';
      }
    }

    return newErrors;
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    // If already touched, validate on change
    if (touched[field]) {
      const newErrors = validate(updatedData);
      setErrors(newErrors);
    }
  };

  const handleBlur = (field: keyof ContactFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(formData);
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStatus('submitting');
      
      try {
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerName: formData.name,
            email: formData.email,
            phone: formData.phone || 'N/A',
            serviceType: formData.service !== 'Select a Service' ? formData.service : 'General Inquiry',
            preferredDate: formData.preferredDate || new Date().toISOString(),
            preferredTime: formData.preferredTime,
            notes: `Subject: ${formData.subject || 'General Inquiry'}\n\nMessage: ${formData.message || 'No message provided.'}`
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit booking');
        }

        setStatus('success');
      } catch (error) {
        console.error('Submission error:', error);
        setStatus('error');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      service: initialValues?.service || 'Select a Service',
      preferredDate: '',
      preferredTime: '',
      message: '',
    });
    setErrors({});
    setStatus('idle');
    setTouched({});
  };

  return { 
    formData, 
    errors, 
    status, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit, 
    resetForm 
  };
}
