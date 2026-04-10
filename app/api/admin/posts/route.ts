import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import slugify from 'slugify';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { validatePost } from '@/lib/validation';

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

    // Handle tags as comma-separated string
    if (typeof body.tags === 'string') {
      body.tags = body.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean);
    }

    const post = await Post.create(body);

    return apiSuccess({ post }, 201);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
