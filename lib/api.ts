/**
 * Centralized Client-Side API Utility
 * Handles the new standardized response envelope: { success, data, error, timestamp }
 */

interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const json: ApiEnvelope<T> = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.error || `HTTP error! status: ${response.status}`);
    }

    return { data: json.data ?? null, error: null };
  } catch (err) {
    console.error(`API Error [${endpoint}]:`, err);
    return {
      data: null,
      error: err instanceof Error ? err.message : 'An unknown error occurred',
    };
  }
}

// Specialized Admin API with common endpoints
export const adminApi = {
  getStats: () => apiFetch('/api/admin/stats'),
  getBookings: (limit?: number) =>
    apiFetch(`/api/admin/bookings${limit ? `?limit=${limit}` : ''}`),
  updateBookingStatus: (id: string, status: string) =>
    apiFetch(`/api/admin/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  getServices: () => apiFetch('/api/admin/services'),
  getPosts: () => apiFetch('/api/admin/posts'),
};
