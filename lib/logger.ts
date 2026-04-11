/**
 * Standardized Logger Utility
 * Handles logging based on environment to prevent leakage in production.
 */

const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: unknown[]) => {
    if (isDev) {
      console.log(...args);
    }
  },
  warn: (...args: unknown[]) => {
    // Warnings are kept in production but clearly tagged
    console.warn('[WARN]', ...args);
  },
  error: (...args: unknown[]) => {
    // Errors are always kept for monitoring
    console.error('[ERROR]', ...args);
  },
  info: (...args: unknown[]) => {
    if (isDev) {
      console.info(...args);
    }
  }
};
