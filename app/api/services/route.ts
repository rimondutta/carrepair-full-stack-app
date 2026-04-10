import { connectDB } from '@/lib/mongodb';
import Service from '@/models/Service';
import { apiSuccess, apiError } from '@/lib/apiResponse';

export async function GET() {
  try {
    await connectDB();

    const services = await Service.find({ isActive: true })
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    return apiSuccess({ services });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
