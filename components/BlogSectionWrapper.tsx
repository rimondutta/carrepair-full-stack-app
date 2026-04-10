import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import BlogSection from "./BlogSection";

export default async function BlogSectionWrapper() {
  await connectDB();
  const posts = await Post.find({ status: "published" })
    .sort({ publishedAt: -1 })
    .limit(6)
    .lean();
  
  // Efficiently serialize Mongo documents
  const serializedPosts = posts.map(post => ({
    ...post,
    _id: post._id.toString(),
    createdAt: post.createdAt?.toISOString(),
    updatedAt: post.updatedAt?.toISOString(),
  }));

  return <BlogSection posts={serializedPosts} />;
}
