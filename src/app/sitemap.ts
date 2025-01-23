import type { MetadataRoute } from 'next';
import { ProjectMapClient, getNodeActiveCompositionEdition } from '@uniformdev/project-map';
import localesConfig from '@/i18n/locales.json';

const projectMap = new ProjectMapClient({
  apiHost: process.env.UNIFORM_CLI_BASE_URL!,
  apiKey: process.env.UNIFORM_API_KEY!,
  projectId: process.env.UNIFORM_PROJECT_ID!,
});

const VERCEL_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
// Note:
// This is a basic implementation of sitemap generation. It is suitable for smaller projects where
// the total number of sitemap items does not exceed 50,000, which is the limit for a single sitemap file.
// For projects with more than 50,000 items, it is recommended to split the sitemap into multiple files
// as suggested in the Next.js documentation:
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-multiple-sitemaps
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = VERCEL_URL || 'http://localhost:3000';
  const { nodes } = await projectMap.getNodes({ withCompositionData: true });

  if (!nodes) return [];

  const isLocalized = localesConfig?.locales?.length > 0;

  return nodes.flatMap(node => {
    if (!isLocalized || !node.path?.includes(':locale')) {
      const edition = getNodeActiveCompositionEdition({
        node,
        targetLocale: undefined,
      });

      return [
        {
          url: `${domain}${node.path}`,
          lastModified: edition?.modified,
          changeFrequency: 'daily',
          priority: 1,
        },
      ];
    }

    return localesConfig.locales.map(locale => {
      const edition = getNodeActiveCompositionEdition({
        node,
        targetLocale: locale,
      });

      return {
        url: `${domain}${node.path?.replace(':locale', locale)}`,
        lastModified: edition?.modified,
        changeFrequency: 'daily',
        priority: 1,
      };
    });
  });
}
