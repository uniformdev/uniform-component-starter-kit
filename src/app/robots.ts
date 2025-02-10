import type { MetadataRoute } from 'next';

const VERCEL_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';

export default function robots(): MetadataRoute.Robots {
  const domain = VERCEL_URL || 'http://localhost:3000';
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
