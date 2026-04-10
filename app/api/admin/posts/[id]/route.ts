import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import slugify from 'slugify';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { validatePost } from '@/lib/validation';
import { revalidatePath } from 'next/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const post = await Post.findById(id).lean();

    if (!post) {
      return apiError('Post not found', 404);
    }

    return apiSuccess({ post });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    // Validate if meaningful fields are present
    if (body.title || body.excerpt || body.status) {
      const { valid, errors } = validatePost(body);
      if (!valid) {
        return apiError(errors.join(', '), 400);
      }
    }

    // Regenerate slug if title changed
    if (body.title) {
      body.slug = slugify(body.title, { lower: true, strict: true });
    }

    // Handle tags as comma-separated string
    if (typeof body.tags === 'string') {
      body.tags = body.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean);
    }

    // If status changes to published and no publishedAt, set it
    if (body.status === 'published') {
      const existingPost = await Post.findById(id).select('publishedAt').lean();
      if (existingPost && !existingPost.publishedAt) {
        body.publishedAt = new Date();
      }
    }

    // Map Author string to object
    if (body.author && typeof body.author === 'string') {
      body.author = {
        name: body.author,
        role: 'Admin',
        image: '/assets/admin-avatar.png'
      };
    }

    // Map Content string to array of objects
    if (body.content && typeof body.content === 'string') {
      body.content = body.content.split('\n\n').map((para: string) => ({
        type: 'paragraph',
        text: para.trim()
      })).filter((c: any) => c.text.length > 0);
    }

    const post = await Post.findByIdAndUpdate(id, body, { returnDocument: 'after' });

    if (!post) {
      return apiError('Post not found', 404);
    }

    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath('/');

    return apiSuccess({ post });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return apiError('Post not found', 404);
    }

    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath('/');

    return apiSuccess({ message: 'Post deleted successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
