import { MetadataRoute } from 'next';
import siteData from '@/data/siteData.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.softbridgesolutions.com"; // Change this to actual prod domain if known

  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/studio`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Dynamic domain routes
  const domainRoutes = siteData.domains.map((domain) => ({
    url: `${baseUrl}/domain/${domain.name}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...domainRoutes];
}
