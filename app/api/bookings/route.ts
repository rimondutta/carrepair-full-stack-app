import { NextRequest } from 'next/server';
import { apiSuccess, apiError, apiHandler } from '@/lib/apiResponse';
import { validateBooking } from '@/lib/validation';
import { BookingService } from '@/services/bookingService';

export const POST = apiHandler(async (request: NextRequest) => {
  const body = await request.json();

  // Validate input
  const { valid, errors } = validateBooking(body);
  if (!valid) {
    return apiError(errors.join(', '), 400);
  }

  const booking = await BookingService.createBooking(body);

  return apiSuccess({ 
    message: 'Booking created successfully', 
    booking 
  }, 201);
}, {
  maxRequests: 10, // Stricter limit for bookings
  windowMs: 60 * 1000
});
