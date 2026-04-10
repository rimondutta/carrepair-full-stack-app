import mongoose, { Schema, Document, Model } from 'mongoose';
import slugify from 'slugify';

export interface IService extends Document {
  title: string;
  slug: string;
  category: string;
  description?: string;
  shortDescription?: string;
  price?: string;
  duration?: string;
  icon?: string;
  image?: string;
  isActive: boolean;
  detailedContent?: string[];
  checklist?: string[];
  iconBoxes?: {
    iconName: string;
    title: string;
    description: string;
  }[];
  mechanics?: {
    name: string;
    role: string;
    image?: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  workProcessProcessText?: string;
  workProcess?: {
    title: string;
    description: string;
  }[];
  testimonialText?: string;
  testimonials?: {
    name: string;
    role: string;
    review: string;
    rating: number;
    date: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    category: { type: String, required: true },
    description: { type: String },
    shortDescription: { type: String },
    price: { type: String },
    duration: { type: String },
    icon: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    detailedContent: [{ type: String }],
    checklist: [{ type: String }],
    iconBoxes: [
      {
        iconName: { type: String },
        title: { type: String },
        description: { type: String },
      },
    ],
    mechanics: [
      {
        name: { type: String },
        role: { type: String },
        image: { type: String },
      },
    ],
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
    workProcessProcessText: { type: String },
    workProcess: [
      {
        title: { type: String },
        description: { type: String },
      },
    ],
    testimonialText: { type: String },
    testimonials: [
      {
        name: { type: String },
        role: { type: String },
        review: { type: String },
        rating: { type: Number },
        date: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

ServiceSchema.pre('save', async function () {
  if (this.isModified('title') && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
