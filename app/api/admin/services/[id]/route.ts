import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Service from '@/models/Service';
import { apiSuccess, apiError } from '@/lib/apiResponse';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const service = await Service.findByIdAndUpdate(id, body, { returnDocument: 'after' });

    if (!service) {
      return apiError('Service not found', 404);
    }

    return apiSuccess({ service });
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
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return apiError('Service not found', 404);
    }

    return apiSuccess({ message: 'Service deleted successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
