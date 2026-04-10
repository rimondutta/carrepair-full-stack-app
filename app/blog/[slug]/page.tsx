import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Facebook, Twitter, Linkedin } from "@/components/services/SocialIcons";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  await connectDB();
  const posts = await Post.find({ status: "published" }).select("slug").lean();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const post = await Post.findOne({ slug, status: "published" }).lean();
  if (!post) return {};

  return {
    title: `${post.title} | Care Plus Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title as string,
      description: post.excerpt,
      images: [{ url: (post as any).coverImage || "" }],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  
  const post = await Post.findOne({ slug, status: "published" }).lean();
  if (!post) notFound();

  const recentPosts = await Post.find({ slug: { $ne: slug }, status: "published" })
    .sort({ publishedAt: -1 })
    .limit(3)
    .lean();

  const serializedPost = JSON.parse(JSON.stringify(post));
  const serializedRecent = JSON.parse(JSON.stringify(recentPosts));

  return (
    <main className="min-h-screen bg-[#110E10]">

      {/* Hero / Header */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 z-0 opacity-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={serializedPost.coverImage} alt="" className="w-full h-full object-cover blur-2xl scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#110E10] via-transparent to-[#110E10]"></div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-[var(--color-primary)] font-black text-[10px] uppercase tracking-[0.4em] mb-8 hover:tracking-[0.6em] transition-all duration-500"
            >
              <ArrowLeft className="w-4 h-4" /> BACK TO BLOG
            </Link>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="px-4 py-1.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[10px] font-black uppercase tracking-widest rounded-full border border-[var(--color-primary)]/20">
                {serializedPost.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-10 tracking-tighter uppercase leading-[0.95]">
              {serializedPost.title}
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-8 text-[11px] text-white/40 uppercase tracking-[0.2em] font-bold">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
                <span>{new Date(serializedPost.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-[var(--color-primary)]" />
                <span>{serializedPost.author?.name} — {serializedPost.author?.role}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-[#110E10]">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Post Content */}
            <div className="lg:w-2/3">
              <div className="rounded-3xl overflow-hidden mb-16 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={serializedPost.coverImage} alt={serializedPost.title} className="w-full h-auto" />
              </div>

              <article className="prose prose-invert prose-lg max-w-none">
                {serializedPost.content.map((block: any, idx: number) => {
                  if (block.type === "heading") {
                    return <h2 key={idx} className="text-white font-black uppercase tracking-tight text-3xl mt-16 mb-8">{block.text}</h2>;
                  }
                  return <p key={idx} className="text-[var(--color-textLight)] opacity-80 leading-relaxed mb-8">{block.text}</p>;
                })}
              </article>

              {/* Share Section */}
              <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black uppercase tracking-widest text-white/40">Share this guide</span>
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[var(--color-primary)] transition-all duration-300">
                      <Facebook className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[var(--color-primary)] transition-all duration-300">
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[var(--color-primary)] transition-all duration-300">
                      <Linkedin className="w-4 h-4" />
                    </button>
                </div>
                
                <Link href="/services" className="text-[var(--color-primary)] font-black text-xs uppercase tracking-widest border-b-2 border-[var(--color-primary)] pb-1 hover:pb-2 transition-all">
                  Book A Service Now
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-1/3">
              <div className="sticky top-40 flex flex-col gap-12">
                
                {/* Search Placeholder */}
                <div className="p-8 bg-[#1A181A] rounded-2xl border border-white/5">
                  <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-6">Search Blog</h4>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Type keywords..." 
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] transition-all"
                    />
                  </div>
                </div>

                {/* Recent Posts */}
                <div className="p-8 bg-[#1A181A] rounded-2xl border border-white/5">
                  <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">Related Insights</h4>
                  <div className="flex flex-col gap-8">
                    {serializedRecent.map((recent: any) => (
                      <Link key={recent.slug} href={`/blog/${recent.slug}`} className="group flex gap-4 items-center">
                        <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-white/10 group-hover:border-[var(--color-primary)] transition-all">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={recent.coverImage} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 scale-110 group-hover:scale-100" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] text-[var(--color-primary)] font-black uppercase tracking-widest">{recent.category}</span>
                          <h5 className="text-white font-bold text-sm leading-tight group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 uppercase">
                            {recent.title}
                          </h5>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA Box */}
                <div className="p-10 bg-gradient-to-br from-[var(--color-primary)] to-[#b00005] rounded-3xl text-center shadow-2xl">
                  <h4 className="text-white font-black text-2xl mb-4 leading-tight">NEED AN EXPERT OPINION?</h4>
                  <p className="text-white/80 text-sm mb-8 leading-relaxed">Our master technicians are ready to diagnose any luxury vehicle with surgical precision.</p>
                  <Link href="/contact" className="inline-block w-full py-4 bg-white text-black font-black text-[12px] uppercase tracking-[0.2em] rounded-xl hover:bg-black hover:text-white transition-all">
                    GET A QUOTE
                  </Link>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </section>

    </main>
  );
}
