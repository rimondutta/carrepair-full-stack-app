"use client";

import { ArrowRight, User, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BlogSection({ posts: initialPosts = [] }: { posts?: any[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 2; // For desktop
  
  // Use either provided posts or fall back to an empty list (or could keep legacy if needed)
  const posts = initialPosts;
  
  const maxPage = Math.max(0, Math.ceil(posts.length / postsPerPage) - 1);

  const visiblePosts = posts.slice(
    currentPage * postsPerPage, 
    (currentPage * postsPerPage) + postsPerPage
  );

  return (
    <section id="blog" className="bg-[var(--color-bgDark)] py-20 md:py-28 relative">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[var(--color-primary)] font-bold tracking-widest text-xs md:text-sm uppercase mb-3 md:mb-4 block">
             LATEST NEWS
          </span>
          <h2 className="text-white heading-font text-3xl md:text-5xl font-bold uppercase leading-tight mx-auto max-w-2xl px-4">
            Read Latest Blogs By <span className="text-[var(--color-primary)] italic">Car Experts</span>
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {visiblePosts.map((post: any) => {
            // Handle both legacy and DB structures
            const title = post.title;
            const author = typeof post.author === 'string' ? post.author : post.author?.name || 'Admin';
            const date = post.publishedAt || post.date || new Date().toISOString();
            
            // Robust date parsing
            const dateObj = new Date(date);
            const isValidDate = !isNaN(dateObj.getTime());
            const formattedDate = isValidDate 
              ? dateObj.toLocaleDateString("en-US", { day: "2-digit", month: "short" })
              : "10 Oct"; // Fallback
            
            const [day, month] = formattedDate.split(" ");
            const image = post.coverImage || post.image || "";
            const slug = post.slug || "#";

            return (
              <div key={post._id || post.id || slug} className="group bg-[#1B1B1B] overflow-hidden border border-neutral-800 hover:border-[var(--color-primary)] transition-colors duration-300">
                
                {/* Image Placeholder */}
                <div className={`w-full aspect-[16/9] relative overflow-hidden`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={image} 
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>

                  {/* Date Badge */}
                  <div className="absolute top-0 left-6 bg-[var(--color-primary)] text-white font-bold uppercase px-4 py-3 heading-font transform text-center z-10">
                    <span className="text-2xl block leading-none mb-1">{day}</span>
                    <span className="text-xs tracking-widest">{month}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 relative">
                  
                  {/* Meta */}
                  <div className="flex items-center gap-6 text-[var(--color-textMuted)] text-sm font-bold uppercase tracking-wider mb-4 border-b border-neutral-800 pb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[var(--color-primary)]" />
                      By {author}
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-[var(--color-primary)]" />
                      {post.comments || 0} Comments
                    </div>
                  </div>

                  <Link href={`/blog/${slug}`} className="inline-block mt-2">
                    <h3 className="heading-font text-white text-2xl font-bold uppercase leading-tight group-hover:text-[var(--color-primary)] transition-colors duration-300 line-clamp-2">
                      {title}
                    </h3>
                  </Link>

                  <div className="mt-8">
                    <Link href={`/blog/${slug}`} className="inline-flex items-center text-[var(--color-primary)] font-bold uppercase tracking-widest text-sm group/link">
                      Read More 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-2 transition-transform" />
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        {maxPage > 0 && (
          <div className="flex justify-center gap-3">
            {[...Array(maxPage + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`h-2 transition-all duration-300 ${
                  index === currentPage 
                    ? "w-10 bg-[var(--color-primary)]" 
                    : "w-3 bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
