import type { ReactNode } from "react";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  service: string;
  preferredDate: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactInfoItem {
  icon: string; // lucide icon name
  label: string;
  value: string;
  href?: string;
  subtext?: string;
}

export interface OpeningHour {
  day: string;
  time: string;
  isClosed?: boolean;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: ReactNode; // React component or icon reference
}
