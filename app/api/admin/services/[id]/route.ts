import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Service from '@/models/Service';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { validateService } from '@/lib/validation';
import slugify from 'slugify';
import { revalidatePath } from 'next/cache';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    // Validate input if it contains service-defining fields
    if (body.title || body.category) {
      const { valid, errors } = validateService(body);
      if (!valid) {
        return apiError(errors.join(', '), 400);
      }
    }

    // Auto-update slug if title is changed
    if (body.title) {
      body.slug = slugify(body.title, { lower: true, strict: true });
    }

    const service = await Service.findByIdAndUpdate(id, body, { returnDocument: 'after' });

    if (!service) {
      return apiError('Service not found', 404);
    }

    revalidatePath('/services');
    revalidatePath(`/services/${service.slug}`);
    revalidatePath('/');

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

    revalidatePath('/services');
    revalidatePath(`/services/${service.slug}`);
    revalidatePath('/');

    return apiSuccess({ message: 'Service deleted successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
