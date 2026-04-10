import { NextResponse } from 'next/server';

/**
 * Centralized API Response Helper
 * Provides consistent response envelope for all API routes.
 */

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  timestamp: string;
}

interface ApiErrorResponse {
  success: false;
  error: string;
  timestamp: string;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Return a standardized success response.
 */
export function apiSuccess<T>(data: T, status: number = 200) {
  const body: ApiResponse<T> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(body, {
    status,
    headers: {
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

/**
 * Return a standardized error response.
 */
export function apiError(message: string, status: number = 500) {
  const body: ApiResponse<never> = {
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(body, {
    status,
    headers: {
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

/**
 * Wraps an async API handler with standardized error catching.
 * Eliminates repetitive try/catch blocks in every route.
 */
export function withErrorHandler(
  handler: (...args: any[]) => Promise<NextResponse>
) {
  return async (...args: any[]): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error: unknown) {
      console.error('[API Error]', error);
      const message =
        error instanceof Error ? error.message : 'Internal server error';
      return apiError(message, 500);
    }
  };
}
