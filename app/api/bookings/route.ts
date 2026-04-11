import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { validateBooking } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rateLimit';
import { sendTelegramMessage, escapeHTML } from '@/lib/telegram';

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
      
      // Sanitize all dynamic inputs for Telegram HTML mode
      const safeName = escapeHTML(body.customerName);
      const safePhone = escapeHTML(body.phone);
      const safeService = escapeHTML(body.serviceType);
      const safeNotes = escapeHTML(body.notes || 'No special notes.');
      
      const vehicleInfo = !isContactForm 
        ? `\n<b>Vehicle:</b> ${escapeHTML(body.vehicleYear || '')} ${escapeHTML(body.vehicleMake || '')} ${escapeHTML(body.vehicleModel || '')}` 
        : '';
        
      const timeInfo = body.preferredTime ? `\n<b>Time:</b> ${escapeHTML(body.preferredTime)}` : '';

      const message = `
<b>${isContactForm ? '✉️ New Contact' : '🚀 New Booking'} Received!</b>

<b>Customer:</b> ${safeName}
<b>Phone:</b> ${safePhone}
<b>Service:</b> ${safeService}${vehicleInfo}
<b>Date:</b> ${escapeHTML(body.preferredDate)}${timeInfo}

<b>Notes:</b> ${safeNotes}
      `.trim();
      
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
