import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import slugify from 'slugify';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { validatePost } from '@/lib/validation';
import { revalidatePath } from 'next/cache';
import { redisUtils } from '@/lib/redis';

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    return apiSuccess({ posts });
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
    const { valid, errors } = validatePost(body);
    if (!valid) {
      return apiError(errors.join(', '), 400);
    }

    // Auto-generate slug from title
    if (body.title) {
      body.slug = slugify(body.title, { lower: true, strict: true });
    }

    // If publishing, set publishedAt
    if (body.status === 'published' && !body.publishedAt) {
      body.publishedAt = new Date();
    }

    // Map Author string to object (Default to 'Admin' if empty)
    const authorName = typeof body.author === 'string' && body.author.trim() ? body.author : 'Admin';
    body.author = {
      name: authorName,
      role: 'Admin',
      image: '/assets/admin-avatar.png'
    };

    // Map Content string to array of objects
    if (body.content && typeof body.content === 'string') {
      body.content = body.content.split('\n\n').map((para: string) => ({
        type: 'paragraph',
        text: para.trim()
      })).filter((c: any) => c.text.length > 0);
    }

    const post = await Post.create(body);

    revalidatePath('/blog');
    revalidatePath('/');
    
    // Invalidate Redis Cache
    redisUtils.del('posts:public');

    return apiSuccess({ post }, 201);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
