import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { sendBookingConfirmation, sendBookingCancellation, sendBookingCompletion } from '@/lib/mail';
import { apiSuccess, apiError } from '@/lib/apiResponse';

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

    // Trigger auto email on status change (fire-and-forget)
    if (body.status === 'confirmed') {
      sendBookingConfirmation(booking);
    } else if (body.status === 'cancelled') {
      sendBookingCancellation(booking);
    } else if (body.status === 'completed') {
      sendBookingCompletion(booking);
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
