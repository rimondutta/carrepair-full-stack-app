/**
 * Input Validation Layer
 * Reusable validators for API route data.
 * Returns { valid, errors } — no external dependencies needed.
 */

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// --------------- Helpers ---------------

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isNonEmpty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function maxLength(value: string, max: number): boolean {
  return value.length <= max;
}

// --------------- Validators ---------------

export function validateBooking(data: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];

  if (!isNonEmpty(data.customerName)) {
    errors.push('Customer name is required');
  } else if (!maxLength(data.customerName as string, 100)) {
    errors.push('Customer name must be 100 characters or fewer');
  }

  if (!isNonEmpty(data.email)) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email as string)) {
    errors.push('Invalid email format');
  }

  if (!isNonEmpty(data.phone)) {
    errors.push('Phone number is required');
  } else if (!maxLength(data.phone as string, 20)) {
    errors.push('Phone number must be 20 characters or fewer');
  }

  if (!isNonEmpty(data.serviceType)) {
    errors.push('Service type is required');
  }

  if (!data.preferredDate) {
    errors.push('Preferred date is required');
  } else {
    const date = new Date(data.preferredDate as string);
    if (isNaN(date.getTime())) {
      errors.push('Invalid date format');
    }
  }

  if (data.notes && !maxLength(data.notes as string, 1000)) {
    errors.push('Notes must be 1000 characters or fewer');
  }

  return { valid: errors.length === 0, errors };
}

export function validatePost(data: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];

  if (!isNonEmpty(data.title)) {
    errors.push('Title is required');
  } else if (!maxLength(data.title as string, 200)) {
    errors.push('Title must be 200 characters or fewer');
  }

  if (data.excerpt && !maxLength(data.excerpt as string, 500)) {
    errors.push('Excerpt must be 500 characters or fewer');
  }

  if (data.status && !['draft', 'published'].includes(data.status as string)) {
    errors.push('Status must be "draft" or "published"');
  }

  if (data.coverImage && typeof data.coverImage === 'string') {
    if (!maxLength(data.coverImage, 2000)) {
      errors.push('Cover image URL must be 2000 characters or fewer');
    }
  }

  return { valid: errors.length === 0, errors };
}

export function validateService(data: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];

  if (!isNonEmpty(data.title)) {
    errors.push('Service title is required');
  } else if (!maxLength(data.title as string, 200)) {
    errors.push('Title must be 200 characters or fewer');
  }

  if (!isNonEmpty(data.category)) {
    errors.push('Category is required');
  }

  if (data.shortDescription && !maxLength(data.shortDescription as string, 300)) {
    errors.push('Short description must be 300 characters or fewer');
  }

  if (data.description && !maxLength(data.description as string, 5000)) {
    errors.push('Description must be 5000 characters or fewer');
  }

  if (data.price && !maxLength(data.price as string, 50)) {
    errors.push('Price must be 50 characters or fewer');
  }

  // Validate arrays are actually arrays
  if (data.detailedContent && !Array.isArray(data.detailedContent)) {
    errors.push('Detailed content must be an array');
  }
  if (data.checklist && !Array.isArray(data.checklist)) {
    errors.push('Checklist must be an array');
  }
  if (data.iconBoxes && !Array.isArray(data.iconBoxes)) {
    errors.push('Icon boxes must be an array');
  }
  if (data.faqs && !Array.isArray(data.faqs)) {
    errors.push('FAQs must be an array');
  }
  if (data.workProcess && !Array.isArray(data.workProcess)) {
    errors.push('Work process must be an array');
  }
  if (data.mechanics && !Array.isArray(data.mechanics)) {
    errors.push('Mechanics must be an array');
  }
  if (data.testimonials && !Array.isArray(data.testimonials)) {
    errors.push('Testimonials must be an array');
  }

  return { valid: errors.length === 0, errors };
}
