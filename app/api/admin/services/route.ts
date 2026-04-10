import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Service from '@/models/Service';
import slugify from 'slugify';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { validateService } from '@/lib/validation';

export async function GET() {
  try {
    await connectDB();

    const services = await Service.find()
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    return apiSuccess({ services });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate input
    const { valid, errors } = validateService(body);
    if (!valid) {
      return apiError(errors.join(', '), 400);
    }

    // Auto-generate slug from title
    if (body.title) {
      body.slug = slugify(body.title, { lower: true, strict: true });
    }

    const service = await Service.create(body);

    return apiSuccess({ service }, 201);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
