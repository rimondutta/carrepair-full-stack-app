'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/admin/Header';
import PostForm from '@/components/admin/PostForm';

export default function NewPostPage() {
  const router = useRouter();

  const handleSubmit = async (data: { title: string; slug: string; excerpt: string; content: string; coverImage: string; category: string; tags: string; author: string; status: string }) => {
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to create post');
    }

    setTimeout(() => {
      router.push('/admin/posts');
    }, 1500);
  };

  return (
    <main className="p-8">
      <PostForm onSubmit={handleSubmit} />
    </main>
  );
}
