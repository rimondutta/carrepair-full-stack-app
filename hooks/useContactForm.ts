"use client";

import { useState } from 'react';
import { ContactFormData, ContactFormErrors, FormStatus } from '@/types/contact';

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    service: 'Select a Service',
    preferredDate: '',
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

    if (!data.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!data.message.trim()) {
      newErrors.message = 'Message content is required';
    } else if (data.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    if (!data.preferredDate || data.preferredDate === '') {
      // In a real app we'd also validate that it's in the future
      // (errors as any).preferredDate = 'Preferred date is required';
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
            notes: `Subject: ${formData.subject}\n\nMessage: ${formData.message}`
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
      service: 'Select a Service',
      preferredDate: '',
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
