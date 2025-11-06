
import { MetadataRoute } from 'next';
import { toolCategories } from '@/lib/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ict.calculation.site';

  // Home page
  const routes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  // Tool pages
  toolCategories.forEach(category => {
    category.tools.forEach(tool => {
      routes.push({
        url: `${siteUrl}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      });
    });
  });

  return routes;
}
