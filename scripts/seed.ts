import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';

// Import models
import User from '../models/User';
import Service from '../models/Service';
import Post from '../models/Post';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auto-repair';

async function seed() {
  try {
    console.log(`🔌 Connecting to MongoDB: ${MONGODB_URI}`);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // 1. Seed Admin User
    const existingAdmin = await User.findOne({ role: 'superadmin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      await User.create({
        name: 'Admin',
        email: 'admin@autorepair.com',
        password: hashedPassword,
        role: 'superadmin',
      });
      console.log('Superadmin user created (admin@autorepair.com / Admin@123)');
    }

    // 2. Seed Services from JSON
    console.log('Migrating services from JSON...');
    const servicesJsonPath = path.join(process.cwd(), 'data', 'services.json');
    const servicesData = JSON.parse(fs.readFileSync(servicesJsonPath, 'utf8'));

    // Clear existing services to avoid duplicates and ensure fresh data
    await Service.deleteMany({});

    const formattedServices = servicesData.map((s: any) => ({
      title: s.title,
      slug: s.slug,
      category: s.category,
      description: s.description,
      shortDescription: s.shortDescription,
      price: s.price,
      duration: s.duration,
      icon: s.icon,
      image: s.image,
      isActive: s.isActive ?? true,
      detailedContent: s.detailedContent || [],
      checklist: s.checklist || [],
      iconBoxes: s.iconBoxes || [],
      mechanics: s.mechanics || [],
      faqs: s.faqs || []
    }));

    await Service.insertMany(formattedServices);
    console.log(`${formattedServices.length} services migrated from JSON`);

    // 3. Seed Blog Posts from JSON
    console.log('Migrating blog posts from JSON...');
    const blogJsonPath = path.join(process.cwd(), 'data', 'blog.json');
    const blogData = JSON.parse(fs.readFileSync(blogJsonPath, 'utf8'));

    // Clear existing posts
    await Post.deleteMany({});

    const formattedPosts = blogData.map((p: any) => ({
      title: p.title,
      slug: p.slug,
      content: p.content,
      excerpt: p.excerpt,
      coverImage: p.image,
      category: p.category,
      status: 'published',
      author: p.author,
      publishedAt: new Date(p.date),
      tags: p.tags || []
    }));

    await Post.insertMany(formattedPosts);
    console.log(`${formattedPosts.length} blog posts migrated from JSON`);

    console.log('\n Migration complete! Frontend and Dashboard are now synchronized.');
  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
