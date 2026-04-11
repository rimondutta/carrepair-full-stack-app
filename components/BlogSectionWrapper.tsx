import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import BlogSection from "./BlogSection";
import { redisUtils } from "@/lib/redis";

export default async function BlogSectionWrapper() {
  const CACHE_KEY = 'posts:public';
  
  // 1. Try Cache hit (reuse public list)
  let posts = await redisUtils.get<any[]>(CACHE_KEY);
  
  if (!posts) {
    // 2. Cache miss: DB Hit
    await connectDB();
    posts = await Post.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .limit(6)
      .lean();
    
    // 3. Set Cache asynchronously (for first 6 since it's most common)
    if (posts && posts.length > 0) {
      redisUtils.set(CACHE_KEY, posts, 3600);
    }
  }

  const initialLimit = 6;
  const limitedPosts = (posts || []).slice(0, initialLimit);
  
  // Efficiently serialize Mongo documents for Client Components
  const serializedPosts = JSON.parse(JSON.stringify(limitedPosts || []));

  return <BlogSection posts={serializedPosts} />;
}
