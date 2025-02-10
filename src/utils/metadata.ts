import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Asset } from '@uniformdev/assets';
import { flattenValues } from '@uniformdev/canvas';
import { PageParameters } from '@uniformdev/canvas-next-rsc';
import { resolveAsset } from '@uniformdev/csk-components/utils/assets';
import { isRouteWithoutErrors } from '@uniformdev/csk-components/utils/routing';
import locales from '@/i18n/locales.json';
import retrieveRoute from '@/utils/retrieveRoute';

type UniformMetadataParameters = {
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphType:
    | 'website'
    | 'article'
    | 'book'
    | 'profile'
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_station'
    | 'video.movie'
    | 'video.episode'
    | 'video.tv_show'
    | 'video.other';
  openGraphImage: Asset[];
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: Asset[];
  twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player';
  favicon: Asset[];
};

/**
 * Generates metadata for a page using Uniform parameters and assets.
 *
 * @param {PageParameters} props - The parameters for the page, including routing and locale data.
 * @returns {Promise<Metadata>} - The metadata object compatible with Next.js.
 * @throws Will throw an error if the route contains issues or cannot be found.
 */
export async function generateMetadata(props: PageParameters): Promise<Metadata> {
  // Retrieve the route for the current page and locale
  const route = await retrieveRoute(props, locales.defaultLocale);

  // Handle cases where the route contains errors or is not found
  if (!isRouteWithoutErrors(route)) return notFound();

  const {
    compositionApiResponse: { composition },
  } = route;

  // Flatten the composition parameters for easier access
  const parameters = flattenValues(composition, { levels: 0 }) as UniformMetadataParameters;

  // Destructure metadata parameters from the composition
  const {
    pageTitle,
    pageDescription,
    pageKeywords,
    openGraphTitle,
    openGraphDescription,
    openGraphImage,
    openGraphType,
    twitterTitle,
    twitterDescription,
    twitterImage,
    twitterCard,
    favicon,
  } = parameters;

  // Resolve assets for Open Graph, Twitter, and favicon
  const [resolvedOgImage] = resolveAsset(openGraphImage);
  const [resolvedTwitterImage] = resolveAsset(twitterImage);
  const [resolvedFavicon] = resolveAsset(favicon);

  // Construct and return the metadata object
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    icons: {
      icon: resolvedFavicon?.url,
    },
    openGraph: {
      title: openGraphTitle || pageTitle,
      description: openGraphDescription || pageDescription,
      type: openGraphType || 'website',
      images: resolvedOgImage?.url,
    },
    twitter: {
      title: twitterTitle || pageTitle,
      description: twitterDescription || pageDescription,
      images: resolvedTwitterImage?.url || resolvedOgImage?.url,
      card: twitterCard,
    },
  };
}
