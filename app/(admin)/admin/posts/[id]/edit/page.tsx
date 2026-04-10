'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/admin/Header';
import PostForm from '@/components/admin/PostForm';

interface PostData {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  status: 'draft' | 'published';
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/admin/posts/${id}`);
        const data = await res.json();
        setPost(data?.data?.post);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (data: { title: string; slug: string; excerpt: string; content: string; coverImage: string; category: string; tags: string; author: string; status: string }) => {
    const res = await fetch(`/api/admin/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Failed to update post');
    }

    setTimeout(() => {
      router.push('/admin/posts');
    }, 1500);
  };

  if (loading) {
    return (
      <>
        <Header title="Edit Post" />
        <main className="p-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full" />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header title="Edit Post" />
      <main className="p-8">
        {post ? (
          <PostForm initialData={post} onSubmit={handleSubmit} isEditing />
        ) : (
          <p className="text-gray-500">Post not found</p>
        )}
      </main>
    </>
  );
}
