import { MetadataRoute } from 'next';
import services from '../data/services.json';
import blogData from '../data/blog.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://careplusauto.vercel.app';

  // Base routes
  const routes = [
    '',
    '/contact',
    '/services',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Service routes
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Blog routes
  const blogRoutes = blogData.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...routes, ...serviceRoutes, ...blogRoutes];
}
