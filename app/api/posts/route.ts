import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { apiSuccess, apiError } from '@/lib/apiResponse';

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .select('-__v')
      .lean();

    return apiSuccess({ posts });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
