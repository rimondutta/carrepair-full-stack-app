import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { redisUtils } from '@/lib/redis';

const CACHE_KEY = 'posts:public';

export async function GET() {
  try {
    // 1. Try Cache hit
    const cached = await redisUtils.get<any[]>(CACHE_KEY);
    if (cached) {
      return apiSuccess({ posts: cached, source: 'cache' });
    }

    // 2. Cache miss: DB Hit
    await connectDB();
    const posts = await Post.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .select('-__v')
      .lean();

    // 3. Set Cache asynchronously
    if (posts.length > 0) {
      redisUtils.set(CACHE_KEY, posts, 3600);
    }

    return apiSuccess({ posts, source: 'db' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
