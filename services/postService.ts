import Post, { IPost } from '@/models/Post';
import { connectDB } from '@/lib/mongodb';
import { redisUtils } from '@/lib/redis';

const CACHE_KEY_PUBLIC = 'posts:public';

export class PostService {
  static async getPublishedPosts() {
    // 1. Try Cache hit
    const cached = await redisUtils.get<IPost[]>(CACHE_KEY_PUBLIC);
    if (cached) return { posts: cached, source: 'cache' };

    // 2. Cache miss: DB Hit
    await connectDB();
    const posts = await Post.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .select('-__v')
      .lean();

    // 3. Set Cache asynchronously (1 hour)
    if (posts.length > 0) {
      redisUtils.set(CACHE_KEY_PUBLIC, posts, 3600);
    }

    return { posts, source: 'db' };
  }

  static async getPostBySlug(slug: string) {
    const cacheKey = `post:slug:${slug}`;
    const cached = await redisUtils.get<IPost>(cacheKey);
    if (cached) return { post: cached, source: 'cache' };

    await connectDB();
    const post = await Post.findOne({ slug, status: 'published' }).lean();
    
    if (post) {
      redisUtils.set(cacheKey, post, 3600);
    }
    
    return { post, source: 'db' };
  }

  static async clearCache() {
    await redisUtils.del(CACHE_KEY_PUBLIC);
    // Note: Selective slug cache clearing could be added if needed
  }
}
