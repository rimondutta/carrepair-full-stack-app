import { NextRequest } from 'next/server';
import { apiSuccess, apiError, apiHandler } from '@/lib/apiResponse';
import { PostService } from '@/services/postService';

export const GET = apiHandler(async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const { slug } = await params;
  const { post, source } = await PostService.getPostBySlug(slug);

  if (!post) {
    return apiError('Post not found', 404);
  }

  return apiSuccess({ post, source });
}, {
  maxRequests: 100, // Highly specific caches can have higher limits
  windowMs: 60 * 1000
});
