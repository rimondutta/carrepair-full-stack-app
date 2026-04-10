import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { apiSuccess, apiError } from '@/lib/apiResponse';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;
    const post = await Post.findOne({ slug, status: 'published' }).lean();

    if (!post) {
      return apiError('Post not found', 404);
    }

    return apiSuccess({ post });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
