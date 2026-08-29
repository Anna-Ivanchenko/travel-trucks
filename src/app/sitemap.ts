import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://travel-trucks.example.com';
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/catalog`, priority: 0.8 },
  ];
}
