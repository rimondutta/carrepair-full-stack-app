import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { redisUtils } from '@/lib/redis';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const CACHE_KEY = `post:slug:${slug}`;

    // 1. Try Cache hit
    const cached = await redisUtils.get<any>(CACHE_KEY);
    if (cached) {
      return apiSuccess({ post: cached, source: 'cache' });
    }

    // 2. Cache miss: DB Hit
    await connectDB();
    const post = await Post.findOne({ slug, status: 'published' }).lean();

    if (!post) {
      return apiError('Post not found', 404);
    }

    // 3. Set Cache asynchronously
    redisUtils.set(CACHE_KEY, post, 3600);

    return apiSuccess({ post, source: 'db' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
