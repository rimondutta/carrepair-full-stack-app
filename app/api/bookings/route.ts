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

    // Notify Admin via Telegram
    try {
      const isContactForm = !body.vehicleMake && !body.vehicleModel;
      const vehicleInfo = !isContactForm ? `\n<b>Vehicle:</b> ${body.vehicleYear || ''} ${body.vehicleMake || ''} ${body.vehicleModel || ''}` : '';
      const timeInfo = body.preferredTime ? `\n<b>Time:</b> ${body.preferredTime}` : '';

      const message = `
<b>${isContactForm ? '✉️ New Contact' : '🚀 New Booking'} Received!</b>

<b>Customer:</b> ${body.customerName}
<b>Phone:</b> ${body.phone}
<b>Service:</b> ${body.serviceType}${vehicleInfo}
<b>Date:</b> ${body.preferredDate}${timeInfo}

<b>Notes:</b> ${body.notes || 'No special notes.'}
      `.trim();
      
      const { sendTelegramMessage } = await import('@/lib/telegram');
      await sendTelegramMessage(message);
    } catch (err) {
      console.error('[Telegram Notify Failed]', err);
    }

    return apiSuccess({ message: 'Booking created successfully', booking }, 201);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
