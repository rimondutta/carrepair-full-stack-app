'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { Plus } from 'lucide-react';

interface PostData {
  _id: string;
  title: string;
  category: string;
  status: string;
  publishedAt: string;
  createdAt: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/posts');
      const data = await res.json();
      setPosts(data?.data?.posts || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/admin/posts/${deleteId}`, { method: 'DELETE' });
      setPosts((prev) => prev.filter((p) => p._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <>
      <main className="p-4 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-slate-500">{posts.length} dynamic stories found</p>
          </div>
          <Link
            href="/admin/posts/new"
            className="px-6 py-3 bg-red-600 shadow-lg shadow-red-600/20 text-white rounded-xl font-bold hover:bg-red-700 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <Plus size={18} />
            New Post
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50">
                    <th className="text-left py-4 px-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">Story Title</th>
                    <th className="text-left py-4 px-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">Category</th>
                    <th className="text-left py-4 px-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">Status</th>
                    <th className="text-left py-4 px-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">Published</th>
                    <th className="text-left py-4 px-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                        No stories captured yet. Start your journey!
                      </td>
                    </tr>
                  ) : (
                    posts.map((post) => (
                      <tr key={post._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4 font-bold text-slate-900 max-w-xs truncate">{post.title}</td>
                        <td className="py-4 px-4 text-slate-600 font-medium">{post.category || '—'}</td>
                        <td className="py-4 px-4">
                          <StatusBadge status={post.status} />
                        </td>
                        <td className="py-4 px-4 text-slate-600 font-bold">
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString()
                            : '—'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/admin/posts/${post._id}/edit`}
                              className="text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => setDeleteId(post._id)}
                              className="text-red-600 hover:text-red-800 text-xs font-medium transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Delete Modal */}
        <ConfirmModal
          isOpen={!!deleteId}
          message="This will permanently delete this post. This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      </main>
    </>
  );
}
