import { apiSuccess, apiHandler } from '@/lib/apiResponse';
import { PostService } from '@/services/postService';

export const GET = apiHandler(async () => {
  const { posts, source } = await PostService.getPublishedPosts();
  return apiSuccess({ posts, source });
}, {
  maxRequests: 60, // Higher limit for public GET
  windowMs: 60 * 1000
});
