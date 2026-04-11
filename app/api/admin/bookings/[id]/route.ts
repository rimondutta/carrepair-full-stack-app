import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { sendBookingConfirmation, sendBookingCancellation, sendBookingCompletion } from '@/lib/mail';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { logger } from '@/lib/logger';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const booking = await Booking.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { returnDocument: 'after' }
    );

    if (!booking) {
      return apiError('Booking not found', 404);
    }

    // Trigger auto email on status change (Awaited for reliability)
    try {
      if (body.status === 'confirmed') {
        await sendBookingConfirmation(booking);
      } else if (body.status === 'cancelled') {
        await sendBookingCancellation(booking);
      } else if (body.status === 'completed') {
        await sendBookingCompletion(booking);
      }
    } catch (emailError) {
      logger.error('[Status Email Delay/Failure]', emailError);
      // We don't return an error here because the DB update WAS successful,
      // but we log it so we know the email failed.
    }

    return apiSuccess({ booking });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return apiError('Booking not found', 404);
    }

    return apiSuccess({ message: 'Booking deleted successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
