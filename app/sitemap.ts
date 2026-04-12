import { MetadataRoute } from 'next';
import { ServiceService } from '@/services/serviceService';
import { PostService } from '@/services/postService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  try {
    const [servicesRes, postsRes] = await Promise.all([
      ServiceService.getActiveServices(),
      PostService.getPublishedPosts()
    ]);

    const serviceRoutes = (servicesRes.services || []).map((service: any) => ({
      url: `${baseUrl}/services/${service.slug || service._id}`,
      lastModified: new Date(service.updatedAt || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    const blogRoutes = (postsRes.posts || []).map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug || post._id}`,
      lastModified: new Date(post.updatedAt || post.publishedAt || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

    return [...routes, ...serviceRoutes, ...blogRoutes];
  } catch (error) {
    console.error('Failed to generate dynamic sitemap routes:', error);
    // Return base routes so sitemap still functions if DB is down
    return routes;
  }
}
