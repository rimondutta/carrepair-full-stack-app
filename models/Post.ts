import mongoose, { Schema, Document, Model } from 'mongoose';
import slugify from 'slugify';

export interface IPost extends Document {
  title: string;
  slug: string;
  content: {
    type: 'paragraph' | 'heading';
    text: string;
  }[];
  excerpt?: string;
  coverImage?: string;
  category?: string;
  tags: string[];
  status: 'draft' | 'published';
  author: {
    name: string;
    role: string;
    image?: string;
  };
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    content: [
      {
        type: { type: String, enum: ['paragraph', 'heading'], required: true },
        text: { type: String, required: true },
      },
    ],
    excerpt: { type: String },
    coverImage: { type: String },
    category: { type: String },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    author: {
      name: { type: String, required: true },
      role: { type: String, required: true },
      image: { type: String },
    },
    publishedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

PostSchema.pre('save', async function () {
  if (this.isModified('title') && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;
