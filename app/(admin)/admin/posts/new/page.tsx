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
      throw new Error('Failed to create post');
    }

    setTimeout(() => {
      router.push('/admin/posts');
    }, 1500);
  };

  return (
    <>
      <Header title="New Post" />
      <main className="p-8">
        <PostForm onSubmit={handleSubmit} />
      </main>
    </>
  );
}
