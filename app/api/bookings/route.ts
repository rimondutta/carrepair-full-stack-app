import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { validateBooking } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 bookings per minute per IP
    const rateLimitResponse = checkRateLimit(request, 10, 60 * 1000);
    if (rateLimitResponse) return rateLimitResponse;

    await connectDB();

    const body = await request.json();

    // Validate input
    const { valid, errors } = validateBooking(body);
    if (!valid) {
      return apiError(errors.join(', '), 400);
    }

    const booking = await Booking.create({
      customerName: body.customerName,
      email: body.email,
      phone: body.phone,
      serviceType: body.serviceType,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      vehicleMake: body.vehicleMake,
      vehicleModel: body.vehicleModel,
      vehicleYear: body.vehicleYear,
      notes: body.notes,
    });

    return apiSuccess({ message: 'Booking created successfully', booking }, 201);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
