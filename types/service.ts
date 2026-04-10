export type ServiceCategory =
  | 'all'
  | 'engine-mechanical'
  | 'tires-wheels'
  | 'body-denting'
  | 'electrical'
  | 'glass-windshield';

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  description: string;
  shortDescription: string;
  icon: string;         // lucide icon name
  isActive?: boolean;   // alternating red border highlight
  duration?: string;    // e.g. "2-4 hours"
  price?: string;       // e.g. "From $99"
  image?: string;       // placeholder gradient or real asset path
  
  // Detailed Content Fields (Making it scalable)
  detailedContent?: string[]; // Multiple paragraphs for the detail view
  checklist?: string[];       // Items for the two-column checklist
  iconBoxes?: {               // Feature boxes with icons
    iconName: string;
    title: string;
    description: string;
  }[];
  mechanics?: {               // Mechanics displayed for this service
    name: string;
    role: string;
    image?: string;
  }[];
  faqs?: {                    // Frequently Asked Questions
    question: string;
    answer: string;
  }[];
  testimonialText?: string;
  testimonials?: {
    name: string;
    role: string;
    review: string;
    rating: number;
    date: string;
  }[];
  workProcessProcessText?: string;
  workProcess?: {
    title: string;
    description: string;
  }[];
}

export interface FilterTab {
  label: string;
  value: ServiceCategory;
  count: number;
}
