import { Metadata } from "next";
import BlogHero from "@/components/blog/BlogHero";
import BlogCard from "@/components/blog/BlogCard";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export const metadata: Metadata = {
  title: "Inside Care Plus | Automotive Blog & Expert Guides",
  description: "Explore our collection of expert automotive repair guides, maintenance tips, and industry insights from the master technicians at Care Plus Dubai.",
};

export default async function BlogListingPage() {
  await connectDB();
  const posts = await Post.find({ status: "published" }).sort({ publishedAt: -1 }).lean();
  const serializedPosts = JSON.parse(JSON.stringify(posts));

  return (
    <main className="min-h-screen bg-[#110E10]">
      
      {/* Blog Hero */}
      <BlogHero />

      {/* Blog Listing Section */}
      <section className="py-24 bg-[#110E10] relative">
        <div className="container mx-auto px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl text-left">
              <span className="text-[var(--color-primary)] font-black text-xs uppercase tracking-[0.4em] mb-4 block">
                Latest Articles
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
                RECENT <span className="text-white/20">POSTS</span>
              </h2>
            </div>
            
            {/* Simple Category Filter (Stateless for now) */}
            <div className="flex flex-wrap gap-3">
              {["All", "Maintenance", "Diagnostics", "Performance"].map((cat) => (
                <button 
                  key={cat}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                    cat === "All" 
                      ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-lg" 
                      : "bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {serializedPosts.map((post: any) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="mt-20 flex justify-center">
            <button className="px-10 py-4 bg-transparent border-2 border-[var(--color-primary)] text-white font-black text-[12px] uppercase tracking-[0.3em] hover:bg-[var(--color-primary)] transition-all duration-500 rounded-full group">
              View All Insights
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
