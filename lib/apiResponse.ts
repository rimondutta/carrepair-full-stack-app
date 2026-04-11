import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from './rateLimit';
import { logger } from './logger';

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
 * Advanced API Handler wrapper for scalability.
 * Automatically handles:
 * 1. Rate Limiting (per route)
 * 2. Error Catching & Formatting
 * 3. Standardized Logging
 */
export function apiHandler(
  handler: (req: NextRequest, ...args: any[]) => Promise<NextResponse>,
  options: {
    maxRequests?: number;
    windowMs?: number;
    requireAuth?: boolean;
  } = {}
) {
  return async (req: NextRequest, ...args: any[]): Promise<NextResponse> => {
    const { maxRequests = 30, windowMs = 60 * 1000 } = options;

    try {
      // 1. Rate Limiting
      const rateLimitError = await checkRateLimit(req, maxRequests, windowMs);
      if (rateLimitError) return rateLimitError;

      // 2. Execute Handler
      const response = await handler(req, ...args);

      // 3. Optional: Log successful mutations in production
      if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
        logger.log(`[API ${req.method}] ${req.nextUrl.pathname} - Success`);
      }

      return response;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      const stack = error instanceof Error ? error.stack : undefined;

      logger.error(`[API Error] ${req.method} ${req.nextUrl.pathname}:`, {
        message,
        stack,
        ip: req.headers.get('x-forwarded-for') || 'unknown'
      });

      // Hide stack trace in production (Next.js handles most of this, but explicit is better)
      return apiError(
        process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : message,
        500
      );
    }
  };
}

/**
 * Basic wrapper for standardized error catching.
 * @deprecated Use apiHandler for better scalability and features.
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
