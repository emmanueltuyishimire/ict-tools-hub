
import { MetadataRoute } from 'next';
import { toolCategories } from '@/lib/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://calculation.site/ict';

  const toolUrls = toolCategories.flatMap(category =>
    category.tools.map(tool => ({
      url: `${siteUrl}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...toolUrls,
  ];
}
